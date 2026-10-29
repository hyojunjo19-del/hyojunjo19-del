import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Parses a .env file format into a key-value object.
 * @param {string} envPath - Path to .env file
 * @returns {Record<string, string>}
 */
export function loadEnv(envPath = path.join(__dirname, '.env')) {
  if (!fs.existsSync(envPath)) {
    throw new Error(`Env file not found at: ${envPath}`);
  }

  const content = fs.readFileSync(envPath, 'utf-8');
  const envObj = {};

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    envObj[key] = val;
    process.env[key] = val;
  }

  return envObj;
}

// When executed directly, print loaded environment variables as JSON
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const env = loadEnv();
  console.log(JSON.stringify(env, null, 2));
}

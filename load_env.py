import os
import json
from pathlib import Path

def load_env(env_path: Path = None) -> dict:
    if env_path is None:
        env_path = Path(__file__).parent / ".env"
    
    if not env_path.exists():
        raise FileNotFoundError(f"Env file not found at: {env_path}")
        
    env_vars = {}
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, val = line.split("=", 1)
                key = key.strip()
                val = val.strip()
                env_vars[key] = val
                os.environ[key] = val
                
    return env_vars

if __name__ == "__main__":
    env = load_env()
    print(json.dumps(env, indent=2))

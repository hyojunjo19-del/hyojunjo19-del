| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [SA العربية](./ar.md) | [IN हिन्दी](./hi.md) |

---

# Martin K. Holst

Ingénieur systèmes et architecte DSP audio basé à Copenhague.  
Spécialisé dans le traitement du signal numérique à ultra-faible latence, les moteurs audio temps réel strict et le firmware embarqué pour le matériel audio.

- 🔭 En cours de développement : **prism-dsp** (moteur de synthèse audio C++20 avec vectorisation SIMD) et **iron-synth** (générateur sonore polyphonique bare-metal en Rust).
- ⚙️ Priorités quotidiennes : Pipelines audio temps réel, buffers circulaires sans verrou (lock-free), sous-systèmes noyau Linux ALSA et algorithmes DSP sans allocation dynamique sur le tas (zero-allocation).
- 💬 Sujets d'échange : Précision en virgule flottante, latence des tampons de pilotes audio, vocodeurs de phase, modélisation numérique de circuits analogiques et synthétiseurs modulaires.
- ⚡ Singularités personnelles : Je mesure le jitter audio en microsecondes, je collectionne les circuits intégrés de filtres analogiques vintage, j'extrais des cafés de spécialité en filtration douce avec une minéralité rigoureuse, et je fais du vélo face aux bourrasques des côtes danoises.

---

## Compétences & Technologies

| Domaine | Technologies Principales & Frameworks | Méthodologies & Outillage |
| :--- | :--- | :--- |
| **Langages Cœur** | C++20 / C++23, Rust (Stable & Nightly `no_std`), C (C11/C17), Assembleur x86-64 & ARM NEON | Clang/LLVM, GCC, Cargo, CMake, Meson |
| **Audio & DSP** | JUCE Framework, WebAssembly / WebAudio, SDKs VST3 / CLAP, SIMD (AVX2, AVX-512, NEON) | Faust, MATLAB, Python (NumPy/SciPy), Octave |
| **Systèmes & Linux** | Noyau Linux ALSA / JACK / PipeWire, eBPF (BCC, bpftrace), Extensions temps réel POSIX | Noyau RT-Preempt, perf, Valgrind (Callgrind/Massif), GDB |
| **Embarqué & HW** | ARM Cortex-M4/M7 (STM32, NXP i.MX RT), FreeRTOS, Bare-Metal Bare-Silicon, I2S / SPI / UART | JTAG/SWD (J-Link, OpenOCD), Analyseur logique Saleae, KiCad |
| **Performance** | Structures de données lock-free, files SPSC (mono-producteur/mono-consommateur), localité de cache | Google Benchmark, Criterion.rs, llvm-mca |

---

## Projets Open-Source Notables

### `prism-dsp`
> Framework DSP audio C++20 haute performance, sous forme d'en-têtes purs (`header-only`), conçu pour les contraintes temps réel strictes.

- **Stack** : C++20, Intrinsèques vectoriels AVX2 / ARM NEON, CMake
- **Points Forts** :
  - Architecture en en-têtes purs excluant toute allocation dynamique de mémoire dans la boucle de rendu audio (`processBlock`).
  - Cascades de filtres biquad vectorisées en SIMD, approximations polynomiales ultra-rapides pour la saturation non linéaire et oscillateurs à bande limitée.
  - Suite de tests unitaires rigoureuse avec validation de la réponse impulsionnelle et fréquentielle au niveau sous-échantillon.

### `iron-synth`
> Cœur de synthétiseur polyphonique bare-metal développé en Rust pour les microcontrôleurs ARM Cortex-M7.

- **Stack** : Rust (`no_std`), Architecture Cortex-M, Interface audio I2S
- **Points Forts** :
  - Latence de bout en bout prédictible et inférieure à la milliseconde, du déclencheur MIDI jusqu'à la sortie DAC.
  - Gestion mémoire personnalisée tirant parti de 512 Ko de mémoire étroitement couplée (TCM) pour éliminer les défauts de cache lors du calcul des tampons.
  - Oscillateurs anti-repliement multiformes d'onde, vol de voix polyphonique intelligent et émulation de filtre en échelle analogique virtuel.

### `alsa-jitter-probe`
> Chaîne d'outils eBPF pour le noyau Linux dédiée au diagnostic des ruptures de tampons ALSA (xruns) et des pics de latence d'ordonnancement.

- **Stack** : C, eBPF (bpftrace, libbpf), Python
- **Points Forts** :
  - Interception directe des commutations de contexte de l'ordonnanceur et des pointeurs de tampons DMA ALSA.
  - Mesure en microsecondes réelles des retards de routines d'interruption (ISR), de latence DPC et des temps d'attente de préemption.
  - Génération de flamegraphs et de télémétrie par histogrammes sans dégrader les performances du runtime audio.

---

## Principes d'Ingénierie

1. **Exécution Déterministe d'Abord (Deterministic Execution First)** : En audio temps réel, un échantillon retardé est identique à un échantillon perdu. Le thread audio ne doit jamais bloquer, allouer de mémoire sur le tas, verrouiller un mutex ou effectuer d'entrées/sorties disque ou réseau.
2. **Organisation Mémoire par Principes Fondamentaux (First-Principles Memory Layout)** : Le taux de succès du cache processeur détermine le débit réel du DSP. L'organisation en tableau de structures (SoA), l'alignement mémoire et des branchements prédictibles priment sur l'empilement d'abstractions.
3. **Fidélité Acoustique Reproductible (Reproducible Sound Quality)** : La rigueur mathématique des équations de filtres et de l'analyse spectrale doit concorder parfaitement avec les mesures sur circuits physiques de 44.1 kHz à 192 kHz.
4. **Empreinte Externe Minimale (Minimal External Footprint)** : Les projets doivent rester autonomes, facilement auditables et prémunis contre les ruptures de compatibilité des dépendances tierces.

---

## Rythme Hebdomadaire & Intérêts

```text
[Lundi - Vendredi]  Conception de DSP audio à haut débit, profilage bas niveau, banc de test embarqué.
[Week-end]          Soudure de modules analogiques, prototypage de filtres à diodes, acoustique, cyclisme.
[Lectures]          Publications de l'AES, littérature sur les systèmes temps réel, histoire de la synthèse sonore.
[Café]              Café d'Éthiopie lavé de terroir, extraction douce à 93 °C, ratio d'infusion 1:16.
```

---

## Contact & Vérification

- 🌐 Carnet Technique : `https://m-holst.audio` (Articles sur les mathématiques du DSP, l'optimisation SIMD et les filtres acoustiques)
- 📬 Courriel : `martin [at] m-holst.audio`
- 💬 Matrix : `@m-holst:matrix.org`
- 🔑 Empreinte PGP : `4E8B 1F92 73C0 8A16 52D4  F089 9A32 10BC C72F E4A1`

| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [SA العربية](./ar.md) | [IN हिन्दी](./hi.md) |

---

# Martin K. Holst

Systemingenieur und Audio-DSP-Architekt mit Sitz in Kopenhagen.  
Spezialisiert auf digitale Signalverarbeitung mit extrem geringer Latenz, harte Echtzeit-Audio-Laufzeitumgebungen und Embedded-Firmware für Klanghardware.

- 🔭 Aktuell in Entwicklung: **prism-dsp** (C++20 SIMD-Audio-Synthesemaschine) und **iron-synth** (Bare-Metal polyphoner Synthesizer-Kern in Rust).
- ⚙️ Täglicher technischer Fokus: Echtzeit-Audio-Pipelines, sperrenfreie Ringpuffer (Lock-Free), Linux ALSA-Kernelsubsysteme und heap-allokationsfreie DSP-Algorithmen (Zero-Allocation).
- 💬 Themen für den Austausch: Gleitkomma-Präzisionsfallen, Audiotreiber-Pufferlatenzen, Phasen-Vocoder, numerische Modellierung analoger Schaltungen und modulare Synthesizer.
- ⚡ Persönliche Eigenheiten: Ich messe Audio-Jitter in Mikrosekunden, sammle historische Analogfilter-ICs, brühe Spezialitätenkaffee mit präziser Wasserchemie und fahre mit dem Rad gegen den dänischen Küstengegenwind.

---

## Technologiestack & Kernkompetenzen

| Domäne | Primäre Technologien & Frameworks | Methodiken & Werkzeuge |
| :--- | :--- | :--- |
| **Kernsprachen** | C++20 / C++23, Rust (Stable & Nightly `no_std`), C (C11/C17), x86-64 & ARM NEON Assembler | Clang/LLVM, GCC, Cargo, CMake, Meson |
| **Audio & DSP** | JUCE Framework, WebAssembly / WebAudio, VST3 / CLAP SDKs, SIMD (AVX2, AVX-512, NEON) | Faust, MATLAB, Python (NumPy/SciPy), Octave |
| **Systeme & Linux** | Linux-Kernel ALSA / JACK / PipeWire, eBPF (BCC, bpftrace), POSIX Echtzeit-Erweiterungen | RT-Preempt-Kernel, perf, Valgrind (Callgrind/Massif), GDB |
| **Embedded & HW** | ARM Cortex-M4/M7 (STM32, NXP i.MX RT), FreeRTOS, Bare-Metal Bare-Silicon, I2S / SPI / UART | JTAG/SWD (J-Link, OpenOCD), Saleae Logic-Analyzer, KiCad |
| **Leistungsoptimierung** | Lock-Free-Datenstrukturen, SPSC-Warteschlangen (Single-Producer Single-Consumer), Cache-Lokalität | Google Benchmark, Criterion.rs, llvm-mca |

---

## Ausgewählte Open-Source-Projekte

### `prism-dsp`
> Hochleistungsfähiges, reines Header-Framework (Header-Only) in C++20 für Audio-DSP unter harten Echtzeitbedingungen.

- **Stack**: C++20, AVX2 / ARM NEON Vektor-Intrinsics, CMake
- **Kernmerkmale**:
  - Konsequent als reine Header-Bibliothek ohne jede Heap-Allokation innerhalb der Audioschleife (`processBlock`) aufgebaut.
  - SIMD-vektorisierte Biquad-Filterkaskaden, schnelle polynomielle Approximationen für nichtlineare Sättigung und bandbegrenzte Oszillatorsynthese.
  - Vollständige Unit-Test-Suite mit Überprüfung der Impuls- und Frequenzantwort im Sub-Sample-Bereich.

### `iron-synth`
> Bare-Metal-Polyphon-Synthesizer-Kern, entwickelt in Rust für ARM Cortex-M7 Mikrocontroller.

- **Stack**: Rust (`no_std`), Cortex-M-Architektur, I2S-Audioschnittstelle
- **Kernmerkmale**:
  - Deterministische Gesamtlatenz unter einer Millisekunde vom MIDI-Ereignis bis zur DAC-Ausgabe.
  - Maßgeschneidertes Speicherlayout unter Nutzung von 512 KB Tightly-Coupled Memory (TCM), um Cache-Misses während der Pufferberechnung vollständig zu verhindern.
  - Antialiasing-Oszillatoren mit mehreren Wellenformen, intelligentes Voice-Stealing und virtuelle analoge Diodenkaskaden-Filteremulation.

### `alsa-jitter-probe`
> Echtzeit-Linux-Kernel-eBPF-Werkzeugkette zur Diagnose von ALSA-Pufferunterläufen (xruns) und Latenzspitzen im Scheduler.

- **Stack**: C, eBPF (bpftrace, libbpf), Python
- **Kernmerkmale**:
  - Koppelt sich direkt an Kontextwechselpunkte des Kernelschedulers und ALSA-DMA-Pufferzeiger.
  - Misst Verzögerungen bei Interrupt-Serviceroutinen (ISR), DPC-Latenzen und Preemption-Wartezeiten in echten Mikrosekunden.
  - Erzeugt Flamegraphs und Histogramm-Telemetrie ohne zusätzliche Messbelastung für die Audio-Laufzeitumgebung.

---

## Entwicklungsprinzipien

1. **Deterministische Ausführung steht an erster Stelle (Deterministic Execution First)**: Im Echtzeit-Audiobereich ist ein verspätetes Sample genauso fatal wie ein verlorenes Sample. Der Audiothread darf niemals blockieren, keinen Heapspeicher allokieren, keine Mutexe beanspruchen und keine Dateisystem- oder Netzwerk-I/O durchführen.
2. **Speicherorganisation nach ersten Prinzipien (First-Principles Memory Layout)**: Die Trefferquote im CPU-Cache bestimmt den realen Durchsatz der Signalverarbeitung. Structure-of-Arrays (SoA), Speicherausrichtung und vorhersehbare Verzweigungen haben immer Vorrang vor abstrakten Entwurfsmustern.
3. **Reproduzierbare Klangtreue (Reproducible Sound Quality)**: Die mathematische Strenge von Filtergleichungen und Spektralzerlegungen muss über sämtliche Abtastraten hinweg (44,1 kHz bis 192 kHz) exakt mit physikalischen Referenzmessungen übereinstimmen.
4. **Minimaler externer Fußabdruck (Minimal External Footprint)**: Codebasen müssen autark, transparent prüfbar und unempfindlich gegenüber inkompatiblen Drittanbieter-Updates bleiben.

---

## Wochenrhythmus & Hobbys

```text
[Mo - Fr]  Audio-DSP-Entwicklung, Low-Level-Engine-Profiling, Embedded-Firmware-Prüfstand.
[Sa - So]  Lötarbeiten an Analogmodulen, Steckplatinenaufbauten von Kaskadenschaltungen, Akustikmessung, Rennrad.
[Lektüre]  Fachaufsätze der AES, wissenschaftliche Arbeiten zu Echtzeitbetriebssystemen, Geschichte der Synthese.
[Kaffee]   Gewaschene äthiopische Einzellagenkaffees, 93 °C Brühtemperatur, 1:16 Brühverhältnis.
```

---

## Kontakt & Verifikation

- 🌐 Technisches Journal: `https://m-holst.audio` (Artikel über DSP-Mathematik, SIMD-Optimierung und akustische Filter)
- 📬 E-Mail: `martin [at] m-holst.audio`
- 💬 Matrix: `@m-holst:matrix.org`
- 🔑 PGP-Fingerabdruck: `4E8B 1F92 73C0 8A16 52D4  F089 9A32 10BC C72F E4A1`

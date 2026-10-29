| [KR 한국어](./docs/locales/ko.md) | [US English](./README.md) | [JP 日本語](./docs/locales/ja.md) | [CN 简体中文](./docs/locales/zh-CN.md) | [ES Español](./docs/locales/es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./docs/locales/fr.md) | [DE Deutsch](./docs/locales/de.md) | [RU Русский](./docs/locales/ru.md) | [SA العربية](./docs/locales/ar.md) | [IN हिन्दी](./docs/locales/hi.md) |

---

# Martin K. Holst

Systems Engineer & Audio DSP Architect based in Copenhagen.  
Focused on low-latency digital signal processing, hard real-time audio runtimes, and embedded firmware for audio hardware.

- 🔭 Currently building: **prism-dsp** (C++20 SIMD audio synthesis engine) and **iron-synth** (bare-metal polyphonic sound generator in Rust).
- ⚙️ Day-to-day focus: Real-time audio pipelines, lock-free ringbuffers, Linux ALSA kernel subsystems, and zero-allocation DSP algorithms.
- 💬 Ask me about: Floating-point precision caveats, audio driver buffer latency, phase vocoders, analog circuit modeling, and modular synthesizers.
- ⚡ Personal quirks: I measure audio jitter in microseconds, collect vintage analog filter ICs, brew specialty pour-overs with meticulous water chemistry, and cycle against coastal Danish headwinds.

---

## Technical Stack & Competencies

| Domain | Primary Technologies & Frameworks | Methodologies & Tooling |
| :--- | :--- | :--- |
| **Core Languages** | C++20 / C++23, Rust (Stable & Nightly `no_std`), C (C11/C17), x86-64 & ARM NEON Assembly | Clang/LLVM, GCC, Cargo, CMake, Meson |
| **Audio & DSP** | JUCE Framework, WebAssembly / WebAudio, VST3 / CLAP SDKs, SIMD (AVX2, AVX-512, NEON) | Faust, MATLAB, Python (NumPy/SciPy), Octave |
| **Systems & Linux** | Linux Kernel ALSA / JACK / PipeWire, eBPF (BCC, bpftrace), POSIX Real-Time Extensions | RT-Preempt, perf, Valgrind (Callgrind/Massif), GDB |
| **Embedded & HW** | ARM Cortex-M4/M7 (STM32, NXP i.MX RT), FreeRTOS, Bare-Metal Bare-Silicon, I2S / SPI / UART | JTAG/SWD (J-Link, OpenOCD), Saleae Logic, KiCad |
| **Performance** | Lock-Free Data Structures, Single-Producer Single-Consumer (SPSC) Queues, Cache Optimization | Google Benchmark, Criterion.rs, llvm-mca |

---

## Featured Open-Source Projects

### `prism-dsp`
> High-performance, header-only C++20 audio DSP framework designed for hard real-time constraints.

- **Stack**: C++20, AVX2 / ARM NEON Vector Intrinsics, CMake
- **Highlights**:
  - Fully header-only with zero heap allocations inside the audio processing loop (`processBlock`).
  - SIMD-vectorized biquad filter cascades, fast polynomial approximations for non-linear saturation, and band-limited oscillator synthesis.
  - Comprehensive unit test suite with sub-sample impulse and frequency response validation.

### `iron-synth`
> Bare-metal, polyphonic synthesizer core written in Rust for ARM Cortex-M7 microcontrollers.

- **Stack**: Rust (`no_std`), Cortex-M Architecture, I2S Audio Interface
- **Highlights**:
  - Predictable, sub-millisecond end-to-end latency from MIDI trigger to DAC output.
  - Custom memory layout utilizing 512KB Tightly-Coupled Memory (TCM) to eliminate cache misses during buffer rendering.
  - Multi-waveform anti-aliased oscillators with polyphonic voice stealing and virtual analog ladder filter emulation.

### `alsa-jitter-probe`
> Real-time Linux kernel eBPF toolchain for diagnosing ALSA audio buffer underruns (xruns) and scheduling latency spikes.

- **Stack**: C, eBPF (bpftrace, libbpf), Python
- **Highlights**:
  - Hooks directly into kernel scheduler context-switch points and ALSA DMA buffer pointers.
  - Quantifies interrupt service routine (ISR) delays, DPC latency, and thread preemption latency in real time.
  - Generates flamegraphs and histogram telemetry without imposing measurement overhead on the audio runtime.

---

## Engineering Principles

1. **Deterministic Execution First**: In real-time audio, a late sample is as bad as a dropped sample. The audio thread must never block, allocate heap memory, touch mutexes, or perform filesystem/network I/O.
2. **First-Principles Memory Layout**: Cache efficiency determines DSP throughput. Structure-of-Arrays (SoA) layout, memory alignment, and predictable branch patterns are prioritized over abstractions.
3. **Reproducible Sound Quality**: Mathematical rigor in filter equations and spectral accuracy must match hardware reference measurements across all sampling rates (44.1 kHz to 192 kHz).
4. **Minimalistic External Footprint**: Codebases should be self-contained, auditable, and resilient to breaking dependency drift.

---

## Weekly Rhythm & Interests

```text
[Mon - Fri]  High-throughput audio DSP, low-level engine profiling, embedded firmware testbench.
[Weekends]   Analog modular soldering, breadboarding discrete diode ladders, acoustic measurement, cycling.
[Reading]    AES journal papers, real-time operating system papers, sound synthesis history.
[Coffee]     Single-origin washed Ethiopian varieties, 93°C extraction, 1:16 brew ratio.
```

---

## Get in Touch & Verification

- 🌐 Personal Journal: `https://m-holst.audio` (Articles on DSP mathematics, SIMD optimization, and acoustic filters)
- 📬 Email: `martin [at] m-holst.audio`
- 💬 Matrix: `@m-holst:matrix.org`
- 🔑 PGP Fingerprint: `4E8B 1F92 73C0 8A16 52D4  F089 9A32 10BC C72F E4A1`

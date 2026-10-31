| [KR 한국어](./docs/locales/ko.md) | [US English](./README.md) | [JP 日本語](./docs/locales/ja.md) | [CN 简体中文](./docs/locales/zh-CN.md) | [ES Español](./docs/locales/es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./docs/locales/fr.md) | [DE Deutsch](./docs/locales/de.md) | [RU Русский](./docs/locales/ru.md) | [SA العربية](./docs/locales/ar.md) | [IN हिन्दी](./docs/locales/hi.md) |

---

# Martin K. Holst

Principal Systems Engineer & Audio DSP Architect based in Copenhagen.  
This GitLab namespace hosts mirrors, embedded firmware continuous integration pipelines, and hardware-in-the-loop (HIL) validation testbenches.

- ⚙️ GitLab Focus: Bare-metal embedded toolchains, Linux kernel ALSA regression tests, RT-Preempt latency validation, and cross-compilation builds for ARM Cortex-M targets.
- 🔗 Primary Hub: Active codebases and open-source contributions are mirrored and maintained across [GitHub](https://github.com/hyojunjo19-del) and this GitLab instance.
- 🛠️ Infrastructure: Dedicated GitLab CI runners running on isolated Linux workstations with real-time kernel patches and hardware logic analyzers attached.

---

## Technical Stack & Infrastructure

| Layer | Technologies & Target Platforms | CI/CD & Testing Infrastructure |
| :--- | :--- | :--- |
| **Firmware & RTOS** | Rust (`no_std`), C++20, FreeRTOS, ARM Cortex-M4/M7 (STM32, NXP i.MX RT) | OpenOCD, J-Link GDB Server, Saleae Logic Analyzer |
| **Audio Core & DSP** | Lock-Free Data Structures, SIMD Vector Intrinsics (AVX2, NEON), Faust | Bit-exact DSP regression suites, impulse verification |
| **Kernel & Driver** | Linux ALSA, JACK, PipeWire, eBPF (BCC, bpftrace), RT-Preempt | `cyclictest` jitter logging, xrun detection scripts, perf telemetry |
| **Build & Toolchains** | CMake, Meson, Cargo, GNU Arm Embedded Toolchain, LLVM/Clang | Multi-stage embedded toolchains, GitLab CI/CD pipelines |

---

## Active GitLab Workflows & Pipelines

### Hardware-in-the-Loop (HIL) Firmware CI
- Flashing and execution of `iron-synth` unit tests directly onto attached STM32H7 hardware development boards.
- End-to-end latency measurement from simulated MIDI trigger pulses to I2S output capture via logic analyzer triggers.
- Hard failure thresholds: any audio buffer underrun (xrun) or sample calculation exceeding the 1ms budget triggers immediate pipeline failure.

### ALSA Kernel Driver Regression Bench
- Nightly build matrix tracking upstream Linux stable kernels and RT-Preempt patchsets.
- Deployment of `alsa-jitter-probe` eBPF monitors to verify interrupt latency and scheduling jitter under synthetic CPU load (`stress-ng`).

---

## Engineering Standards

1. **Zero Flakiness in CI**: Tests involving hardware or real-time audio must run on dedicated, non-virtualized bare-metal runners to guarantee deterministic timing.
2. **Strict Failure Gates**: In real-time audio, a late buffer is a critical defect. Performance regressions are treated with the same severity as compilation failures.
3. **Auditable Artifacts**: All test output traces, memory footprint reports, and telemetry histograms are preserved as downloadable pipeline artifacts.

---

## Contact & Links

- 🌐 GitHub Profile: `https://github.com/hyojunjo19-del`
- 📬 Email: `martin [at] m-holst.audio`
- 💬 Matrix: `@m-holst:matrix.org`
- 🔑 PGP Fingerprint: `4E8B 1F92 73C0 8A16 52D4  F089 9A32 10BC C72F E4A1`

| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [SA العربية](./ar.md) | [IN हिन्दी](./hi.md) |

---

# 마틴 홀스트 (Martin K. Holst)

코펜하겐 기반의 시스템 엔지니어이자 오디오 DSP 아키텍트입니다.  
초저지연 디지털 신호 처리, 하드 실시간 오디오 런타임 및 하드웨어 임베디드 펌웨어 개발에 집중하고 있습니다.

- 🔭 현재 개발 중인 프로젝트: **prism-dsp** (C++20 SIMD 오디오 합성 엔진), **iron-synth** (Rust 기반 베어메탈 다성 신디사이저 코어).
- ⚙️ 일상적인 기술 초점: 실시간 오디오 파이프라인, 무잠금 링버퍼(Lock-Free Ringbuffer), Linux ALSA 커널 서브시스템, 제로 힙 할당(Zero-Allocation) DSP 알고리즘.
- 💬 편하게 나눌 수 있는 주제: 부동소수점 연산 정밀도 이슈, 오디오 드라이버 버퍼 지연시간, 위상 보코더(Phase Vocoder), 아날로그 회로 수치 모델링, 모듈러 신디사이저.
- ⚡ 개인적인 특징: 오디오 지터를 마이크로초(µs) 단위로 측정하며, 빈티지 아날로그 필터 IC를 수집하고, 정밀한 수질 화학을 따지는 스페셜티 푸어오버 커피를 내리며, 덴마크 해안의 맞바람을 가르며 자전거를 탑니다.

---

## 기술 스택 및 역량

| 도메인 | 주요 기술 스택 & 프레임워크 | 엔지니어링 방법론 & 도구 |
| :--- | :--- | :--- |
| **핵심 언어** | C++20 / C++23, Rust (Stable & Nightly `no_std`), C (C11/C17), x86-64 및 ARM NEON 어셈블리 | Clang/LLVM, GCC, Cargo, CMake, Meson |
| **오디오 & DSP** | JUCE Framework, WebAssembly / WebAudio, VST3 / CLAP SDK, SIMD 벡터화 (AVX2, AVX-512, NEON) | Faust, MATLAB, Python (NumPy/SciPy), Octave |
| **시스템 & Linux** | Linux Kernel ALSA / JACK / PipeWire, eBPF (BCC, bpftrace), POSIX Real-Time Extensions | RT-Preempt 커널, perf, Valgrind (Callgrind/Massif), GDB |
| **임베디드 & HW** | ARM Cortex-M4/M7 (STM32, NXP i.MX RT), FreeRTOS, Bare-Metal Bare-Silicon, I2S / SPI / UART | JTAG/SWD (J-Link, OpenOCD), Saleae Logic 로직 분석기, KiCad |
| **성능 최적화** | Lock-Free 자료구조, 단일 생산자-단일 소비자(SPSC) 큐, CPU L1/L2 캐시 최적화 | Google Benchmark, Criterion.rs, llvm-mca |

---

## 주요 오픈소스 프로젝트

### `prism-dsp`
> 엄격한 하드 실시간 제약 조건을 충족하도록 설계된 고성능 헤더 온리(Header-Only) C++20 오디오 DSP 프레임워크입니다.

- **기술 스택**: C++20, AVX2 / ARM NEON 벡터 인트린식, CMake
- **핵심 특징**:
  - 오디오 처리 메인 루프(`processBlock`) 내부에서 힙 메모리 동적 할당을 100% 원천 배제(Zero-Allocation).
  - SIMD 벡터화 바이쿼드(Biquad) 필터 캐스케이드, 비선형 새츄레이션을 위한 고속 다항식 근사 연산, 대역 제한 발진기 합성 지원.
  - 서브 샘플 단위의 임펄스 응답 및 주파수 응답 검증을 포함한 전수 단위 테스트 스위트 내장.

### `iron-synth`
> ARM Cortex-M7 마이크로컨트롤러 전용으로 작성된 Rust 기반 베어메탈 다성(Polyphonic) 신디사이저 엔진입니다.

- **기술 스택**: Rust (`no_std`), Cortex-M 아키텍처, I2S 오디오 인터페이스
- **핵심 특징**:
  - MIDI 신호 트리거부터 DAC 오디오 출력까지 1밀리초 미만의 예측 가능한 종단 간(End-to-End) 지연시간 달성.
  - 512KB 밀결합 메모리(TCM)를 직접 제어하는 맞춤형 메모리 레이아웃으로 버퍼 렌더링 중 캐시 미스 발생 원천 차단.
  - 다중 파형 안티앨리어싱 오실레이터, 결정론적 보이스 스틸링(Voice Stealing), 가상 아날로그 사다리꼴 필터 에뮬레이션 탑재.

### `alsa-jitter-probe`
> ALSA 오디오 버퍼 언더런(xruns) 및 스케줄링 지연 급증 현상을 진단하기 위한 실시간 Linux 커널 eBPF 툴체인입니다.

- **기술 스택**: C, eBPF (bpftrace, libbpf), Python
- **핵심 특징**:
  - 커널 스케줄러의 컨텍스트 스위칭 지점 및 ALSA DMA 버퍼 포인터에 직접 후킹.
  - 인터럽트 서비스 루틴(ISR) 지연, DPC 지연, 스레드 선점 대기 시간을 실시간 마이크로초 단위로 정량화.
  - 오디오 런타임에 성능 부하(오버헤드)를 가하지 않고 플레임그래프 및 히스토그램 텔레메트리 출력.

---

## 엔지니어링 철학

1. **결정론적 실행 우선 (Deterministic Execution First)**: 실시간 오디오 시스템에서 늦게 도착한 오디오 샘플은 유실된 샘플과 같습니다. 오디오 스레드는 절대 블로킹되거나, 힙 메모리를 할당하거나, 뮤텍스를 획득하거나, 파일/네트워크 I/O를 수행해서는 안 됩니다.
2. **제1원리 기반 메모리 구조 (First-Principles Memory Layout)**: CPU 캐시 적중률이 DSP의 실제 처리량을 결정합니다. 추상화 레이어보다 배열 구조체(Structure-of-Arrays), 메모리 정렬, 분기 예측 가능한 흐름을 최우선으로 둡니다.
3. **재현 가능한 음질 (Reproducible Sound Quality)**: 모든 필터 수식과 스펙트럼 해석의 수학적 엄밀성은 44.1 kHz부터 192 kHz에 이르는 모든 샘플링 레이트에서 실제 아날로그 하드웨어 레퍼런스 측정값과 일치해야 합니다.
4. **미니멀한 외부 의존성 (Minimal External Footprint)**: 코드베이스는 외부 의존성 변경에 흔들리지 않고 자립적이며, 누구나 검증 가능하고 유지보수하기 쉬워야 합니다.

---

## 일상 리듬 & 관심사

```text
[월 - 금]  고성능 오디오 DSP 설계, 저수준 엔진 프로파일링, 임베디드 펌웨어 테스트벤치 구축.
[주  말]   아날로그 모듈러 납땜, 다이오드 래더 회로 브레드보딩, 음향 측정, 자전거 라이딩.
[독  서]   AES 저널 논문, 실시간 운영체제(RTOS) 학술 문서, 음향 합성 기법의 역사.
[커  피]   에티오피아 워시드 싱글 오리진, 93°C 추출, 1:16 추출 비율 엄수.
```

---

## 연락처 & 검증 정보

- 🌐 개인 기술 블로그: `https://m-holst.audio` (DSP 수학, SIMD 최적화, 음향 필터 관련 아티클)
- 📬 이메일: `martin [at] m-holst.audio`
- 💬 Matrix: `@m-holst:matrix.org`
- 🔑 PGP 공개키 지문: `4E8B 1F92 73C0 8A16 52D4  F089 9A32 10BC C72F E4A1`

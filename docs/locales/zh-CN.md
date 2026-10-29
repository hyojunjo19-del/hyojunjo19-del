| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [SA العربية](./ar.md) | [IN हिन्दी](./hi.md) |

---

# 马丁·霍尔斯特 (Martin K. Holst)

常驻哥本哈根的系统工程师与音频数字信号处理 (DSP) 架构师。  
专注于超低延迟数字信号处理、硬实时音频运行时以及音频硬件的嵌入式固件开发。

- 🔭 当前正在构建: **prism-dsp** (C++20 SIMD 音频合成引擎) 与 **iron-synth** (基于 Rust 的裸机多复音合成器核心)。
- ⚙️ 日常技术重点: 实时音频处理管线、无锁环形缓冲区 (Lock-Free Ringbuffer)、Linux ALSA 内核子系统以及零堆内存分配 (Zero-Allocation) DSP 算法。
- 💬 欢迎探讨: 浮点计算精度权衡、音频驱动缓冲区延迟、相位声码器 (Phase Vocoder)、模拟电路数值建模以及模块化合成器。
- ⚡ 个人特质: 以微秒 (µs) 级测量音频抖动，收藏经典模拟滤波芯片，恪守水质化学冲煮浅烘手冲咖啡，并在丹麦沿海的强劲逆风中骑行。

---

## 技术栈与专业领域

| 领域 | 核心技术栈与框架 | 工程方法论与工具链 |
| :--- | :--- | :--- |
| **核心语言** | C++20 / C++23, Rust (Stable & Nightly `no_std`), C (C11/C17), x86-64 与 ARM NEON 汇编 | Clang/LLVM, GCC, Cargo, CMake, Meson |
| **音频与 DSP** | JUCE 框架, WebAssembly / WebAudio, VST3 / CLAP SDK, SIMD 向量化 (AVX2, AVX-512, NEON) | Faust, MATLAB, Python (NumPy/SciPy), Octave |
| **系统与 Linux** | Linux 内核 ALSA / JACK / PipeWire, eBPF (BCC, bpftrace), POSIX 实时扩展 | RT-Preempt 内核, perf, Valgrind (Callgrind/Massif), GDB |
| **嵌入式与硬件** | ARM Cortex-M4/M7 (STM32, NXP i.MX RT), FreeRTOS, 裸机芯片级开发, I2S / SPI / UART | JTAG/SWD (J-Link, OpenOCD), Saleae 逻辑分析仪, KiCad |
| **性能优化** | 无锁数据结构、单生产者单消费者 (SPSC) 队列、CPU 缓存局部性优化 | Google Benchmark, Criterion.rs, llvm-mca |

---

## 精选开源项目

### `prism-dsp`
> 专为严苛硬实时约束设计的高性能、纯头文件 (Header-Only) C++20 音频 DSP 框架。

- **技术栈**: C++20, AVX2 / ARM NEON 向量指令集, CMake
- **核心亮点**:
  - 音频处理主循环 (`processBlock`) 内部完全杜绝堆内存动态分配。
  - SIMD 向量化双二阶滤波器级联、非线性饱和的快速多项式逼近、带限振荡器波形合成。
  - 内置完整的单元测试套件，包含亚采样级脉冲响应与频响一致性验证。

### `iron-synth`
> 专为 ARM Cortex-M7 微控制器打造的 Rust 裸机多复音合成器核心。

- **技术栈**: Rust (`no_std`), Cortex-M 架构, I2S 音频接口
- **核心亮点**:
  - 实现从 MIDI 信号触发到 DAC 音频输出亚毫秒级、高度可预测的端到端超低延迟。
  - 直接控制 512KB 紧耦合内存 (TCM)，从底层彻底杜绝音频缓冲区渲染期间的缓存缺失。
  - 配备抗混叠多波形振荡器、智能语音抢占机制与虚拟模拟梯形滤波器仿真。

### `alsa-jitter-probe`
> 用于诊断 ALSA 音频缓冲区欠载 (xruns) 与调度延迟抖动的实时 Linux 内核 eBPF 工具链。

- **技术栈**: C, eBPF (bpftrace, libbpf), Python
- **核心亮点**:
  - 直接挂载于内核调度器上下文切换点及 ALSA DMA 缓冲区指针。
  - 实时量化中断服务程序 (ISR) 延迟、DPC 延迟以及线程抢占等待耗时。
  - 在不对音频运行时引入额外测量开销的前提下，生成火焰图与直方图遥测数据。

---

## 工程准则

1. **确定性执行为先 (Deterministic Execution First)**: 在实时音频系统中，迟到的样本等同于丢失的样本。音频线程绝不能发生阻塞、分配堆内存、竞争互斥锁，亦不能执行文件或网络 I/O。
2. **基于第一性原理的内存布局 (First-Principles Memory Layout)**: CPU 缓存命中率决定了 DSP 的真实吞吐上限。数组结构体 (Structure-of-Arrays)、内存对齐与高度可预测的分支逻辑始终优于层级抽象。
3. **可复现的声音精度 (Reproducible Sound Quality)**: 滤波器方程与频谱解析的数学严密性，必须在 44.1 kHz 至 192 kHz 的所有采样率下与硬件基准实测完全吻合。
4. **极简外部依赖 (Minimal External Footprint)**: 保持代码库自足、透明可审计，杜绝因外部依赖破坏性升级而导致系统脆弱。

---

## 日常节奏与兴趣

```text
[周一至周五] 高吞吐音频 DSP 开发、底层引擎性能调优、嵌入式固件实机测试。
[周六与周日] 模拟模块化电路焊接、二极管梯形电路搭建测试、声学校准、骑行。
[阅读研习]   AES 期刊文献、实时操作系统 (RTOS) 学术报告、声音合成历史专著。
[手冲咖啡]   埃塞俄比亚水洗单一产区豆、93°C 水温萃取、1:16 水粉比。
```

---

## 联络方式与数字身份

- 🌐 技术主页: `https://m-holst.audio` (探讨 DSP 数学原理、SIMD 优化与声学滤波器的文章)
- 📬 电子邮箱: `martin [at] m-holst.audio`
- 💬 Matrix: `@m-holst:matrix.org`
- 🔑 PGP 公钥指纹: `4E8B 1F92 73C0 8A16 52D4  F089 9A32 10BC C72F E4A1`

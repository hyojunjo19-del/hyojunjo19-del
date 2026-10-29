| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [SA العربية](./ar.md) | [IN हिन्दी](./hi.md) |

---

# Martin K. Holst

Engenheiro de sistemas e arquiteto de DSP de áudio radicado em Copenhague.  
Especializado em processamento de sinais digitais de ultrabaixa latência, ambientes de execução de áudio em tempo real estrito e firmware embarcado para hardware musical.

- 🔭 Desenvolvendo atualmente: **prism-dsp** (motor de síntese sonora em C++20 acelerado por SIMD) e **iron-synth** (núcleo de sintetizador polifônico bare-metal em Rust).
- ⚙️ Foco técnico cotidiano: Pipelines de áudio em tempo real, ringbuffers sem travamento (lock-free), subsistemas ALSA do kernel Linux e algoritmos de DSP sem alocação dinâmica (zero-allocation).
- 💬 Temas para conversa: Precisão em ponto flutuante, latência de buffers em drivers de som, vocoders de fase, modelagem numérica de circuitos analógicos e sintetizadores modulares.
- ⚡ Particularidades pessoais: Meço o jitter de áudio em microssegundos, coleciono circuitos integrados de filtros analógicos clássicos, extraio café especial coado com controle rigoroso da química da água e pedalo contra o vento forte do litoral dinamarquês.

---

## Pilha Tecnológica e Competências

| Domínio | Tecnologias Principais e Frameworks | Metodologias e Ferramentas |
| :--- | :--- | :--- |
| **Linguagens Centrais** | C++20 / C++23, Rust (Stable e Nightly `no_std`), C (C11/C17), Assembly x86-64 e ARM NEON | Clang/LLVM, GCC, Cargo, CMake, Meson |
| **Áudio e DSP** | JUCE Framework, WebAssembly / WebAudio, VST3 / CLAP SDKs, SIMD (AVX2, AVX-512, NEON) | Faust, MATLAB, Python (NumPy/SciPy), Octave |
| **Sistemas e Linux** | Kernel Linux ALSA / JACK / PipeWire, eBPF (BCC, bpftrace), Extensões POSIX em tempo real | Kernel RT-Preempt, perf, Valgrind (Callgrind/Massif), GDB |
| **Embarcados e HW** | ARM Cortex-M4/M7 (STM32, NXP i.MX RT), FreeRTOS, Bare-Metal de baixo nível, I2S / SPI / UART | JTAG/SWD (J-Link, OpenOCD), Analisador Lógico Saleae, KiCad |
| **Performance** | Estruturas de dados lock-free, filas SPSC (produtor único/consumidor único), localidade de cache | Google Benchmark, Criterion.rs, llvm-mca |

---

## Projetos de Código Aberto em Destaque

### `prism-dsp`
> Framework de DSP de áudio de alto desempenho em C++20, estritamente em arquivos de cabeçalho (`header-only`), projetado para requisitos rígidos de tempo real.

- **Tecnologias**: C++20, Intrínsecos vetoriais AVX2 / ARM NEON, CMake
- **Destaques**:
  - Arquitetura totalmente em cabeçalhos, eliminando qualquer alocação na heap dentro do loop de áudio (`processBlock`).
  - Cascatas de filtros biquad com vetorização SIMD, aproximações polinomiais ultrarrápidas para saturação não linear e osciladores de banda limitada.
  - Suíte completa de testes unitários com validação de resposta ao impulso e resposta em frequência no nível de subamostra.

### `iron-synth`
> Núcleo de sintetizador polifônico bare-metal programado em Rust para microcontroladores ARM Cortex-M7.

- **Tecnologias**: Rust (`no_std`), Arquitetura Cortex-M, Interface de áudio I2S
- **Destaques**:
  - Latência ponta a ponta previsível inferior a um milissegundo desde o evento MIDI até a saída analógica do DAC.
  - Gerenciamento de memória sob medida utilizando 512 KB de memória estreitamente acoplada (TCM) para evitar perdas de cache durante o processamento de buffers.
  - Osciladores com redução de aliasing, sistema inteligente de roubo de vozes e emulação analógica virtual de filtro em escada.

### `alsa-jitter-probe`
> Conjunto de ferramentas eBPF para o kernel Linux voltado ao diagnóstico de esgotamento de buffers ALSA (xruns) e picos de latência no escalonador.

- **Tecnologias**: C, eBPF (bpftrace, libbpf), Python
- **Destaques**:
  - Conexão direta aos pontos de troca de contexto do escalonador e aos ponteiros de buffers DMA ALSA.
  - Medição de atrasos de rotinas de interrupção (ISR), latência DPC e tempos de espera por preempção em microssegundos reais.
  - Geração de flamegraphs e telemetria em histogramas sem adicionar sobrecarga operacional ao processamento de áudio.

---

## Princípios de Engenharia

1. **Execução Determinística em Primeiro Lugar (Deterministic Execution First)**: Em áudio em tempo real, uma amostra atrasada equivale a uma amostra perdida. A thread de áudio nunca deve bloquear, alocar memória na heap, disputar mutexes ou executar operações de entrada/saída em disco ou rede.
2. **Disposição de Memória Baseada em Primeiros Princípios (First-Principles Memory Layout)**: A taxa de acerto do cache da CPU define a taxa de transferência prática do DSP. Estruturas de arranjos (SoA), alinhamento de memória e padrões de ramificação previsíveis têm prioridade sobre camadas de abstração.
3. **Fidelidade Sonora Reprodutível (Reproducible Sound Quality)**: O rigor matemático das equações de filtragem deve corresponder fielmente a medições de hardware físico de referência em todas as taxas de amostragem de 44.1 kHz a 192 kHz.
4. **Dependências Externas Reduzidas (Minimal External Footprint)**: As bases de código devem ser autossuficientes, fáceis de auditar e resilientes a quebras causadas por bibliotecas externas.

---

## Rotina Semanal e Interesses

```text
[Segunda - Sexta]  Desenvolvimento de DSP de alta taxa, perfilamento de baixo nível, bancada de testes embarcada.
[Finais de Semana] Soldagem de sintetizadores modulares, prototipagem de filtros a diodo, acústica, ciclismo de estrada.
[Leituras]         Artigos da AES, pesquisas sobre arquitetura de RTOS, história da síntese analógica.
[Café]             Grãos etíopes lavados de origem única, extração a 93 °C, proporção de infusão 1:16.
```

---

## Contato e Verificação

- 🌐 Diário Técnico: `https://m-holst.audio` (Artigos sobre matemática de DSP, otimização SIMD e filtros acústicos)
- 📬 E-mail: `martin [at] m-holst.audio`
- 💬 Matrix: `@m-holst:matrix.org`
- 🔑 Impressão Digital PGP: `4E8B 1F92 73C0 8A16 52D4  F089 9A32 10BC C72F E4A1`

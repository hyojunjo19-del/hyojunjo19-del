| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [SA العربية](./ar.md) | [IN हिन्दी](./hi.md) |

---

# Martin K. Holst

Ingeniero de sistemas y arquitecto de DSP de audio afincado en Copenhague.  
Especializado en procesamiento de señales digitales de ultrabaja latencia, entornos de ejecución de audio en tiempo real estricto y firmware embebido para hardware musical.

- 🔭 Actualmente desarrollando: **prism-dsp** (motor de síntesis de audio en C++20 con aceleración SIMD) e **iron-synth** (núcleo de sintetizador polifónico bare-metal escrito en Rust).
- ⚙️ Enfoque técnico cotidiano: Canales de procesamiento de audio en tiempo real, ringbuffers sin bloqueos (lock-free), subsistemas ALSA del kernel de Linux y algoritmos DSP sin asignación dinámica de memoria (zero-allocation).
- 💬 Temas de debate: Precisión en coma flotante, latencia de buffers en controladores de audio, codificadores de fase (phase vocoders), modelado físico de circuitos analógicos y sintetizadores modulares.
- ⚡ Curiosidades personales: Mido el jitter de audio en microsegundos, colecciono circuitos integrados de filtros analógicos clásicos, preparo café de especialidad mediante vertido con química meticulosa del agua y pedaleo contra los fuertes vientos costeros de Dinamarca.

---

## Pila Tecnológica y Competencias

| Dominio | Tecnologías Primarias y Marcos | Metodologías y Herramientas |
| :--- | :--- | :--- |
| **Lenguajes Clave** | C++20 / C++23, Rust (Stable y Nightly `no_std`), C (C11/C17), Ensamblador x86-64 y ARM NEON | Clang/LLVM, GCC, Cargo, CMake, Meson |
| **Audio y DSP** | JUCE Framework, WebAssembly / WebAudio, VST3 / CLAP SDKs, SIMD (AVX2, AVX-512, NEON) | Faust, MATLAB, Python (NumPy/SciPy), Octave |
| **Sistemas y Linux** | Kernel de Linux ALSA / JACK / PipeWire, eBPF (BCC, bpftrace), Extensiones POSIX en tiempo real | RT-Preempt, perf, Valgrind (Callgrind/Massif), GDB |
| **Embebidos y HW** | ARM Cortex-M4/M7 (STM32, NXP i.MX RT), FreeRTOS, Bare-Metal Bare-Silicon, I2S / SPI / UART | JTAG/SWD (J-Link, OpenOCD), Analizador lógico Saleae, KiCad |
| **Rendimiento** | Estructuras de datos lock-free, colas SPSC (un productor/un consumidor), optimización de caché CPU | Google Benchmark, Criterion.rs, llvm-mca |

---

## Proyectos Destacados de Código Abierto

### `prism-dsp`
> Marco de trabajo de DSP de audio de alto rendimiento en C++20 (header-only) concebido para restricciones de tiempo real estricto.

- **Tecnologías**: C++20, Intrínsecos vectoriales AVX2 / ARM NEON, CMake
- **Aspectos Destacados**:
  - Exclusivamente encabezados (`header-only`), eliminando por completo cualquier reserva de memoria en el bucle principal de audio (`processBlock`).
  - Filtros biquad vectorizados mediante SIMD, aproximaciones polinómicas ultrarrápidas para saturación no lineal y osciladores de banda limitada.
  - Batería completa de pruebas unitarias con validación de respuesta al impulso y respuesta en frecuencia a nivel de submuestra.

### `iron-synth`
> Núcleo de sintetizador polifónico bare-metal escrito en Rust para microcontroladores ARM Cortex-M7.

- **Tecnologías**: Rust (`no_std`), Arquitectura Cortex-M, Interfaz de audio I2S
- **Aspectos Destacados**:
  - Latencia predecible de extremo a extremo inferior a un milisegundo desde la pulsación MIDI hasta la salida DAC.
  - Gestión personalizada de memoria mediante 512 KB de memoria estrechamente acoplada (TCM) para erradicar fallos de caché durante el renderizado.
  - Osciladores con antialiasing multiforma de onda, robo inteligente de voces y emulación analógica virtual de filtro en escalera.

### `alsa-jitter-probe`
> Conjunto de herramientas eBPF para el kernel de Linux orientado al diagnóstico de xruns y fluctuaciones de latencia en buffers ALSA.

- **Tecnologías**: C, eBPF (bpftrace, libbpf), Python
- **Aspectos Destacados**:
  - Se vincula directamente a los puntos de cambio de contexto del planificador y a los punteros DMA de ALSA.
  - Cuantifica retrasos en rutinas de interrupción (ISR), latencia DPC y tiempos de espera de apropiación en microsegundos reales.
  - Genera gráficos de llama (flamegraphs) e histogramas sin añadir sobrecarga de rendimiento al entorno de audio.

---

## Filosofía de Ingeniería

1. **Ejecución Determinista Ante Todo (Deterministic Execution First)**: En el procesamiento de audio en tiempo real, una muestra retrasada equivale a una muestra perdida. El hilo de audio nunca debe bloquearse, reservar memoria del heap, usar mutexes ni realizar operaciones de entrada/salida en disco o red.
2. **Disposición de Memoria desde Primeros Principios (First-Principles Memory Layout)**: La tasa de aciertos en la caché del procesador condiciona el rendimiento real del DSP. La estructura de matrices (SoA), la alineación en memoria y los patrones de bifurcación predecibles prevalecen sobre las capas abstractas.
3. **Calidad de Sonido Reproducible (Reproducible Sound Quality)**: El rigor matemático en las ecuaciones de filtrado debe corresponderse con exactitud con las mediciones de hardware de referencia entre 44.1 kHz y 192 kHz.
4. **Dependencias Externas Mínimas (Minimal External Footprint)**: El código debe ser autosuficiente, legible, fácil de auditar y resistente a la obsolescencia de paquetes de terceros.

---

## Ritmo Semanal e Intereses

```text
[Lunes - Viernes]  Diseño de DSP de alto rendimiento, perfilado de motores de bajo nivel, banco de pruebas embebido.
[Fines de Semana]  Soldadura de módulos analógicos, prototipado de circuitos de escalera, medición acústica, ciclismo.
[Lecturas]         Publicaciones de la AES, artículos académicos sobre RTOS, historia de la síntesis de sonido.
[Café]             Variedades etíopes lavadas de origen único, extracción a 93 °C, ratio de vertido 1:16.
```

---

## Contacto y Verificación

- 🌐 Cuaderno Técnico: `https://m-holst.audio` (Artículos sobre matemáticas DSP, optimización SIMD y filtros acústicos)
- 📬 Correo: `martin [at] m-holst.audio`
- 💬 Matrix: `@m-holst:matrix.org`
- 🔑 Huella Digital PGP: `4E8B 1F92 73C0 8A16 52D4  F089 9A32 10BC C72F E4A1`

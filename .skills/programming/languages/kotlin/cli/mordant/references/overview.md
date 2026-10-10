# Overview

Focused reference for **mordant-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Mordant Best Practices

Mordant is a terminal rendering and input library: it detects what the terminal can do, renders widgets to it, and — in raw mode — reads individual keypresses. Best practice here is **detect, degrade, and keep rendering pure** — probe the terminal once instead of guessing from environment variables, build frames as plain strings that are trivial to assert, and treat the terminal as a resource you must restore no matter how the program exits.

This document is written against **Kotlin 2.4+ / Mordant 3.1+** and includes concrete values you can drop straight into code.

---

## 1. Core Stack & Gradle Setup

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    application
}

kotlin { jvmToolchain(21) }

dependencies {
    implementation("com.github.ajalt.mordant:mordant:3.1.0")
    testImplementation(kotlin("test"))
}
```

`com.github.ajalt.mordant:mordant` is the umbrella coordinate and pulls two layers:

| Layer              | Provides                                                                   |
| ------------------ | -------------------------------------------------------------------------- |
| `mordant-core-jvm` | `Terminal`, `TerminalRecorder`, widgets, `KeyboardEvent`, `RawModeScope`   |
| platform modules   | the real terminal, with **three FFI backends** (`jna`, `graal-ffi`, `ffm`) |

The three backends are not a mistake and not something you configure; they are alternative native bindings for terminal size and raw mode, and all of them end up on the runtime classpath. On a JVM without FFI support the size query degrades instead of throwing, but **do not assume `terminal.size` is correct in a container or over a plain pipe** — always keep a sane fallback width.

If the project also uses Clikt, declare Mordant explicitly: Clikt 5.1.0 requests Mordant 3.0.2 transitively for its help formatter, and an explicit 3.1.0 wins. Verify there is only one `mordant-core-jvm` version in `./gradlew dependencies --configuration runtimeClasspath`.

## 2. Terminal & Capability Detection

Never branch on `System.getenv("TERM")` or `System.console()` yourself. `Terminal()` already probes, and its answers are available as structured data:

```kotlin
import com.github.ajalt.mordant.rendering.AnsiLevel
import com.github.ajalt.mordant.terminal.Terminal

val terminal = Terminal()

if (!terminal.terminalInfo.inputInteractive) {
    System.err.println("kevin: interactive terminal required for the TUI")
    return
}

if (terminal.terminalInfo.ansiLevel == AnsiLevel.NONE) {
    println("running without color")
}
```

`TerminalInfo` exposes `ansiLevel`, `ansiHyperLinks`, `outputInteractive`, `inputInteractive`, `supportsAnsiCursor`, and `interactive`. In Mordant 3 these are **mutable properties**, which is exactly what makes a forced mode possible:

```kotlin
val plain = Terminal().apply {
    terminalInfo.ansiLevel = AnsiLevel.NONE          // deterministic, colorless output
    terminalInfo.inputInteractive = false            // pretend there is no keyboard
}
```

`AnsiLevel` is a four-step ladder, and the level you get decides how much color you may use:

| Level       | Meaning                    |
| ----------- | -------------------------- |
| `NONE`      | no escape sequences at all |
| `ANSI16`    | 16 colors                  |
| `ANSI256`   | 256-color palette          |
| `TRUECOLOR` | 24-bit color               |

Rules that follow:

- **Check `inputInteractive` before entering raw mode.** It is the honest test for "is there a human attached", and it fails fast in CI instead of blocking on a read.
- **Use `Terminal(width = .., height = ..)` to pin the size** in tests and when embedding; the constructor takes `ansiLevel`, `theme`, `width`, `height`, `terminalWidth`, `terminalHeight`, `interactive`, and a `terminalInterface`.
- **Reuse one `Terminal` instance.** It caches the probe. Constructing a `Terminal` per frame re-detects the terminal on every redraw.

## 3. Colors & Styled Output

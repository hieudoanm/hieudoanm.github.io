# Packaging

## Artifact

`make build` produces `bin/kevin.jar` — an executable jar whose manifest points
at `io.github.hieudoanm.kevin.MainKt`.

For a launcher script instead:

```sh
make install          # writes $HOME/bin/kevin
```

## Requirements

- JDK 21 or newer at runtime.
- No native toolchain. Unlike the Go port, which needs CGO for the fyne GUI,
  Compose Desktop is an ordinary dependency, so the single jar carries the CLI,
  the TUI and the GUI.

## CI

The rolling release `app-headless-kevin-latest` publishes the same way as the C
and C++ ports. The job runs:

```sh
./gradlew test jar
```

and uploads `build/libs/kevin-0.0.1.jar`.

## Checksums

Shasum and the checksums file are attached to the release alongside the other
KeVIN ports.

## Cross-platform

The jar is platform independent, but the managers are not: the TUI needs a
POSIX or Windows terminal with raw-mode support, and the GUI needs a display.
`kevin serve` on its own works everywhere, including over SSH.

## Size

Skiko, the Compose rendering engine, accounts for most of the jar. The CLI and
TUI paths never load it, so a headless server keeps its memory footprint low
even though the class is on the classpath.

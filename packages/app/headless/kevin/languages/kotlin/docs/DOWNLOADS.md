# Downloads

## About

KeVIN is a Redis-style key/value store implemented independently in C, C++, Go,
Rust and Kotlin. Every port speaks the same line-based protocol — `PING`, `SET`,
`GET`, `KEYS`, `DEL` and friends — so a client written against one works against
all of them, and the data files stay interchangeable.

The Kotlin port targets the JVM 21 and ships a single executable jar. It uses
[Clikt][clikt] for the command line, [Mordant][mordant] for a live-updating
terminal manager, and [Compose Multiplatform][compose] for a Material 3 desktop
manager. Both managers edit the same in-memory store the TCP server serves, so
you can change keys in a window while `redis-cli` talks to the port.

Choose a port when you want a different runtime or distribution model:

- **C / C++** — small static binaries, no runtime to install
- **Go** — single static binary; the GUI needs CGO
- **Rust** — single static binary; the GUI is behind a feature flag
- **Kotlin** — one jar for the server, TUI and GUI

## Release artifacts

| Port    | Artifact            | Runtime |
| ------- | ------------------- | ------- |
| Kotlin  | `kevin.jar`         | JVM 21+ |
| Go      | `kevin-<os>-<arch>` | none    |
| Rust    | `kevin-<os>-<arch>` | none    |
| C / C++ | `kevin-<os>-<arch>` | libc    |

All artifacts come from the rolling release
[`app-headless-kevin-latest`][release], and the data files are interchangeable
across ports.

## Verifying

Each release attaches a `checksums.txt` and a detached signature.

```sh
curl -LO https://github.com/hieudoanm/hieudoanm.github.io/releases/latest/download/checksums.txt
shasum -a 256 -c checksums.txt
```

## Building from source

```sh
git clone https://github.com/hieudoanm/hieudoanm.github.io
cd packages/app/headless/kevin/languages/kotlin
make build
```

[clikt]: https://github.com/ajalt/clikt
[mordant]: https://github.com/ajalt/mordant
[compose]: https://www.jetbrains.com/compose-multiplatform/
[release]: https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/app-headless-kevin-latest

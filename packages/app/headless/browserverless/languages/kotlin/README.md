# Browserverless (Kotlin)

Kotlin port of the browserverless headless rendering service, exposing the
rendering engine over the [Model Context Protocol](README.md#mcp) on stdio.

## Why this port renders over HTTP

The engine is Servo, which this repository embeds natively in Rust. There is no
JVM embedding of it, and shipping a second engine here would violate the
Servo-only rule in `../../../../AGENTS.md`. So the Kotlin port renders by
proxying a running `browserverless serve`, exactly as the Go port's `--addr`
mode does. There is no stub fallback: if the engine is not reachable, a tool
call fails loudly.

```bash
# Terminal 1 — the engine (Rust port)
cargo run --manifest-path ../../rust/Cargo.toml -p browserverless-cli -- serve --bind 127.0.0.1:8080

# Terminal 2 — the MCP server
./gradlew installDist
./build/install/browserverless/bin/browserverless mcp serve --addr http://127.0.0.1:8080
```

## MCP

`mcp serve` speaks newline-delimited JSON-RPC 2.0 over stdio. Requests are read
from stdin; every reply is written as a single line to stdout, and diagnostics
go to stderr so they can never corrupt the protocol stream.

| Tool | Arguments | Result |
| --- | --- | --- |
| `browserverless_scrape` | `url`, optional `timeout_ms` | text block with the page's final URL, title, HTML, and request cost |
| `browserverless_screenshot` | `url`, optional `timeout_ms` | a text summary plus a base64 `image/png` block |
| `browserverless_version` | none | the server name and version |

`timeout_ms` overrides `--timeout` for that call; `0` means "use the server
default". A missing `url`, a negative or oversized `timeout_ms`, and any
non-`http`/`https` scheme come back as tool errors (`isError: true`) so the
model can correct the call, rather than as JSON-RPC errors. A render failure is
likewise a tool error, never a protocol error.

Only `http` and `https` are accepted. A client-supplied URL is not otherwise
restricted, so this mode will render private addresses if asked to.

Frames are capped at 8 MiB and the reader resynchronises on the next newline,
so an oversized frame cannot exhaust the heap or be executed as a second
command. A JSON-RPC request without an `id` is a notification and is never
answered, and a string id of `"null"` is treated as a real id rather than a
notification.

## Build

```bash
./gradlew build          # compile and test
./gradlew compileKotlin  # compile only
```

The reported version comes from `browserverless.version` in `gradle.properties`;
Gradle generates `Version.kt` and `McpVersion.kt` from it, so the CLI and the MCP
server can never report different values.

## Layout

```text
src/main/kotlin/io/github/hieudoanm/browserverless/
├── Main.kt                 CLI entry point and command tree
├── cli/McpCommand.kt       `mcp serve` and its flags
└── mcp/
    ├── Protocol.kt         JSON-RPC and MCP wire types
    ├── Transport.kt        bounded newline-delimited frame reader
    ├── Server.kt           request dispatch and response framing
    ├── Tools.kt            the three tool schemas
    ├── Handlers.kt         argument validation and result shaping
    ├── Renderer.kt         the rendering contract
    └── HttpRenderer.kt     proxy to a running `browserverless serve`
```

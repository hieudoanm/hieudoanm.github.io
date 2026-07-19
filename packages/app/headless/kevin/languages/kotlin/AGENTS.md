# AGENTS.md — KeVIN (Kotlin)

Conventions for this package. Match the Go, Rust, C and C++ ports where they
overlap; the protocol and manager behaviour are deliberately identical.

## Stack

| Concern     | Library                                            |
| ----------- | -------------------------------------------------- |
| CLI         | Clikt 5.1.0                                        |
| TUI         | Mordant 3.1.0                                      |
| GUI         | Compose Multiplatform (desktop) 1.12.1, Material 3 |
| Persistence | kotlinx-serialization-json 1.11.0                  |
| Concurrency | coroutines 1.11.0, `java.util.concurrent` locks    |
| Tests       | kotlin-test on JUnit Platform, JaCoCo              |

## Layout

```txt
src/main/kotlin/io/github/hieudoanm/kevin/
├── Main.kt              entry point, wires Clikt
├── cli/                 ServeConfig, ServeRunner, ServeSession, commands
├── db/                  Db, Ttl, JSON snapshot save/load
├── gui/                 GuiState, GuiController, Compose UI
├── mcp/                 Protocol, Schema, Server, Store, Session, tools
├── server/              Tokens, Handler, Server
└── tui/                 TuiState, TuiReducer, Render, terminal loop
```

- `db` and `server` hold the wire behaviour and have no UI dependencies.
- `tui` and `gui` are two front ends over one `Db`; neither may duplicate
  filtering, sorting or edit rules.
- `--tui` and `--gui` are mutually exclusive; the TCP server runs either way.
- `mcp` depends on `db` only. It never imports `tui` or `gui`.

## MCP server

`kevin mcp serve` speaks newline-delimited JSON-RPC 2.0 on stdin/stdout, with
no MCP SDK dependency. Keep these invariants:

- Protocol version `2025-11-25`, server name `kevin-mcp`, version `1.0.0`.
- Tools are `kevin_ping`, `kevin_set`, `kevin_get`, `kevin_del`,
  `kevin_exists`, `kevin_keys`, `kevin_len`, `kevin_ttl`, `kevin_expire` and
  `kevin_flush`. `tools/list` is sorted by name.
- A tool failure is a result with `isError: true` and a readable message. Only
  parse errors, unknown methods and unknown tools use JSON-RPC error codes.
- Notifications get no reply, so an absent or `null` `id` must return `null`
  from `McpServer.handle`.
- stdout carries protocol frames only. Logging goes to stderr.
- `Store` is the seam: `DbStore` wraps `Db` in-process, `TcpStore` proxies a
  running server. `Session` picks one and owns the snapshot lifecycle.
- `--addr` and `--data` are mutually exclusive; `Session.open` enforces it with
  `require`, and `McpServeCommand` rejects the pair with a `UsageError`.
- The inline TCP protocol is whitespace-tokenised, so `TcpStore` rejects keys
  and values containing spaces or newlines. The in-process store has no such
  limit.
- TTL states are `missing`, `no-expiry` and `expiring`; remaining seconds round
  up. `kevin_expire` applies the TTL with `EXPIRE` over TCP and a negative
  result maps to `ok: false`.

## Kotlin style

- `val` over `var`; `var` only for genuinely mutable locals.
- `when` over chained `if`/`else`, including `when (event)` dispatch.
- `require`/`check` for programmer errors; plain exceptions at the edges.
- Explicit imports only, never `*`.
- Extension functions for the operations that belong to a receiver, e.g.
  `Db.save(path)` and `TuiState.reload(kv)`.
- Files stay under 200 lines and functions under 30.
- Immutable data classes for state plus a reducer that returns new instances;
  never mutate state in place from the UI layers.
- Constructor injection over service locals, e.g. `Db(now = ::currentTimeMillis)`
  so tests can control expiry without sleeping.
- Keep `internal` for anything the tests need but the API should not expose.

## Parity rules

These must match the Go and Rust ports exactly, including error strings:

- `SET key value [EX seconds]` splits on a case-insensitive `" EX "` and stores
  everything before it. Non-positive or unparsable seconds reply
  `ERR invalid expire time`.
- `SET` without `EX` clears any existing expiry; `SET ... EX` sets one.
- `TTL` returns `-1` for a persistent key and `-2` for a missing or expired one,
  and rounds a live lifetime up.
- Expiry is `expiry <= now`, so a key is expired the instant its deadline passes.
- `KEYS` returns insertion order; the managers sort.
- Commands are case-insensitive; blank lines produce no reply.
- Token splitting is on single spaces, mirroring the C `strtok_r` reference.

## Persistence

- JSON keys are `data` and `expires`; `expires` is omitted when empty.
- Expiry timestamps are epoch milliseconds.
- Writes go to `<path>.tmp` then an atomic rename; the file is `rw-------`.
- A missing file on load is a no-op, not an error.
- Keys already expired when the snapshot loads are dropped.

## Terminal UI

- Mordant 3.x reports [MDN `KeyboardEvent.key`][mdn] values: `"Enter"`,
  `"Tab"`, `"Backspace"`, `"ArrowUp"`, `" "`, and letters with `ctrl`/`shift`
  flags. It does **not** use Bubble Tea names such as `up` or `space`.
- Redraw with `terminal.cursor.move { clearScreenBeforeCursor() }` plus
  `rawPrint`, and `\r\n` line endings because raw mode disables `ONLCR`.
- The loop is `draw -> readKeyOrNull(timeout) -> reduce`; a `null` key becomes
  `TuiEvent.Reload` so external clients show up without a keystroke.
- `Render.frame` returns plain text so it can be asserted in tests; keep ANSI
  out of it.

## Desktop UI

- Hoist state into a `MutableState<GuiState>` above `Window` so the title can
  follow the key count; there is no `LocalWindow` in this Compose version.
- Wrap the clipboard as `{ text -> clipboard.setText(AnnotatedString(text)) }`;
  `setText` does not take a `String`.
- `KevinContent` owns the reducer so the real clipboard is always wired, and
  reports new state through `onState`.

## Testing

- Test behaviour, not implementation details.
- Cover the error strings, because they are part of the protocol contract.
- Use an injected clock for anything involving expiry.
- `ServeRunner` takes the GUI and TUI launchers as lambdas, so tests bind port
  `0` and assert against the real socket instead of stubbing the server.
- `ServeSession.port` reports the _bound_ port, which is what a test needs when
  the configured port is `0`.
- A test that injects a TUI or GUI launcher must also set the matching `tui` or
  `gui` config flag. Otherwise `ServeRunner` takes the `thread.join()` branch and
  the test hangs until the suite times out.
- Clikt 5's `test()` takes the arguments *after* the command name and never
  throws: assert on `statusCode` and `stderr`. Use the `test(arrayOf(...))`
  overload, because `test("a", "b")` silently binds `"b"` to the `stdin`
  parameter instead of treating it as an argument.
- MCP store behaviour is covered once by `StoreContractTest` and run against
  both `DbStore` and `TcpStore`, so a new `Store` only needs one contract run.
- Writing to a test socket must flush, not close, the buffered writer: closing
  the output stream shuts the socket down before the replies arrive.

## Build notes

- `settings.gradle.kts` needs `google()`; Compose resolves
  `androidx.lifecycle` and `androidx.savedstate` from there.
- Compose DSL accessors only resolve when used inline in `dependencies {}`.
  Collecting them into a top-level `listOf(...)` breaks resolution.
- The GUI is always in the artifact. Unlike the Go port, which needs CGO and a
  `-tags gui` build, Compose Desktop is an ordinary dependency, so there is no
  "GUI not compiled in" path to reproduce.

## Commands

```sh
make test
make build
make coverage
./gradlew run --args="serve --tui"
./gradlew run --args="mcp serve"
```

[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values

# Architecture

KeVIN is a small Redis-style store. This port keeps the same wire protocol and
manager behaviour as the C, C++, Go and Rust ports, expressed in idiomatic
Kotlin.

## Layers

```txt
        ┌────────────┐   ┌────────────┐
        │ cli (Clikt)│   │ tui/gui    │   managers, share one Db
        └─────┬──────┘   └─────┬──────┘
              │                │
        ┌─────▼────────────────▼─────┐
        │          server            │  Tokens -> Handler -> Server
        └─────────────┬──────────────┘
                      │
                ┌─────▼─────┐
                │    Db     │  concurrent map + per-key expiry
                └─────┬─────┘
                      │
                ┌─────▼─────┐
                │  Persist  │  JSON snapshot, temp file + rename
                └───────────┘
```

The dependency arrows only point downward. `db` and `server` know nothing about
the UI, so the protocol and the store can be tested with no terminal and no
window.

## `db`

`Db` is a `ReentrantReadWriteLock` guarding two `LinkedHashMap`s: `data` and
`expires` (epoch milliseconds). Reads take the read lock; anything that may
discard an expired key takes the write lock.

`now` is injected as `() -> Long`, defaulting to `System::currentTimeMillis`.
That is the only reason the tests need no sleeps.

Expiry is `expiry <= now`, so a key dies the instant its deadline passes.
`get`, `exists` and `ttl` each remove an expired key as a side effect, which is
what keeps `len()` and `keys()` honest.

`keys()` returns insertion order. The managers sort; the server does not,
matching the other ports.

## `server`

`Tokens.kt` splits a line on single spaces, mirroring the C reference's
`strtok_r`. The other ports use the same splitter, so oddities like `SET a
b  EX 5` storing `b` are intentional.

`Handler.kt` is a pure `handleLine(line, kv): Reply`. `Reply.shouldReply` is
false only for blank lines. The error strings are protocol, not diagnostics.

`Server.kt` accepts on a bound `ServerSocket` and handles each connection on its
own daemon thread. `shutdown()` closes the socket, which unblocks `accept`.

## `cli`

Clikt parses options; `ServeRunner` does the work. The split lets the tests
drive a real server with port `0` and substitute only the manager launchers:

```kotlin
ServeRunner(config, kv, logger, tuiLauncher = { session -> session.port })
```

`ServeRunner.run()` loads the data file, binds the socket, starts the server
thread, installs a shutdown hook, runs the requested manager (or joins the
server thread), then saves and shuts down.

## `tui`

Three pieces, split so the interesting logic is testable:

- `TuiState` / `TextField` — immutable state.
- `TuiReducer.reduce(state, event, kv)` — every transition, including the
  keybindings. No terminal access.
- `Render.frame(state, kv)` — pure text. Kept free of ANSI so tests can assert
  on it.
- `Tui.kt` — the raw-mode loop: draw, read with a timeout, reduce.

Mordant reports MDN `KeyboardEvent.key` names, not Bubble Tea names, so
`up` is `ArrowUp` and `space` is `" "`. See AGENTS.md.

A `null` key from the timeout becomes `TuiEvent.Reload`, so a `redis-cli` write
shows up in the table without the user pressing a key.

The caret is drawn as a `^` inside the focused field. In raw mode
`clearScreenBeforeCursor` would otherwise erase the frame, so a real hardware
cursor is not usable here.

## `gui`

The same split: `GuiState`, `GuiController.reduce`, and `KevinContent` as a
pure composable over `(state, kv, onState)`. `DesktopGui.kt` owns the window and
polls the store so external clients appear without a refresh click.

The title is derived from `state.count` and hoisted above `Window`; this Compose
version has no `LocalWindow`.

## `persist`

A `@Serializable Snapshot` of `data` and `expires`, pretty-printed. `expires`
carries `@EncodeDefault(NEVER)` so it is omitted when empty, matching the other
ports' `omitempty`.

`save` writes `<path>.tmp` with `rw-------` and then does an atomic rename, so a
crash mid-write cannot leave a truncated file. `load` treats a missing file as
a no-op and drops keys that expired before the snapshot was written.

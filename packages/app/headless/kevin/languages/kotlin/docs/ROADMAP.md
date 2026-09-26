# Roadmap

KeVIN is deliberately small: one store, one protocol, two managers. The
interesting work is keeping the five ports behaving identically.

## Done

- `PING`, `SET` (with `EX`), `GET`, `KEYS`, `DEL`, `EXISTS`, `LEN`, `FLUSHALL`,
  `FLUSHDB`, `EXPIRE`, `TTL`
- Atomic JSON persistence with a temp file and rename
- Clikt CLI, Mordant TUI, Compose desktop GUI
- Unit tests over the store, the protocol, both managers and the CLI

## Next

- Port every behaviour change across C, C++, Go, Rust and Kotlin in one commit
- Interactive reply for `--data` on shutdown failure
- Optional `CONFIG`/`COMMAND INFO` for client discovery, once the other ports
  agree on the shape
- Release signing and checksum automation for the jar

## Not planned

- Replication, clustering or persistence beyond a single JSON file
- A Lua interpreter or transactions
- Wire protocol compatibility with real Redis beyond the commands above

The point is a readable reference implementation of a small store, not a
Redis replacement. Anything that would make the ports harder to keep in sync is
out of scope.

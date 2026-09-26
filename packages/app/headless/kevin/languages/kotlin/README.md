# KeVIN (Kotlin)

> A Redis-style in-memory key/value store on the JVM — the same PING, SET, GET,
> KEYS, DEL protocol as the C, C++, Go and Rust implementations, with a Clikt
> CLI, a Mordant TUI and a Compose Multiplatform desktop GUI.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-JVM--21-blue)
![Kotlin](https://img.shields.io/badge/kotlin-2.4-blue)

---

## Latest release

CI builds and publishes the JVM artifacts on every push to the same rolling
release as the C and C++ builds:

- **Release:** `app-headless-kevin-latest`
- See [PACKAGING](docs/PACKAGING) for the pipeline and [ROADMAP](docs/ROADMAP)
  for what's next.

---

## Installation

```sh
git clone https://github.com/hieudoanm/hieudoanm.github.io
cd packages/app/headless/kevin/languages/kotlin
make install
```

The launcher is written to `$HOME/bin/kevin`. Requires a JDK 21 runtime.

---

## Usage

```sh
kevin serve                         # TCP server on 0.0.0.0:6379
kevin serve --port 7000             # custom port
kevin serve --bind 127.0.0.1        # custom bind address
kevin serve --data kevin.json       # persist to a JSON file
kevin serve --tui                   # key/value manager TUI
kevin serve --gui                   # key/value manager GUI
```

`--tui` and `--gui` are mutually exclusive. Both managers run alongside the TCP
server and share the same store, so you can edit keys in the manager while
clients talk to the server.

---

## Protocol

Line-based over TCP, one command per line:

| Command                    | Reply                                  | Notes                            |
| -------------------------- | -------------------------------------- | -------------------------------- |
| `PING`                     | `PONG`                                 |                                  |
| `SET key value`            | `OK`                                   | overwrites and clears any expiry |
| `SET key value EX seconds` | `OK`                                   | expires the key                  |
| `GET key`                  | value or `(nil)`                       |                                  |
| `KEYS`                     | keys joined by spaces                  | insertion order                  |
| `DEL key [key ...]`        | number deleted                         |                                  |
| `EXISTS key`               | `1` or `0`                             |                                  |
| `LEN`                      | key count                              |                                  |
| `FLUSHALL`, `FLUSHDB`      | `OK`                                   | removes every key                |
| `EXPIRE key seconds`       | `1` or `0`                             |                                  |
| `TTL key`                  | seconds, `-1` persistent, `-2` missing | rounds up                        |

Blank lines are ignored. Commands are case-insensitive.

```sh
$ printf 'SET name kevin\r\nGET name\r\n' | nc localhost 6379
OK
kevin
```

---

## Managers

`--tui` and `--gui` both present the same key/value manager.

- Search/filter across keys and values
- Set, edit, delete one key, or delete all keys
- Copy a value to the clipboard (GUI)
- Live key count in the window/tab title and a status line

TUI bindings: `tab` cycles focus, `enter` sets or edits, `↑`/`↓` move, `d`
deletes, `D` deletes everything (twice to confirm), `r` refreshes, `q` quits.

---

## Persistence

`--data <path>` loads the store at startup and writes it back on shutdown. The
file is a JSON snapshot:

```json
{
  "data": { "name": "kevin" },
  "expires": { "session": 1767225600000 }
}
```

`expires` holds epoch milliseconds and is omitted when no key expires. Writes go
to a temp file and are renamed into place, so a crash never leaves a partial
file. Expired keys are dropped when the snapshot loads.

---

## Development

```sh
make test       # unit tests
make build      # bin/kevin.jar
make coverage   # HTML coverage report
make clean
```

See [CONTRIBUTING](docs/CONTRIBUTING) for the conventions and
[ARCHITECTURE](docs/ARCHITECTURE) for the module layout.

---

## License

GPL-3.0 — see [LICENSE](LICENSE).

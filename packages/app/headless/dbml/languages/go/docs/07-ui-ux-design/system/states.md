# dbml (Go) — Design System: States

The consolidated design doc requires explicit loading, empty, validation-error, network-error, unexpected-error, and success states. dbml is a single-shot conversion tool, so most states are terminal and synchronous. This page maps each required state to actual behaviour in the code.

## 1. State matrix

| State             | CLI                                                                 | HTTP                                             | MCP                                              |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| Success           | `Generated <what>: <path>` on stdout, exit 0                         | `200` with requested format fields               | JSON-RPC `result` with text content              |
| Loading           | Not applicable — conversion is synchronous                           | Not applicable — synchronous handler             | Not applicable — one request, one response        |
| Empty input       | Empty project renders valid (if minimal) output                      | `400` `{"error": "dbml field is required"}`      | error `-32603` "dbml argument is required"        |
| Validation error  | `dbml: parse DBML: ...` on stderr (exit status 0)                   | `400` `{"error": "parse error: ..."}`            | error `-32603` "parse DBML: ..."                  |
| Network/I/O error | `dbml: parse DBML: open file: ...` / `dbml: write output: ...`      | `400` when the request body cannot be read       | input stream errors end the session               |
| Unexpected error  | Message on stderr (exit status 0)                                   | Not emitted by current handlers (see §4)         | error `-32603` for tool failures                  |

## 2. CLI states

- **Success** — one line per written artifact, on stdout, naming the path. Exit 0.
- **Error** — one actionable line on stderr, prefixed `dbml: `, wrapped with context (`parse DBML:`, `write output:`, `create output dir:`). `Execute()` in `cmd/root.go` returns 1, but `main.go` discards the value, so the process exits 0 even on failure — detect it from stderr. `SilenceUsage` keeps usage text out of the error state; usage appears only on explicit `--help`.
- **Long-running states** — only `serve` and `mcp serve` stay alive. `serve` prints the startup box before blocking on the listener; `mcp serve` blocks silently on stdin. SIGINT/SIGTERM print `Shutting down server...` and exit 0.

## 3. HTTP and MCP states

- **Success** — `200` JSON. When `formats` is omitted, the server defaults to `sql` + `mermaid`; `svg` is included only when requested. Unrequested fields are omitted (`omitempty`).
- **Empty input** — an empty `dbml` string is a client error on every convert endpoint, not an empty result.
- **Parse failure** — the parse error message is forwarded to the client inside the error envelope, prefixed `parse error:`. No stack traces or file paths are exposed.
- **MCP framing** — malformed JSON lines get `-32700 parse error`; unknown methods with an `id` get `-32601 method not found: <method>`; `notifications/*` get no response at all (per JSON-RPC 2.0).

## 4. Honest gaps

- `docs/06-api-specification.md` defines structured error codes (`VALIDATION_ERROR`, `INVALID_DBML`, `INTERNAL_ERROR`, `SERVICE_UNAVAILABLE`) and a `503` path. The handlers in `internal/server/server.go` currently emit only `400` with a flat `error` string; `500`/`503` responses are specified but not implemented. Treat the table above as the implemented truth and §4 of the API spec as the target contract.
- Empty DBML *content* vs. empty DBML *project* differ: `Table`-less input parses fine and produces empty-but-valid SQL/Mermaid/SVG (verified by `TestToSVGEmptyProject`). Only a missing/blank field is an error.

## Cross-references

- UI/UX overview: [`../07-ui-ux-design.md`](../../07-ui-ux-design.md)
- API status codes and error envelope: [`../06-api-specification.md`](../../06-api-specification.md)
- Error-handling rules: [`../04-architecture.md`](../../04-architecture.md)
- Critical test scenarios for these states: [`../../09-testing-strategy/05-critical-test-scenarios.md`](../../09-testing-strategy/05-critical-test-scenarios.md)

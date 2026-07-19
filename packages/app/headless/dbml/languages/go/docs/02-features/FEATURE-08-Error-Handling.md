# dbml (Go) — FEATURE-08: Error Handling

Cross-cutting behaviour: how dbml reports failures on every transport. Required for MVP ([`02-features.md`](../02-features.md) §4). dbml is a software demonstration, not a full database modeling tool.

## 1. User-visible behaviour

- Errors are actionable: they say what failed, which file or request was involved, and enough context to fix it ([`README.md`](../README.md), contributing conventions; [`04-architecture.md`](../04-architecture.md) §8.1).
- **CLI** — one line on stderr prefixed `dbml: `, no usage dump (`SilenceUsage`/`SilenceErrors`). Errors are wrapped at the failure site: `parse DBML: ...`, `write output: ...`, `create output dir: ...`, `write SQL|Mermaid|SVG: ...`. The process does not exit non-zero — see the exit-status gap in §5.
- **HTTP** — HTTP 400 with `{"error": "<message>"}` for rejected requests; successful conversions never mix an error field into a 200 body.
- **MCP** — JSON-RPC 2.0 error objects with `code` and `message` on the failing response id; the loop keeps serving subsequent requests.

## 2. Inputs (what can fail)

| Failure | Transport that surfaces it |
| ------- | -------------------------- |
| Input file missing or unreadable | CLI (`parse DBML: open file: ...`) |
| Scanner failure (e.g. oversized line) | CLI (`scan error: ...`), HTTP (`parse error: ...`) |
| Missing `dbml` field / empty body | HTTP 400 `dbml field is required` |
| Malformed JSON or multipart request | HTTP 400 with the decode or multipart message |
| Output path not writable / dir creation fails | CLI (`write output: ...`, `create output dir: ...`) |
| Blank `dbml` argument, unknown tool | MCP `-32603` |
| Invalid JSON-RPC frame or params | MCP `-32700` / `-32602` |
| Unknown method | MCP `-32601` |

## 3. Outputs

- CLI: `dbml: <wrapped error>` on stderr (the exit status is 0 even on failure — see §5); any artifacts already written by a partially completed `dbml all` remain (files are written in order and a failure stops the run).
- HTTP: status plus JSON `error` string; responses never expose filesystem paths ([`06-api-specification.md`](../06-api-specification.md) §1).
- MCP: `{code, message}` error objects (`-32700`, `-32601`, `-32602`, `-32603`) matching [`04-architecture.md`](../04-architecture.md) §8.3.
- Logs: transport-level failures (e.g. an unencodable MCP response) go to structured slog output on stderr.

## 4. States

Any non-terminal conversion state may move to `error`, and `error` is terminal — no partial output is presented as success ([`05-data-model.md`](../05-data-model.md) §5). A failure before generation means no generator runs; a failure while writing means the message names the artifact that failed.

## 5. Edge cases

- **Tolerant parsing** — the line parser skips constructs it cannot classify, so some malformed DBML produces a partial schema and a successful run rather than an error (FEATURE-01). Actionable-error guarantees apply to unreadable input and transport-level validation; grammar-level strictness is a known limitation, not a documented guarantee.
- **Error envelope vs. implementation** — `06-api-specification.md` §4 defines a `code`/`message`/`details` envelope with `VALIDATION_ERROR`, `INVALID_DBML`, `INTERNAL_ERROR`, and `SERVICE_UNAVAILABLE`; the current server returns only the flat `{"error":"message"}` string and has no 500/503 code path.
- **Paths in messages** — CLI errors include the input path (required for actionability); HTTP and MCP errors derive from request content and the parser, so they carry no server-side paths.
- **No secrets or internals** — messages contain the failing operation and input detail only; no stack traces, environment, or configuration are emitted.
- **Exit-status gap** — every CLI failure prints its `dbml: ...` line but the process still exits 0, because `main.go` discards the return value of `cmd.Execute()`; Cobra argument errors behave the same. Scripts and CI must detect failure from stderr, not the exit code. `serve` exits 0 on SIGINT/SIGTERM after its shutdown line.
- **Duplicate messages** — not applicable; conversion is single-shot ([`04-architecture.md`](../04-architecture.md) §8.1).

## 6. Acceptance conditions

- `dbml sql missing.dbml` prints a single stderr line beginning `dbml: parse DBML: open file:` naming `missing.dbml` (the process still exits 0 — see §5) (US-008, US-010).
- `dbml all` into an unwritable directory prints `dbml: create output dir: ...` or `dbml: write ...: ...` on stderr.
- `POST /api/v1/convert` without content returns 400 with a JSON `error` field and no filesystem path in the message (US-006, US-008).
- An invalid JSON-RPC line to `dbml mcp serve` returns `-32700` and the server continues serving the next line (US-007).
- Error-path behaviour is covered by table-driven tests, and no critical error-handling issue remains open at release ([`02-features.md`](../02-features.md) §3, [`09-testing-strategy.md`](../09-testing-strategy.md)).

## Cross-references

- Requirements: [`../01-requirements.md`](../01-requirements.md) · [`FR-011`](../01-requirements/functional-requirements.md)
- Feature index: [`02-features.md`](../02-features.md)
- Sibling features: [`FEATURE-01-DBML-Parsing.md`](./FEATURE-01-DBML-Parsing.md) · [`FEATURE-05-CLI-Commands.md`](./FEATURE-05-CLI-Commands.md) · [`FEATURE-06-HTTP-Server.md`](./FEATURE-06-HTTP-Server.md) · [`FEATURE-07-MCP-Server.md`](./FEATURE-07-MCP-Server.md)
- User stories: [`03-user-stories.md`](../03-user-stories.md) — US-008, US-010
- Architecture: [`04-architecture.md`](../04-architecture.md)
- API specification: [`06-api-specification.md`](../06-api-specification.md)

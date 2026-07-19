# dbml (Go) — FEATURE-07: MCP Server

`dbml mcp serve` exposes the conversion tools to Model Context Protocol clients over stdio. Priority: **P1** (enhancement, [`README.md`](../README.md) §4). dbml is a software demonstration, not a full database modeling tool.

## 1. User-visible behaviour

- The server reads JSON-RPC 2.0 requests, one JSON object per line, from stdin and writes one JSON object per line to stdout; blank lines are ignored and stdout carries protocol traffic only (logging goes to stderr).
- Implemented methods: `initialize` (returns protocol version `2024-11-05`, `tools` capability, and `serverInfo` `{name: "dbml", version: "1.0.0"}`), `ping`, `tools/list`, and `tools/call`.
- `tools/list` advertises four tools — `dbml_sql`, `dbml_mermaid`, `dbml_svg`, and `dbml_parse` — each with an input schema requiring a single `dbml` string property.
- `tools/call` runs the requested tool and returns `{"content":[{"type":"text","text":"..."}]}` with the generated SQL, Mermaid, SVG, or JSON schema summary.
- `dbml_parse` returns an indented JSON summary: project `name`, `tables` (name plus column names), `enums`, and `references`.
- `notifications/*` requests are accepted and receive no response.
- The server runs until stdin is exhausted or the process receives SIGINT/SIGTERM.

## 2. Inputs

| Input | Notes |
| ----- | ----- |
| `initialize`, `ping`, `tools/list`, `tools/call` | JSON-RPC 2.0 methods, one per line |
| `arguments.dbml` for `tools/call` | required DBML source string; empty or whitespace-only → error |
| Line length | buffered up to 64 MiB per line |
| Launch | `dbml mcp serve` (`cobra.NoArgs` on `serve`) |

Client configuration (from [`README.md`](../README.md)):

```json
{ "mcpServers": { "dbml": { "command": "dbml", "args": ["mcp", "serve"] } } }
```

## 3. Outputs

| Result | Shape |
| ------ | ----- |
| `initialize` | `protocolVersion`, `capabilities.tools.listChanged: false`, `serverInfo` |
| `tools/list` | tool array with `name`, `description`, `inputSchema` |
| `tools/call` success | `content` array with one `text` item |
| `tools/call` failure | JSON-RPC error object with `code` and `message` |

The `text` payloads are byte-identical to what the CLI and HTTP transports produce for the same input: handlers call the same `internal/dbml` parser and generators ([`04-architecture.md`](../04-architecture.md) §4.4).

## 4. States

The transport is a single loop: `start → initialize → ready → tools/list | tools/call* → stop`, where `stop` happens on stdin EOF or context cancellation (SIGINT/SIGTERM) ([`05-data-model.md`](../05-data-model.md) §5 applies per request: `idle → parsing → generated → complete`, else `error`). There is no session state between requests.

## 5. Edge cases

- **Invalid JSON line** — JSON-RPC error `-32700` (`parse error`); the loop continues.
- **Unknown method with an id** — error `-32601` (`method not found: <method>`); unknown notification-style methods (no `id`) get no response.
- **Malformed `tools/call` params** — error `-32602` (invalid params).
- **Missing or whitespace-only `dbml` argument** — error `-32603` with `dbml argument is required`.
- **Unparseable DBML** — error `-32603` with `parse DBML: <details>`.
- **Unknown tool name** — error `-32603` with `unknown tool: <name>`.
- **Oversized line** — a line beyond the 64 MiB buffer fails the scanner and ends the server.
- **No `formats` argument** — each tool implies exactly one output; format selection is an HTTP-only concept (FEATURE-06).

## 6. Acceptance conditions

- An `initialize` request receives the documented `protocolVersion` and `serverInfo`; `tools/list` returns exactly the four documented tools (MVP-adjacent contract, [`04-architecture.md`](../04-architecture.md) §4.4).
- `tools/call` with `dbml_sql` on `Table users { id integer [pk] }` returns text containing `CREATE TABLE users` and `PRIMARY KEY`.
- The same DBML through `dbml_sql`, `dbml_mermaid`, and `dbml_svg` matches the CLI output for that input.
- `dbml_parse` returns valid JSON listing the parsed tables, enums, and references.
- Protocol errors use the documented JSON-RPC codes and never terminate the loop (except transport-level failures); handler behaviour is covered by table-driven tests ([`09-testing-strategy.md`](../09-testing-strategy.md)).

## Cross-references

- Requirements: [`../01-requirements.md`](../01-requirements.md) · [`FR-010`](../01-requirements/functional-requirements.md)
- Feature index: [`02-features.md`](../02-features.md)
- Sibling features: [`FEATURE-05-CLI-Commands.md`](./FEATURE-05-CLI-Commands.md) · [`FEATURE-08-Error-Handling.md`](./FEATURE-08-Error-Handling.md)
- User stories: [`03-user-stories.md`](../03-user-stories.md) — US-007
- Architecture: [`04-architecture.md`](../04-architecture.md)
- API specification: [`06-api-specification.md`](../06-api-specification.md)

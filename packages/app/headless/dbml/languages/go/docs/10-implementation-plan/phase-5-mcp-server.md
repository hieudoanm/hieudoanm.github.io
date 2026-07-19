# dbml (Go) — Phase 5: MCP Server

## Goal

Expose the conversion tools to LLM clients through the Model Context Protocol, over JSON-RPC 2.0 on stdio.

Status: implemented (listed under "Implemented" in [`docs/README.md`](../README.md) §8, snapshot 2026-10-17).

## Deliverables

| Deliverable | Location |
| ----------- | -------- |
| `mcp serve` command | `cmd/mcp.go` |
| JSON-RPC 2.0 transport over stdio | `internal/mcp/protocol.go` |
| Tool catalogue and handlers | `internal/mcp/tools.go` |
| Tool tests | `internal/mcp/tools_test.go` |

## Tools

| Tool | Purpose |
| ---- | ------- |
| `dbml_sql` | Convert DBML to PostgreSQL DDL |
| `dbml_mermaid` | Convert DBML to Mermaid `erDiagram` syntax |
| `dbml_svg` | Convert DBML to an SVG diagram |
| `dbml_parse` | Parse DBML and return a structural summary (tables and columns) |

## Transport

- `dbml mcp serve` reads JSON-RPC 2.0 requests from stdin and writes responses to stdout; no port is opened and no HTTP server is involved.
- `SIGINT`/`SIGTERM` are handled via `signal.NotifyContext`, so the server exits cleanly when the client disconnects or the process is signalled.
- The MCP layer calls the same parser and generators as the CLI and HTTP transports; it contains no conversion logic of its own (separation of parsing, generation, and transport in `AGENTS.md`).

## Acceptance criteria

- [ ] An MCP client can invoke each tool and receive the expected output format.
- [ ] Malformed JSON-RPC requests return an error response rather than terminating the process.
- [ ] The stdio transport writes nothing but protocol frames to stdout (logs do not corrupt the stream).
- [ ] Tool behaviour matches the CLI and HTTP outputs for the same input.

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- API specification: [`06-api-specification.md`](../06-api-specification.md)
- Architecture: [`04-architecture.md`](../04-architecture.md)

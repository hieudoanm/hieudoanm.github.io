# dbml (Go) — Design System: Screens

The consolidated design doc lists Home, Convert, and Result as screen concepts. dbml ships no web app, so each concept maps to a real surface: CLI screens, HTTP responses, and the Swagger UI page. This page defines every screen a user can actually land on.

## 1. Screen inventory

| # | Screen                        | Surface | Entry point                              |
| - | ----------------------------- | ------- | ---------------------------------------- |
| 1 | Help / version                | CLI     | `dbml --help`, `dbml <cmd> --help`, `-v` |
| 2 | Convert success (single)      | CLI     | `dbml sql|mermaid|svg <file>`            |
| 3 | Convert success (all formats) | CLI     | `dbml all <file> --output-dir <dir>`     |
| 4 | Convert error                 | CLI     | any command, bad input or I/O failure    |
| 5 | Server startup box            | CLI     | `dbml serve --port <port>`               |
| 6 | API docs (Swagger UI)         | HTTP    | `GET /api/v1/docs`                       |
| 7 | API result / error / health   | HTTP    | `GET|POST /api/v1/...`                   |
| 8 | MCP session                   | stdio   | `dbml mcp serve`                         |

## 2. CLI screens

**Help (1).** Cobra renders usage from each command's `Short`/`Long` text in `cmd/`. The root long text lists every example invocation. `SilenceUsage`/`SilenceErrors` are set, so help appears only when asked for — never as an error side-effect.

**Convert success (2, 3).** One confirmation line per artifact on stdout, naming the file written. `all` prints three lines (SQL, Mermaid, SVG) after creating the output directory. No spinner or progress output: conversion is synchronous and sub-second.

**Convert error (4).** One actionable line on stderr in the form `dbml: <what failed>: <context>` (for example `dbml: parse DBML: open file: no such file or directory`), with an exit status of 0 even on failure (`main.go` discards `Execute()`'s return). See [`states.md`](states.md).

**Server startup box (5).** `cmd/box.go` prints a rounded Unicode box titled ` dbml Server ` with rows `Local`, `Network` (only when the host has a reachable interface), and `Docs` pointing at `/api/v1/docs`. URLs become clickable OSC 8 hyperlinks only when stdout is a terminal.

## 3. HTTP screens

**Swagger UI (6).** `GET /api/v1/docs` returns HTML that boots SwaggerUIBundle against `/api/v1/openapi.json` (served by `internal/server/openapi.go`). This is the closest thing to a rendered page dbml has; its layout is the vendor's, not ours.

**API responses (7).** Every endpoint answers with one of the JSON envelopes defined in [`layout.md`](layout.md) §4. Success is `200`; bad body, missing `dbml` field, and parse failures are `400` with the `error` field.

## 4. MCP session (8)

Not a visual screen: a line-delimited JSON-RPC 2.0 session over stdio. The "result screen" a client sees is the `tools/call` result envelope containing converted text. Framing is defined in `internal/mcp/protocol.go`.

## Cross-references

- UI/UX overview: [`../07-ui-ux-design.md`](../../07-ui-ux-design.md)
- API contract: [`../06-api-specification.md`](../../06-api-specification.md)
- Architecture (CLI, HTTP, MCP transports): [`../04-architecture.md`](../../04-architecture.md)
- States for each screen: [`states.md`](states.md)

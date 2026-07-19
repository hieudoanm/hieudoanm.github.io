# dbml (Go) — Design System: Components

The consolidated design doc lists buttons, file input, selects, and alerts — controls of a web form that does not exist. dbml's real component inventory is: SVG diagram primitives, CLI output patterns, and JSON envelopes. Each is defined in exactly one place in code.

## 1. SVG diagram components

All drawn by `internal/dbml/svg_draw.go` from the tokens in [`design-tokens.md`](design-tokens.md).

| Component        | Composition                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| **Table box**    | Dark header bar (`rx=6`, bold 13px white title) + column rows: name (11px), right-aligned SQL type (9px grey), optional `NOT NULL` suffix, 1px divider at mid-width |
| **Enum box**     | Same frame at `svgEnumW = 170`; rows are bare enum values; title prefixed `enum `                                |
| **Key badge**    | Bold 9px `PK`/`UK` in accent at row start, 26px reserved offset; PK rows get the `#f5f3ff` tint                  |
| **Zebra rows**   | Alternating `#ffffff` / `#f8fafc` fills for row scanning                                                        |
| **Reference link** | Cubic Bezier path, 1.6px `#7c3aed`, dot marker at start and arrow at end; routed edge-to-edge when boxes are side by side, through the row gap otherwise; skipped silently if either endpoint table is absent |
| **Canvas**       | Background `<rect>` sized to the grid bounding box + 48px margin                                                |

## 2. CLI components

| Component        | Definition                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| **Success line** | `Generated <what>: <path>` on stdout — one line per artifact (`cmd/sql.go`, `cmd/mermaid.go`, `cmd/svg.go`, `cmd/all.go`) |
| **Error line**   | `dbml: <what failed>: <context>` on stderr; exit status stays 0 (`main.go` discards `Execute()`'s return) |
| **Help text**    | Cobra-rendered from per-command `Short`/`Long` strings; examples block on the root command                    |
| **Serve box**    | Rounded Unicode frame, title ` dbml Server `, rows Local / Network / Docs; OSC 8 hyperlinks on real terminals only (`cmd/box.go`) |

## 3. HTTP / MCP envelopes

| Envelope          | Shape                                                        | Source                    |
| ----------------- | ------------------------------------------------------------ | ------------------------- |
| Convert response  | `{sql, mermaid, svg}` — omitted fields absent (`omitempty`)  | `internal/server/server.go` |
| Error envelope    | `{"error": "message"}` at 400                                | `writeError`              |
| Health response   | `{status: "ok", version: "dev"}`                             | `healthHandler`           |
| JSON-RPC response | `{jsonrpc, id, result | error:{code,message}}`, one per line | `internal/mcp/protocol.go`  |
| Tool result       | `{content: [{type: "text", text: ...}]}`                     | `toolResult`              |

## 4. Rules

- One owner per component: SVG drawing lives only in `svg_draw.go`, the CLI box only in `box.go`, envelopes only in their transport package. Do not re-declare a visual or envelope shape in a second place.
- Components compose from tokens, never from stray literals; a new colour or size goes through [`design-tokens.md`](design-tokens.md) first.
- Every component must stay legible as plain text or plain XML — see [`accessibility.md`](accessibility.md).
- Changing a component's output requires updating the assertions in the matching test (`internal/dbml/svg_test.go`, `cmd/box_test.go`, `internal/server/openapi_test.go`).

## Cross-references

- UI/UX overview: [`../07-ui-ux-design.md`](../../07-ui-ux-design.md)
- Tokens: [`design-tokens.md`](design-tokens.md)
- Screens these components appear on: [`screens.md`](screens.md)
- API envelope contract: [`../06-api-specification.md`](../../06-api-specification.md)

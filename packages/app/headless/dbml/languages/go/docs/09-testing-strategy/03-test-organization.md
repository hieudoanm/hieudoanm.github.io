# dbml (Go) — Test Organization

Expanded form of the organisation rule in [`../09-testing-strategy.md`](../09-testing-strategy.md) §3: tests are colocated with the code they test and written table-driven (`[]struct{...}` + `t.Run`). There is no separate `tests/` tree.

## 1. Colocation map

| Test file                          | Package   | Scope it owns                                          |
| ---------------------------------- | --------- | ------------------------------------------------------ |
| `internal/dbml/svg_test.go`        | `dbml`    | SVG rendering: empty project, tables/columns/keys/enums, XML escaping, references, unknown-target skipping |
| `internal/mcp/tools_test.go`       | `mcp`     | Tool dispatch (`runTool`), tool catalogue (`listTools`), schema summary, input validation errors |
| `internal/server/openapi_test.go`  | `server`  | OpenAPI document validity, Swagger UI HTML, route serving through the router |
| `cmd/box_test.go`                  | `cmd`     | Serve box border alignment (ANSI and plain), link advertisement, URL host rewriting |

A test belongs next to the package whose behaviour it asserts. New behaviour in `internal/dbml/parser.go` gets (or extends) `internal/dbml/*_test.go`; new HTTP behaviour gets `internal/server/*_test.go`.

## 2. White-box by intent

All four files are in-package tests (`package dbml`, `package mcp`, `package server`, `package cmd`), which lets them reach unexported helpers directly — `runTool`, `handleOpenAPI`, `renderServerBox`. This is deliberate for internal packages under `internal/`: the alternative (exporting internals for testability) would widen the API surface for no user benefit. Tests still assert observable behaviour, not implementation trivia.

## 3. Table-driven shape

The house pattern, from `tools_test.go`:

```go
tests := []struct {
    name string
    tool string
    want string
}{
    {name: "sql", tool: "dbml_sql", want: "CREATE TABLE users"},
    // ...
}
for _, test := range tests {
    t.Run(test.name, func(t *testing.T) { /* assert */ })
}
```

Rules:

- Subtest names read as documentation: `missing dbml`, `blank dbml`, `unknown tool` describe the case, not the code path.
- One `[]struct` per behaviour group; do not build a mega-table that needs four optional fields.
- Errors use `t.Fatalf` (nothing after a nil-error assumption); mismatches use `t.Errorf` so sibling cases still run.
- Loop variables are copied by the range value (`for _, test := range tests`) — no captured-pointer bugs.

## 4. Helpers

Shared assertions are local `t.Helper()` functions in the same file — `assertWellFormedXML` and `firstLine` in `svg_test.go`. A helper graduates to a second file only when a second package needs it; until then it stays private to its test file.

## 5. File budget

`AGENTS.md` caps files at 200 lines. `svg_test.go` (110), `tools_test.go` (84), `openapi_test.go` (58), and `box_test.go` (49) all sit comfortably under it. When a test file approaches the cap, split by behaviour area (for example `svg_refs_test.go`), not by test count.

## Cross-references

- Consolidated strategy: [`../09-testing-strategy.md`](../09-testing-strategy.md)
- Layers covered by these files: [`01-test-layers.md`](01-test-layers.md)
- Fixtures used inside these files: [`02-test-fixtures.md`](02-test-fixtures.md)
- Architecture (package boundaries the layout mirrors): [`../04-architecture.md`](../04-architecture.md)

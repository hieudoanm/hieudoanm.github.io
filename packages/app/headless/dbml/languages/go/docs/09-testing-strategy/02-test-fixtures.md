# dbml (Go) — Test Fixtures

Expanded form of the fixture rules in [`../09-testing-strategy.md`](../09-testing-strategy.md) §3: fixtures are synthetic, deterministic, and never private data. dbml's suite takes this further than most projects — it has **no fixture files on disk at all**. Every fixture is inline in the test file that uses it.

## 1. Fixture inventory

| Fixture                                   | File                                | What it exercises                                          |
| ----------------------------------------- | ----------------------------------- | ---------------------------------------------------------- |
| `usersTable` — a real DBML string (`Table users { id integer [pk] email varchar(255) [unique] }`) | `internal/mcp/tools_test.go` | Parse → SQL / Mermaid / SVG via MCP tools; schema summary  |
| Hand-built `Project` with one table, one enum, XML-hostile column name (`name <div>`) | `internal/dbml/svg_test.go` | SVG rendering of tables, keys, types, escaping             |
| Two-table `Project` with a `Reference`    | `internal/dbml/svg_test.go`         | Reference path rendering (arrow marker, accent stroke)     |
| `Project` with a reference to a missing table | `internal/dbml/svg_test.go`     | Unknown reference targets are skipped, not crashed         |
| Empty `Project{}`                         | `internal/dbml/svg_test.go`         | Empty-input SVG is still a valid XML document              |
| `[]serverLink` (Local/Network/Docs)       | `cmd/box_test.go`                   | Serve box border alignment, link advertisement             |
| `httptest.NewRequest` documents           | `internal/server/openapi_test.go`   | OpenAPI document and Swagger UI HTML                       |

## 2. Inline strings over fixture files

- A DBML snippet a reader can see in the same screen as the assertion is worth more than a `testdata/` file. The suite stays greppable and self-contained.
- The same `usersTable` constant is reused across every tool case in `tools_test.go` — one canonical schema, several behaviours.
- If a future test genuinely needs a file on disk (for example, exercising `dbml all` writing three files), the file must be created in `t.TempDir()` inside the test, not committed.

## 3. Real AST types, no mocks

`docs/09-testing-strategy.md` forbids mocking the parser in generator tests. `svg_test.go` honours this by constructing the real `Project`/`Table`/`Column`/`Reference` structs — the actual AST types — rather than a fake parser or stub generator. That is a fixture, not a mock: it feeds the generator real data through its real signature. User-facing behaviour, by contrast, must be driven from DBML source wherever the parser is part of the behaviour under test (the MCP tool tests do exactly this).

## 4. Determinism and hygiene rules

- Every fixture is synthetic. Never commit private, customer, or production schema data.
- No randomness, no clocks, no environment dependence — a test must produce the same result on every run and platform (the four `build-all` targets in CI).
- No network access in fixtures; `httptest` stands in for HTTP, and stdio streams stand in for MCP.
- Fixtures keep only the fields a case needs; a fixture that must set ten fields to be meaningful is a sign the unit under test is too large.

## Cross-references

- Consolidated strategy: [`../09-testing-strategy.md`](../09-testing-strategy.md)
- Layers these fixtures serve: [`01-test-layers.md`](01-test-layers.md)
- Organisation (where fixtures live): [`03-test-organization.md`](03-test-organization.md)
- Critical scenarios driven by these fixtures: [`05-critical-test-scenarios.md`](05-critical-test-scenarios.md)

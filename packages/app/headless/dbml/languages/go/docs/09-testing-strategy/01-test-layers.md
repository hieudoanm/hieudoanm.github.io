# dbml (Go) — Test Layers

Expanded form of §2 of [`../09-testing-strategy.md`](../09-testing-strategy.md). The layer split follows the product README (§11: Unit, Integration, Contract, Security) and the code that actually exists today.

## 1. Layer map

| Layer      | Target                                                       | Tooling                 | Where it lives today                              |
| ---------- | ------------------------------------------------------------ | ----------------------- | ------------------------------------------------- |
| Unit       | Parser, SQL/Mermaid/SVG generators, MCP tool dispatch, CLI helpers | `go test`, table-driven | `internal/dbml/svg_test.go`, `internal/mcp/tools_test.go`, `cmd/box_test.go` |
| Integration| HTTP handlers through the real router                        | `go test` + `httptest`  | `internal/server/openapi_test.go` (`TestRoutesServeDocs`) |
| Contract   | OpenAPI 3.0.x document, Swagger UI boot                      | `go test`               | `internal/server/openapi_test.go`                 |
| Security   | Input validation at every boundary                           | `go test`               | `internal/mcp/tools_test.go` (`TestRunToolErrors`); HTTP-side coverage is a gap |
| E2E        | Full conversions against real services (e.g. PostgreSQL)     | —                       | **Not implemented** — CI runs no database services ([`../README.md`](../README.md) §8) |

## 2. Unit layer

The bulk of the suite. Rules in force ([`../09-testing-strategy.md`](../09-testing-strategy.md) §3):

- Tests assert observable behaviour — output substrings, XML well-formedness, error occurrence — not internal call structure.
- DBML-dependent tests use real DBML input, not hand-built ASTs (`usersTable` in `tools_test.go`).
- Generator tests do not mock the parser; when a test constructs a `Project` directly (as `svg_test.go` does for rendering edge cases like unknown reference targets), it builds the real AST types, never a fake.

## 3. Integration layer

HTTP handlers are exercised through the same `mux.Router` the server serves (`srv.Router().ServeHTTP(rec, req)` with `httptest.NewRecorder`), so routing, method matching, and handler behaviour are tested together. Conversions are stateless and synchronous, which makes every handler test an integration test of parser + generator + transport without external processes.

## 4. Contract layer

`internal/server/openapi_test.go` pins the API's self-description:

- `/api/v1/openapi.json` returns `200`, `application/json`, and an `openapi` version prefixed `3.0`.
- The document's `paths` include `/api/v1/convert`.
- `/api/v1/docs` returns HTML that boots SwaggerUIBundle against `/api/v1/openapi.json`.

This keeps the published contract and the running routes from drifting apart.

## 5. Security layer

Validation is tested at the transport boundary that owns it: missing/blank `dbml` arguments and unknown tool names must error (`TestRunToolErrors`); the server's equivalent checks (`400 dbml field is required`, malformed body, malformed multipart) are specified in [`../06-api-specification.md`](../06-api-specification.md) and are currently an **untested gap** — see [`05-critical-test-scenarios.md`](05-critical-test-scenarios.md). Path-traversal testing is listed in the README but has no filesystem-facing surface to test yet beyond CLI file writes.

## 6. What each layer may not do

- No layer mocks `dbml.Parse` or a generator; the pipeline is real end to end.
- No layer asserts on private function calls or internal counters.
- E2E claims require an actual E2E harness; until one exists, do not describe the suite as covering PostgreSQL execution of generated DDL.

## Cross-references

- Consolidated strategy: [`../09-testing-strategy.md`](../09-testing-strategy.md)
- Architecture (what each layer crosses): [`../04-architecture.md`](../04-architecture.md)
- API contract under test: [`../06-api-specification.md`](../06-api-specification.md)
- Fixtures for these layers: [`02-test-fixtures.md`](02-test-fixtures.md)

# dbml (Go) — Critical Test Scenarios

The scenarios that must never regress, because they are where a DBML converter actually fails users: bad input, empty input, and generation of each output format. Two tables: what is covered today, and what is specified but uncovered.

## 1. Covered today

| Scenario                                   | Expectation                                                       | Test                                                        |
| ------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| Empty project → SVG                        | XML declaration, `<svg>` root, well-formed XML                    | `TestToSVGEmptyProject` (`internal/dbml/svg_test.go`)        |
| SVG renders tables, columns, keys, enums   | Contains table/column/enum text, `PK`/`UK` badges, `VARCHAR(255) NOT NULL` | `TestToSVGRendersTablesAndColumns`                           |
| SVG XML-escapes hostile names              | `name <div>` emits as `name &lt;div&gt;` in well-formed XML        | same as above                                                |
| SVG renders references                     | `marker-end="url(#arrow)"` and `stroke="#7c3aed"` present          | `TestToSVGRendersReferences`                                 |
| SVG skips unknown reference targets        | No reference path emitted for a missing table                    | `TestToSVGSkipsUnknownReferenceTargets`                      |
| SQL generation via real DBML               | Output contains `CREATE TABLE users`                              | `TestRunToolConvertsFormats` (`internal/mcp/tools_test.go`)   |
| Mermaid generation via real DBML           | Output contains `erDiagram`                                       | same as above                                                |
| SVG generation via real DBML               | Output contains `<svg`                                            | same as above                                                |
| MCP tool catalogue                         | `dbml_sql`, `dbml_mermaid`, `dbml_svg`, `dbml_parse` all listed   | `TestListToolsIncludesConversions`                            |
| MCP `dbml_parse` summary                   | Result is valid JSON with the expected table list                | `TestRunToolParseSummarizesSchema`                            |
| MCP bad input                              | Missing dbml, blank dbml, unknown tool all return errors          | `TestRunToolErrors`                                           |
| OpenAPI contract                           | `200`, `application/json`, `openapi` 3.0.x, paths include `/api/v1/convert` | `TestOpenAPIHandlerReturnsValidV3Document` (`internal/server/openapi_test.go`) |
| Swagger UI page                            | HTML with `SwaggerUIBundle` pointing at `/api/v1/openapi.json`    | `TestSwaggerUIHandlerServesHTMLPointingAtSpec`                |
| Docs routes served by the router           | `GET` both docs routes = 200 through `srv.Router()`               | `TestRoutesServeDocs`                                         |
| CLI serve box renders correctly            | ANSI-stripped line widths all equal; Local/Docs links correct     | `TestRenderServerBoxBordersAlign`, `TestServeLinksAdvertisesDocs` (`cmd/box_test.go`) |

## 2. Specified but uncovered (add before claiming them)

| Scenario                                   | Expected behaviour (from the specs)                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| HTTP empty `dbml` field                    | `400` `{"error": "dbml field is required"}` on all three convert endpoints           |
| HTTP parse failure                         | `400` `{"error": "parse error: ..."}`, no internals leaked                           |
| HTTP malformed JSON / malformed multipart  | `400` with the decode error                                                          |
| HTTP multipart upload (`file`, `dbml` fields) | `200` with generated formats                                                     |
| HTTP raw-body fallback                     | Non-JSON body treated as DBML content, `200`                                         |
| MCP JSON-RPC framing                       | One response line per request; `initialize` returns protocol `2024-11-05`; notifications get no response |
| CLI file outputs                           | `dbml sql/mermaid/svg/all` write the documented default files and print the confirmation lines |
| CLI parse failure                          | `dbml: parse DBML: ...` on stderr (exit status 0 — see [`FEATURE-08-Error-Handling.md`](../02-features/FEATURE-08-Error-Handling.md) §5) |
| SQL output validity                        | Generated DDL executes against PostgreSQL (the DoD says "SQL executes"; no harness exists yet) |

## 3. Scenario rules

- Every scenario is asserted through the public surface — a tool call, an HTTP request, a rendered string — never through a spy on internals.
- SVG assertions check **well-formedness** (via `encoding/xml` decoding) as well as content; a diagram that contains the right words but broken XML is a failure.
- New failure modes found in production get a scenario here first, then a fix ([`../09-testing-strategy.md`](../09-testing-strategy.md) §3: tests assert observable behaviour).
- The uncovered table shrinks one row at a time; do not delete a row without either a test or a decision record saying the behaviour is out of scope.

## Cross-references

- Consolidated strategy: [`../09-testing-strategy.md`](../09-testing-strategy.md)
- Layers and fixtures behind these tests: [`01-test-layers.md`](01-test-layers.md), [`02-test-fixtures.md`](02-test-fixtures.md)
- HTTP error envelope contract: [`../06-api-specification.md`](../06-api-specification.md)
- States under test: [`../07-ui-ux-design/system/states.md`](../07-ui-ux-design/system/states.md)

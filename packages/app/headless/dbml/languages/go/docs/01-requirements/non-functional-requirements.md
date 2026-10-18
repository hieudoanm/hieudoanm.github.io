# dbml (Go) — Non-Functional Requirements

This page expands [`01-requirements.md`](../01-requirements.md) into individual non-functional requirements: performance, portability, security, testing, and the operational qualities dbml must hold across every feature. Targets are summarised in [`README.md`](../README.md) §9.

These are requirements and targets for a software demonstration; where a quality is not yet implemented, the requirement says so explicitly rather than claiming a guarantee.

## NFR-001 — Portability

dbml builds as a pure Go binary with `CGO_ENABLED=0` and no runtime dependencies beyond the operating system. `make build-all` cross-compiles for linux/amd64, linux/arm64, darwin/amd64, and darwin/arm64, and the multi-stage Dockerfile produces a self-contained container image for the `serve` use case ([`08-tech-stack.md`](../08-tech-stack.md) §5, [`11-deployment.md`](../11-deployment.md)).

No external rendering tools are required: SQL, Mermaid, and SVG are all produced in-process by the standard library ([`08-tech-stack.md`](../08-tech-stack.md) §4.5).

## NFR-002 — Performance

Conversion is expected to be sub-second for typical schemas ([`README.md`](../README.md) §9). Each conversion parses and renders in memory in a single pass, and the HTTP server is stateless, so requests share no work and no stored state ([`04-architecture.md`](../04-architecture.md) §10).

Performance tests and CI performance gates are **not yet implemented** ([`README.md`](../README.md) §8). The sub-second figure is a design target, not a measured guarantee.

## NFR-003 — Security and privacy

No secrets in code or configuration, no outbound network calls during conversion, and no real personally identifiable information in demonstrations ([`00-overview.md`](../00-overview.md) §9). The API is local and single-user with no authentication in the MVP; a future `Authorization` header is reserved but not required ([`06-api-specification.md`](../06-api-specification.md) §3).

Validation happens at the parser boundary before generation ([`04-architecture.md`](../04-architecture.md) §9.1), error responses never include filesystem paths ([`06-api-specification.md`](../06-api-specification.md) §1), and building without CGO reduces the attack surface. One documented exception to "no network calls": the Swagger UI page at `/api/v1/docs` fetches its CSS and JavaScript from the jsDelivr CDN when a browser opens it.

## NFR-004 — Observability

The binary logs through `log/slog` with a text handler. The CLI defaults the logger to warning level; `dbml serve --debug` raises it to debug level, which is where the server's startup log line becomes visible. `dbml serve` also prints a startup box listing the local URL, a network URL when reachable, and the Swagger UI link, and `GET /api/v1/health` reports process liveness and version.

Metrics, tracing, dashboards, and alerting are out of scope for the initial release ([`README.md`](../README.md) §8, [`12-operations.md`](../12-operations.md)).

## NFR-005 — Reproducibility

Dependencies are pinned in `go.mod`/`go.sum`, and every artifact is reproducible from source: the same DBML input always yields the same SQL, Mermaid, and SVG, so generated output never needs to be committed and can be regenerated at any time ([`12-operations.md`](../12-operations.md)).

CI produces versioned release artifacts for the four target platforms ([`11-deployment.md`](../11-deployment.md)), and `dbml --version` reports the build version, which is `dev` for a default `make build`.

## NFR-006 — Zero configuration

dbml reads no environment variables and writes no configuration files; every option is a CLI flag with a working default ([`04-architecture.md`](../04-architecture.md) §7). A conversion works with nothing but a DBML file present — no project file, no render configuration, no daemon.

## NFR-007 — Dependency discipline

The direct runtime dependency set is two modules — `github.com/spf13/cobra` for the CLI and `github.com/gorilla/mux` for HTTP routing — plus their indirect dependencies. The parser and all three generators use only the standard library ([`08-tech-stack.md`](../08-tech-stack.md) §3, §4).

Every new dependency must be justified against a standard-library solution, maintenance status, licence, and size before it is added ([`08-tech-stack.md`](../08-tech-stack.md) §2).

## NFR-008 — Testing and quality gates

Tests are table-driven Go tests that assert observable behaviour and use real DBML input rather than hand-built ASTs ([`09-testing-strategy.md`](../09-testing-strategy.md) §3). The pre-handoff gate is `make all` (format, lint via `go vet`, test, build), and CI runs gofmt, lint, test, cross-build, and rolling release ([`11-deployment.md`](../11-deployment.md)).

Integration and end-to-end tests against a real PostgreSQL, and CI performance gates, are **not yet implemented** ([`README.md`](../README.md) §8).

## NFR-009 — Accessibility and clear feedback

The HTTP surface and its documentation target WCAG 2.1 AA ([`07-ui-ux-design.md`](../07-ui-ux-design.md) §1), and interfaces stay consistent across CLI, HTTP, and MCP ([`README.md`](../README.md) §10).

Feedback is explicit on every transport: success messages on stdout, errors on stderr for the CLI; JSON error bodies for HTTP; JSON-RPC error objects for MCP. All CLI states — loading, empty, success, and error — are required by the MVP definition of done ([`02-features.md`](../02-features.md) §4).

## NFR-010 — Documentation as contract

Numbered documents `00`–`12` govern implementation detail, and where this documentation and the code disagree the numbered documents are the reference point for intent ([`README.md`](../README.md), normative documents). A feature is not complete until its behaviour is documented, tests pass, and documentation is updated ([`02-features.md`](../02-features.md) §3).

## Cross-references

- Requirements index: [`01-requirements.md`](../01-requirements.md)
- Functional requirements: [`functional-requirements.md`](./functional-requirements.md)
- Features: [`02-features.md`](../02-features.md)
- Architecture: [`04-architecture.md`](../04-architecture.md)
- Testing strategy: [`09-testing-strategy.md`](../09-testing-strategy.md)
- Deployment: [`11-deployment.md`](../11-deployment.md)
- Overview: [`00-overview.md`](../00-overview.md)

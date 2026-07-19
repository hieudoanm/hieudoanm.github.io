# dbml (Go) — Definition of Done

This is the canonical release definition of done for dbml. [`00-overview.md`](../00-overview.md) §10 summarises it and defers to this page; [`10-implementation-plan.md`](../10-implementation-plan.md) §6 links it as the gate for the plan.

A release is complete when every checklist below holds.

## Build and quality gates

- [ ] `make format` (`go fmt ./...`), `make lint` (`go vet ./...`), and `make test` (`go test ./...`) are clean.
- [ ] `make build` produces `bin/dbml` with `CGO_ENABLED=0`.
- [ ] Table-driven tests cover parsing, SQL generation, Mermaid generation, SVG generation, CLI commands, HTTP endpoints, and error handling (see [`09-testing-strategy.md`](../09-testing-strategy.md)).

## Behaviour

- [ ] `dbml all schema.dbml --output-dir ./output` produces SQL, Mermaid, and SVG artifacts from one command.
- [ ] The CLI supports `sql`, `mermaid`, `svg`, `all`, `serve`, and `mcp`.
- [ ] The HTTP server exposes `/api/v1/health` and the convert endpoints, returning JSON errors with an `error` field on bad input.
- [ ] The MCP server exposes `dbml_sql`, `dbml_mermaid`, `dbml_svg`, and `dbml_parse` over JSON-RPC 2.0 on stdio.
- [ ] Errors are actionable: they identify what failed, which file or path was involved, and enough context to fix it.

## Output validity

- [ ] Generated SQL executes against PostgreSQL for the standard fixtures.
- [ ] Generated Mermaid renders in GitHub/GitLab.
- [ ] Generated SVG is valid and viewable in a browser without external tooling.

## Release

- [ ] `make build-all` cross-compiles for linux/amd64, linux/arm64, darwin/amd64, and darwin/arm64.
- [ ] CI runs lint, test, cross-build, and publishes the rolling GitHub Release.
- [ ] `docker build` produces an image whose default command serves the API.

## Documentation and process

- [ ] The numbered documents under `docs/` are updated wherever behaviour or scope changed.
- [ ] The implementation preserves the separation between parser, generators, and transports (CLI, HTTP, MCP) required by `AGENTS.md`.
- [ ] No secrets, credentials, or real personal data are committed.
- [ ] No unnecessary dependency was added.

## Scope note

dbml is a software demonstration. The definition of done covers the behaviour this repository actually ships; it does not assert regulatory compliance, availability guarantees, or production support (see [`00-overview.md`](../00-overview.md) §6).

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Overview: [`00-overview.md`](../00-overview.md)
- Testing strategy: [`09-testing-strategy.md`](../09-testing-strategy.md)

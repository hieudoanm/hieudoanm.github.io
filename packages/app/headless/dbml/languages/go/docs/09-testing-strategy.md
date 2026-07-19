# dbml (Go) — Testing Strategy

## 1. Purpose

Ensure DBML parsing, SQL/Mermaid/SVG generation, CLI commands, and HTTP API are correct and repeatable.

## 2. Test Layers

- [`01-test-layers.md`](./09-testing-strategy/01-test-layers.md)
- [`02-test-fixtures.md`](./09-testing-strategy/02-test-fixtures.md)
- [`03-test-organization.md`](./09-testing-strategy/03-test-organization.md)
- [`04-quality-gates.md`](./09-testing-strategy/04-quality-gates.md)
- [`05-critical-test-scenarios.md`](./09-testing-strategy/05-critical-test-scenarios.md)
- [`06-definition-of-done.md`](./09-testing-strategy/06-definition-of-done.md)

## 3. Guiding Principles

- Tests assert observable behaviour.
- DBML-dependent tests use real DBML input, not hand-built ASTs.
- SVG tests validate the output is well-formed XML.
- Fixtures are synthetic; never commit private data.
- Do not mock the parser in generator tests — use real ASTs.
- Keep tests colocated with the code they test; use table-driven tests (`[]struct{...}` + `t.Run`).

## Cross-references

- Requirements: [`01-requirements.md`](01-requirements.md)
- Architecture: [`04-architecture.md`](04-architecture.md)

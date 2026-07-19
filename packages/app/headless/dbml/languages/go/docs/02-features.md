# dbml (Go) — Features

## 1. Purpose

This document describes how dbml features should behave from the user's perspective and how their behaviour should be implemented.

It complements:

- `00-overview.md` — product vision and scope.
- `01-requirements.md` — functional and non-functional requirements.
- `03-user-stories.md` — user goals and acceptance scenarios.
- `04-architecture.md` — system boundaries and technical responsibilities.
- `05-data-model.md` — entities, relationships, and constraints.
- `06-api-specification.md` — REST endpoints and request/response models.
- `08-tech-stack.md` — technology choices and rationale.
- `07-ui-ux-design.md` — interface and interaction design.

Features should be delivered in vertical slices: a user should complete DBML parse → generate SQL/Mermaid/SVG through the CLI or HTTP API before the next major workflow is started.

The canonical entities referenced throughout are `tables`, `columns`, `constraints`, `enums`, `indexes`, and `notes`.

dbml is a software demonstration. It does not provide a full database modeling tool or claim regulatory compliance.

Each feature section below states its **user-visible behaviour**, **inputs**, **outputs**, **states**, **edge cases**, and **acceptance conditions**. Priority references map to the P0–P1 definitions.

## 2. Feature Priorities

| Priority | Meaning | Product stage |
| -------- | ------- | ------------- |
| P0 | Required for a usable MVP | Core platform |
| P1 | Important for a complete experience | Enhancement |

## 3. Feature Completion Definition

A feature is complete when: behaviour documented, CLI/HTTP implement contract, validation/failure handled, tests pass, docs updated, no critical issues, quality gates pass.

## 4. MVP Definition of Done

MVP ready when core workflow works end-to-end: DBML input → SQL output → Mermaid output → SVG output → HTTP conversion. Idempotency where applicable, error handling complete, CLI states implemented, health checks in place.

- Users can successfully complete the core conversion workflow:
  1. Author a `schema.dbml` file
  2. Run `dbml sql schema.dbml -o schema.sql`
  3. Run `dbml mermaid schema.dbml -o diagram.mmd`
  4. Run `dbml svg schema.dbml -o diagram.svg`
  5. Run `dbml all schema.dbml --output-dir ./output`
- Error handling is complete and follows established patterns.
- All CLI states (loading, empty, success, error) are implemented.
- Health checks and audit logging are functioning.

## 5. Features

Each feature is documented in a separate file:

- [FEATURE-01: DBML Parsing](./02-features/FEATURE-01-DBML-Parsing.md)
- [FEATURE-02: SQL Generation](./02-features/FEATURE-02-SQL-Generation.md)
- [FEATURE-03: Mermaid Generation](./02-features/FEATURE-03-Mermaid-Generation.md)
- [FEATURE-04: SVG Generation](./02-features/FEATURE-04-SVG-Generation.md)
- [FEATURE-05: CLI Commands](./02-features/FEATURE-05-CLI-Commands.md)
- [FEATURE-06: HTTP Server](./02-features/FEATURE-06-HTTP-Server.md)
- [FEATURE-07: MCP Server](./02-features/FEATURE-07-MCP-Server.md)
- [FEATURE-08: Error Handling](./02-features/FEATURE-08-Error-Handling.md)

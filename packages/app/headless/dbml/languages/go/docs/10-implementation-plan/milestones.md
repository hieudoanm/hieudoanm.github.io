# dbml (Go) — Milestones

| Milestone            | Phase  | Deliverable                                       | Status      |
| -------------------- | ------ | ------------------------------------------------- | ----------- |
| M0: Foundation       | 0      | Go module, Cobra CLI scaffold, DBML parser        | Complete    |
| M1: Data model       | 1      | Internal AST, PostgreSQL SQL generator            | Complete    |
| M2: Diagrams         | 2      | Mermaid `erDiagram` and direct-Go SVG generators  | Complete    |
| M3: CLI commands     | 3      | `sql`, `mermaid`, `svg`, `all` with output flags  | Complete    |
| M4: HTTP server      | 4      | REST API, health check, OpenAPI + Swagger UI      | Complete    |
| M5: MCP server       | 5      | JSON-RPC 2.0 tools over stdio                     | Implemented |
| M6: Packaging and CI | 6      | Docker image, cross-build, rolling GitHub Release | In progress |
| M7: Docs and demo    | 7      | Numbered docs 00–12, runnable demo workflow       | Ongoing     |

Statuses derive from the implementation snapshot of 2026-10-17 in [`docs/README.md`](../README.md) §8. That snapshot groups the MCP server under its "complete" set and describes packaging/CI as the in-progress item; where its grouping and the phase table in [`10-implementation-plan.md`](../10-implementation-plan.md) differ, the phase table's numbering governs.

## Milestone exit conditions

Each milestone is only closed when its phase page's acceptance criteria hold and the shared gates are green: `make format`, `make lint`, `make test`, `make build`. The full release bar is defined in [`definition-of-done.md`](definition-of-done.md).

## Dependency chain

```
M0 → M1 → M2 → M3 → M4 → M5 → M6 → M7
```

Each phase is runnable once M0 exists; there is no parallel track because every transport reuses the same parser and generators.

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Risks: [`risk-mitigation.md`](risk-mitigation.md)
- Definition of done: [`definition-of-done.md`](definition-of-done.md)
- Overview: [`00-overview.md`](../00-overview.md)

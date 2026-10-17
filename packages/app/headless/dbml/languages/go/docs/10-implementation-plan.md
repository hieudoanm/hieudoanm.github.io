# dbml (Go) — Implementation Plan

## 1. Purpose

Phased delivery. Each phase is runnable once Phase 0 exists.

## 2. Principles

Vertical slices, parser-first, tests alongside code, docs updated, zero-config default.

## 3. Phases Overview

| Phase | Document | Focus |
| ----- | -------- | ----- |
| 0 | [`phase-0-foundation.md`](./10-implementation-plan/phase-0-foundation.md) | Module layout, CLI, parser |
| 1 | [`phase-1-data-model.md`](./10-implementation-plan/phase-1-data-model.md) | AST, SQL generator |
| 2 | [`phase-2-mermaid-svg.md`](./10-implementation-plan/phase-2-mermaid-svg.md) | Mermaid generator, SVG generator |
| 3 | [`phase-3-cli-commands.md`](./10-implementation-plan/phase-3-cli-commands.md) | `all` command, output flags |
| 4 | [`phase-4-http-server.md`](./10-implementation-plan/phase-4-http-server.md) | REST API, health check |
| 5 | [`phase-5-mcp-server.md`](./10-implementation-plan/phase-5-mcp-server.md) | JSON-RPC 2.0 over stdio |
| 6 | [`phase-6-packaging-ci.md`](./10-implementation-plan/phase-6-packaging-ci.md) | Docker, cross-build, GitHub Release |
| 7 | [`phase-7-docs-demo.md`](./10-implementation-plan/phase-7-docs-demo.md) | Documentation, demo |

## 4. Milestones

See [`milestones.md`](./10-implementation-plan/milestones.md).

## 5. Risks

See [`risk-mitigation.md`](./10-implementation-plan/risk-mitigation.md).

## 6. Definition of Done

See [`definition-of-done.md`](./10-implementation-plan/definition-of-done.md).

## 7. Dependency Graph

```
Phase 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7
```

## Cross-references

- Requirements: [`01-requirements.md`](01-requirements.md)
- Architecture: [`04-architecture.md`](04-architecture.md)

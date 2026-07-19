# dbml (Go) — Phase 2: Mermaid and SVG Generators

## Goal

Render diagrams from the same AST: Mermaid `erDiagram` syntax for documentation tooling, and SVG drawn directly in Go for presentation.

Status: complete (implementation snapshot 2026-10-17, see [`docs/README.md`](../README.md) §8).

## Deliverables

| Deliverable | Location |
| ----------- | -------- |
| Mermaid generator (`Project.ToMermaid()`) | `internal/dbml/parser.go` |
| SVG generator (`Project.ToSVG()`) | `internal/dbml/svg.go`, `internal/dbml/svg_draw.go` |
| SVG tests | `internal/dbml/svg_test.go` |

## Mermaid output

| DBML construct | Mermaid representation |
| -------------- | ---------------------- |
| Tables + columns | `erDiagram` block with attributes |
| Primary / unique / not-null markers | `PK` / `UK` / attribute markers on columns |
| `Ref` definitions | Relationship lines with cardinality |

## SVG output

- Rendered entirely in Go — no mermaid-cli, Graphviz, or browser tooling is required at build or run time.
- The SVG is a self-contained vector artifact suitable for committing next to documentation.

This phase is what makes the product promise in [`00-overview.md`](../00-overview.md) §3 achievable: one command produces both diagram formats from one source file.

## Acceptance criteria

- [ ] `dbml mermaid schema.dbml -o diagram.mmd` produces syntax that renders on GitHub/GitLab.
- [ ] `dbml svg schema.dbml -o diagram.svg` produces valid SVG viewable in any browser.
- [ ] Relationship cardinality from `Ref` direction indicators is preserved in both formats.
- [ ] No new runtime or build dependency is introduced for diagram rendering.

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Architecture: [`04-architecture.md`](../04-architecture.md)
- Features: [`02-features.md`](../02-features.md)

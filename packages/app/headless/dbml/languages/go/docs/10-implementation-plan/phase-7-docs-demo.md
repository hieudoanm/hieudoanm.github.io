# dbml (Go) — Phase 7: Documentation and Demo

## Goal

Document the product so a developer can go from DBML source to SQL, diagrams, and API with one command, and keep the docs in step with the implementation.

Status: remaining (the 2026-10-17 snapshot in [`docs/README.md`](../README.md) §8 counts phases 6–7 as not yet delivered; the numbered doc set exists and is maintained incrementally).

## Deliverables

| Deliverable | Location |
| ----------- | -------- |
| Product specification | `docs/README.md` |
| Numbered normative documents 00–12 | `docs/` |
| Contributor guidelines | `AGENTS.md` |
| Project readme | `README.md` |

## Documentation set

The numbered documents govern implementation detail; where the product specification and the numbered documents disagree, the numbered documents win (stated in `docs/README.md`).

| Document | Governs |
| -------- | ------- |
| [`00-overview.md`](../00-overview.md) | Vision and scope |
| [`01-requirements.md`](../01-requirements.md) | Functional/non-functional requirements |
| [`04-architecture.md`](../04-architecture.md) | Module boundaries and request lifecycle |
| [`10-implementation-plan.md`](../10-implementation-plan.md) | This phased plan |
| [`11-deployment.md`](../11-deployment.md) / [`12-operations.md`](../12-operations.md) | Delivery and operations |

## Demo

The canonical demo is the product promise in [`00-overview.md`](../00-overview.md) §3:

```bash
dbml all schema.dbml --output-dir ./output
# schema.sql, database-erd.mmd, diagram.svg produced
```

Docs are updated alongside behaviour changes; a change that alters generated output, commands, or endpoints updates the governing numbered document in the same change.

## Acceptance criteria

- [ ] A new developer can build and run the tool using documented instructions only.
- [ ] The demo command produces SQL, Mermaid, and SVG from a sample DBML file.
- [ ] Every link in the numbered documents resolves (each subpage exists).
- [ ] Behaviour changes land with a matching documentation update.

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Overview: [`00-overview.md`](../00-overview.md)
- Testing strategy: [`09-testing-strategy.md`](../09-testing-strategy.md)

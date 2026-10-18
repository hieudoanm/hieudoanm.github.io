# pagify — Implementation Plan

Phased delivery plan for pagify.

## Phase plan

Phase 0 Foundation → Phase 1 Core Build → Phase 2 Navigation → Phase 3 Theme → Phase 4 Search → Phase 5 Preview → Phase 6 Serve API → Phase 7 Polish → Phase 8 Release.

The phase numbering below is canonical — see [`10-implementation-plan.md`](10-implementation-plan.md) for detailed phases.

| Phase | Focus                                  | Status  |
| ----- | -------------------------------------- | ------- |
| 0     | Foundation (Go module, CLI scaffold)   | Planned |
| 1     | Core build (discovery, parse, render)  | Planned |
| 2     | Navigation (file-tree sidebar, URLs)   | Planned |
| 3     | Theme (embedded template, CSS, JS)     | Planned |
| 4     | Search (client-side index)             | Planned |
| 5     | Preview (per-request rebuild server)   | Planned |
| 6     | Serve API (`/api/v1/*`)                | Planned |
| 7     | Polish (accessibility, performance)    | Planned |
| 8     | Release (cross-platform builds, CI)    | Planned |

See [`10-implementation-plan.md`](10-implementation-plan.md) for detailed phases.

## Cross-references

- Requirements: [`01-requirements.md`](01-requirements.md)
- Testing: [`09-testing-strategy.md`](09-testing-strategy.md)
- Deployment: [`11-deployment.md`](11-deployment.md)

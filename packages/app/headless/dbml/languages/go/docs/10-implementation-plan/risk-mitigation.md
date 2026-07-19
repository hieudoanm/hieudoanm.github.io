# dbml (Go) — Risk Mitigation

| Risk | Mitigation |
| ---- | ---------- |
| Parser rejects valid or common DBML constructs | Table-driven parser tests per construct; actionable parse errors with file and line context |
| Generated SQL silently changes semantics | Backwards-compatibility policy in `AGENTS.md`: preserve normal DBML behaviour, avoid unnecessary syntax changes; changes to generators land with tests |
| SVG rendering grows into a graphics framework | Render directly in Go with the standard library; keep `internal/dbml/svg*.go` focused and tested; no external toolchain dependency |
| Dependency creep | Standard-library-first policy in `AGENTS.md`; each dependency must pass maintenance, licence, and size review (current: Cobra, Gorilla Mux) |
| Scope creep toward a full modeling tool | Explicit non-goals in [`00-overview.md`](../00-overview.md) §6: no schema reverse-engineering, no configuration for inferable values |
| HTTP API exposed without authentication | `serve` is a demonstration API with no auth layer; [`12-operations/security.md`](../12-operations/security.md) requires operators to restrict network exposure |
| Malformed input or unsafe paths reaching outputs | HTTP layer returns 400 with a JSON `error`; path traversal and input validation are named test layers in [`00-overview.md`](../00-overview.md) §11 |
| Rolling release tag hides regressions | The `app-headless-dbml-latest` tag is force-updated by design; rollback relies on rebuilding from a known commit, see [`12-operations/rollback-strategy.md`](../12-operations/rollback-strategy.md) |
| No integration/E2E coverage against a real database | Named as not yet implemented in [`docs/README.md`](../README.md) §8; unit tests use fakes and CI runs no database services |
| Observability limited to logs and health | Metrics, tracing, and alerting are explicitly out of the initial release; see [`12-operations/monitoring-alerting.md`](../12-operations/monitoring-alerting.md) |

## Risk areas by layer

| Layer | Primary risk | Owning phase |
| ----- | ------------ | ------------ |
| Parser (`internal/dbml`) | Dialect coverage and error quality | 0, 1 |
| Generators (SQL, Mermaid, SVG) | Silent output regressions | 1, 2 |
| CLI (`cmd/`) | Flag/default drift breaking zero-config use | 3 |
| HTTP server (`internal/server`) | Unauthenticated exposure of the demo API | 4 |
| MCP (`internal/mcp`) | Protocol framing corrupting the stdio stream | 5 |
| Packaging (Dockerfile, CI) | Rolling-release overwrite hiding regressions | 6 |

## Notes

- dbml is a demonstration tool: mitigations above match its actual scope and do not claim production guarantees the repository does not provide.
- Risks are reviewed as part of the phase gates in [`milestones.md`](milestones.md); a phase does not close with an unmitigated blocking risk.
- The release gate that consolidates these mitigations is [`definition-of-done.md`](definition-of-done.md).

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Requirements: [`01-requirements.md`](../01-requirements.md)
- Operations: [`12-operations.md`](../12-operations.md)

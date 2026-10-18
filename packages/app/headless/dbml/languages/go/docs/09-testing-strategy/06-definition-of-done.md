# dbml (Go) — Definition of Done

Expanded form of the acceptance criteria in [`../09-testing-strategy.md`](../09-testing-strategy.md) and the Definition of Done in `AGENTS.md`, aligned with the delivery principles in [`../10-implementation-plan.md`](../10-implementation-plan.md) §2 (vertical slices, parser-first, tests alongside code, docs updated, zero-config default).

## 1. The checklist

A feature is not complete until **all** of the following hold:

| # | Criterion                        | How it is verified                                            |
| - | -------------------------------- | ------------------------------------------------------------ |
| 1 | Implementation is finished       | The behaviour in the requirement works end to end, not partially |
| 2 | Tests pass                       | `make test` (`go test ./...`) is clean                        |
| 3 | The project builds               | `make build` produces `bin/dbml` (`CGO_ENABLED=0`)            |
| 4 | Generated output is valid        | SQL executes; Mermaid renders; SVG is well-formed XML         |
| 5 | Errors are handled appropriately | Actionable messages (what failed, which file, how to fix); no silent swallowing |
| 6 | Documentation is updated         | Numbered docs (`00`–`12`) and `AGENTS.md` reflect the change when behaviour moved |
| 7 | Architecture is followed         | Parser/generator/transport separation intact; zero-config default preserved |

## 2. What each criterion means here

**Finished** — one vertical slice, not a stub plus TODO. A new output format, for example, works through CLI, HTTP, and MCP or is explicitly scoped to one transport in the change itself.

**Tests pass** — the gates in [`04-quality-gates.md`](04-quality-gates.md) are clean: `make all` (format + lint + test + build) before handoff. New behaviour has a colocated, table-driven test ([`03-test-organization.md`](03-test-organization.md)).

**Valid output** — the DoD's "SQL executes, Mermaid renders" is the bar; today the automated suite proves the weaker but real property that SVG output is well-formed XML and contains the expected constructs ([`05-critical-test-scenarios.md`](05-critical-test-scenarios.md) §2 tracks the gap honestly). Manual verification of generated SQL/Mermaid is part of the development workflow in `AGENTS.md` step 8 whenever a change touches a generator.

**Actionable errors** — the `AGENTS.md` Error Handling section is the wording to match: `dbml: failed to parse schema.dbml: line 5: unknown column type "foobar"`, not `Error`. HTTP errors carry the `error` field; MCP errors carry JSON-RPC codes.

**Docs updated** — behaviour changes update the governing numbered doc; new decisions update [`../08-tech-stack.md`](../08-tech-stack.md) with the rejected alternative recorded.

**Architecture followed** — the four rules in [`../04-architecture.md`](../04-architecture.md) §2: parser autonomy, generator purity, transport thinness, no cross-transport logic. Keep functions ≤ 30 lines and files ≤ 200 lines (`AGENTS.md`, Code Style).

## 3. Explicit non-criteria

dbml is a demonstration tool. Done does **not** mean: schema reverse-engineering, regulatory compliance, a database service in CI, performance benchmarks, or observability beyond slog and health endpoints. [`../README.md`](../README.md) §8 lists these as not yet implemented; do not let "done" silently expand to absorb them.

## Cross-references

- Consolidated strategy: [`../09-testing-strategy.md`](../09-testing-strategy.md)
- Quality gates invoked by this checklist: [`04-quality-gates.md`](04-quality-gates.md)
- Critical scenarios proving criterion 4: [`05-critical-test-scenarios.md`](05-critical-test-scenarios.md)
- Delivery phases: [`../10-implementation-plan.md`](../10-implementation-plan.md)
- Architecture rules for criterion 7: [`../04-architecture.md`](../04-architecture.md)

# dbml (Go) — Phase 3: CLI Commands

## Goal

Expose the generators through focused Cobra commands, culminating in the zero-config `all` command that is the product's headline workflow.

Status: complete (implementation snapshot 2026-10-17, see [`docs/README.md`](../README.md) §8).

## Deliverables

| Command | File | Behaviour |
| ------- | ---- | --------- |
| `dbml sql` | `cmd/sql.go` | PostgreSQL DDL from a DBML file; `-o` output file |
| `dbml mermaid` | `cmd/mermaid.go` | Mermaid `erDiagram`; `-o` output file |
| `dbml svg` | `cmd/svg.go` | SVG diagram; `-o` output file |
| `dbml all` | `cmd/all.go` | All formats in one run; `--output-dir` flag |

## Output flags

```bash
dbml sql schema.dbml -o schema.sql
dbml mermaid schema.dbml -o diagram.mmd
dbml svg schema.dbml -o diagram.svg
dbml all schema.dbml --output-dir ./output
```

- Defaults are zero-config: pointing `dbml` at a DBML file is enough; output locations can be overridden with flags.
- The `all` command is the strongest version of the tool — SQL, Mermaid, and SVG from one invocation, per the product philosophy in `AGENTS.md`.

## Design constraints

- Commands delegate to the parser and generators; no conversion logic lives in `cmd/`.
- CLI errors state what failed, which file was involved, and how to fix it; malformed input is never silently ignored.

## Acceptance criteria

- [ ] All four commands run without configuration against a valid DBML file.
- [ ] `-o` writes to the named file; missing arguments produce actionable errors.
- [ ] `dbml all schema.dbml --output-dir ./output` produces SQL, Mermaid, and SVG artifacts together.
- [ ] Table-driven tests cover the command behaviour and error paths.

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Features: [`02-features.md`](../02-features.md)
- User stories: [`03-user-stories.md`](../03-user-stories.md)

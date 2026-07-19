# dbml (Go) — Tech Stack: gofmt

`gofmt` is dbml's formatting gate. It is the Go standard formatter: no configuration file, no style flags, no exceptions. Formatting is mechanical and decided by the tool, never by review bikeshedding.

## 1. Commands

| Context          | Command                      | Effect                                   |
| ---------------- | ---------------------------- | ---------------------------------------- |
| Make target      | `make format`                | Runs `go fmt ./...` (rewrites in place)  |
| Check            | `go fmt ./...`               | Same as above; `gofmt -l .` lists drift  |
| Pre-commit       | `.husky/pre-commit`          | JS/TS only: `pnpm run lint`, `typecheck`, `format` — no Go hook |
| CI               | —                            | No format gate: the Go job runs `make lint`, `make test`, `make build-all` |

`make format` is the first step of `make all`, so the pre-handoff gate always includes it ([`../../08-tech-stack.md`](../../08-tech-stack.md) §7).

There is no lint-staged configuration in the repository and no package script invokes `gofmt`, so **Go formatting is a manual step**: run `make format` (or `make all`) before handoff. The consolidated docs describe a Husky + lint-staged `gofmt` hook and a CI gofmt check; neither exists today — see [`../../08-tech-stack.md`](../../08-tech-stack.md) §10.

## 2. Rules

- **Run it before every commit.** Never hand-format; `gofmt` output is the only accepted form.
- **No formatter config.** dbml does not adopt gofumpt, goimports, or a formatting section in the Makefile beyond `go fmt ./...`. Adding one is a decision record in [`../../08-tech-stack.md`](../../08-tech-stack.md), with the rejected alternative recorded.
- **Review never debates spacing.** A diff whose only content is indentation or alignment should not exist — the formatter already settled it.
- **Docs and non-Go files are out of scope.** The gate covers Go source only.

## 3. Why it matters here

The codebase is intentionally small and uniform (files ≤ 200 lines, table-driven tests, one import-group convention). `gofmt` keeps every file's shape identical, which is what makes generated and hand-written code indistinguishable — and what lets an agent or a human skim any file with the same expectations.

## Cross-references

- Dependency and tooling policy: [`../../08-tech-stack.md`](../../08-tech-stack.md)
- Sibling gate: [`govet.md`](govet.md)
- Quality gates (full table): [`../../09-testing-strategy/04-quality-gates.md`](../../09-testing-strategy/04-quality-gates.md)
- Deployment (CI pipeline): [`../../11-deployment.md`](../../11-deployment.md)

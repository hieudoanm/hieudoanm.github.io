# dbml (Go) — Tech Stack: go vet

`go vet` is dbml's static-analysis gate — the only one in the toolchain. It is the Go standard checker: it builds every package and reports suspicious constructs the compiler cannot reject on its own.

## 1. Commands

| Context          | Command                     | Effect                                  |
| ---------------- | --------------------------- | --------------------------------------- |
| Make target      | `make lint`                 | Runs `go vet ./...`                     |
| Direct           | `go vet ./...`              | Same check, no wrapper                  |
| Pre-commit       | —                           | No Go hook; run `make lint` before handoff |
| CI               | `lint` step                 | Fails the build on any vet finding (`make lint`) |

`make lint` is the second step of `make all`, after `format` and before `test`/`build` ([`../../08-tech-stack.md`](../../08-tech-stack.md) §7).

## 2. What it catches (relevant to this codebase)

- `Printf`-family mistakes — dbml formats output with `fmt.Fprintf`/`Errorf` everywhere (CLI messages, SVG element emission), so format/argument mismatches are the highest-value vet check here.
- Unreachable code and malformed `switch`/`select` bodies in the parser and dispatch functions.
- Wrong `struct` field or method signature usage at call boundaries between parser, generators, and transports.
- Nil-pointer dereference patterns vet can prove statically.

## 3. Rules

- **`make lint` must be clean before any handoff.** It is part of `make all` and the CI gate; there is no "vet later".
- **Vet findings are errors, not warnings.** Suppressing a vet finding (build tags, `//nolint`-style pragmas — vet does not honour those anyway) is a design smell; fix the code.
- **No additional linter by default.** golangci-lint, staticcheck, and friends are rejected as unnecessary weight for a project this size; adopting one is a decision record in [`../../08-tech-stack.md`](../../08-tech-stack.md) §2 with the rejected alternative recorded.
- **Vet is not a test gate.** It runs before `make test`; passing vet never substitutes for the behaviour tests in [`../../09-testing-strategy/04-quality-gates.md`](../../09-testing-strategy/04-quality-gates.md).

## Cross-references

- Dependency and tooling policy: [`../../08-tech-stack.md`](../../08-tech-stack.md)
- Sibling gate: [`gofmt.md`](gofmt.md)
- Quality gates (full table): [`../../09-testing-strategy/04-quality-gates.md`](../../09-testing-strategy/04-quality-gates.md)
- Deployment (CI lint stage): [`../../11-deployment.md`](../../11-deployment.md)

# dbml (Go) — Quality Gates

Every change passes the same four gates. They are Makefile targets first and CI stages second — CI runs exactly what developers run, no more and no less.

## 1. Gate table

| Gate     | Command                                             | Make target     | Catches                                        |
| -------- | --------------------------------------------------- | --------------- | ---------------------------------------------- |
| Format   | `go fmt ./...`                                      | `make format`   | Mechanical style drift                         |
| Vet      | `go vet ./...`                                      | `make lint`     | Suspicious constructs (printf mismatches, unreachable code) |
| Test     | `go test ./...`                                     | `make test`     | Behavioural regressions across all packages    |
| Build    | `CGO_ENABLED=0 go build -o bin/dbml .`              | `make build`    | Compile errors; accidental CGO dependence      |

`make all` chains `format lint test build` and is the declared pre-handoff gate ([`../08-tech-stack.md`](../08-tech-stack.md) §7). Nothing is "done" until `make all` is clean.

## 2. Extended gates

| Gate        | Command                                                       | Purpose                                      |
| ----------- | ------------------------------------------------------------- | -------------------------------------------- |
| Cross-build | `make build-all`                                              | Proves all four release platforms compile (linux/darwin × amd64/arm64) |
| Coverage    | `make coverage`                                               | HTML report + total line in `coverage/`; informational, not a threshold gate |
| Tidy        | `make tidy`                                                   | Keeps `go.mod`/`go.sum` minimal              |

There is **no coverage percentage threshold** enforced anywhere in this repository. `make coverage` reports the number; the project does not fail on it. Do not document or claim a minimum.

## 3. Where gates run

- **Locally**: `make all` before every handoff; `make test` during development.
- **Pre-commit**: the Husky hook runs `pnpm run lint`, `typecheck` and `format` for changed JS/TS packages — it never touches this Go package, so `make all` is the gate ([`../08-tech-stack.md`](../08-tech-stack.md) §10).
- **CI**: the `go` job runs `make lint`, `make test` and `make build-all`, then uploads `bin/*` — no separate format gate; the `publish` stage cuts the rolling release ([`../11-deployment.md`](../11-deployment.md)).

## 4. Rules

- A gate failure blocks the change; it is not advisory output to be triaged later.
- Red gates get fixed, not skipped: no `-skip` flags, no commented-out tests, no broad `t.Skip`.
- Every behaviour change adds or extends a test in the same change ([`06-definition-of-done.md`](06-definition-of-done.md)); the gates only stay meaningful if the suite tracks the code.
- Adding a new gate (a second linter, a coverage floor, a vulnerability scanner) is a decision record in [`../08-tech-stack.md`](../08-tech-stack.md) with the rejected alternative noted — gates are part of the dependency policy, not drive-by tooling.

## Cross-references

- Consolidated strategy: [`../09-testing-strategy.md`](../09-testing-strategy.md)
- Tooling decisions (gofmt, go vet): [`../08-tech-stack.md`](../08-tech-stack.md)
- CI pipeline: [`../11-deployment.md`](../11-deployment.md)
- Definition of done that invokes these gates: [`06-definition-of-done.md`](06-definition-of-done.md)

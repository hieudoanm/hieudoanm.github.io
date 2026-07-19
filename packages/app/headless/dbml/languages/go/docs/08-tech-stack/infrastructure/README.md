# dbml (Go) — Tech Stack: Infrastructure

Infrastructure for dbml is deliberately small: a multi-stage Dockerfile, a Makefile that owns every developer command, and a CI pipeline described in [`../../11-deployment.md`](../../11-deployment.md). There is no Terraform, no Kubernetes manifest, and no cloud object storage — all explicitly out of stack ([`../../08-tech-stack.md`](../../08-tech-stack.md) §9).

## 1. Makefile

The Makefile is the single interface for build, test, and packaging. Targets (from the repository `Makefile`):

| Target      | Command                                                     | Purpose                              |
| ----------- | ----------------------------------------------------------- | ------------------------------------ |
| `all`       | `format lint test build`                                    | The pre-handoff gate                 |
| `format`    | `go fmt ./...`                                              | Formatting                           |
| `lint`      | `go vet ./...`                                              | Static analysis                      |
| `test`      | `go test ./...`                                             | Test suite                           |
| `build`     | `CGO_ENABLED=0 go build -o bin/dbml .`                      | Static local binary                  |
| `build-all` | `GOOS/GOARCH` loop, `CGO_ENABLED=0`                         | linux/amd64, linux/arm64, darwin/amd64, darwin/arm64 into `bin/` |
| `coverage`  | `go test -coverprofile=... -covermode=atomic` + HTML report | Coverage report in `coverage/`       |
| `tidy`      | `go mod tidy`                                               | Keep `go.mod`/`go.sum` clean         |
| `install`   | build → `$(HOME)/bin/dbml`                                  | Local install                        |
| `clean`     | `rm -rf bin coverage`                                       | Remove artifacts                     |

`CGO_ENABLED=0` everywhere enforces the pure-Go, no-CGO portability rule.

## 2. Docker

The `Dockerfile` is a two-stage build:

| Stage    | Base image           | Steps                                                                  |
| -------- | -------------------- | ---------------------------------------------------------------------- |
| builder  | `golang:1.27-alpine` | `apk add git`, copy `go.mod`/`go.sum`, `go mod download`, copy tree, `CGO_ENABLED=0 go build -o /dbml .` |
| runtime  | `alpine:3.24`        | `ca-certificates`, copy binary to `/usr/local/bin/dbml`                 |

Runtime contract: `EXPOSE 8080`, `ENV PORT=8080`, `ENTRYPOINT ["dbml"]`, `CMD ["serve", "--port", "8080"]`. Because the entrypoint is the binary, every subcommand is reachable (`docker run --rm dbml sql --help`).

Known drift: [`../../08-tech-stack.md`](../../08-tech-stack.md) §5 and [`../../11-deployment.md`](../../11-deployment.md) record `golang:1.23-alpine` / `alpine:3.22` and a non-root `dbml` user (uid 10001). The Dockerfile in this snapshot pins `golang:1.27-alpine` / `alpine:3.24` and does not create a non-root user. The images above are the on-disk truth; the docs should be reconciled.

## 3. CI/CD

[`../../11-deployment.md`](../../11-deployment.md) §CI Pipeline records the pipeline as `.github/workflows/ci-app-headless-dbml.yaml`, a reusable Go template at the monorepo root (workflow files are not inside this package):

| Stage     | Steps                                                       |
| --------- | ----------------------------------------------------------- |
| `ci`      | `make lint`, `make test`, `make build-all`, upload `bin/*` (no format gate) |
| `publish` | rolling GitHub Release, tag `app-headless-dbml-latest` force-updated on every push |

Artifacts cover the four platforms listed by `make build-all`.

## 4. Rules

- The Makefile is the only supported entry point for build/test/packaging; CI calls the same targets developers call.
- Pin base images and Go module versions; never float a tag in a released artifact path.
- No infrastructure beyond Docker + GitHub Actions is justified for a single-binary demonstration tool; adding any is a decision record in [`../../08-tech-stack.md`](../../08-tech-stack.md), not a default.

## Cross-references

- Dependency and tooling policy: [`../../08-tech-stack.md`](../../08-tech-stack.md)
- Deployment detail: [`../../11-deployment.md`](../../11-deployment.md)
- Operations: [`../../12-operations.md`](../../12-operations.md)
- Quality gates using these targets: [`../../09-testing-strategy/04-quality-gates.md`](../../09-testing-strategy/04-quality-gates.md)

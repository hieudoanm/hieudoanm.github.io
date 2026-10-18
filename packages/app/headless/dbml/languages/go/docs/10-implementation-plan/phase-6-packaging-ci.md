# dbml (Go) — Phase 6: Packaging and CI

## Goal

Package the binary for distribution — container image, cross-compiled artifacts, and a rolling GitHub Release — and wire quality gates into CI.

Status: in progress (the 2026-10-17 snapshot in [`docs/README.md`](../README.md) §8 marks packaging/CI as in progress while listing the Dockerfile, cross-compilation, and CI pipeline as implemented components).

## Deliverables

| Deliverable | Location |
| ----------- | -------- |
| Multi-stage Dockerfile | `Dockerfile` |
| Cross-build target (4 platforms) | `Makefile` (`build-all`) |
| CI workflow (reusable Go template) | `.github/workflows/ci-app-headless-dbml.yaml` (repository root) |

## Cross-compilation

`make build-all` builds `CGO_ENABLED=0` binaries into `bin/` for:

| OS/arch | Artifact |
| ------- | -------- |
| linux/amd64 | `bin/dbml-linux-amd64` |
| linux/arm64 | `bin/dbml-linux-arm64` |
| darwin/amd64 | `bin/dbml-darwin-amd64` |
| darwin/arm64 | `bin/dbml-darwin-arm64` |

## Container

Two-stage build: `golang:1.27-alpine` compiles the binary, `alpine:3.24` ships it at `/usr/local/bin/dbml` with `ca-certificates`. `ENTRYPOINT` is the binary, so every subcommand is reachable; the default command is `serve --port 8080`.

## CI and release

- The workflow calls the shared reusable template with `package: packages/app/headless/dbml/languages/go`.
- Jobs: lint (`make lint`), test (`make test`), cross-build (`make build-all`), artifact upload, then a publish job that force-updates the rolling release tag `app-headless-dbml-latest` on every push.

## Acceptance criteria

- [ ] `make build-all` produces all four platform binaries without CGO.
- [ ] `docker build -t dbml .` succeeds and `docker run --rm dbml sql --help` works.
- [ ] CI runs lint/test/build-all on every push touching the package path.
- [ ] The publish job attaches prefixed artifacts (`app-headless-dbml-dbml-<os>-<arch>`) to the rolling release.

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Deployment: [`11-deployment.md`](../11-deployment.md)
- Tech stack: [`08-tech-stack.md`](../08-tech-stack.md)

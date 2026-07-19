# pagify — Phase 0: Foundation

## Goal

Establish the Go module, CLI scaffold, and project conventions.

## Deliverables

- Go module (`go.mod`, `main.go`)
- Cobra CLI scaffold with `build` command
- `AGENTS.md` conventions
- Makefile with `format`, `lint`, `test`, `build` targets
- CI workflow (GitHub Actions)

## Acceptance criteria

- `go build ./...` succeeds.
- `pagify build` runs without error on an empty directory.
- `go fmt`, `go vet`, `go test` are clean.

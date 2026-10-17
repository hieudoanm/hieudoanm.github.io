# pagify — Phase 8: Release

## Goal

Cross-platform builds and CI for public release.

## Deliverables

- Cross-platform binaries (Linux, macOS, Windows; amd64/arm64)
- `CGO_ENABLED=0` standalone builds
- GitHub Actions release workflow
- Homebrew / AUR packaging guidance

## Acceptance criteria

- `make build-all` produces archives for each platform.
- CI runs `go fmt`, `go vet`, `go test`, and cross-platform builds.
- Release assets include SHA256 checksums.

# Packaging

Landify ships as a single static Go binary. There is no container image.

## Binary

`make build` produces `bin/landify`:

```bash
cd packages/app/headless/landify/go
make build    # go build -o bin/landify .
```

The binary is pure Go (no CGO) — templates, partials and examples are embedded
with `//go:embed`, so the resulting binary is self-contained and needs no
external assets. The `landify tui` terminal editor (bubbletea) is a plain
dependency and ships in this single artifact with no build tag. The optional
`studio` fyne GUI is the only CGO binary, produced separately by
`make build-gui` as `bin/landify-gui`. There is no Dockerfile for landify; it
is intended to be run standalone or embedded in other tooling.

## CI Pipeline

`.github/workflows/ci-app-headless-landify.yaml` (reusable Go template):

| Stage     | What it does                                                            |
| --------- | ----------------------------------------------------------------------- |
| `ci`      | gofmt check, `make lint`, `make test`, `make build-all`, upload `bin/*` |
| `publish` | Publishes a rolling GitHub Release from the uploaded artifact           |

Artifacts (upload name `app-headless-landify`):

- `app-headless-landify-landify-linux-amd64`
- `app-headless-landify-landify-linux-arm64`
- `app-headless-landify-landify-darwin-amd64`
- `app-headless-landify-landify-darwin-arm64`

The release tag `app-headless-landify-latest` is force-updated on every push,
so the download URL in [DOWNLOADS](DOWNLOADS) always points at the newest
build.

## Quick start

```bash
make build
./bin/landify new
./bin/landify build
```

## Checklist

1. `go vet ./...` clean
2. `go test ./...` green
3. `gofmt -l .` empty
4. `go build -o bin/landify .` succeeds
5. `./bin/landify new && ./bin/landify build` produces a valid `index.html`

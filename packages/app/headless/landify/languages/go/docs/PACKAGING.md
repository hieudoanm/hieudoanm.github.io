# Packaging

Landify ships as a single static Go binary, with a container image for
self-hosting the preview server.

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
`make build-gui` as `bin/landify-gui`. The binary is meant to run standalone or
embedded in other tooling; the container is for the `serve` use case only.

## Container

`Dockerfile` builds on `golang:1.27.1-alpine` and ships the binary on
`alpine:3.22` as user `landify` (uid 10001). `ENTRYPOINT` is the binary, so
every subcommand is reachable:

```bash
docker build -t landify .
docker run --rm landify themes

# serve a built site, mounting it at /site
docker run --rm -p 8080:8080 -v "$PWD/public:/site:ro" landify
```

The default command is `serve --bind 0.0.0.0 --dir /site`, bound to all
interfaces because the default `127.0.0.1` is unreachable from outside the
container. `docker/Dockerfile` is a second, slimmer variant that downloads the
published release binary instead of compiling; use it when you want the
released artifact rather than the working tree.

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

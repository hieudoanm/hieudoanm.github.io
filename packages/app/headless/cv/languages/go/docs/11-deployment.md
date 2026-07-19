# Packaging

cv ships as a single static Go binary, with a container image for self-hosting
the HTTP endpoint.

## Binary

`make build` produces `bin/cv`:

```bash
cd packages/app/headless/cv/languages/go
make build    # CGO_ENABLED=0 go build -o bin/cv .
```

The binary is pure Go (no CGO) and needs no external PDF engine — HTML is
converted to PDF in-process by `gowkhtmltopdf`. It ships as a standalone
artifact with no assets beyond the `templates/` directory it reads at runtime,
so either run it from the module directory or ship `templates/` alongside it.
The container bundles both.

## Container

`Dockerfile` builds on `golang:1.27-alpine` and ships the binary on
`alpine:3.24` (with `ca-certificates`). `ENTRYPOINT` is the binary, so every
subcommand is reachable:

```bash
docker build -t cv .

# render a CV mounted from the host
docker run --rm -v "$PWD:/work" -w /work cv pdf -t classic/classic -o cv.pdf

# serve the HTTP API
docker run --rm -p 8080:8080 cv serve
```

`ENV PORT=8080` and `EXPOSE 8080` are set, and the default command is
`serve`, so the container serves `POST /pdf` and `GET /health` out of the box.
The port is read from `PORT`; override it with `-e PORT=…`.

## CI Pipeline

`.github/workflows/ci-app-headless-cv.yaml` (reusable Go template):

| Stage     | What it does                                                            |
| --------- | ----------------------------------------------------------------------- |
| `ci`      | `make lint`, `make test`, `make build-all`, upload `bin/*`              |
| `publish` | Publishes a rolling GitHub Release from the uploaded artifact           |

Artifacts (upload name `app-headless-cv`):

- `app-headless-cv-cv-linux-amd64`
- `app-headless-cv-cv-linux-arm64`
- `app-headless-cv-cv-darwin-amd64`
- `app-headless-cv-cv-darwin-arm64`

The release tag `app-headless-cv-latest` is force-updated on every push, so the
download URLs in [11-deployment/downloads.md](11-deployment/downloads.md) always
point at the newest build.

## Quick start

```bash
make build
./bin/cv init
./bin/cv pdf -t classic/classic -o cv.pdf
```

## Checklist

1. `go vet ./...` clean
2. `go test ./...` green
3. `gofmt -l .` empty
4. `go build -o bin/cv .` succeeds
5. `./bin/cv init && ./bin/cv pdf -t classic/classic -o cv.pdf` produces a valid PDF
6. `./bin/cv md -o cv.md` produces valid Markdown

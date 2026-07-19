# Packaging

Browserverless ships as a single static Go binary and an OCI container image.

## Binary

`make build` produces `bin/browserverless` with `CGO_ENABLED=0`, so the binary
is self-contained (no glibc/musl dependency) and runs on any Linux/macOS host
on amd64 and arm64.

```bash
CGO_ENABLED=0 go build -o bin/browserverless .
```

## Version stamping

`internal/version.Version` is a `var` (not a constant) and can be overridden
at build time:

```bash
go build -ldflags="-s -w -X github.com/hieudoanm/browserverless/internal/version.Version=1.2.3"
```

The Dockerfile accepts a `VERSION` build arg for this purpose.

## Cross-compilation

`make build-all` produces all four platforms into `bin/`:

```bash
make build-all
# bin/browserverless-linux-amd64   bin/browserverless-linux-arm64
# bin/browserverless-darwin-amd64  bin/browserverless-darwin-arm64
```

## Container

Two Dockerfiles produce the same runtime image — one compiles from source, the
other installs the latest published binary in seconds.

### Source build (`Dockerfile`)

A two-stage build:

1. `golang:1.27-alpine` builder compiles the binary (`CGO_ENABLED=0`,
   `-trimpath`, stripped symbols)
2. `scratch` runtime ships `/browserverless` as UID 65532, `EXPOSE 8080`

```bash
docker build -t browserverless .
docker run -p 8080:8080 browserverless
```

### Release build (`docker/Dockerfile`)

Skips the Go toolchain entirely: a `debian:trixie-slim` download stage fetches
`scripts/install.sh` from the repo and runs it, which pulls
`app-headless-browserverless-browserverless-{os}-{arch}` from the
`app-headless-browserverless-latest` GitHub release. The runtime stage is the
same `scratch` image as the source build.

- Self-contained: `install.sh` is fetched over HTTPS at build time, so the
  image builds with any context — including just the `docker/` directory, as
  deploy platforms use
- The stage defaults to `$TARGETPLATFORM`, so `uname` reports the target arch
  and `install.sh` picks the right asset (multi-arch build supported)
- `ARG REPO` overrides the GitHub repo

```bash
cd packages/app/headless/browserverless/languages/go
docker build -f docker/Dockerfile -t browserverless .
docker run -p 8080:8080 browserverless
```

Both images default the entrypoint to `serve --bind 0.0.0.0:8080`, run as
non-root UID 65532 and expose a `HEALTHCHECK` that hits `/api/v1/health` via
the `health` subcommand.

> The release build requires the go artifacts to be published to
> `app-headless-browserverless-latest` by the CI pipeline (see below). Until
> the `go` job has run on `main`, use the source build.

## CI Pipeline

`.github/workflows/ci-app-headless-browserverless.yaml` runs a `go` job that
calls the reusable workflow `ci-app-headless-go-template.yaml`:

| Input        | Value                                                     |
| ------------ | --------------------------------------------------------- |
| package      | `packages/app/headless/browserverless/languages/go`       |
| releaseName  | `app-headless-browserverless-latest`                      |
| releaseTitle | `App - Headless - Browserverless (latest)`                |
| artifactName | `app-headless-browserverless`                             |
| artifactPath | `packages/app/headless/browserverless/languages/go/bin/*` |
| installZig   | `false`                                                   |

The job runs: `make lint` → `make test` → `make build-all`, then uploads
`bin/*` as the `app-headless-browserverless` artifact.

The release tag `app-headless-browserverless-latest` is force-updated on every
push, so the download URLs in [DOWNLOADS](DOWNLOADS) always point at the
newest build.

Artifact filenames:

```
app-headless-browserverless-browserverless-linux-amd64
app-headless-browserverless-browserverless-linux-arm64
app-headless-browserverless-browserverless-darwin-amd64
app-headless-browserverless-browserverless-darwin-arm64
```

## Checklist

1. `go vet ./...` clean
2. `go test ./...` green
3. `gofmt -l .` empty
4. `CGO_ENABLED=0 go build -o bin/browserverless .` succeeds and
   `./bin/browserverless screenshot https://example.com/ -o /tmp/test.png`
   produces a valid PNG
5. `docker build -t browserverless .` succeeds and the container serves
   `/api/v1/health`

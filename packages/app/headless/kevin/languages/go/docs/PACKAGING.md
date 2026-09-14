# Packaging

KeVIN ships as a single static Go binary and an OCI container image, alongside
the C and C++ builds in the same rolling release.

## Binary

`make build` produces `bin/kevin` with `CGO_ENABLED=0`, so the binary is
self-contained (no glibc/musl dependency) and runs on any Linux/macOS host on
amd64 and arm64.

```bash
CGO_ENABLED=0 go build -o bin/kevin .
```

## Cross-compilation

`make build-all` produces all four platforms into `bin/`:

```bash
make build-all
# bin/kevin-linux-amd64  bin/kevin-linux-arm64
# bin/kevin-darwin-amd64 bin/kevin-darwin-arm64
```

## Container

The `Dockerfile` is a two-stage build:

1. `golang:1.27-alpine` builder compiles the binary (`CGO_ENABLED=0`)
2. `scratch` runtime ships `/kevin` and `EXPOSE 6379`

The entrypoint is the server binary directly — no shell, no OS layer.

## CI Pipeline

`.github/workflows/ci-app-headless-kevin.yaml` runs three jobs that all feed one
rolling release:

| Stage     | What it does                                                  |
| --------- | ------------------------------------------------------------- |
| `c`       | make lint + test + build for the C implementation             |
| `cpp`     | make lint + test + build for the C++ implementation           |
| `go`      | make lint + test + build-all for the Go implementation        |
| `publish` | Publishes a rolling GitHub Release from the uploaded binaries |

Go artifacts (upload name `app-headless-kevin-go`):

- `app-headless-kevin-go-kevin-linux-amd64`
- `app-headless-kevin-go-kevin-linux-arm64`
- `app-headless-kevin-go-kevin-darwin-amd64`
- `app-headless-kevin-go-kevin-darwin-arm64`

The release tag `app-headless-kevin-latest` is force-updated on every push, so
the download URLs in [DOWNLOADS](DOWNLOADS) always point at the newest build.

## Checklist

1. `go vet ./...` clean
2. `go test ./...` green
3. `gofmt -l .` empty
4. `CGO_ENABLED=0 go build -o bin/kevin .` succeeds and
   `printf 'PING\n' | nc 127.0.0.1 <port>` replies `PONG`
5. `docker build -t kevin-server .` succeeds and the image serves `PONG`

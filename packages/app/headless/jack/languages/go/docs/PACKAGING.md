# Packaging

Jack ships as four cross-compiled static Go binaries (linux/macOS ×
amd64/arm64). There is no container image.

## Binary

`make build` produces `bin/jack` for the native platform; `make build-all`
cross-compiles all four:

```bash
cd packages/app/headless/jack/go
make build        # → bin/jack
make build-all    # → bin/jack-{linux,darwin}-{amd64,arm64}
```

`PLATFORMS := linux/amd64 linux/arm64 darwin/amd64 darwin/arm64`. Binaries are
named `jack-{GOOS}-{GOARCH}`. Native builds use `CGO_ENABLED=1`; non-native
targets use `CC="zig cc -target <zig-arch>-<zig-os>"` with `CGO_ENABLED=1`,
where the Go arch/os map to zig targets (`amd64`→`x86_64`, `arm64`→`aarch64`,
`darwin`→`macos`, `linux`→`linux`). Windows is handled in the loop but is not
currently in `PLATFORMS`.

Version is injected with `-ldflags="-s -w -X 'github.com/hieudoanm/jack/src/cmd/version.V=<date>.<time>-<short-sha>'"`.

## CI Pipeline

`.github/workflows/ci-app-headless-jack.yaml` (reusable Go template):

| Stage     | What it does                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------ |
| `ci`      | gofmt check, `go vet` (`make lint`), `go test` (`make test`), `make build-all` (zig) — uploads `bin/*` |
| `publish` | Publishes a rolling GitHub Release from the uploaded artifacts                                         |

Artifacts (upload name `app-headless-jack`):

- `app-headless-jack-jack-linux-amd64`
- `app-headless-jack-jack-linux-arm64`
- `app-headless-jack-jack-darwin-amd64`
- `app-headless-jack-jack-darwin-arm64`

The release tag `app-headless-jack-latest` is force-updated on every push, so
the download URLs in [DOWNLOADS](DOWNLOADS) always point at the newest build.
The runner must have zig installed (`installZig: true` in the template call).

## Install script

`scripts/install.sh` downloads the matching platform binary from the rolling
release (`app-headless-jack-latest`) and installs it to `~/bin` (override with
`INSTALL_DIR`). Prefer the [DOWNLOADS](DOWNLOADS) release URLs for the current
pipeline.

## Checklist

1. `go vet ./...` clean
2. `go test ./...` green
3. `gofmt -l .` empty
4. `make build` succeeds and `bin/jack version` prints a version
5. `make build-all` (with zig) produces all four `bin/jack-{os}-{arch}`
   binaries

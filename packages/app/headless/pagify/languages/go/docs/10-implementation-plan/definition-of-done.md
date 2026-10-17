# pagify — Definition of Done

The canonical release definition of done.

A release is complete when:

- `go fmt`, `go vet`, `go test`, `go build` are clean.
- Table-driven tests cover core behaviour (parsing, discovery, URLs, nav, rendering, build output, asset copy, CLI commands, error handling).
- `pagify build` produces a static `dist/` directory deployable to any static host.
- `pagify preview` rebuilds on every request under `basePath`.
- `pagify serve` exposes `/api/v1/health`, `/api/v1/openapi.json`, `/api/v1/docs`, `/api/v1/build`.
- Generated sites work without JavaScript for basic reading.
- Cross-platform builds (Linux, macOS, Windows; amd64/arm64) succeed.
- CI runs lint, vet, test, and cross-platform builds.
- Documentation is updated when behaviour or scope changes.

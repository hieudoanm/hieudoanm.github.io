# pagify — Test Organization

One responsibility per test file. Tests live next to the package they cover:

- `internal/site/*_test.go` — discovery, page, URL, nav, resolve
- `internal/markdown/*_test.go` — render, transform, callout, title, outline
- `internal/build/*_test.go` — config, render, search, build
- `internal/theme/*_test.go` — theme loading
- `internal/server/*_test.go` — preview, serve
- `internal/workspace/*_test.go` — path confinement

Prefer table-driven test names as documentation:
`TestBuildPage_returnsHTML_forHeadingInput`.

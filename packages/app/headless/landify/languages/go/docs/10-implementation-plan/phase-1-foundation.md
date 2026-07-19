# Phase 1 — Foundation (shipped)

Go module layout (`main.go` + `cmd/` + `internal/landify/`), strict YAML
parsing (`KnownFields(true)`), Cobra CLI (`new`, `validate`, `build`,
`themes`, `preview`, `serve`, `tui`, `studio`), embedded asset pipeline
(`static/` via `//go:embed`), and shared `base-css`/`header`/`footer`
partials.

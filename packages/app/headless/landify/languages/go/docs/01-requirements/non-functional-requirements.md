# Non-functional requirements

- Pure Go default binary (no CGO, no network calls, no external services).
- Self-contained: templates, partials and examples embedded via `//go:embed`.
- Optional `landify-gui` fyne studio gated behind the `gui` build tag.
- Exactly 64 built-in theme presets; 12 page types.
- Validation failures exit 1 and list all problems at once.

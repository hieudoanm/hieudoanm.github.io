# pagify — Non-Functional Requirements

## NFR-001 — Embedded theme

The default theme is embedded in the binary with `go:embed`, so building a site needs nothing but the `pagify` executable.

## NFR-002 — Static output

Generated sites contain no backend and no runtime server dependency. They are deployable to ordinary static hosting.

## NFR-003 — No-JavaScript usability

A generated site must remain usable for reading Markdown content, navigating pages, following normal links, viewing code, viewing images, and reading tables without JavaScript.

## NFR-004 — Reproducibility

Generated output is reproducible from source: Markdown + theme + configuration → `pagify build` → `dist/`. Never commit generated `dist/` output.

## NFR-005 — Cross-platform builds

`pagify` compiles to standalone binaries for Linux, macOS, and Windows on amd64/arm64 with `CGO_ENABLED=0`.

## NFR-006 — Actionable errors

CLI errors identify what failed, which file/path was involved, and enough context for the user to fix it. Example: `pagify: failed to read docs/index.md: permission denied`.

## NFR-007 — No secrets in output

Never return stack traces, CQL, credentials, or sensitive data in responses or logs. Keep secrets out of the repository.

## NFR-008 — Accessibility

WCAG 2.1 AA: semantic HTML, keyboard navigation, visible focus states, sufficient colour contrast, reduced motion, meaningful link text.

## NFR-009 —Performance budget

Lightweight HTML, CSS, and JS. No frontend framework, no unnecessary external requests.

## NFR-010 — Behaviour-driven testing

Tests assert observable behaviour, not implementation details. Prefer table-driven Go tests covering Markdown parsing, file discovery, navigation, URLs, rendering, build output, asset copying, CLI commands, and error handling.

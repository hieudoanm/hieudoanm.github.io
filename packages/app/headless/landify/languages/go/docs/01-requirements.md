# Requirements

## Functional requirements

Landify builds a flat landing page from a single YAML content file:
- Read `landify.yaml` (overridable with `--file` / `-f`).
- Decode strictly with `yaml.Decoder.KnownFields(true)` — unknown fields are
  parse errors.
- Validate per-type required fields (`site.name`, `site.description`,
  `site.nav` ≥ 1, `footer.copyright`, plus type-specific media slots).
- Render `template-<type>.tmpl` with `html/template` and derived theme tokens.
- Write `index.html` (or `-o` output), plus `og/og.svg` when `site.og` is set.
- Serve built output statically via `landify preview` / `landify serve`.
- Expose a hand-rolled JSON-RPC 2.0 MCP server (`landify mcp serve`) on stdio.

## Non-functional requirements

- Pure Go default binary (no CGO, no network calls, no external services).
- Self-contained: templates, partials and examples embedded via `//go:embed`.
- Optional `landify-gui` fyne studio gated behind the `gui` build tag.
- Exactly 64 built-in theme presets; 12 page types.
- Validation failures exit 1 and list all problems at once.

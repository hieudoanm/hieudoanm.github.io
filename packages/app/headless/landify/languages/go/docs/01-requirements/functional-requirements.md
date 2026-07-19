# Functional requirements

Landify must build a flat landing page from a single YAML content file:
- Read `landify.yaml` (overridable with `--file` / `-f`).
- Decode strictly with `KnownFields(true)`; unknown fields are parse errors.
- Validate per-type required fields and theme hex (`#RRGGBB`).
- Render `template-<type>.tmpl` via `html/theme` with derived `:root` tokens.
- Write `index.html` (or `-o` output) and `og/og.svg` when `site.og` is set.

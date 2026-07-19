# dbml (Go) — Design System: Animation

The honest summary: dbml has no animation, and that is by design. This page records what exists, why, and the rules that apply if motion is ever introduced.

## 1. Current state: static output

- The SVG generator (`internal/dbml/svg_draw.go`) emits only `<rect>`, `<line>`, `<path>`, `<circle>`, `<marker>`, and `<text>` elements. It emits no `<animate>`, `<animateTransform>`, `<style>` block, CSS class, or SMIL timeline. The diagram is a finished frame the moment the file is written.
- The CLI has no spinner, progress bar, or animated status. Conversion is synchronous and sub-second; the only output is the terminal confirmation line printed after each file write (`cmd/sql.go`, `cmd/all.go`).
- The `serve` startup box is printed once, then the process blocks on the listener. No banner animation, no log scroll effects.
- The MCP server emits one complete JSON-RPC response line per request. There are no partial/streamed results to animate around.

## 2. Why static

- **Determinism is a test requirement.** `internal/dbml/svg_test.go` asserts exact substrings and well-formed XML on the full output. Time-dependent or randomly-varying output would break byte-for-byte reproducibility, which the product promise depends on: the same DBML in must yield the same artifact out.
- **Dependency-free rendering.** Animation would require either a CSS/SMIL payload or a JS runtime — all three are explicitly rejected in [`../../08-tech-stack.md`](../../08-tech-stack.md) (no mermaid-cli, no Graphviz, no Node.js).
- **The artifact outlives the tool.** The SVG is embedded in docs, PRs, and viewers dbml does not control; a static frame behaves identically everywhere.

## 3. Rules if motion is ever added

Forward guidance only — none of this is implemented:

- Any SVG-interaction layer (e.g. hover highlight in a future viewer) must live outside the generated file, or be additive CSS that degrades to the current static frame.
- Respect `@media (prefers-reduced-motion: reduce)`; motion is never required to understand the diagram.
- Never animate CLI output; keep the one-line-per-event contract that makes output greppable and screen-reader friendly.
- Do not break the determinism tests in `internal/dbml/svg_test.go`; if output can vary frame to frame, the tests must pin it.

## Cross-references

- UI/UX overview: [`../07-ui-ux-design.md`](../../07-ui-ux-design.md)
- Tokens (the fixed palette motion would use): [`design-tokens.md`](design-tokens.md)
- Accessibility (reduced motion): [`accessibility.md`](accessibility.md)
- Testing determinism: [`../../09-testing-strategy/05-critical-test-scenarios.md`](../../09-testing-strategy/05-critical-test-scenarios.md)

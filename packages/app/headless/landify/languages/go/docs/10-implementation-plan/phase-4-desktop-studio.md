# Phase 4 — Desktop studio (shipped)

`landify studio` fyne app behind the `gui` build tag (`make build-gui`);
split YAML editor / live HTML preview with inline validation issues; theme
studio: 64 presets, color pickers, derived-token and WCAG contrast readouts;
forms mode with per-section labelled fields; generic collection editors (add /
remove / reorder) wired to the YAML; 12 page-type selector with scaffold/apply
per type; one-click build + preview server + browser open + file-watch
auto-rebuild; multi-document tabs (new / open / close / save / save-as);
`landify tui` terminal editor (bubbletea) — a CGO-free, every-build stand-in
for the studio.

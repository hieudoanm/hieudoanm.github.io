# CV examples

Worked example used to exercise the `cv` CLI. Everything here is generated from a
single source file, so you can regenerate the whole set after a template or renderer
change.

## Files

| Path                         | Role                                                     |
| ---------------------------- | -------------------------------------------------------- |
| `cv.yaml`                    | Input CV data — the single source of truth.              |
| `cv.md`                      | Markdown render of `cv.yaml` (`cv md`).                  |
| `themes/<style>/<theme>.pdf` | One PDF per template (`cv pdf`). Generated, git-ignored. |
| `cv.sh`                      | Regenerates `cv.md` and all 64 theme PDFs.               |
| `.gitignore`                 | Ignores the generated `themes/` tree.                    |

## Regenerate everything

```bash
./cv.sh
```

The script builds `../languages/go/bin/cv` (via `make build`) and then writes
`cv.md`, followed by every `templates/<style>/<theme>.html` rendered into
`themes/<style>/<theme>.pdf`.

## Styles and themes

8 styles × 8 themes = 64 templates.

- **bands** — ember, executive, kinetic, meadow, sterling, summit, timber, wave
- **classic** — ceremony, classic, elegant, inkwell, pinnacle, terra, topaz, vintage
- **colorful** — amber, azure, glow, prism, pulse, saffron, sol, solstice
- **minimal** — align, compact, lattice, minimal, quartz, simple, slate, zen
- **natural** — flora, grove, nectar, oasis, peaks, pine, ridge, tide
- **sidebar** — aurora, beacon, clean, dusk, harbor, iris, modern, nova
- **soft** — breeze, canvas, copper, coral, marble, opal, rose, sherbet
- **specialty** — academic, bold, creative, muse, orbit, professional, sierra, technical

## Render a single theme

Templates resolve relative to the Go module directory:

```bash
cd ../languages/go
./bin/cv pdf -i ../../examples/cv.yaml -t classic/classic -o ../../examples/themes/classic/classic.pdf
```

## Requirements

- Go toolchain and `make` (to build the CLI).
- The CLI itself shells out to the local HTML-to-PDF engine; no network access is
  required.

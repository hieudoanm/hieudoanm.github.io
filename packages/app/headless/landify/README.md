# Landify

A flat, dependency-free landing page generated from a single YAML file.
Write the content in `landify.yaml`, pick one of eight built-in color themes,
and the CLI emits one self-contained HTML page — CSS inlined, emoji icons,
no JavaScript, nothing to build.

## How it works

- **One YAML file** (`landify.yaml`) feeds a Go template and produces a single
  `index.html`. Open it in a browser or drop it on any static host.
- **Eight colors in, every token out.** You author 8 base colors (and an
  optional corner radius); surfaces (`base-100/200/300`), hairlines
  (`border`/`border-soft`), and text-on-accent colors are all derived (shades,
  tints, WCAG contrast) — never `color-mix()`, plain hex only.
- **Consistent media.** The hero always renders an image and the demo always
  renders a video, both in the same 16:9 (1280 × 720) frame.

## Built-in themes

`landify build --theme <name>` overrides the YAML's `theme:` section with a
preset. Without the flag, the colors in `landify.yaml` are used as-is.

| Screenshot                                                             | Name       | Description                                      |
| ---------------------------------------------------------------------- | ---------- | ------------------------------------------------ |
| ![ocean](/packages/app/headless/landify/themes/images/ocean.png)       | `ocean`    | Cool blue-cyan accent on a misty slate canvas.   |
| ![forest](/packages/app/headless/landify/themes/images/forest.png)     | `forest`   | Moss-and-pine greens with a warm leaf accent.    |
| ![sunset](/packages/app/headless/landify/themes/images/sunset.png)     | `sunset`   | Warm orange-to-rose glow for bold branding.      |
| ![royal](/packages/app/headless/landify/themes/images/royal.png)       | `royal`    | Violet-led palette with a teal counterpoint.     |
| ![rose](/packages/app/headless/landify/themes/images/rose.png)         | `rose`     | Soft blush neutrals with a deep pink accent.     |
| ![slate](/packages/app/headless/landify/themes/images/slate.png)       | `slate`    | Monochrome graphite with a blue-tinted coolness. |
| ![sand](/packages/app/headless/landify/themes/images/sand.png)         | `sand`     | Warm clay and golden-ochre earthy palette.       |
| ![midnight](/packages/app/headless/landify/themes/images/midnight.png) | `midnight` | Inverted dark canvas lit by cyan and violet.     |

The gallery pages live in `themes/html/<name>.html` (built from
`themes/html/showcase.yaml`, one page per theme) and the captures in
`themes/images/<name>.png`.

## Quick start

```sh
cd go
make build

./bin/landify new                     # write an annotated landify.yaml
./bin/landify validate                # check it, then:
./bin/landify build --theme ocean     # ocean-colored index.html
./bin/landify serve                   # preview on http://localhost:8080
```

## Commands

| Command                                              | What it does                                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `landify new`                                        | Generate a commented `landify.yaml` placeholder (refuses to overwrite without `-F`).                         |
| `landify validate -f <file>`                         | Check the schema; lists every problem and exits 1 on failure.                                                |
| `landify build -f <file> -o <output> --theme <name>` | Validate and render the page (defaults: `landify.yaml` → `index.html`; `--theme` applies a built-in preset). |
| `landify serve -d <dir> -p <port>`                   | Serve a directory of static files over HTTP (default `.` and port `8080`); stops on Ctrl+C.                  |

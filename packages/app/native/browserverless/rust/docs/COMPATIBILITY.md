# Compatibility

Status as of 2026-08-28. These are **verified** rendering results from the current headless
pipeline (debug build, macOS arm64).

## Verified rendering targets

| Target                                          | Result                                                                                                                                                    |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `tests/rendering/mvp.html` (AGENTS §47 fixture) | Border bbox `x[50..393] y[50..193]` (344×144 = 300 + 2×20 padding + 2×2 border ✓), interior `rgb(211,211,211)`, white wallpaper. Pixel-exact against §47. |
| `file:///tmp/<red                               | green>.html` (solid-color bodies)                                                                                                                         | Exact background color in surface readback **and** saved PNG. |
| `https://example.com/`                          | `#eeeeee` background, dark text, 134 distinct sampled colors — real page.                                                                                 |
| `https://en.wikipedia.org/wiki/Philosophy`      | White article bg, `#f8f9fa` sidebar, `(32,33,34)` text, `#3366cc` link blue, ~8199 distinct sampled colors. No TLS/cert errors.                           |
| `https://www.instagram.com/p/Db-W3jykdhs/`      | Renders the logged-out post page (dark `#54575A` backdrop, white login card, Instagram blue `#4a5df9`, ~3400 distinct colors) via the surface-readback fallback. |

Note: `tests/rendering/mvp.html` requires `body { margin: 0 }` for the golden geometry;
the current fixture has it. An 8px body margin (browser default) shifts the box and breaks
the pixel checks.

## Known limitations (pre-1.0 Servo embedding)

- **One Servo instance per process.** A second `ServoBuilder::...build()` panics
  (`Already initialized`).
- **One page per `BrowserContext`.** A second page in the same process showed the first
  page's content. Single-page-per-process is the supported topology today.
- **Initial navigation must come from `WebViewBuilder::url()`.** `load()` right after
  `build()` races the constellation and is dropped (white screenshot). See
  `servo-patches.md`.
- **No network-idle condition.** Waiting is `LoadStatus::Complete` + fixed
  `wait_after_load_ms`. JS-driven or layout-late pages may need a larger wait or a
  future `wait_for_render`-style condition.
- **Screenshot of never-idle pages is racy.** `take_screenshot` only fires its callback
  once the page has **no pending frames**; continuously-animating pages (e.g.
  Instagram) never satisfy that, so it times out by design. The fallback reads the
  surfman surface first (before the take_screenshot request, which presents/rotates
  buffers) and polls for a frame with real content, but that read races the
  compositor's present cycle and can still capture an early all-white frame. Output is
  a valid PNG either way; treat such captures as best-effort.
- **Headed `open` ignores its URL argument** and hardcodes `https://example.com`.
- **`hard_fail: true` default.** Load failures time out rather than render an error page.

## Unsupported (per AGENTS.md non-goals)

DRM, WebRTC, WebGPU, PDF output, printing, PWAs, full devtools, accessibility UI, browser
profile management — all explicitly deferred. Media (video/audio) requires feature-flag and
license review (AGENTS §54); it is not enabled.

## Performance observations (debug build)

- Lightweight local/fixed pages: ~1 s end-to-end.
- Heavy pages (Wikipedia): use `--timeout 120000`; rendering completes but a debug build is
  slow. Measure with release builds before optimizing (AGENTS §35/§50).
- Binary size: measure release builds only (`cargo build --release`).

## What to re-verify after any change

1. `cargo test -p headless` (the rendering regression test).
2. The mvp golden geometry above (`screenshot file://$(pwd)/tests/rendering/mvp.html \
--output /tmp/mvp.png --width 800 --height 600 --timeout 60000`).
3. One real URL (e.g. `example.com`) to catch networking/log noise regressions.

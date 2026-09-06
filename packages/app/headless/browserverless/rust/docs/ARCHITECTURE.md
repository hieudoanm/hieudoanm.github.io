# Architecture

As of 2026-08-28 this is a **Servo-embedding** project. The custom HTML/CSS/layout/renderer
crates from an earlier prototype (`crates/css`, `crates/dom`, `crates/gui`, `crates/html`,
`crates/layout`, `crates/network`, `crates/paint`, `crates/renderer`, `crates/style`) are
**dead code** — they are not members of the Cargo workspace and are not compiled. See
`DEVELOPMENT.md` "Stale crate directories".

## Mission

One Rust codebase, one browser engine (Servo), two execution modes:

- **Headed** — interactive desktop window via winit + Servo `WindowRenderingContext`.
- **Headless** — offscreen rendering via Servo `SoftwareRenderingContext`, producing PNG screenshots.

## Workspace layout

```text
packages/app/native/browserverless/rust/
├── Cargo.toml                # workspace: members = browserverless, headless, cli
├── crates/browserverless/    # Servo integration boundary (library)
├── crates/headless/          # offscreen rendering / screenshots (library)
├── crates/cli/               # argument parsing and process startup (binary "browserverless")
├── tests/rendering/mvp.html  # AGENTS.md §47 MVP acceptance fixture
├── docs/                     # these documents
└── tasks/                    # task files (many are stale, from the custom-engine phase)
```

## Crate responsibilities

| Crate               | Responsibility                                                                 |
| ------------------- | ------------------------------------------------------------------------------ |
| `browserverless`    | Owns the Servo boundary: `BrowserContext`, `Page`, `PageDelegate`, rendering setup. Knows nothing about terminals or HTTP. |
| `headless`          | Owns offscreen execution: `HeadlessBrowser`, `HeadlessConfig`, wait-for-load/render, `screenshot_url`. Calls `browserverless` only. |
| `cli`               | Owns command parsing (clap) and process startup. Bin name is `browserverless`; compile package is `browserverless-cli`. |

Dependency direction is strictly downwards: `cli -> headless -> browserverless -> servo`.

## Core domain model

```text
HeadlessBrowser (headless)
  └── BrowserContext (browserverless)      # owns Servo instance + RenderingContext
        └── Page (browserverless)
              ├── WebView + WebViewDelegate (servo)
              └── PageHandle               # loaded / frames state shared with delegate
```

- `BrowserContext::new` builds a `SoftwareRenderingContext` sized to the viewport, then a
  `Servo` instance via `ServoBuilder::default().preferences(prefs).build()`.
- `BrowserContext::new_page(url)` builds a `WebView` with the URL supplied through
  `WebViewBuilder::url(...)`. **The initial URL must be set in the builder — see
  `servo-patches.md` for why `goto`-after-build races the constellation.**
- `Page` owns the `WebView`, the `RenderingContext`, the `Servo` clone used to spin the
  event loop, and an `Rc<PageHandle>` that the `PageDelegate` mutates.

## Plumbing / event flow (headless)

```text
new_page(url)
  → WebViewBuilder::url(url).delegate(PageDelegate).build()
  → webview.resize(viewport)
render_url(url)
  → wait_for_load  (spin servos event loop until LoadStatus::Complete)
  → wait_after_load / wait_for_render (spin until notify_new_frame_ready + paint)
screenshot / save_screenshot
  → webview.take_screenshot(None, cb)          # callback delivers RgbaImage
  → spin event loop until the callback fires
surface_readback (diagnostics/verification)
  → rendering_context.read_to_image(rect)
```

`PageDelegate::notify_new_frame_ready` calls `webview.paint()` and bumps `PageHandle.frames`.
`PageDelegate::notify_load_status_changed` sets `loaded` on `LoadStatus::Complete`.

## Surface semantics (important for pixel work)

- The software surface is **double-buffered** (surfman). `present()` swaps in a cleared
  buffer — **reading the surface after `present()` returns black**.
- Reading the surface *before* `present()` returns the pending composed frame.
- `take_screenshot`, however, reads the WebRender scene directly and is not subject to the
  swap — the saved PNG is correct regardless of `present()`.

## Headed mode

`cli/src/headed.rs` builds a `WindowRenderingContext` from the winit window, creates one
`WebView` for a **hardcoded** `https://example.com` (the CLI `open` URL argument is accepted
but ignored), and drives `servo.spin_event_loop()` on winit wake/redraw events. Per-frame:
`webview.paint()` then `rendering_context.present()`. Scroll and resize are forwarded.

## Key invariants for future agents

1. **Servo is once-per-process.** `servo-config` `opts`/`prefs` initialize once globally and
   panic on a second `ServoBuilder::...build()` in the same process.
2. **Multiple pages in one `BrowserContext` are not reliable yet.** A second `new_page()`
   in the same process captured the first page's content (test evidence). Headless and CLI
   currently create exactly one page per process. See `SERVER.md` and `servo-patches.md`.
3. `webview.paint()` only sends one async message to the paint thread; there is no per-frame
   present/poll in the library API for software contexts. Loop via `spin_event_loop()`.
4. The default `shell_background_color_rgba` is white. A page that is never navigated
   (dropped load) renders as a white image, not black.
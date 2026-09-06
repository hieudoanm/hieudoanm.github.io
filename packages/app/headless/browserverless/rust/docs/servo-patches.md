# Servo integration notes and workarounds

Servo version: pinned `servo 0.1.3` registry crates in `Cargo.lock`. Registry path on this
machine:

```text
~/.cargo/registry/src/index.crates.io-*/servo-0.1.3/
~/.cargo/registry/src/index.crates.io-*/servo-constellation-0.1.3/
```

`AGENTS.md` §44 requires every Servo workaround to be documented and accompanied by a
regression test. This file is where they live (mirrors `AGENTS.md` §60 `docs/servo-patches.md`).

## 1. Initial navigation must be set in `WebViewBuilder` (was: all-white screenshots)

### Symptom

Screenshots of any URL were uniformly white (`surface distinct_colors=1`). The webview and
surface were the right size; the page simply never appeared.

### Root cause

Constructing a `WebView` starts the pipeline and creates the top-level browsing context
**asynchronously** in the constellation. Issuing `webview.load(url)` immediately after
`WebViewBuilder::build()` sent `LoadUrl` before the browsing context was registered, and
the constellation dropped it:

```text
WARN servo_constellation::constellation] PainterId: 1, TopLevelBrowsingContext(0,1):
     LoadUrl for unknown browsing context
```

Only the initial `about:blank` page (white background — the default
`shell_background_color_rgba`) was ever rendered. `LoadUrl` looks up
`BrowsingContextId::from(webview_id)` in `self.browsing_contexts`; the registration happens
during multi-step async `NewWebView` handling, so an immediately-following `LoadUrl` misses it.

### Fix

Pass the URL at build time, which starts navigation inside `NewWebView` handling (matching
Servo's own `examples/winit_minimal.rs`):

```rust
// crates/browserverless/src/lib.rs, BrowserContext::new_page
let webview: WebView = WebViewBuilder::new(&self.servo, self.rendering_context.clone())
    .url(parsed)                 // <-- initial URL here, not webview.load()
    ...
    .build();
```

### Regression test

`crates/headless/tests/headless_rendering.rs` — asserts the surface and the saved PNG
contain the page background (red `255,0,0,255`), not an empty page.

### Caveat

`Page::goto` (later navigations) still calls `webview.load()`, but pre-spins the event loop
so the browsing context is registered before issuing the load. This is best-effort; later
navigations under load are not yet exercised by tests.

## 2. First note that `(1, 1)` in "Ready to take screenshot of (1, 1)" logs is NOT a size

The prior hypothesis (that the WebView was 1x1) was wrong. That log prints a
`PipelineId` as `(namespace_id, index)`. The WebView and surface were verified at full
viewport size throughout:

```rust
pub fn webview_size(&self) -> (f32, f32) { let s = self.webview.size(); ... } // == viewport
pub fn surface_size(&self) -> (u32, u32) { self.rendering_context.size2d() } // == viewport
```

## 3. Surfman software surface is double-buffered

- Read back **before** `present()` → pending composed frame (distinct colors).
- Read back **after** `present()` → black cleared buffer; `present()` swapped in a fresh
  buffer. Do not use post-present readback for verification.
- `WebView::take_screenshot` reads the WebRender scene directly and is immune to the swap —
  use it for the PNG output path.

## 4. `webview.paint()` is async, one message at a time

`paint()` enqueues an async paint; winit's per-frame pattern is `paint()` **then**
`rendering_context.present()`. Servo's own test harness (`tests/common/mod.rs`) uses only
`paint()` and never validates pixels. In headless mode, drive rendering by repeatedly
`servo.spin_event_loop()` + `make_current()` (see `Page::wait_for_render`), not by assuming
a synchronous compose.

## 5. One Servo instance per process (opts panic)

`servo-config` `opts::set`/`preferences` are process-global and panic on second
initialization (`Already initialized: Opts {...}`). Because of this:

- The headless rendering test is a single test (second `HeadlessBrowser::new` would panic).
- Server/concurrency code must keep to one Servo per process or fork processes (see
  `SERVER.md`).

## 6. Multiple pages in one context are not reliable

A second `new_page()` in the same `BrowserContext` captured the first page's content
(green fixture rendered as red in the test). Root cause not yet fully traced; likely
related to WR document/pipeline reuse across WebViews in one process. Until diagnosed:
one page per `BrowserContext`, one context per process (the current CLI/headless layout).

## 7. Known harmless log noise

- `WARN ... UNSUPPORTED (log once): POSSIBLE ISSUE: unit 1 GL_TEXTURE_INDEX_2D is
unloadable ...` — surfman/GL noise on macOS; screenshots render correctly.
- `webrender 0.68` `Cropping texture upload Box2D((0, 0), (0, 1))` debug asserts — harmless
  crop of near-empty rects; not the cause of any observed bug.

## 8. Load-status ↔ timeout mapping

- `load_timeout_ms` waits for `LoadStatus::Complete` via the delegate. `hard_fail: true`
  (default opts) means load failures surface as timeouts/failures rather than a rendered
  error page.
- The `HeadlessConfig`/`HeadlessError::Timeout` boundary is where navigation failures and
  timeouts are collapsed for the CLI.

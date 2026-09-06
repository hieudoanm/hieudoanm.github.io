# Headless rendering and screenshots

The headless path renders a URL to a PNG with **no window, no desktop session, and no
monitor** required. It reuses the same Servo instance setup as headed mode, differing only
in the rendering context (`SoftwareRenderingContext` instead of `WindowRenderingContext`).

## Pipeline

```text
URL
  │
  v
HeadlessBrowser::render_url(url)
  ├── BrowserContext::new_page(url)     # WebViewBuilder::url(...) → build → resize viewport
  ├── Page::wait_for_load(timeout)      # spin servo loop until LoadStatus::Complete
  └── spin loop for wait_after_load_ms  # allow layout + paint frames to settle
  │
  v
Page::save_screenshot(path)             # webview.take_screenshot → RgbaImage → PNG on disk
```

## Public API

`crates/headless/src/lib.rs`

```rust
pub struct HeadlessConfig {
    pub viewport_width: u32,
    pub viewport_height: u32,
    pub load_timeout_ms: u64,      // default 30_000
    pub wait_after_load_ms: u64,   // default 3_000
}

pub struct HeadlessBrowser;

impl HeadlessBrowser {
    pub fn new(config: HeadlessConfig) -> Result<Self, HeadlessError>;
    pub fn render_url(&self, url: &str) -> Result<Page, HeadlessError>;
    pub fn screenshot_url(&self, url: &str, output_path: &str) -> Result<(), HeadlessError>;
    pub fn dump_html(&self, url: &str) -> Result<String, HeadlessError>;
    pub fn spin_event_loop(&self);
}
```

`Page` (from `crates/browserverless/src/lib.rs`) adds:

```rust
pub fn goto(&self, url: &str) -> Result<(), BrowserError>;
pub fn wait_for_load(&self, timeout_ms: u64) -> Result<(), BrowserError>;
pub fn wait_for_render(&self, timeout_ms: u64) -> Result<(), BrowserError>;
pub fn screenshot(&self) -> Result<image::RgbaImage, BrowserError>;
pub fn save_screenshot(&self, path: &str) -> Result<(), BrowserError>;
pub fn evaluate_javascript<F>(&self, script: &str, callback: F);
pub fn surface_size(&self) -> (u32, u32);                    // rendering context size
pub fn webview_size(&self) -> (f32, f32);                    // webview render size
pub fn surface_readback(&self) -> Result<image::RgbaImage, BrowserError>; // diagnostics
pub fn present(&self) -> Result<(), BrowserError>;                          // swaps buffer
pub fn pixel_summary(img: &image::RgbaImage) -> String;                    // stats helper
```

## Waiting strategy

- `wait_for_load` spins `servo.spin_event_loop()` and `rendering_context.make_current()`
  until the delegate observes `LoadStatus::Complete`, or the deadline is hit.
- `screenshot_url` additionally spins for `wait_after_load_ms` (16ms sleep per iteration)
  so layout and paint pipe through. Timing-sensitive pages may need a larger value.
- The CLI passes `--timeout` → `load_timeout_ms`. Picture/network heavy pages need a longer
  timeout (e.g. Wikipedia: 120 000 ms for a reliable render on a debug build).

## Pixel capture — three ways

1. `take_screenshot` (what the PNG path uses). Reads the WebRender scene; returns an
   `RgbaImage` in the callback. **Always correct** regardless of surface swap state.
2. `surface_readback` — reads the software surface via `read_to_image`. **Reads the pending
   (pre-present) buffer.**
3. `pixel_summary` — debug helper printing dimensions, distinct-color count, and a few
   corner samples. Useful for eyeballing "is this a real page or a blank/white image".

Example verification (used during de-bugging of the all-white-screenshot bug):

```text
webview_size=(800, 600) surface_size=(800, 600)
readback before present: 800x600 distinct_colors=32 samples=[(0,0,255,0,0,255), ...]
```

## CLI

```bash
# Screenshot a URL at 1280x720 with a generous load timeout
cargo run -p browserverless-cli -- screenshot \
  https://en.wikipedia.org/wiki/Philosophy \
  --output /tmp/wiki.png \
  --width 1280 --height 720 \
  --timeout 120000
```

The URL is the positional argument. Flags: `--output` (default `screenshot.png`),
`--width` (1280), `--height` (720), `--timeout` (30 000) in ms. The URL must be absolute
(`file://`, `http://`, `https://`).

## Regression test

`crates/headless/tests/headless_rendering.rs` exercises the full pipeline in one test:
viewport application, surface readback containing the real document, and PNG output on disk.
Note the file's header comment — **Servo's opts are process-global, so the whole pipeline
runs in a single test**, `cargo test -p headless`.

## Configuration knobs

- `RUST_LOG=info` / `RUST_LOG=debug` to see `notify_load_status_changed`, frame-ready,
  take_screenshot size, and readback summaries.
- `device_scale_factor` lives on `BrowserConfig` (default 1.0).
- Viewport size is applied to both the `SoftwareRenderingContext` and the `WebView` via
  `webview.resize(...)`.
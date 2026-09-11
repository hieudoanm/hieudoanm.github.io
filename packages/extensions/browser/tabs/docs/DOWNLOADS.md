# Tabs

> Redirect every new tab to your home page, block distracting sites and ads, capture the current view or the full page, open external links from GitHub pages in new tabs, open every photo of an Instagram post on Shift + right-click, detect Shopify stores as you browse, and track Claude.ai API rate-limit usage — in one extension.

![Chromium](https://img.shields.io/badge/Chromium-Chrome%2FEdge%2FBrave%2FOpera%2FVivaldi%2FArc-blue)
![Firefox](https://img.shields.io/badge/Firefox-MV2-lightblue)
![MV3](https://img.shields.io/badge/Manifest-V3-green)

---

## Latest release

- **Version:** `0.0.1` — tag `extensions-browser-tabs-latest`.
- **What's new:** see the [ROADMAP](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your browser and manifest version.

### Downloads

| No  | Manifest | Format | Download Link               |
| --- | -------- | ------ | --------------------------- |
| 1   | V2       | `.crx` | [Download][download-crx-v2] |
| 2   | V3       | `.crx` | [Download][download-crx-v3] |
| 3   | V2       | `.xpi` | [Download][download-xpi-v2] |
| 4   | V3       | `.xpi` | [Download][download-xpi-v3] |
| 5   | V2       | `.zip` | [Download][download-zip-v2] |
| 6   | V3       | `.zip` | [Download][download-zip-v3] |

[download-crx-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-tabs-latest/tabs-v2.crx
[download-crx-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-tabs-latest/tabs-v3.crx
[download-xpi-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-tabs-latest/tabs-v2.xpi
[download-xpi-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-tabs-latest/tabs-v3.xpi
[download-zip-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-tabs-latest/tabs-v2.zip
[download-zip-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-tabs-latest/tabs-v3.zip

### Installation by browser

- **Chrome / Edge / Brave / Opera / Vivaldi / Arc (MV3):** open
  `chrome://extensions` (or `edge://extensions`), enable **Developer mode**,
  drag the `.crx` onto the page. For the `.zip`, click **Load unpacked** and
  select the `dist/v3` folder.
- **Firefox (MV2):** open `about:addons`, click the gear icon → **Install Add-on
  From File** and choose the `.xpi`. For the `.zip`, use `about:debugging` →
  **This Firefox** → **Load Temporary Add-on**.
- Firefox temporarily ignores signing for debugging; the `.xpi` from the
  release is signed for permanent use.

### Checksums

> 🛡️ **Verify your download.** Every asset ships with a SHA-256 digest. See
> [SHA256SUMS.txt][checksums].

[checksums]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-tabs-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/extensions/browser/tabs
pnpm install
pnpm build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Tabs combines eight tab essentials in one toolbar button. **Ads** hides ad banners on the page and cancels advertising and tracking requests at the network level (DoubleClick, Google Analytics, AppNexus, Outbrain, Taboola, and friends), toggleable from the popup. **Block** stops on an offline focus wall when you visit a distracting site (Facebook, X, Instagram, Reddit, TikTok, Netflix, Twitch, Discord, and more) — with better sites to jump to and a suggestion wheel, toggleable from the popup. **GitHub** appears only while you're on GitHub: any link that leaves github.com opens in a new tab instead of navigating away, toggleable from the popup. **Insta** appears only while you're on Instagram: Shift + right-click a
post to open every photo of it in new tabs. **Shopify** appears only while you're on a Shopify store: it tells you at a glance whether the store runs Shopify or Shopify Plus, read-only, with the full indicator breakdown. **Claude** shows your daily and weekly Claude.ai API rate-limit usage in the popup and a toolbar badge. **New Tab** redirects every fresh tab to the hieudoanm home page
(a toggle to turn it off, default on, plus a configurable target URL). **Snap** turns the same icon
into a camera — **Capture view** screenshots what's on screen, **Capture full
page** stitches the entire scrollable page from chunks on an
`OffscreenCanvas`, so even very tall articles capture cleanly across screen
sizes. Fully offline, no data leaves your
machine.

---

## Features

### 🔀 New Tab redirect

- Redirects new-tab / home / private-browsing URLs to the hieudoanm home page
- The target is configurable: set any `https://` link in the popup's New Tab
  tab (`newTabTargetUrl`, stored in `storage.sync`); defaults to
  `https://hieudoanm.github.io`
- Enable/disable from the popup (`redirectNewTabs`, stored in `storage.sync`)
- Every other URL is left completely untouched

### 🚫 Block distracting sites

- Visiting a blocked domain replaces the page with an offline focus wall
- Better sites to jump to + a suggestion wheel, all dependency-free
- Enable/disable from the popup (`blockDistractingSites`, stored in
  `storage.sync`); nothing about your browsing leaves the page

### 🛡️ Block ads & trackers

- Ad banners are hidden on the page via a `MutationObserver`
- Advertising and tracking requests are cancelled at the network level
  (`webRequest` on MV2, `declarativeNetRequest` `rules.json` on MV3)
- Enable/disable from the popup (`blockAds`, stored in `storage.sync`); fully
  offline, no rules are ever fetched

### ♟️ Chess.com focus

- On Chess.com, live-game start/over overlays, user taglines, and ratings are
  hidden so you can focus on the board
- A single `MutationObserver` re-applies hiding after Chess.com's SPA re-renders
- Enable/disable from the popup's **Chess** tab (`chessFocus`, stored in
  `storage.sync`); runs only on `chess.com`, never touches game state

### 🤖 Claude.ai rate-limit usage

- On Claude.ai, daily and weekly API rate-limit usage is read from the
  `/rate_limits` and `/usage` responses and merged into
  `localStorage['claude_limit_data']`
- A small inline indicator next to the composer shows the current percentage
  and reset time for each period
- The toolbar badge shows the higher of the two percentages only on
  `claude.ai` tabs — red ≥ 90%, amber ≥ 60%, green below
- The popup's **Claude** tab shows the same readout and the toggle
  (`claudeUsage`, stored in `storage.sync`, default on)

### 📸 Capture view

- One-click screenshot of the visible viewport
- Delivered via `downloads.download` as an image file

### 📜 Capture full page

- Scrolls and stitches the whole page with `SNAP_GET_LAYOUT`/`SNAP_SCROLL_TO`
- Chunked `OffscreenCanvas` composition preserves aspect ratio on tall pages
- Scroll position is restored after the capture

### 🔗 GitHub external links

- On GitHub, links that resolve outside `github.com` open in a new tab instead
  of navigating away
- In-repo links, `#` and `javascript:` hrefs, modifier-key clicks, and
  programmatic clicks pass through untouched
- Enable/disable from the popup's **GitHub** tab (`githubExternalLinks`, stored
  in `storage.sync`); that tab only appears while you're on `github.com`

### 📸 Open Instagram photos

- On Instagram, hold **Shift** and right-click a post image to open every photo
  of the post (including carousel siblings) in new tabs
- Plain right-clicks keep the normal context menu; the gesture is inert on
  every other site
- Enable/disable from the popup's **Insta** tab (`instaGesture`, stored in
  `storage.sync`); that tab only appears while you're on `instagram.com`

### 🏬 Detect Shopify stores

- On a Shopify store, the popup's **Shopify** tab shows whether the store runs
  Shopify or Shopify Plus, with the full indicator breakdown
- Always visible: click **Check Shopify** to get the verdict. The content
  script proactively pushes its result to the background, which caches it per
  tab and marks detected stores with an "S" toolbar badge; the popup reads
  from that cache (falling back to an in-page check) — nothing is ever
  probed before the DOM exists. `window.Shopify` is read through a tiny
  page-context probe, since the extension's isolated world can't see page
  globals
- No config

### 🖼️ About the output

- Built from the live page, so lazy-loaded content that renders counts
- Protected pages (`chrome://`, `about:`) surface a clear error instead of a
  blank capture

### 🔒 Privacy

- 100% offline — no remote resources, no analytics
- No user data collected, transmitted, or stored; the image stays on your disk

---

## First run

- Pin Tabs to the toolbar.
- Open a new tab — it lands on your home page (toggle it off in the popup if
  you prefer the browser default).
- Visit a distracting site — the focus wall appears (toggleable from the popup).
- Open a GitHub page and click a link that leaves github.com — it opens in a
  new tab instead of navigating away (toggleable from the popup).
- Open a Shopify store — the popup's Shopify tab shows whether it's Shopify or
  Shopify Plus (read-only verdict, no config needed).
- Open Claude.ai — the popup's Claude tab shows your daily and weekly usage,
  and the toolbar badge updates on api.claude.ai requests (toggleable).
- Open a news or video site — ads and tracking requests stop (toggleable from
  the popup).
- Open any page and click the icon.
- Choose **Capture view** or **Capture full page** — the image downloads.
- Try it on a long article to see the full-page stitch in action.

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and the
  manual test matrix.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).

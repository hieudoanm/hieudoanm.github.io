# Landing Page — Multi-Platform Download Page

## Overview

A landing page for downloading an app available across multiple platform types:
**Desktop** (macOS/Windows/Linux), **Mobile** (iOS/Android), and **CLI**
(npm/brew/curl). The page adapts its primary CTA to the visitor's detected
platform while giving every visitor a clear path to their build.

Goal: move a visitor from "curious" to "downloaded" with minimal friction. Every
section must earn its place.

---

## Sections

### 1. Hero

- **Headline:** Product name + one-line value prop
- **Smart CTA button:** Auto-detects visitor's OS client-side
  (`navigator.userAgent` / `navigator.platform`) and swaps button text
  accordingly:
  - `Download for macOS`
  - `Download for Windows`
  - `Get it on iOS`
  - Fallback while detecting / undetectable: generic `Download Now`
  - Reserve button width to avoid layout shift during detection
- **Secondary link:** `View all platforms ↓` — anchor-scrolls to the Platforms
  section
- **Supporting line:** version number, "Free", or "Open source" badge

### 2. Stats Bar

- Download count, GitHub stars, active users, npm weekly downloads
- Pull live numbers from GitHub/npm APIs rather than hardcoding
- Builds credibility before the visitor commits to scrolling further

### 3. Platforms

The core section — where every visitor finds and grabs their build, regardless
of what the hero detected.

- **Layout:** Tabbed or segmented control with three groups: **Desktop / Mobile
  / CLI**
- **Desktop tab:** macOS (.dmg), Windows (.exe/.msi), Linux (.deb/.AppImage) —
  each with icon, version number, file size
- **Mobile tab:** App Store badge, Google Play badge, QR code (scan from laptop
  to install on phone)
- **CLI tab:** exact install command per package manager (`brew install ...`,
  `npm install -g ...`, `curl -sL ... | sh`) in a terminal-style block with
  copy-to-clipboard
- **Data-driven:** platform list lives in a single array/config so adding a new
  target (e.g. Linux flatpak) is a data entry, not new markup
- No visitor should ever have to wonder "is there a version for me?"

### 4. Screenshots / Demo Carousel

- Real UI screenshots or a short GIF/video showing the app in action
- Highest-impact section for desktop and mobile products where visuals sell
  better than text
- Rotate through 3-5 key screens or one looping demo clip

### 5. Features Grid

- 3-6 key capabilities, each with an icon and one-liner
- Fills in what the hero's single line can't convey
- Tag platform-limited features (e.g. "System tray" = Desktop only) with a small
  badge

### 6. How It Works

- 2-3 short numbered steps covering install → first run → ready to use
- Include any real post-install step (CLI auth/config, desktop first-run
  permission grant)

### 7. Comparison Table

- vs. main alternatives, or vs. not using the tool at all (time saved,
  before/after)
- Keep to 3-5 comparison rows max — this isn't a spec sheet

### 8. Integrations

- Logos + brief description of tools the app/CLI plugs into (VS Code, CI
  pipelines, Slack, etc.)
- Skip rows for integrations that aren't real yet

### 9. Testimonials / Social Proof

- Short quotes from real users, tagged by platform where possible
- Include a "Used by" logo row if applicable

### 10. Pricing

- Show only if the product isn't fully free
- Tiered cards consistent with the rest of the design system

### 11. FAQ

- Platform/install questions only — not general marketing FAQ
- Suggested entries:
  - "Is there a Linux build?"
  - "Does the CLI work on Windows (WSL)?"
  - "How do updates work — auto or manual?"
  - "What are the minimum system requirements?"

### 12. Newsletter / Waitlist

- For platforms still in progress (e.g. "Linux — coming soon, join the
  waitlist")
- Single email field, no separate page

### 13. Final CTA Banner

- Bolder than the footer repeat — full-width, contrasting background
- Same smart download button as hero, placed right before the footer

### 14. Footer

- Repeats download button
- Links to changelog / GitHub Releases, community (Discord, GitHub Discussions,
  X/Twitter), docs, legal

---

## Section Order

1. Hero
2. Stats Bar
3. Platforms
4. Screenshots / Demo Carousel
5. Features Grid
6. How It Works
7. Comparison Table
8. Integrations
9. Testimonials / Social Proof
10. Pricing
11. FAQ
12. Newsletter / Waitlist
13. Final CTA Banner
14. Footer

---

## Implementation Notes

- Platform detection must be client-side and SSR-safe (guard against `navigator`
  being undefined during server render)
- Platform data (name, icon, download URL, version, file size) should live in a
  single structured source (JSON/array) — not hardcoded per component
- CLI install snippets use a terminal/mockup-code style block with a copy button
- Pull live version/release data from GitHub Releases API or npm registry
  instead of hardcoding
- Track per-platform button clicks to measure conversion by platform

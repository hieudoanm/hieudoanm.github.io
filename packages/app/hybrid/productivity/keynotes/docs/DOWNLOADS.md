# Open Keynotes

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-keynotes-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-keynotes-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-keynotes-latest/keynotes_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-keynotes-latest/keynotes_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-keynotes-latest/keynotes_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-keynotes-latest/keynotes_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-keynotes-latest/SHA256SUMS.txt

## About

Keynotes — an offline-first, in-browser presentation tool modeled on PowerPoint,
Google Slides, and Apple Keynote. Mock in-browser engine, no server required.

## Features

> Status legend: `[x]` implemented · `[~]` partial (see note) · `[ ]` planned
>
> See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.

## Editor

1. [~] Deck management — create, rename, delete, list; duplicate deck is a
   no-op; no deck thumbnails
2. [~] Slide management — add (10 layouts), delete, duplicate, hide, reorder via
   up/down buttons; no drag-and-drop
3. [x] Slide layouts — cover, title, title + content, two content, section,
       image, quote, comparison, thank-you, blank
4. [x] WYSIWYG canvas — text boxes, shapes (31 types incl. lines, arrows,
       callouts, stars), drag/resize/rotate, marquee & shift-click multi-select
5. [~] Rich text editing — bold, italic, underline, strikethrough, bullet &
   numbered lists, alignment, vertical align; no subscript/superscript, no
   highlight
6. [x] Undo / redo — stack-based (Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y, toolbar)
7. [x] Autosave to IndexedDB (offline-first)
8. [~] Zoom — percentage steps and Ctrl/Cmd+scroll at cursor (0.1–4×); no
   fit/fill, no pan
9. [ ] Rulers, guides, gridlines, snap-to-grid, smart alignment guides
10. [~] Page setup — 16:9, 4:3, custom width/height; no portrait/landscape

## Formatting

1. [~] Fill styles — solid, gradient (two stops + angle), pattern, opacity; no
   multi-stop gradient or image fill
2. [~] Outline/stroke — color, width, solid/dashed/dotted; no arrowheads
3. [~] Effects — drop shadow (color, blur, offset); no reflection, glow, soft
   edges, bevel
4. [ ] Quick style presets; [ ] format paintbrush
5. [~] Themes — 6 color schemes + font scheme + slide background; no variants
6. [~] Color tools — hex input; no eyedropper, no recent colors
7. [~] Font controls — family, size, bold, italic, letter-spacing, line-height;
   no columns
8. [~] Text effects — color fill and shape shadow; no WordArt/curved text
9. [x] Arrange — bring to front / send to back / forward / backward
10. [x] Align & distribute — left/center/right, top/middle/bottom, center on
        slide, distribute H/V
11. [~] Rotate — drag handle + exact angle; no 90° steps. Flip H/V
12. [x] Group / ungroup (Ctrl+G / Ctrl+Shift+G)
13. [~] Resize — drag handles + exact size in panel; aspect-lock not exposed
14. [x] Position & size panel — x/y/w/h, rotation, opacity, lock

## Content

1. [~] Images — insert by URL, border, rounded corners; no upload, drag-drop,
   paste, or crop
2. [~] Media — video/audio embed by URL
3. [~] Charts — column, bar, line, area, pie, doughnut, scatter; legend, value
   labels, JSON data + labels editing; no axis config
4. [~] Tables — rows/columns, header row/fill/color, JSON cell data; no merge,
   no interactive row/column editing
5. [~] SmartArt-style diagrams — process, cycle, hierarchy, matrix, pyramid
6. [~] Icons library — colorable icon grid (no search)
7. [x] Equations — LaTeX input rendered inline
8. [~] Freehand drawing — renderer only; not insertable from the UI
9. [ ] Screenshot capture; [ ] hyperlinks
10. [~] Embeds — YouTube, Mermaid, code snippets

## Animation & Transitions

1. [x] Entrance animations — 21 effects (fade, fly, zoom, wipe, bounce, slide,
       flip, …)
2. [~] Emphasis animations — pulse, spin, shake, blink, bounce, grow; no
   wobble/color change
3. [x] Exit animations — 10 effects (fade, zoom-out, slide, …)
4. [ ] Motion paths
5. [~] Triggers — on click, with previous, after previous; no on hover
6. [~] Timing — duration, delay, repeat, easing; no reverse
7. [~] Animation pane — assign/remove animations per object; no reorder,
   timeline, or preview
8. [ ] Text/object stagger
9. [x] Slide transitions — none, fade, push, wipe, cover, reveal, zoom, split,
       flip, cube, doors, morph
10. [~] Transition options — duration, direction (forward/backward)
11. [ ] Morph engine (label only)
12. [x] Auto-advance timings (per-slide seconds)

## Slide System

1. [x] Slide master — editable placeholder UI (Master panel) + apply to slide
2. [x] Layout library — 10 layouts
3. [x] Template gallery — startup pitch, quarterly report, lesson, wedding,
       portfolio, tech talk
4. [x] Custom slide sizes + per-slide backgrounds — solid, gradient, image (URL
       or upload)
5. [x] Header & footer — slide numbers, date, custom text; logo watermark
6. [x] Speaker notes — Markdown rendering with edit/preview
7. [x] Thumbnail strip + outline/list view
8. [x] Outline view — edit all text from a list
9. [x] Sections — create/rename/reorder/delete, assign and remove slides
10. [x] Duplicate / hide slides
11. [x] Reuse slides from other decks (picker + insert)

## Presentation

1. [x] Fullscreen presentation mode — click/keyboard/arrow advance, Esc to exit
2. [x] Presenter view — current slide, next-slide preview, notes, timer
3. [x] Timer — elapsed + cumulative deck time + clock
4. [x] Live annotations (laser, pen, highlighter, eraser)
5. [x] Blackout / whiteout; [x] spotlight zoom
6. [x] Q&A — audience submits questions in-app (mock), upvote, mark answered
7. [x] Live captions / subtitles (Web Speech API)
8. [x] Rehearsal mode — per-slide timing feedback + summary

## Import / Export

1. [x] Native JSON project files — export + import
2. [x] Export PPTX (mock archive), [x] export PDF (print route), [x] export HTML
       (self-contained presentation)
3. [x] Export PNG / SVG — per-slide and all-slides, from the editor Export menu
4. [x] Import PPTX (mock — text, images, basic shapes); [x] Google Slides import
       (mock — paste a link)
5. [x] Image story (long SVG/PNG); [x] theme/template export (.theme); [x]
       handouts (1/2/3/6 slides per printed page)

## Collaboration

1. [~] Realtime multiplayer (mock: BroadcastChannel across tabs) — provider
   level only
2. [~] Presence — peer tracking; no avatars/cursor highlights
3. [~] Threaded comments — add, reply, resolve; no @mentions
4. [~] Version history — automatic snapshots + restore API; no UI, no diff
5. [ ] Sharing links; [ ] review mode; [ ] snapshot sharing

## Platform

1. [ ] Tauri desktop build
2. [~] Offline support (IndexedDB) — no PWA service worker
3. [~] Keyboard shortcuts — undo/redo, select all, duplicate, group, delete,
   nudge, escape
4. [~] Accessibility — ARIA labels on dialogs and toolbar controls; no focus
   management, keyboard-only editing, or screen-reader announcements
5. [~] Loading states (deck open spinner)
6. [~] Responsive layout (basic)
7. [~] Dark theme (DaisyUI `night`) — no light theme toggle
8. [ ] Diagnostics (engine status, storage usage, performance)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

No LICENSE file is included for this project.

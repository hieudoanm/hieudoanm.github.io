# Roadmap

> Status legend: `[x]` implemented · `[~]` partially implemented · `[ ]` planned
>
> The roadmap is a live document — checkboxes reflect what is currently in the
> codebase, not the long-term vision.

## Phase 1 — Core Editor

> Foundation: decks, slides, canvas, text & shapes

1. [~] Deck management (create, rename, delete, list) — duplicate deck button is
   a no-op; deck list shows slide count + updated date, no thumbnails
2. [~] Slide management (add, delete, duplicate, reorder via up/down buttons) —
   no drag-and-drop or keyboard reorder
3. [x] Slide layouts (cover, title, title + content, two content, section,
       image, quote, comparison, thank-you, blank)
4. [x] WYSIWYG canvas with text boxes and shapes (rect, rounded rect, ellipse,
       triangle, arrows, callouts, stars, lines, and more)
5. [~] Rich text editing (bold, italic, underline, strikethrough, bullet &
   numbered lists, alignment) — no subscript/superscript, no highlight
6. [x] Multi-select (shift-click, marquee/lasso selection box)
7. [x] Undo / redo (stack-based, Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y + toolbar)
8. [x] Autosave to IndexedDB (offline-first, no network required)
9. [~] Zoom (percentage steps + Ctrl/Cmd+scroll at cursor, 0.1–4×) — no
   fit/fill, no pan
10. [ ] Rulers, guides, gridlines, snap-to-grid and smart alignment guides
11. [~] Page setup (16:9, 4:3, custom width/height) — no portrait/landscape
    toggle

## Phase 2 — Formatting

> Style: fills, strokes, effects, themes, arrangement

1. [~] Fill styles (solid, gradient with two stops + angle, pattern,
   transparency) — no multi-stop gradient, no image fill
2. [~] Outline/stroke (color, width, solid/dashed/dotted) — no arrowheads for
   lines
3. [~] Effects — drop shadow only (color, blur, offset X/Y); no reflection,
   glow, soft edges, 3D bevel
4. [ ] Shape style presets (quick styles palette)
5. [ ] Formatting paintbrush (copy/paste formatting to another object)
6. [~] Themes (6 color schemes + font scheme + slide background) — no theme
   variants
7. [~] Color tools (hex color input) — no eyedropper, no recent colors
8. [~] Font controls (family, size, bold, italic, letter-spacing, line-height) —
   no columns
9. [~] Text effects (text color fill, shape shadow) — no WordArt-style
   transforms or curved text
10. [x] Arrange (bring to front, send to back, bring forward, send backward)
11. [x] Align (left/center/right, top/middle/bottom, center on slide) and
        distribute (horizontal/vertical)
12. [~] Rotate (drag handle + exact angle input) and flip (horizontal/vertical)
    — no 90° step buttons
13. [x] Group / ungroup (Ctrl+G / Ctrl+Shift+G)
14. [~] Resize (drag handles, exact size in panel) — corner aspect-lock not
    exposed in the UI
15. [x] Position panel (x/y/width/height/rotation/opacity numeric input, lock)

## Phase 3 — Content Objects

> Media & data: images, charts, tables, diagrams

1. [x] Images (insert by URL or file upload, drag-drop onto the slide, paste
       from clipboard, rounded corners) — no crop
2. [~] Media (video/audio embed by URL) — no file upload
3. [~] Charts (column, bar, line, area, pie, doughnut, scatter; legend, value
   labels, data & labels editing) — no axis configuration
4. [~] Tables (rows/columns, header row/fill/color, cell data editing) — no
   merge cells, no add/remove rows & columns interactions, no styles
5. [~] SmartArt-style diagram builder (process, cycle, hierarchy, matrix,
   pyramid)
6. [~] Icons library (colorable icon grid) — no search
7. [x] Equation editor (LaTeX-style formulas rendered inline)
8. [x] Freehand drawing / ink (Draw toggle in the insert toolbar)
9. [x] Screenshot capture (capture browser tab into a slide via the toolbar)
10. [x] Hyperlinks (to slide, external URL, email; link pane in format panel)
11. [x] Embedding (YouTube, Mermaid diagrams, code snippets with syntax
        highlighting and language selector)

## Phase 4 — Animation & Transitions

> Motion: entry/exit animations, motion paths, slide transitions

1. [x] Entrance animations (fade, fly, zoom, wipe, bounce, slide, flip — 21
       effects)
2. [x] Emphasis animations (pulse, spin, shake, blink, bounce, grow, wobble,
       color change — 8 effects)
3. [x] Exit animations (fade, zoom-out, fade-direction, slide — 10 effects)
4. [x] Motion paths (preset paths: arc, loop, star; custom SVG path input)
5. [x] Animation triggers (on click, with previous, after previous, on hover)
6. [x] Animation timing (duration, delay, repeat, easing curves, reverse,
       stagger)
7. [x] Animation pane (assign/remove animations, reorder, timeline, preview)
8. [x] Object stagger (stagger delay across animated objects)
9. [x] Slide transitions (none, fade, push, wipe, cover, reveal, zoom, split,
       flip, cube, doors, morph)
10. [x] Transition options (duration, direction forward/backward, bounciness)
11. [x] Morph transition (position/size interpolation between matching objects)
12. [x] Auto-advance timings (per-slide seconds, timed or on click)

## Phase 5 — Slide System

> Structure: masters, templates, notes, branding

1. [x] Slide master (editable placeholder UI in the Master panel;
       apply-to-slide)
2. [x] Layout library (cover, title, title + content, two content, section,
       image, quote, comparison, thank-you, blank)
3. [x] Template gallery (startup pitch, quarterly report, lesson, wedding,
       portfolio, tech talk)
4. [x] Custom slide sizes and per-slide backgrounds — solid, gradient and image
       backgrounds (URL or upload)
5. [x] Header & footer (slide numbers, date, custom text) — logo watermark (URL
       or upload)
6. [x] Speaker notes (per-slide) — Markdown rendering with edit/preview
7. [x] Slide thumbnails overview (thumbnail strip + outline/list view)
8. [x] Outline/text view (edit all text from a list)
9. [x] Section grouping (create/rename/reorder/delete sections, assign and
       remove slides)
10. [x] Duplicate slide, hide slide (skipped during presentation)
11. [x] Reuse slides from other decks (picker + insert)

## Phase 6 — Presentation

> Present: fullscreen mode, presenter view, tools

1. [x] Presentation mode (fullscreen, click/keyboard/arrow advance, Esc to exit)
2. [x] Presenter view (current slide, next slide preview, notes, timer)
3. [x] Timer (elapsed + cumulative deck time + clock)
4. [x] Live annotations (laser pointer, pen, highlighter, eraser)
5. [x] Blackout / whiteout slide (press B/W)
6. [x] Slide zoom-in during presentation (Spotlight, like Keynote)
7. [x] Q&A (audience submit questions in-app, mock)
8. [x] Live captions / subtitles (Web Speech API)
9. [x] Presenter notes cue cards (Markdown notes shown in presenter view)
10. [x] Presentation rehearsal mode (timing feedback per slide)

## Phase 7 — Import / Export

> Portability: PPTX, PDF, images, HTML

1. [x] Save / load native project files (JSON export + import)
2. [x] Export to PPTX (mock: downloads a `.pptx` archive)
3. [x] Export to PDF (print route, print-ready per-slide pages)
4. [x] Export slides as PNG / SVG (per-slide + all slides, from the Export menu)
5. [x] Import PPTX (mock: parse text, images, basic shapes)
6. [x] Import from Google Slides link (mock: fetch public deck)
7. [x] Export as HTML (self-contained reveal-style presentation)
8. [x] Export as image story (long SVG/PNG screenshot)
9. [x] Export theme as a shareable `.theme` / template file
10. [x] Handouts (multiple slides per printed page, 1/2/3/6 per page)

## Phase 8 — Collaboration

> Multiplayer: realtime, comments, versioning

1. [~] Realtime multiplayer editing (mock: BroadcastChannel between tabs) —
   provider-level only, no visible realtime UI
2. [~] Presence (peer tracking in provider) — no avatars or cursor/selection
   highlights
3. [~] Comments (threaded, resolve) — no mention via @
4. [~] Version history (automatic snapshots + restore API) — no restore UI, no
   diff
5. [ ] Sharing (generate shareable link, role: view/comment/edit)
6. [ ] Review mode (accept/reject change suggestions, mock)
7. [ ] Deck export snapshot sharing

## Phase 9 — Platform & Polish

> Ecosystem: desktop, offline, accessibility

1. [ ] Tauri desktop app build (bundling, window controls)
2. [~] Offline support (IndexedDB) — no PWA service worker/manifest
3. [~] Keyboard shortcuts (undo/redo, select all, duplicate, group, delete,
   nudge, escape) — not the full set
4. [~] Accessibility (ARIA labels on dialogs and toolbar controls) — no focus
   management, keyboard-only editing, or screen-reader announcements yet
5. [~] Loading states (deck open spinner)
6. [~] Responsive layout (basic) — no tablet/mobile optimization
7. [~] Dark theme (DaisyUI `night`) — no light theme toggle
8. [ ] Diagnostics (mock engine status, storage usage, performance stats)

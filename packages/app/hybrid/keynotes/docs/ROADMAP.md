# Roadmap

## Phase 1 — Core Editor

> Foundation: decks, slides, canvas, text & shapes

1. [ ] Deck management (create, rename, duplicate, delete, list with thumbnails)
2. [ ] Slide management (add, delete, duplicate, reorder via drag-and-drop,
      keyboard)
3. [ ] Slide layouts (title, title + content, two content, section header,
      image, blank)
4. [ ] WYSIWYG canvas with text boxes and shapes (rect, rounded rect, ellipse,
      triangle, arrows, callouts, stars, lines, connectors)
5. [ ] Rich text editing (bold, italic, underline, strikethrough, subscript,
      superscript, bullet & numbered lists, highlight)
6. [ ] Multi-select (shift-click, marquee/lasso selection box)
7. [ ] Undo / redo (stack-based, keyboard + toolbar)
8. [ ] Autosave to IndexedDB (offline-first, no network required)
9. [ ] Zoom (fit, fill, percentage steps, Ctrl+scroll at cursor) and pan
10. [ ] Rulers, guides, gridlines, snap-to-grid and smart alignment guides
11. [ ] Page setup (16:9, 4:3, custom size; portrait/landscape)

## Phase 2 — Formatting

> Style: fills, strokes, effects, themes, arrangement

1. [ ] Fill styles (solid, gradient with stops, image fill, pattern,
      transparency)
2. [ ] Outline/stroke (color, width, dashed/dotted, arrowheads for lines)
3. [ ] Effects (outer/inner shadow, reflection, glow, soft edges, 3D bevel)
4. [ ] Shape style presets (quick styles palette)
5. [ ] Formatting paintbrush (copy/paste formatting to another object)
6. [ ] Themes (color scheme, font scheme, background; theme variants)
7. [ ] Color tools (eyedropper, hex/RGB input, palette, recent colors)
8. [ ] Font controls (family, size, weight, letter-spacing, line-height,
      columns)
9. [ ] Text effects (WordArt-style fills, outline, shadow, transform/curved
      text)
10. [ ] Arrange (bring to front, send to back, bring forward, send backward)
11. [ ] Align (left/center/right, top/middle/bottom, distribute evenly)
12. [ ] Rotate (free rotate, 90° steps, exact angle) and flip (horizontal/
      vertical)
13. [ ] Group / ungroup / regroup with nested groups
14. [ ] Resize (drag handles, corner aspect-lock with Shift, exact size in
      panel)
15. [ ] Position panel (x/y/size/rotation numeric input)

## Phase 3 — Content Objects

> Media & data: images, charts, tables, diagrams

1. [ ] Images (upload, drag-drop, paste from clipboard, URL insert)
2. [ ] Image editing (crop, aspect ratio presets, filters, border, rounded
      corners)
3. [ ] Media (video/audio embed from file, streaming URL, play/pause controls)
4. [ ] Charts (bar, column, line, area, pie, doughnut, scatter; legend, axis,
      data table editing)
5. [ ] Tables (insert, add/remove rows & columns, merge cells, cell fills,
      borders, table styles)
6. [ ] SmartArt-style diagram builder (process, cycle, hierarchy/org chart,
      matrix, pyramid, list)
7. [ ] Icons library (searchable, stroke/fill colorable)
8. [ ] Equation editor (LaTeX-style formulas rendered inline)
9. [ ] Freehand drawing / ink (pen, highlighter, eraser; touch + mouse)
10. [ ] Screenshot capture (capture browser tab/region into a slide)
11. [ ] Hyperlinks (to slide, external URL, email; link pane)
12. [ ] Embedding (YouTube, Mermaid diagrams, code snippets with highlight)

## Phase 4 — Animation & Transitions

> Motion: entry/exit animations, motion paths, slide transitions

1. [ ] Entrance animations (fade, fly in, zoom, wipe, bounce, spin, grow)
2. [ ] Emphasis animations (pulse, wobble, shake, spin, color change, blink)
3. [ ] Exit animations (fade out, fly out, zoom out, wipe out)
4. [ ] Motion paths (custom path drawing, preset paths: arc, loop, star)
5. [ ] Animation triggers (on click, with previous, after previous, on hover)
6. [ ] Animation timing (duration, delay, repeat, reverse, easing curves)
7. [ ] Animation pane (reorder, remove, preview, drag timeline)
8. [ ] Text/object stagger (animate paragraphs or objects individually)
9. [ ] Slide transitions (fade, push, wipe, cover, reveal, zoom, split, flip,
      cube, doors, morph)
10. [ ] Transition options (duration, direction, bounciness/speed)
11. [ ] Morph transition (smooth shape/text transition between slides)
12. [ ] Auto-advance timings (per-slide seconds, on click or timed)

## Phase 5 — Slide System

> Structure: masters, templates, notes, branding

1. [ ] Slide master with editable placeholder regions
2. [ ] Layout library (title, content, comparison, quote, thank-you, cover)
3. [ ] Template gallery (starter decks: pitch, report, lesson, wedding,
      portfolio)
4. [ ] Custom slide sizes and per-slide backgrounds (color, gradient, image)
5. [ ] Header & footer (slide numbers, date, custom text, logo watermark)
6. [ ] Speaker notes (per-slide, Markdown supported)
7. [ ] Slide thumbnails overview (grid + outline/list view)
8. [ ] Outline/text view (edit all text from a tree)
9. [ ] Section grouping (name and reorder groups of slides)
10. [ ] Duplicate slide, hide slide (skip during presentation)
11. [ ] Reuse slides from other decks (picker + insert)

## Phase 6 — Presentation

> Present: fullscreen mode, presenter view, tools

1. [ ] Presentation mode (fullscreen, click/keyboard/arrow advance, Esc to
      exit)
2. [ ] Presenter view (current slide, next slide preview, notes, timer)
3. [ ] Timer (elapsed, cumulative deck time, clock)
4. [ ] Live annotations (laser pointer, pen, highlighter, eraser)
5. [ ] Blackout / whiteout slide (press B/W)
6. [ ] Slide zoom-in during presentation (Spotlight, like Keynote)
7. [ ] Q&A (audience submit questions on the web, mock)
8. [ ] Live captions / subtitles (Web Speech API, optional)
9. [ ] Presenter notes cue cards with large type
10. [ ] Presentation rehearsal mode (timing feedback per slide)

## Phase 7 — Import / Export

> Portability: PPTX, PDF, images, HTML

1. [ ] Save / load native project files (JSON, offline-first)
2. [ ] Export to PPTX (mock: download a .pptx archive)
3. [ ] Export to PDF (print-ready, per-slide pages)
4. [ ] Export slides as PNG / SVG (individual or all, at resolution)
5. [ ] Import PPTX (mock: parse text, images, basic shapes)
6. [ ] Import from Google Slides link (mock: fetch public deck)
7. [ ] Export as HTML (self-contained reveal-style presentation)
8. [ ] Export as image story (long screenshot / zip)
9. [ ] Export theme as a shareable `.theme` / template file
10. [ ] Handouts (multiple slides per printed page)

## Phase 8 — Collaboration

> Multiplayer: realtime, comments, versioning

1. [ ] Realtime multiplayer editing (mock: BroadcastChannel between tabs)
2. [ ] Presence (avatars, cursor/selection highlights)
3. [ ] Comments (threaded, resolve, mention via @)
4. [ ] Version history (automatic snapshots, restore, diff)
5. [ ] Sharing (generate shareable link, role: view/comment/edit)
6. [ ] Review mode (accept/reject change suggestions, mock)
7. [ ] Deck export snapshot sharing

## Phase 9 — Platform & Polish

> Ecosystem: desktop, offline, accessibility

1. [ ] Tauri desktop app build (bundling, window controls)
2. [ ] PWA / offline support (service worker, installable)
3. [ ] Keyboard shortcuts (full set: navigation, insert, format, arrange)
4. [ ] Accessibility (ARIA labels, focus management, keyboard-only editing,
      screen-reader announcements)
5. [ ] Skeleton loading states and page transitions
6. [ ] Responsive layout (editable on tablet; mobile viewing mode)
7. [ ] Dark / light themes (DaisyUI + Tailwind)
8. [ ] Diagnostics (mock engine status, storage usage, performance stats)

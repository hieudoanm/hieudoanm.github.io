# Features

> Resume — minimal offline-first resume builder.

## Editing

- Accordion forms for personal, summary, experience, education, projects,
  skills, certifications, languages, interests
- Undo / redo history (debounced, persisted)
- Multiple named profiles with quick switching
- Example resumes to start from
- Drag-and-drop reordering of list items (native DnD, no library)

## Templates

- 32 offline templates with live thumbnails
- Template search with category filter chips

## Preview

- Real paper sizes: A3 · A4 · A5 · A6 · B5
- Text density (compact / normal / spacious) and accent color
- Fit-to-width zoom, manual zoom, overflow warning
- Word count and one-page-fit assistant

## Export & Import

- Download as HTML · Print / PDF (`window.print()`)
- Download as JSON / YAML · copy JSON / Text / HTML to clipboard
- Load a JSON or YAML file to replace the resume

## Persistence & Platform

- `localStorage` (`resume.data`, `resume.template`, `resume.paper`,
  `resume.theme`)
- Static PWA with service worker + Tauri desktop shell
- Dark mode (DaisyUI `night` theme, persisted)
- Keyboard shortcuts: `Cmd/Ctrl+Z` undo, `Cmd/Ctrl+Shift+Z` / `Cmd+Y` redo,
  `Cmd/Ctrl+S` download
- Responsive layout, accessible controls

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.

# Roadmap

> **Constraint:** this app is **fully offline** — no backend, no accounts, no
> network calls. Every item below (current or future) must work with zero
> connectivity. Future features may only use local storage, bundled assets, and
> on-device computation.

## Current features (v1)

| Area        | Feature                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------- |
| Editing     | Accordion forms for personal, summary, experience, education, projects, skills, certifications, languages, interests |
| Editing     | Undo / redo history (debounced, persisted)                                                                           |
| Editing     | Multiple named profiles with quick switching                                                                         |
| Editing     | Example resumes to start from                                                                                        |
| Editing     | Drag-and-drop reordering of list items (native DnD, no library)                                                      |
| Templates   | 32 offline templates with live thumbnails                                                                            |
| Templates   | Template search with category filter chips                                                                           |
| Preview     | Real paper sizes: A3 · A4 · A5 · A6 · B5                                                                             |
| Preview     | Text density (compact / normal / spacious) and accent color                                                          |
| Preview     | Fit-to-width zoom, manual zoom, overflow warning                                                                     |
| Preview     | Word count and one-page-fit assistant                                                                                |
| Export      | Download as HTML · Print / PDF (`window.print()`)                                                                    |
| Export      | Download as JSON / YAML · copy JSON / Text / HTML to clipboard                                                       |
| Import      | Load a JSON or YAML file to replace the resume                                                                       |
| Persistence | `localStorage` (`resume.data`, `resume.template`, `resume.paper`, `resume.theme`)                                    |
| Platforms   | Static PWA with service worker + Tauri desktop shell                                                                 |
| UX          | Dark mode (DaisyUI `night` theme, persisted)                                                                         |
| UX          | Keyboard shortcuts: `Cmd/Ctrl+Z` undo, `Cmd/Ctrl+Shift+Z` / `Cmd+Y` redo, `Cmd/Ctrl+S` download                      |
| UX          | Responsive layout, accessible controls                                                                               |

## Future features

Status: 🔵 planned · 🟡 in progress · ⚪ idea. All items are **offline-only**.

### Editing & data

| Status | Feature                                                               | Notes                                                 |
| ------ | --------------------------------------------------------------------- | ----------------------------------------------------- |
| 🔵     | Custom sections — add, remove, rename, and reorder top-level sections | Extends `ResumeData`; needs schema + template updates |
| 🔵     | Auto-backup / version snapshots                                       | Rotating snapshots in `localStorage` or IndexedDB     |
| 🟡     | Photo or avatar upload                                                | Stored as base64/Blob in IndexedDB, printed inline    |
| ⚪     | JSON Resume (open standard) import & export                           | Pure parsing/mapping, no network                      |
| ⚪     | Bundled spell-check dictionary                                        | On-device word list only                              |

### Preview & export

| Status | Feature                                       | Notes                                                    |
| ------ | --------------------------------------------- | -------------------------------------------------------- |
| 🔵     | Custom paper size (width × height in mm)      | Extends `data/paper.ts`                                  |
| 🟡     | Multi-page print with manual page breaks      | Print CSS + template `page-break` support                |
| ⚪     | True PDF export without a server              | Pure-JS generator or print stylesheet; no remote service |
| ⚪     | Font picker from bundled/system fonts         | Must not load web fonts                                  |
| ⚪     | Resizable side-by-side editor / preview panes | Local layout state only                                  |

### Quality & ATS

| Status | Feature             | Notes                                            |
| ------ | ------------------- | ------------------------------------------------ |
| ⚪     | ATS / keyword check | Local text analysis, no external scoring service |

### App UX

| Status | Feature                          | Notes                                      |
| ------ | -------------------------------- | ------------------------------------------ |
| 🔵     | Grow the gallery to 64 templates | All templates bundled, no remote downloads |
| ⚪     | Localized UI (en, …)             | Bundled translation files                  |

### Platform

| Status | Feature                        | Notes                                       |
| ------ | ------------------------------ | ------------------------------------------- |
| ⚪     | Tauri native save/open dialogs | `tauri-plugin-dialog` — offline, no network |

## Non-goals

The following require connectivity or a backend and are **explicitly out of
scope**: cloud sync, accounts, remote template galleries, AI/LLM features,
hosted PDF generation, analytics, or any server-side storage.

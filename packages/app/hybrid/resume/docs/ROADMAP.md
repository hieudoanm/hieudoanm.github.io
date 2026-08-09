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
| Templates   | 32 offline templates with live thumbnails                                                                            |
| Preview     | Real paper sizes: A3 · A4 · A5 · A6 · B5                                                                             |
| Preview     | Text density (compact / normal / spacious) and accent color                                                          |
| Preview     | Fit-to-width zoom, manual zoom, overflow warning                                                                     |
| Export      | Download as HTML · Print / PDF (`window.print()`)                                                                    |
| Export      | Download as JSON / YAML · copy JSON / Text / HTML to clipboard                                                       |
| Import      | Load a JSON or YAML file to replace the resume                                                                       |
| Persistence | `localStorage` (`resume.data`, `resume.template`, `resume.paper`)                                                    |
| Platforms   | Static PWA with service worker + Tauri desktop shell                                                                 |
| UX          | Responsive layout, accessible controls                                                                               |

## Future features

Status: 🔵 planned · 🟡 in progress · ⚪ idea. All items are **offline-only**.

### Editing & data

| Status | Feature                                                               | Notes                                                 |
| ------ | --------------------------------------------------------------------- | ----------------------------------------------------- |
| 🔵     | Custom sections — add, remove, rename, and reorder top-level sections | Extends `ResumeData`; needs schema + template updates |
| 🔵     | Drag-and-drop reordering of list items (experience, skills, …)        | No library; hand-rolled pointer handling              |
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

| Status | Feature                               | Notes                                              |
| ------ | ------------------------------------- | -------------------------------------------------- |
| ⚪     | ATS / keyword check                   | Local text analysis, no external scoring service   |
| ⚪     | Word count and one-page-fit assistant | Suggest density / trimming based on sheet overflow |

### App UX

| Status | Feature                                          | Notes                                       |
| ------ | ------------------------------------------------ | ------------------------------------------- |
| 🔵     | Dark mode for the app UI                         | DaisyUI theme toggle, persisted locally     |
| 🔵     | Template search & filter; grow the gallery to 50 | All templates bundled, no remote downloads  |
| ⚪     | Localized UI (en, …)                             | Bundled translation files                   |
| ⚪     | Keyboard shortcuts                               | e.g. `Cmd/Ctrl+S` export, `Cmd/Ctrl+Z` undo |

### Platform

| Status | Feature                        | Notes                                       |
| ------ | ------------------------------ | ------------------------------------------- |
| ⚪     | Tauri native save/open dialogs | `tauri-plugin-dialog` — offline, no network |

## Non-goals

The following require connectivity or a backend and are **explicitly out of
scope**: cloud sync, accounts, remote template galleries, AI/LLM features,
hosted PDF generation, analytics, or any server-side storage.

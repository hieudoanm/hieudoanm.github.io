# Architecture

## Overview

The app is a single-page-style builder under Next.js's App Router, compiled to a
fully static export (`output: 'export'`). The same `out/` folder is served by
the PWA (via `public/sw.js`) and bundled into the Tauri desktop shell
(`src-tauri/tauri.conf.json` → `frontendDist: "../out"`).

There is no server code. All behavior runs in the browser.

## Directory map

```txt
src/
  app/                     Next.js routes & metadata
    layout.tsx             Root layout (fonts, theme, SWProvider)
    page.tsx               Home — sidebar tabs + preview shell
    about/page.tsx         About page (stack + template count)
    version/page.tsx       Build version page
  components/
    resume/
      data/DataPanel.tsx   JSON/YAML import + export UI
      editor/              Accordion forms bound to ResumeData
        EditorPanel.tsx    Renders all FormAccordions
        PersonalForm.tsx   SummaryForm.tsx ExperienceForm.tsx EducationForm.tsx
        ProjectForm.tsx    SkillsForm.tsx CertificationsForm.tsx
        LanguagesForm.tsx  InterestsForm.tsx  Field.tsx  ListItemCard.tsx
      preview/
        PreviewPanel.tsx   Paper select, zoom, HTML download, Print/PDF
        ResumeSheet.tsx    Sized A4-style sheet that renders the active template
        TemplatePicker.tsx Sidebar list of templates (aria-pressed buttons)
      template/primitives.tsx  Section, TextBlock, BulletList, HeaderRow, ContactList
      templates/           32 templates + index.ts registry
    templates/             AboutTemplate, VersionTemplate, ErrorTemplate
  data/
    paper.ts               PAPER_SIZES, mmToPx, DEFAULT_PAPER_ID
    seed.ts                Sample ResumeData
  hooks/
    useLocalStorage.ts     State persisted to localStorage (SSR-safe)
    useSWRegister.ts       Registers/unregisters the service worker
  styles/                  globals.css, base.css, themes.css
  types/resume.ts          ResumeData model
  utils/
    contact.ts             collectContact(data) -> [email, phone, ...]
    export.ts              printResume(), downloadResumeHtml()
    io.ts                  serialize/parse/validate JSON & YAML, downloadTextFile
    text.ts                splitComma, splitLines, isBlank
    id.ts                  createId()
e2e/                       Playwright specs
src-tauri/                 Tauri desktop shell
```

## Data flow

1. `HomePage` (`app/page.tsx`) owns the app state via `useLocalStorage`:
   - `resume.data` → `ResumeData`
   - `resume.template` → template id (default `classic`)
   - `resume.paper` → paper id (default `a4`)
2. The **Editor** tab mutates `data` through `EditorPanel` (`onChange` →
   `setData`).
3. The **Data** tab can replace `data` wholesale from an imported JSON/YAML file
   (`DataPanel.onImport`).
4. `PreviewPanel` renders `ResumeSheet`, which resolves the active template via
   `getTemplate(templateId)` and renders it at the chosen paper size, scaled to
   fit the viewport.
5. Export:
   - **HTML** — `downloadResumeHtml` serializes `#resume-sheet.outerHTML` into a
     standalone file.
   - **Print / PDF** — `printResume` injects `@media print` CSS sized to the
     paper, then `window.print()`.

## Persistence

`useLocalStorage` (SSR-safe) reads once on first render and writes on every
change. It never throws — corrupted/unavailable storage falls back to defaults.
Data is stored as JSON; template and paper ids as strings.

## Offline model

- `next.config.ts`: `output: 'export'`, no image optimization, console stripped
  in production.
- `public/sw.js` is registered in production by `useSWRegister`; in dev it
  unregisters everything so caches never hide stale code.
- Fonts are system font stacks (Georgia, Helvetica Neue, Inter fallback, etc.) —
  nothing is fetched at runtime.
- All assets are local (`public/`), and every page is pre-rendered static HTML.

## Desktop shell

`src-tauri/` is a minimal Tauri 2 app (`lib.rs`/`main.rs` ~20 lines total). The
web build in `out/` is the entire UI; no Rust-side commands are used today.
Offline capability is inherited from the static web app — no backend is
embedded.

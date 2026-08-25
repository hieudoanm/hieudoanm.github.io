# Features

> Psychology — validated self-report psychological scales (BDI-II, BFI, DAS,
> ECR-R, GAD-7, PHQ-9, RCI-R, SWLS) as a hybrid web/desktop app.

## Project Foundation

- Monorepo scaffold following the `brainbow` app conventions
  (`packages/app/hybrid/medical/psychology`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `nothing` theme, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact

## Home & Navigation

- Card grid listing all eight scales with icons and descriptions
- Scale routes opened from home inside the shared `ToolTemplate` modal; closing
  returns to `/`
- Error shells: 404 / 403 / 401 / 500 templates plus loading state
- Offline badge driven by `useOffline`

## Scales

Every scale follows the same wizard UX — intro step → item steps with a progress
bar → results step — and every results step carries a screening disclaimer
(self-report instruments are not diagnoses).

### Beck Depression Inventory (BDI-II)

- 21 items scored 0–3 across three 7-item steps → total 0–63
- 21 published severity bands from minimal to severe depression
- Item 9 (suicidal ideation) surfaces an explicit crisis-resources alert when
  scored above zero

### Big Five Inventory (BFI)

- 44 statements on a 5-point Likert scale
- Five factor scores: Extraversion, Agreeableness, Conscientiousness,
  Neuroticism, Openness
- Reverse-keyed items flipped automatically before aggregation
- Per-factor level interpretation (low / neutral / high)

### Dyadic Adjustment Scale (DAS)

- 32 items covering relationship quality for couples
- Four subscales: Dyadic Consensus, Dyadic Satisfaction, Dyadic Cohesion,
  Affectional Expression
- Reverse-keyed subscale items handled by scoring utils
- Total score out of 151 with distressed/non-distressed interpretation at the
  published cutoff

### Experiences in Close Relationships (ECR-R)

- 36 statements on a 7-point Likert scale
- Anxiety and Avoidance dimension scores with reverse-keyed items
- Attachment-style quadrant classification (secure / preoccupied / dismissive /
  fearful) split at the 4.0 midpoint of both dimensions

### Generalized Anxiety Disorder (GAD-7)

- 7 items scored 0–3 over two steps → total 0–21
- Severity bands at 5 / 10 / 15 (mild → severe)
- Clinical-threshold flag at the published cutoff score of 10

### Patient Health Questionnaire (PHQ-9)

- 9 items scored 0–3 → total 0–27
- Published severity bands from minimal to severe depression
- Item 9 (thoughts of self-harm) surfaces an explicit crisis-resources alert
  when scored above zero

### Relationship Closeness Inventory (RCI-R)

- Multi-section instrument: weekly time spent together (hours + minutes
  entries), shared activities checklist, influence ratings, and future plans
- Influence ratings reverse-keyed per the manual before aggregation
- Time entries validated as non-negative integers

### Satisfaction With Life Scale (SWLS)

- 5 statements on a 7-point Likert scale → total 5–35
- Seven published bands from extremely dissatisfied to extremely satisfied

## Info Pages & PWA

- `/about/` — purpose, scale overview, screening disclaimer
- `/downloads/` — desktop release links (Linux `.AppImage` / `.deb`, macOS
  `.dmg`)
- `/version/` — build version display with copy-to-clipboard feedback
- Installable PWA: manifest + icons generated from the Tauri icon set
- Service worker caches the shell and scale routes for offline use

## Desktop (Tauri)

- Auto-update checks via `tauri-plugin-updater`
- Native dialogs via `tauri-plugin-dialog`
- Notifications via `tauri-plugin-notification`

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.

# Psychology

> Eight validated self-report instruments (BDI-II, BFI, DAS, ECR-R, GAD-7,
> PHQ-9, RCI-R, SWLS) wrapped in one friendly, guided wizard. Screening that runs
> everywhere: phone, tablet, laptop, and desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────────┐
│  PHQ-9   Step 2 of 3   ████████░░  7/9       │
├──────────────────────────────────────────────┤
│  Over the last 2 weeks, how often...         │
│                                              │
│  ( ) Not at all      ( ) Several days        │
│  ( ) More than half  ( ) Nearly every day    │
│                                              │
│  Result: score 12 · moderate — see your       │
│  healthcare provider.                        │
│          [ ← Back ]      [ Next → ]          │
└──────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-medical-psychology-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your device — Android phones install the `.apk`, and
Linux/macOS/Windows grab their native package below.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                     | Note |
| --- | -------- | ------ | ------------ | ------------ | --------------------------------- | ---- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]   | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹  | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]   | |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²  | Apple Silicon |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]   | |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-psychology-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-psychology-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-psychology-latest/psychology_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-psychology-latest/psychology_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-psychology-latest/psychology_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-psychology-latest/psychology_x64.msi

<br>

¹ `.aab` is for uploading to the Google Play Store — use the `.apk` to install
directly.
² `.dmg` is built for Apple Silicon.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-psychology-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/medical/psychology
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

## First Run

Per-platform launch tips:

- **macOS** — right-click the `.dmg` then **Open** to bypass Gatekeeper the
  first time, or find the app bundle inside.
- **Linux** — make it runnable: `chmod +x psychology_amd64.AppImage` then
  double-click.
- **Windows** — SmartScreen may warn; choose **More info → Run anyway**.
- **Android** — if Play Protect warns, tap **Install anyway**.

---

## About

Screening that's kind, clear, and guided. Psychology packages eight validated
self-report scales — BDI-II, BFI, DAS, ECR-R, GAD-7, PHQ-9, RCI-R and SWLS —
into a step-by-step wizard (intro → items → results) that works on any screen,
always reminding you these are screening tools, not diagnoses.

---

## Features

Everyone gets the same friendly wizard, intro to results, with a disclaimer
built in.

### 🧱 Project Foundation

- Monorepo scaffold following the `brainbow` app conventions
  (`packages/app/hybrid/medical/psychology`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `nothing` theme, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact

### 🏠 Home & Navigation

- Card grid listing all eight scales with icons and descriptions
- Scale routes opened from home inside the shared `ToolTemplate` modal; closing
  returns to `/`
- Error shells: 404 / 403 / 401 / 500 templates plus loading state
- Offline badge driven by `useOffline`

### 📋 Scales

Every scale follows the same wizard UX — intro step → item steps with a progress
bar → results step — and every results step carries a screening disclaimer
(self-report instruments are not diagnoses).

#### Beck Depression Inventory (BDI-II)

- 21 items scored 0–3 across three 7-item steps → total 0–63
- 21 published severity bands from minimal to severe depression
- Item 9 (suicidal ideation) surfaces an explicit crisis-resources alert when
  scored above zero

#### Big Five Inventory (BFI)

- 44 statements on a 5-point Likert scale
- Five factor scores: Extraversion, Agreeableness, Conscientiousness,
  Neuroticism, Openness
- Reverse-keyed items flipped automatically before aggregation
- Per-factor level interpretation (low / neutral / high)

#### Dyadic Adjustment Scale (DAS)

- 32 items covering relationship quality for couples
- Four subscales: Dyadic Consensus, Dyadic Satisfaction, Dyadic Cohesion,
  Affectional Expression
- Reverse-keyed subscale items handled by scoring utils
- Total score out of 151 with distressed/non-distressed interpretation at the
  published cutoff

#### Experiences in Close Relationships (ECR-R)

- 36 statements on a 7-point Likert scale
- Anxiety and Avoidance dimension scores with reverse-keyed items
- Attachment-style quadrant classification (secure / preoccupied / dismissive /
  fearful) split at the 4.0 midpoint of both dimensions

#### Generalized Anxiety Disorder (GAD-7)

- 7 items scored 0–3 over two steps → total 0–21
- Severity bands at 5 / 10 / 15 (mild → severe)
- Clinical-threshold flag at the published cutoff score of 10

#### Patient Health Questionnaire (PHQ-9)

- 9 items scored 0–3 → total 0–27
- Published severity bands from minimal to severe depression
- Item 9 (thoughts of self-harm) surfaces an explicit crisis-resources alert
  when scored above zero

#### Relationship Closeness Inventory (RCI-R)

- Multi-section instrument: weekly time spent together (hours + minutes
  entries), shared activities checklist, influence ratings, and future plans
- Influence ratings reverse-keyed per the manual before aggregation
- Time entries validated as non-negative integers

#### Satisfaction With Life Scale (SWLS)

- 5 statements on a 7-point Likert scale → total 5–35
- Seven published bands from extremely dissatisfied to extremely satisfied

### ℹ️ Info Pages & PWA

- `/about/` — purpose, scale overview, screening disclaimer
- `/downloads/` — desktop release links (Linux `.AppImage` / `.deb`, macOS
  `.dmg`)
- `/version/` — build version display with copy-to-clipboard feedback
- Installable PWA: manifest + icons generated from the Tauri icon set
- Service worker caches the shell and scale routes for offline use

### 🖥️ Desktop (Tauri)

- Auto-update checks via `tauri-plugin-updater`
- Native dialogs via `tauri-plugin-dialog`
- Notifications via `tauri-plugin-notification`

---

## First run

---

## Next steps

- [CONTRIBUTING](CONTRIBUTING) — set up the dev environment and start tinkering.
- [ROADMAP](ROADMAP) — see what's coming next on the roadmap.

---

## License

See [LICENSE](LICENSE).
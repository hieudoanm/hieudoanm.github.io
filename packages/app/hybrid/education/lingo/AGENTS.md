# Lingo

Duolingo-style language learning: vocabulary, dictionary, sign-language
recognition and an ear-training music game. Next.js 16 + React 19 + Tailwind CSS
4 (DaisyUI 5) desktop/web app packaged with Tauri 2.

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                                      |
| ---------------------- | ----------------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, directory structure, routing, state management  |
| `docs/ROADMAP.md`      | Phased feature roadmap (shipped items)                      |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions         |
| `docs/PACKAGING.md`    | Packaging checklist per platform                            |
| `docs/DOWNLOADS.md`    | Download links + feature inventory per platform (generated) |

## Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `badge`, etc.)
- Light theme as default (`data-theme="lingo"` on `<html>`), toggleable with
  `lingo-dark`; persisted in localStorage under `lingo:theme`
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → games → templates
- Each game is a self-contained folder under `src/games/`: `index.tsx` (UI) and
  `utils.ts` (pure data + logic, zero UI imports)
- Games are standalone — no `onClose` prop; pages render them directly
- `/languages` is a language hub (Duolingo-style list); the flashcard deck lives
  at `/languages/[language]`, pre-rendered via `generateStaticParams`
- Offline detection is inlined in `OfflineBadge` (no shared hook)
- Progress (XP + streak) lives in IndexedDB via `src/lib/progress.ts`; scoring
  is pure (`applyActivity`) and never recomputed in components
- Static assets are fetched at runtime from `public/data/`, `public/models/` and
  `public/audio/` through `src/lib/publicPaths.ts`, which respects the web
  deployment's `BASE_PATH`
- `console.*` stripped in production via `compiler.removeConsole`
- The `/music` game (migrated from the `music` app) stores its high score in
  `localStorage['music-high-score']`; levels 1–7 are white keys only, black keys
  appear from level 8

## Commands

```bash
pnpm dev           # Next.js dev server (Turbopack)
pnpm build         # Static export to out/
pnpm test          # Jest unit tests (80% coverage thresholds)
pnpm test:e2e      # Playwright e2e tests
pnpm lint          # ESLint with fixes
pnpm format        # Prettier
pnpm tauri dev|build # Desktop app via Tauri CLI
```

## Structure

```txt
src/app/            # App Router pages — (auth)/ (games)/ (info) route groups; /languages /music /maths /chemistry /engineering /colors /history /economics /geography /psychology /neuroscience /ophthalmology
src/components/
  atoms/            # Button, Badge, OfflineBadge, ThemeToggle
  organisms/        # Header
  templates/        # HomeTemplate, TheoryTemplate/GamesTemplate, About/Downloads/Version/ErrorTemplate
src/content/        # about/download/version copy
src/games/          # grouped by subject, mirroring the app route groups:
  arts/             # colors, music
  health/           # ophthalmology, psychology
  humanities/       # economics, geography, history, languages (incl. sign/, english/)
  stem/             # chemistry, engineering, maths, neuroscience
src/notes/          # standalone Markdown authoring docs mirroring the theory pages, one .md per page, indexed by src/notes/TREE.md — not rendered by the app
src/hooks/          # useTheme, useSWRegister, useUpdater
src/lib/            # progress (IndexedDB), native bridge, publicPaths
src/providers/      # SWProvider, NativeProvider, QueryProvider
src/styles/         # globals.css (tailwind), base.css, themes.css
src-tauri/          # Tauri shell (updater + dialog + notification plugins)
public/             # manifest.json, sw.js, icons, data/, models/, audio/
e2e/                # Playwright specs
```

## Routes

Routes are sorted alphabetically; hub descendants are nested bullets.

- `/` — home hub
- `/about` — about page
- `/chemistry`
  - `/chemistry/periodic-table` — periodic table explorer
- `/colors` — migrated from the `colors` app
  - `/colors/<theory>` — theory: models, harmony, perception, scales, css
  - `/colors/<theory>/<tool>` — tools as standalone components under
    `src/games/colors/` with shared atoms in `src/games/colors/shared/` and pure
    color math in `src/games/colors/colors.ts`, broken down per theory:
    - models: converter, adjuster, random
    - harmony: wheel, schemes, mixer
    - perception: contrast, color-blindness, temperature
    - scales: shades-tints, tint-shade-tone, opacity, css-scale
    - css: gradient, palette, theme
- `/downloads` — downloads page
- `/economics` — economics hub
  - `/economics/<category>` — theory per category; the five subfields are route
    groups — `(microeconomics)`, `(macroeconomics)`, `(game-theory)`,
    `(behavioral-economics)`, `(markets-and-public-policy)` — so URLs stay flat
  - `/economics/<category>/<game>` — interactive game per topic; the games
    mirror those five subfields as plain folders under
    `src/games/humanities/economics/`, with the catalogue in
    `src/games/humanities/economics/data.ts`
- `/engineering` — engineering hub (single hub; one theory page per topic, each
  with a matching `/interactive`)
  - `/engineering/<algorithm>` — theory: binary-search, bubble-sort, heap-sort,
    insertion-sort, linear-search, merge-sort, quick-sort, selection-sort
  - `/engineering/<data-structure>` — theory: array, disjoint-set,
    fenwick-trees, hash-tables, linked-lists, queues, segment-trees, stacks,
    suffix-arrays, trie
  - `/engineering/<topic>/interactive` — simulator per topic, under
    `src/games/stem/engineering/<group>/<topic>/` with shared pieces in
    `src/games/stem/engineering/shared/`

  `(algorithms)` and `(data-structures)` are route groups, so the URLs stay flat
  under `/engineering` while the code stays grouped; the hub links to all 18
  topics. Games follow the same grouping and drop the parentheses, since nothing
  routes there.

- `/forget-password` — password recovery
- `/geography` — geography hub
  - `/geography/connections`
  - `/geography/guess`
  - `/geography/higher-or-lower`
  - `/geography/sort-continents`
  - `/geography/wordle`
- `/history` — history hub
  - `/history/myth-vs-fact`
  - `/history/through-the-years`
- `/languages` — language hub (Duolingo-style list)
  - `/languages/[language]` — flashcard deck, pre-rendered via
    `generateStaticParams`
  - `/languages/english` — dictionary
  - `/languages/sign` — sign-language recognition
- `/maths` — maths hub
  - `/maths/attractors` — 3-D strange-attractor particle visualisation (migrated
    from the docs app)
  - `/maths/cyclic` — cyclic number 142857
  - `/maths/fibonacci-sequence` — golden-ratio convergence and Zeckendorf
    decomposition
  - `/maths/kaprekar-constant` — Kaprekar constant routine
  - `/maths/prime-numbers` — sieve of Eratosthenes, prime gaps, twin primes
  - `/maths/probability` — probability-theory note (migrated from the gambling
    app); links ten casino simulations that make expected value, variance and
    the gambler's fallacy concrete
    - `/maths/probability/<game>` — `baccarat`, `card-counter`, `craps`,
      `hi-lo`, `keno`, `over-under-seven`, `poker-odds`, `roulette`,
      `slot-machine`, `war`; implementations live in
      `src/games/stem/maths/probability/<game>/`, with card and dice primitives
      shared under `probability/_shared/`
- `/music` — ear-training game (migrated from the `music` app)
  - `/music/pitch` — pitch training
- `/neuroscience` — neuroscience hub
  - `/neuroscience/brain-atlas` — anatomical index; one page per division
  - `/neuroscience/brain-atlas/<division>` — cerebral-cortex, white-matter,
    basal-ganglia, limbic-structures, corpus-callosum, diencephalon, cerebellum,
    brainstem
  - `/neuroscience/brain-atlas/interactive` — depth-scrub explorer over the same
    anatomical tree (`src/games/stem/neuroscience/anatomy/brain-atlas/`)
  - `/neuroscience/<model>` — theory: drift-diffusion-model (plus hierarchical-,
    leaky-competing-, linear-ballistic-, attentional- variants) and race-models
  - `/neuroscience/<model>/interactive` — interactive per model
  - `/neuroscience/eeg`, `/neuroscience/qeeg` — EEG and its quantitative
    counterpart, each with `/interactive`
  - `/neuroscience/meg`, `/neuroscience/opm-meg` — MEG and optically pumped MEG,
    each with `/interactive`
  - `/neuroscience/mri`, `/neuroscience/fmri`, `/neuroscience/fnirs` — MRI
    structural/functional and near-infrared spectroscopy; `/mri` has
    `/interactive`
  - `/neuroscience/<task>` — experimental tasks: flanker, lexical-decision,
    memory-recognition, numerical-comparison, random-dot-motion, stroop,
    visual-search

  Its games mirror these groups one-for-one under
  `src/games/stem/neuroscience/`: `anatomy/`, `neuroimaging/{eeg,meg,mri}/`,
  `theory/`, plus `shared/` for components used across groups. Route groups are
  `(anatomy)` and friends; the games drop the parentheses because nothing routes
  there. Two asymmetries are expected: the `(tasks)` routes have no game code,
  and `qeeg`/`fmri`/`fnirs` are reference-only. A game folder that needs another
  game's internals is a signal to promote the piece to `shared/`.

- `/ophthalmology` — migrated from the `eyes` app as standalone components under
  `src/games/ophthalmology/`
  - `/ophthalmology/vision` — theory
  - `/ophthalmology/vision/<chart>` — visual acuity tests:
    - logmar
    - snellen
    - tumbling-e
- `/profile` — user profile
- `/psychology` — psychology hub
  - `/psychology/<theory>` — theory: biology, cognitive, developmental, social
  - `/psychology/<theory>/<topic>` — per-topic theory notes; `cognitive` covers
    attention, learning, memory, perception, and reasoning, each backed by a
    note in `src/notes/health/psychology/theory/cognitive/`
  - `/psychology/<theory>/<topic>/<exercise>` — exercises as standalone
    components under `src/games/health/psychology/<theory>/<topic>/`; the
    cognitive memory drills are `memory-match`, `n-back`, `pi`, and `recall`
  - `/psychology/<practice>` — practices: counselling, journaling, mindfulness
  - `/psychology/<scale>` — screening instruments, not diagnostics:
    - beck-depression-inventory
    - big-five-inventory
    - dyadic-adjustment-scale
    - experiences-in-close-relationships
    - generalized-anxiety-disorder
    - patient-health-questionnaire
    - relationship-closeness-inventory
    - satisfaction-with-life
- `/reset-password` — password reset
- `/sign-in` — login
- `/sign-up` — registration
- `/version` — version info

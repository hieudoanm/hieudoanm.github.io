# Foody

Can't decide what to eat? A food randomizer that spins a reel of dishes across
world cuisines, built with Next.js and Tauri.

## Commands

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `pnpm run dev`       | Start the development server              |
| `pnpm run build`     | Production build with type checking       |
| `pnpm run lint`      | ESLint and Prettier checks                |
| `pnpm run test`      | Unit tests with coverage (80% thresholds) |
| `pnpm run test:e2e`  | Playwright end-to-end tests               |
| `pnpm run tauri dev` | Run the Tauri desktop shell               |

## Key Conventions

- The randomizer feature is wired up in
  `src/components/organisms/randomizer/` (the `FoodRandomizer` organism), and
  its reusable pieces live in `src/components/molecules/` (`CuisineSelect`,
  `HowToModal`, `Reel`) and `src/hooks/` (`useFoodPicker`).
- Jest treats every file inside `__tests__/` as a suite: keep shared fixtures in
  `<feature>/testing/`, not in `__tests__/`.
- Pages are thin: they compose templates (`HomeTemplate`) and feature
  components.
- Path alias `@/*` maps to `./src/*`.
- DaisyUI themes are `foody` (light) and `foody-dark`; the theme init script in
  `layout.tsx` reads `localStorage['foody:theme']`.
- Shared infrastructure mirrors `education/lingo`: providers (`SWProvider`,
  `NativeProvider`, `QueryProvider`), atoms (`Badge`, `OfflineBadge`,
  `ThemeToggle`), hooks and libs live in the same locations.
- The Tauri shell registers dialog, notification and updater plugins; native
  bridges go through `src/lib/native/index.ts`.

## Data

Static food data lives in `src/data/`. The 32 dishes are the source of truth in
`src/data/foods.csv` (edit the CSV, then run `pnpm foods:convert` to regenerate
`src/data/foods.json`, which the app consumes). Each food has
`{ emoji, value, label, category }`. Types (`Cuisine`, `Food`, `ScheduleEntry`),
cuisines (`CUISINES`) and the Sheldon schedule (`SHELDON_SCHEDULE`) are also
exported from `src/data/`. `FOOD_OPTIONS` maps each cuisine plus `all` to label
lists used by the reel and picker.

## Documentation

| Document        | Description                                  |
| --------------- | -------------------------------------------- |
| [docs](./docs/) | Architecture notes and feature documentation |

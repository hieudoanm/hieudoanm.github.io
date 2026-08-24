# Features

> Foody — Can't decide what to eat? Spin the reel and let fate pick your next
> meal, as a hybrid web/desktop app.

## Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/food-drink/foody`)
- Next.js static export validated against Tauri's `out` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `foody` theme (light default) with `foody-dark`
  toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

## Home & Navigation

- Card grid listing the Food Randomizer tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

## Food Randomizer

- Slot-machine style reel cycling dish names while spinning
- 32 dishes across six cuisines: Italy, Korea, Japan, Thailand, Vietnam and
  Mexico (`randomizer/constants.ts`)
- Cuisine picker with search, cuisine filter chips and expandable groups;
  supports locking a single dish before spinning
- Spin via button or keyboard (Space / Enter); ignored while typing
- Landed dishes link to a Google search for quick research
- How-to-play modal explaining the flow
- Local spin counter shown under the reel

## Data Model

- `Cuisine { emoji, value, label }` and `Food { emoji, value, label, category }`
- `FOOD_OPTIONS` maps every cuisine plus `all` to dish label lists used by the
  reel animation and random pick

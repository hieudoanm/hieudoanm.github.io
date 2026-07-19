# Foody

> Can't decide what to eat? Spin the reel and let fate pick your next meal.

A hybrid web/desktop food randomizer built with Next.js, Tailwind CSS, DaisyUI
and Tauri.

## Features

- Slot-machine reel of 32 dishes across six cuisines (Italy 🇮🇹, Korea 🇰🇷, Japan
  🇯🇵, Thailand 🇹🇭, Vietnam 🇻🇳, Mexico 🇲🇽)
- Cuisine picker with search, filter chips and expandable groups
- Spin with a button or Space / Enter; landed dishes link to Google search
- Light `foody` / dark `foody-dark` themes with persisted preference

## Development

```bash
pnpm install
pnpm run dev        # web dev server on :3000
pnpm run test       # unit tests with coverage thresholds (80%)
pnpm run lint       # eslint + prettier
pnpm run build      # static export to out/
pnpm run tauri dev  # desktop shell
```

See [docs/](./docs/) for architecture, features and packaging notes.

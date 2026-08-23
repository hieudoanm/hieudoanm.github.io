# Tree

```txt
casino/
├── docs/                            # ARCHITECTURE, FEATURES, ROADMAP,
│                                    # CONTRIBUTING, DOWNLOADS
├── e2e/                             # Playwright specs (planned)
├── public/                          # Icons, manifest, Tauri assets
├── src/
│   ├── app/
│   │   ├── (games)/                 # One route per game
│   │   │   ├── baccarat/page.tsx
│   │   │   ├── card-counter/page.tsx
│   │   │   ├── craps/page.tsx
│   │   │   ├── hi-lo/page.tsx
│   │   │   ├── keno/page.tsx
│   │   │   ├── over-under-seven/page.tsx
│   │   │   ├── poker-odds/page.tsx
│   │   │   ├── roulette/page.tsx
│   │   │   ├── slot-machine/page.tsx
│   │   │   └── war/page.tsx
│   │   ├── (info)/                  # about, downloads, version
│   │   ├── __tests__/               # Home page tests
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx                 # Home — game card grid
│   ├── components/
│   │   ├── organisms/               # Header (nav + theme toggle)
│   │   └── templates/               # About/Downloads/Version shells
│   ├── games/
│   │   ├── _shared/cards.ts         # Deck creation, shuffle, draw
│   │   ├── baccarat/                # types, utils, hook, component + tests
│   │   ├── card-counter/            # types, utils, hook, component + tests
│   │   ├── craps/                   # types, utils, hook, component + tests
│   │   ├── hi-lo/                   # types, constants, utils, hook + tests
│   │   ├── keno/                    # types, utils, hook, component + tests
│   │   ├── over-under-seven/        # types, utils, hook, component + tests
│   │   ├── poker-odds/              # types, constants, utils, components
│   │   ├── roulette/                # types, utils, hook, component + tests
│   │   ├── slot-machine/            # constants, utils, hook, component + tests
│   │   └── war/                     # types, utils, hook, component + tests
│   └── styles/globals.css           # Tailwind base layer
├── src-tauri/                       # Tauri 2 desktop shell (Rust)
├── jest.config.ts
├── next.config.ts
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

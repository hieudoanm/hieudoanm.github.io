# Tree

```
foody/
├── docs/                       # architecture, features, packaging notes
├── e2e/                        # Playwright specs
│   └── home.spec.ts
├── public/                     # favicon, PWA icons, manifest, service worker
├── src/
│   ├── app/
│   │   ├── (info)/             # about / downloads / version pages
│   │   ├── __tests__/          # page-level tests
│   │   ├── randomizer/         # tool route
│   │   ├── layout.tsx          # providers + theme bootstrap
│   │   └── page.tsx            # home hub
│   ├── components/
│   │   ├── atoms/              # Badge, OfflineBadge, ThemeToggle
│   │   ├── features/randomizer # the food randomizer feature
│   │   └── templates/          # Home/Tool/Error templates
│   ├── hooks/                  # useTheme, useOffline, useProgress, ...
│   ├── lib/                    # native bridge, progress store
│   ├── providers/              # SWProvider, NativeProvider, QueryProvider
│   └── styles/                 # tailwind + daisyui themes (foody, foody-dark)
├── src-tauri/                  # Tauri 2 shell (updater, dialog, notification)
└── package.json
```

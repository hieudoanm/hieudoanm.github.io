# Exibit — UI Exhibition

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, directory structure, routing, state management |
| `docs/ROADMAP.md`      | Phased feature roadmap with progress tracking              |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions        |
| `docs/PACKAGING.md`    | Packaging checklist per platform                           |
| `docs/DOWNLOADS.md`    | Download links per platform                                |

## Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn`, `input`, `select`, `badge`, `tabs`)
- Dark theme as default (`data-theme="exibit-dark"`)
- `prettier-plugin-tailwindcss` for class sorting
- `react-icons/fi` (Feather) for icons
- Small focused files (≤ 200 lines) and short functions (≤ 30 lines)
- No global/singleton state — pure functions in `lib/` accept inputs and return
  outputs
- `console.*` stripped in production via `compiler.removeConsole`

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Showcase home page
│   ├── pos/              # POS application (migrated from business/pos)
│   │   └── page.tsx
│   ├── layout.tsx        # Root layout with theme
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── global-error.tsx
│   ├── template.tsx
│   ├── (info)/
│   │   ├── about/page.tsx
│   │   ├── downloads/page.tsx
│   │   └── version/page.tsx
│   └── (auth)/
│       ├── sign-in/page.tsx
│       ├── sign-up/page.tsx
│       ├── forget-password/page.tsx
│       ├── reset-password/page.tsx
│       └── profile/page.tsx
├── components/
│   ├── organisms/
│   │   └── Header.tsx
│   └── templates/
├── styles/
│   ├── globals.css
│   └── themes.css
├── data/
├── lib/
├── types/
└── providers/
```

## Applications Showcased

| App          | Category        | Status      | Path     |
| ------------ | --------------- | ----------- | -------- |
| POS          | Business        | Ready       | `/pos`   |
| Menu         | Business        | Coming Soon | `/menu`  |
| Photo Editor | Graphics Design | Ready       | External |
| SVG Tools    | Graphics Design | Ready       | External |
| Video Tools  | Graphics Design | In Progress | External |

## Development

```bash
# From repo root
pnpm --filter @hieudoanm.github.io/exibit dev

# Or from package directory
pnpm dev
```

## Testing

```bash
pnpm test          # Unit tests
pnpm test:e2e      # E2E tests
pnpm lint          # Lint
pnpm typecheck     # Type check
```

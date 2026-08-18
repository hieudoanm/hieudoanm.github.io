# POS — Minimal Point of Sale Client

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
- Dark theme as default (`data-theme="dim"`)
- `prettier-plugin-tailwindcss` for class sorting
- `react-icons/fi` (Feather) for icons
- Small focused files (≤ 200 lines) and short functions (≤ 30 lines)
- No global/singleton state — pure functions in `lib/` accept inputs and return
  outputs
- `console.*` stripped in production via `compiler.removeConsole`

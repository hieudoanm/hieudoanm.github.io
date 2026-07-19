# Boilerplate — Next.js + Tauri App Template

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, directory structure, routing, state management |
| `docs/ROADMAP.md`      | Phased feature roadmap with progress tracking              |
| `docs/API.md`          | Atomic-design methodology and template/page conventions    |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions        |
| `docs/PACKAGING.md`    | Packaging checklist per platform                           |
| `docs/DOWNLOADS.md`    | Download links per platform                                |

## Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `input`, etc.)
- Dark theme as default
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → molecules → organisms → templates
- SonarQue enforced — no nested ternaries (S3358), cognitive complexity < 15
  (S3776), ≤ 30-line functions (S138), no unused imports (S1128)
- `console.*` stripped in production via `compiler.removeConsole`

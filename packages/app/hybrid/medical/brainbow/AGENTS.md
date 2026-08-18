# Brainbow — Image Processing

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
- DaisyUI component classes (`btn` + `btn-*`, `card`, `input`, etc.)
- Dark theme as default
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → molecules → organisms → templates
- Image data is `ImageData`-compatible; channels are per-channel arrays with
  `{ visible, opacity, color }` state
- All image math lives in `src/lib/image/` — pure functions, no DOM types
- Single `<canvas>` per viewer; pan/zoom via canvas transform, never by
  re-rendering pixels
- Resize the backing store with `devicePixelRatio` awareness; destroy the rAF
  loop on unmount
- `console.*` stripped in production via `compiler.removeConsole`

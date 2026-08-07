# API Documentation

This directory documents the reusable component library and page architecture of
the hybrid boilerplate. It is organised by atomic-design level so agents can
learn the conventions and reuse components without re-reading source files.

## Getting started

- [ATOMIC.md](ATOMIC.md) — the methodology behind the design system, based on
  Brad Frost's
  _[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)_
- [CONVENTIONS.md](CONVENTIONS.md) — rules every template and page must follow

## Components

- [ATOMS.md](ATOMS.md) — smallest building blocks in `src/components/atoms/` (52
  components)
- [MOLECULES.md](MOLECULES.md) — combinations of atoms in
  `src/components/molecules/` (56 components)
- [ORGANISMS.md](ORGANISMS.md) — complex UI sections in
  `src/components/organisms/` (41 components)

## Pages

- [TEMPLATES.md](TEMPLATES.md) — page-level layout shells in
  `src/components/templates/` grouped by domain
- [PAGES.md](PAGES.md) — every example route and its template
- [ADDING.md](ADDING.md) — how to add new templates and pages

## Design system flow

```txt
ATOMS -> MOLECULES -> ORGANISMS -> TEMPLATES -> PAGES
  52        56           41          28 routes     29 routes
```

Everything lives in `src/`:

```txt
src/
├── app/              # App Router pages and layouts
├── components/
│   ├── atoms/        # Smallest building blocks
│   ├── molecules/    # Combinations of atoms
│   ├── organisms/    # Complex UI sections
│   └── templates/    # Page-level layouts
├── hooks/            # Custom React hooks
├── providers/        # Context providers
└── styles/           # Global CSS (Tailwind base layer)
```

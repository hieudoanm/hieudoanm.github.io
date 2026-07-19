# API Documentation

This directory documents the reusable component library and page architecture of
the hybrid boilerplate. It is organised by atomic-design level so agents can
learn the conventions and reuse components without re-reading source files.

## Getting started

- [ATOMIC.md](ATOMIC.md) — the methodology behind the design system, based on
  Brad Frost's
  _[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)_
- [CONVENTIONS.md](CONVENTIONS.md) — rules every template and page must follow
- [REFERENCES.md](REFERENCES.md) — how DaisyUI, MUI, shadcn/ui, Tailwind UI, and
  Radix UI handle components, styling, and docs

## Components

- [ATOMS.md](ATOMS.md) — smallest building blocks in
  `src/components/atoms/<domain>/` (256 components across 16 domains)
- [MOLECULES.md](MOLECULES.md) — combinations of atoms in
  `src/components/molecules/<domain>/` (256 components across 16 domains)
- [ORGANISMS.md](ORGANISMS.md) — complex UI sections in
  `src/components/organisms/<domain>/` (256 components across 16 domains)

## Pages

- [TEMPLATES.md](TEMPLATES.md) — page-level layout shells in
  `src/components/templates/<domain>/` grouped by domain (257 templates)
- [PAGES.md](PAGES.md) — every example route and its template (265 routes)
- [ADDING.md](ADDING.md) — how to add new templates and pages

## Design system flow

```txt
ATOMS -> MOLECULES -> ORGANISMS -> TEMPLATES -> PAGES
  256       256          256          257       265 routes
```

Everything lives in `src/`:

```txt
src/
├── app/              # App Router pages and layouts
│   ├── (app)/        # Home + Colors pages
│   └── (templates)/  # One route per template domain
├── components/
│   ├── atoms/        # Smallest building blocks
│   │   └── <domain>/ # app, auth, blog, crm, developer, finance, health,
│   │                 # hr, landing, mail, media, news, social, store,
│   │                 # support, travel
│   ├── molecules/    # Combinations of atoms (same domain folders)
│   ├── organisms/    # Complex UI sections (same domain folders)
│   ├── templates/    # Page-level layouts (same domains + shared/)
│   └── pages/        # Home + Colors page bodies
├── hooks/            # Custom React hooks
├── providers/        # Context providers
└── styles/           # Global CSS (Tailwind base layer)
```

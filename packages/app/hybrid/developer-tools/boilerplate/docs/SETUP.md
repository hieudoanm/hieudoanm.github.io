# Setup

## Table of Contents

- [Setup](#setup)
  - [Table of Contents](#table-of-contents)
  - [Techstack](#techstack)
  - [Directory Structure](#directory-structure)
  - [UI Skeleton](#ui-skeleton)

## Techstack

- [Node.js](https://nodejs.org/en)
  - `.nvmrc`
  - `.node-version`
- `dependencies`
  - `@tauri-apps/api`
  - `motion`
  - `next`
  - `react`
  - `react-dom`
  - `react-icons`
- `devDependencies`
  - `@playwright/test`
  - `@tailwindcss/postcss`
  - `@tauri-apps/cli`
  - `@testing-library/jest-dom`
  - `@testing-library/react`
  - `@testing-library/user-event`
  - `@types/jest`
  - `@types/node`
  - `@types/react`
  - `@types/react-dom`
  - `daisyui`
  - `eslint`
  - `eslint-config-next`
  - `jest`
  - `jest-environment-jsdom`
  - `kill-port`
  - `prettier`
  - `prettier-plugin-tailwindcss`
  - `rimraf`
  - `tailwindcss`
  - `ts-jest`
  - `typescript`
  - `typescript-eslint`

## Directory Structure

```txt
├── .env
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── src/
│   ├── app/
│   │   ├── (app)
│   │   │   ├── {slug}
│   │   │   │   └── page.tsx
│   │   ├── (auth)
│   │   │   ├── sign-in
│   │   │   │   └── page.tsx
│   │   │   ├── sign-up
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password
│   │   │   │   └── page.tsx
│   │   │   └── profile
│   │   │       └── page.tsx
│   │   ├── (info)
│   │   │   ├── about
│   │   │   │   └── page.tsx
│   │   │   ├── settings
│   │   │   │   └── page.tsx
│   │   │   └── version
│   │   │       └── page.tsx
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── styles/
│   └── utils/
```

## UI Skeleton

```txt
┌──────────────────────────────────────────────────────────────┐
│ App Name          About Downloads Version Profile/Sign In/Up │ Header
├──────────────────────────────────────────────────────────────┤
| Toolbar (List of Icons)                                      │ Toolbar
├──────────────────────────────────────────────────────────────┤
| Left Sidebar │ Main Content                  │ Right Sidebar │
|              │                               │               │
|              │                               │               │
|              │                               │               │
|              │                               │               │
|              │                               │               │
|              │                               │               │
|              │                               │               │
|              │                               │               │
|              │                               │               │
└──────────────────────────────────────────────────────────────┘
```

- Header: Logo + App Name + Navigation menu (left side) + Profile / Sign In / Up
  (right side)
- Toolbar (drawable): List of Icons (hidden on mobile)
- Left Sidebar: Preferable List of Examples/Templates/Files (hidden on mobile)
- Right Sidebar: Extend Toolbar with More complex features (hidden on mobile)
- Main Content: Content

Note:

- All drawables (toolbar, left sidebar, right sidebar) are hidden on mobile.
- Main content takes full width on mobile.

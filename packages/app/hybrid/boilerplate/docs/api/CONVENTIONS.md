# Conventions

Every template and page in this project follows these rules. Follow them when
adding new templates/pages:

1. **Client components**: interactive templates start with `'use client';`.
2. **Shape**: `export const <Name>Template: FC = () => { ... };` followed by
   `<Name>Template.displayName = '<Name>Template';` as the last line.
3. **Imports**: `import type { FC } from 'react';`, then
   `import { useState } from 'react';`, then icons
   `import { FiXxx } from 'react-icons/fi';`. Only import what you use.
4. **No comments** in code.
5. **No lowercase JSX member expressions**: when mapping items with an `icon`
   component field, do `const Icon = item.icon;` first, then `<Icon />`.
6. **Interfaces for shapes**, arrow functions everywhere.
7. **Styling**: DaisyUI v5 + Tailwind. Cards are
   `card bg-base-200 border-base-content/10 border` with `card-body p-5`. Muted
   text is `text-base-content/50`. Tables use `card-body p-0` +
   `overflow-x-auto` + `w-full table` with a
   `text-base-content/40 ... text-xs tracking-wider uppercase` header row.
8. **Chrome**: workspace templates use
   `<div className="bg-base-100 text-base-content min-h-dvh">` with a
   `border-base-content/10 border-b px-6 py-5` header and
   `main className="mx-auto w-full max-w-5xl p-6"`. Marketing/store templates
   use a sticky top header with a "Boilerplate" logo and a footer.
9. **Pages**: thin `'use client';` wrappers, one per route, default export, e.g.
   `const XPage = () => <XTemplate />; export default XPage;`.
10. **Tests**: colocated in `__tests__/`, one `*.test.tsx` per component, via
    `@testing-library/react`. The repo gates coverage at 90% for statements,
    branches, functions, and lines.

---

[Back to index](README.md)

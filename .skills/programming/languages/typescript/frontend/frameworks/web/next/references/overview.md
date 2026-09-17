# Overview

Focused reference for **nextjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Next.js Best Practices

Next.js is a React framework that provides server-side rendering, static site generation, and hybrid rendering capabilities. Best practice is to leverage Next.js's built-in optimizations while maintaining clean component architecture, proper data fetching patterns, and performance-first thinking.

---

## 1. Core Stack

- Next.js **latest stable** (App Router preferred)
- React **18+**
- TypeScript **strict mode**
- TailwindCSS or CSS Modules for styling
- App Router (app/) over Pages Router (pages/) for new projects

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
```

---

## 2. Project Structure

```text
app/
├── layout.tsx          # root layout
├── page.tsx            # home page
├── globals.css         # global styles
├── api/                # API routes
│   └── route.ts
├── (auth)/             # route groups
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx
└── blog/               # dynamic routes
    ├── [slug]/
    │   └── page.tsx
    └── page.tsx

components/
├── ui/                 # reusable UI components
├── features/           # feature-specific components
└── layout/             # layout components

lib/
├── utils.ts            # utility functions
├── db.ts               # database client
└── api.ts              # API client
```

- **App Router (`app/`)** for new projects — supports React Server Components, streaming, and better data fetching
- **Route groups `()`** for organization without affecting URL structure
- **Component colocation** — keep components close to where they're used
- **Server vs Client Components** — default to Server Components, use `"use client"` only when needed

---

## 3. Routing & Navigation

- **File-based routing** — `app/page.tsx` becomes `/`, `app/blog/page.tsx` becomes `/blog`
- **Dynamic routes** — `app/blog/[slug]/page.tsx` for `/blog/my-post`
- **Route groups** — `app/(auth)/login/page.tsx` for logical grouping without URL prefix
- **Use `<Link>` for navigation** — enables prefetching and client-side navigation:

```tsx
import Link from 'next/link'

<Link href="/blog/my-post">Read more</Link>
```

- **Programmatic navigation** — `useRouter()` hook for dynamic navigation:

```tsx
'use client'
import { useRouter } from 'next/navigation'

const router = useRouter()
router.push('/dashboard')
```

---

---
name: nextjs-best-practices
description: Best practices for building web applications with Next.js (React framework). Use when creating, structuring, or reviewing a Next.js app — covers routing, data fetching, SSR/SSG, API routes, optimization, and testing.
---

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

## 4. Data Fetching

- **Server Components** — fetch data directly in components:

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

- **Static Generation** — `fetch` with `next: { revalidate: 3600 }` for ISR:

```tsx
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // revalidate every hour
})
```

- **Dynamic Rendering** — `fetch` with `cache: 'no-store'` for real-time data:

```tsx
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})
```

- **Route Handlers** — `app/api/route.ts` for API endpoints:

```tsx
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello' })
}
```

---

## 5. Server vs Client Components

- **Default to Server Components** — no JavaScript sent to client, better performance
- **Use Client Components** only when:
  - Using browser APIs (`window`, `localStorage`)
  - Using React hooks (`useState`, `useEffect`)
  - Handling user events (`onClick`, `onChange`)

```tsx
'use client' // Only when needed

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

- **Pass Server Components to Client Components** — compose them together:

```tsx
// Server Component
export default function Page() {
  return <ClientComponent data={await getData()} />
}
```

---

## 6. Styling

- **TailwindCSS** — utility-first CSS, excellent for rapid development:

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h1 className="text-xl font-bold">Title</h1>
</div>
```

- **CSS Modules** — scoped CSS for component-specific styles:

```tsx
import styles from './Button.module.css'

<button className={styles.button}>Click me</button>
```

- **TailwindCSS + DaisyUI** — component library built on TailwindCSS:

```tsx
<button className="btn btn-primary">Click me</button>
```

---

## 7. Optimization

- **Image optimization** — use `<Image>` component:

```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // for above-the-fold images
/>
```

- **Font optimization** — use `next/font`:

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

- **Code splitting** — automatic by route, use dynamic imports for heavy components:

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

---

## 8. Error Handling

- **Error boundaries** — `error.tsx` for catching errors:

```tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

- **Loading states** — `loading.tsx` for skeleton screens:

```tsx
export default function Loading() {
  return <div>Loading...</div>
}
```

- **Not found pages** — `not-found.tsx` for 404s:

```tsx
export default function NotFound() {
  return <div>Page not found</div>
}
```

---

## 9. Testing

- **Playwright** for E2E testing:

```tsx
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Home/)
})
```

- **Jest + React Testing Library** for component testing:

```tsx
import { render, screen } from '@testing-library/react'

test('renders heading', () => {
  render(<Page />)
  expect(screen.getByText('Welcome')).toBeInTheDocument()
})
```

---

## 10. General Rules of Thumb

- **Server Components by default** — only use Client Components when necessary
- **Fetch data in Server Components** — avoid useEffect for data fetching
- **Use App Router for new projects** — better performance and developer experience
- **Optimize images and fonts** — use Next.js built-in optimization
- **Proper error boundaries** — handle errors gracefully
- **TypeScript strict mode** — catch type errors early
- **ESLint and Prettier** — maintain code quality

---

## Quick-Start Checklist

- [ ] App Router structure with `app/` directory
- [ ] Server Components by default, Client Components only when needed
- [ ] Proper data fetching with `fetch` and caching strategies
- [ ] `<Image>` component for all images
- [ ] `next/font` for fonts
- [ ] Error boundaries with `error.tsx`
- [ ] Loading states with `loading.tsx`
- [ ] TailwindCSS or CSS Modules for styling
- [ ] Playwright for E2E testing
- [ ] TypeScript strict mode enabled

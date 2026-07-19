# Workflow notes

Focused reference for **nextjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

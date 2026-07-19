---
name: solid-start-best-practices
description: Best practices for building full-stack applications with SolidStart (Solid.js meta-framework). Use when creating, structuring, or reviewing SolidStart applications — covers routing, data fetching, server-side rendering, and performance.
---

# SolidStart Best Practices

SolidStart is a full-stack framework built on Solid.js that provides server-side rendering, static site generation, and API routes. Best practice is to leverage Solid's reactivity, use server-side rendering for performance, follow SolidStart's conventions, and optimize for web performance.

---

## 1. Core Stack

- SolidStart **latest stable**
- Solid.js **latest stable**
- TypeScript **strict mode**
- Vite for build tooling

```bash
npm init solid-start@latest my-app
```

---

## 2. Project Structure

```text
src/
├── components/           # Solid components
│   ├── Button.tsx
│   └── Card.tsx
├── routes/               # File-based routing
│   ├── index.tsx
│   ├── about.tsx
│   └── api/
│       └── hello.tsx
├── styles/               # Global styles
│   └── app.css
└── entry-client.tsx      # Client entry
└── entry-server.tsx      # Server entry
```

- **File-based routing** — routes in `src/routes/` become routes
- **API routes** — API routes in `src/routes/api/`
- **Server-side rendering** — SolidStart renders on the server by default
- **Entry points** — separate client and server entry points

---

## 3. Components

- **Solid components** — use Solid components with signals:

```typescript
import { createSignal } from 'solid-js'

function Counter() {
  const [count, setCount] = createSignal(0)

  return (
    <button onClick={() => setCount(count() + 1)}>
      Count: {count()}
    </button>
  )
}
```

- **TypeScript** — use TypeScript for type safety:

```typescript
interface ButtonProps {
  onClick: () => void
  children: JSX.Element
}

function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

- **Component organization** — organize components by feature

---

## 4. Routing

- **File-based routing** — create routes with files:

```text
src/routes/
├── index.tsx             # /
├── about.tsx             # /about
└── blog/
    ├── index.tsx         # /blog
    └── [slug].tsx        # /blog/:slug
```

- **Dynamic routes** — use bracket notation for dynamic routes:

```typescript
import { useParams } from 'solid-start'

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug

  return <div>Blog post: {slug}</div>
}
```

- **Navigation** — use useNavigate for navigation:

```typescript
import { useNavigate } from 'solid-start'

export default function Home() {
  const navigate = useNavigate()
  return <button onClick={() => navigate('/about')}>Go to About</button>
}
```

---

## 5. Data Fetching

- **Server functions** — use server functions for data fetching:

```typescript
import { createServerData$ } from 'solid-start/server'

export const useData = createServerData$(async () => {
  const response = await fetch('https://api.example.com/data')
  return response.json()
})
```

- **Route data** — use route data for page-specific data:

```typescript
import { useRouteData } from 'solid-start'

export function routeData() {
  return createServerData$(async () => {
    return await fetchData()
  })
}

export default function Page() {
  const data = useRouteData()
  return <div>{data()?.title}</div>
}
```

- **Client-side fetching** — use createResource for client-side fetching:

```typescript
import { createResource } from 'solid-js'

const [data] = createResource(() => fetchData())
```

---

## 6. Server-Side Rendering

- **SSR by default** — SolidStart renders on the server by default
- **Hydration** — SolidStart handles hydration automatically
- **Client components** — use 'client' directive for client-only components:

```typescript
export default function ClientComponent() {
  'client'
  // Client-only code
}
```

---

## 7. API Routes

- **API routes** — create API routes in `src/routes/api/`:

```typescript
// src/routes/api/hello.tsx
import { json } from 'solid-start'

export async function GET() {
  return json({ message: 'Hello from server!' })
}
```

- **Dynamic API routes** — use bracket notation for dynamic routes:

```typescript
// src/routes/api/users/[id].tsx
import { json } from 'solid-start'

export async function GET({ params }) {
  return json({ id: params.id })
}
```

- **HTTP methods** — define different HTTP methods:

```typescript
export async function POST({ request }) {
  const body = await request.json()
  return json({ success: true })
}
```

---

## 8. State Management

- **Signals** — use signals for reactive state:

```typescript
const [count, setCount] = createSignal(0)
```

- **Stores** — use Solid stores for global state:

```typescript
import { createStore } from 'solid-js/store'

const [user, setUser] = createStore({
  name: 'John',
  age: 30
})

setUser('name', 'Jane')
```

- **Context** — use context for sharing state:

```typescript
import { createContext, useContext } from 'solid-js'

const UserContext = createContext<UserContextType>()

export function UserProvider(props: { children: JSX.Element }) {
  const [user, setUser] = createStore({ name: 'John' })
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
```

---

## 9. Performance

- **Fine-grained reactivity** — Solid's reactivity is already optimized
- **Lazy loading** — lazy load components:

```typescript
import { lazy, Suspense } from 'solid-js'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

- **Code splitting** — SolidStart automatically code-splits routes
- **Image optimization** — optimize images for web

---

## 10. Styling

- **CSS Modules** — use CSS Modules for scoped styles:

```typescript
import styles from './Button.module.css'

<button class={styles.button}>Click me</button>
```

- **TailwindCSS** — use TailwindCSS:

```bash
npm install -D tailwindcss
```

```typescript
<button class="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>
```

- **SolidStyled** — use SolidStyled for CSS-in-JS:

```typescript
import styled from 'solid-styled-components'

const Button = styled.button`
  background: blue;
  color: white;
  padding: 8px 16px;
`
```

---

## 11. Testing

- **Component testing** — test components with Solid Testing Library:

```typescript
import { render, screen, fireEvent } from 'solid-testing-library'

test('increments counter', () => {
  render(() => <Counter />)
  const button = screen.getByText('Increment')
  fireEvent.click(button)
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

- **E2E testing** — use Playwright for E2E testing:

```typescript
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Home/)
})
```

---

## 12. General Rules of Thumb

- **Fine-grained reactivity** — leverage Solid's reactivity
- **Signals for state** — use signals for reactive state
- **TypeScript** — use TypeScript for type safety
- **Server-side rendering** — leverage SSR for performance
- **File-based routing** — use file-based routing
- **API routes** — use API routes for backend logic

---

## Quick-Start Checklist

- [ ] SolidStart with TypeScript strict mode
- [ ] File-based routing in `src/routes/`
- [ ] Signals for reactive state
- [ ] Server functions for data fetching
- [ ] API routes in `src/routes/api/`
- [ ] TypeScript interfaces for props
- [ ] CSS Modules or TailwindCSS
- [ ] Client directive for client-only code
- [ ] Testing setup with Solid Testing Library
- [ ] Performance optimization techniques

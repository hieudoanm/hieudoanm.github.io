# Implementation notes

Focused reference for **solid-start-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

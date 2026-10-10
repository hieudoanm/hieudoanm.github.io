# Implementation notes

Focused reference for **solidjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Solid Router** — use Solid Router for routing:

```typescript
import { Router, Routes, Route } from 'solid-app-router'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Routes>
    </Router>
  )
}
```

- **Route parameters** — access route parameters:

```typescript
import { useParams } from 'solid-app-router'

function UserProfile() {
  const params = useParams()
  return <div>User: {params.id}</div>
}
```

- **Navigation** — use navigate for programmatic navigation:

```typescript
import { useNavigate } from 'solid-app-router'

function Home() {
  const navigate = useNavigate()
  return <button onClick={() => navigate('/about')}>Go to About</button>
}
```

---

## 7. Performance

- **Fine-grained reactivity** — Solid's reactivity is already optimized
- **Memoization** — use createMemo for expensive computations:

```typescript
const expensiveValue = createMemo(() => {
  return heavyComputation(data())
})
```

- **Lazy loading** — lazy load components:

```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

- **Resource for async data** — use createResource for async operations:

```typescript
const [data] = createResource(() => fetchData())

<Show when={!data.loading} fallback={<div>Loading...</div>}>
  <div>{data().name}</div>
</Show>
```

---

## 8. Styling

- **CSS Modules** — use CSS Modules for scoped styles:

```typescript
import styles from './Button.module.css'

<button class={styles.button}>Click me</button>
```

- **TailwindCSS** — use TailwindCSS for utility-first styling:

```typescript
<button class="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>
```

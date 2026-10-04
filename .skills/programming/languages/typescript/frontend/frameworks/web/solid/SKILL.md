---
name: solidjs-best-practices
description: Best practices for building web applications with SolidJS. Use when creating, structuring, or reviewing SolidJS applications — covers reactivity, components, stores, routing, and performance.
---

# SolidJS Best Practices

SolidJS is a reactive JavaScript framework for building user interfaces. Best practice is to leverage Solid's fine-grained reactivity, use signals for state management, avoid unnecessary re-renders, and follow Solid's reactive patterns.

---

## 1. Core Stack

- SolidJS **latest stable**
- TypeScript **strict mode**
- Vite for build tooling
- Solid Router for routing
- Solid Start for meta-framework (optional)

```bash
npm init solid@latest my-app
# or with Solid Start
npm init solid-start@latest my-app
```

---

## 2. Component Structure

- **Component functions** — Solid components are regular JavaScript functions:

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

## 3. Reactivity

- **Signals for state** — use signals for reactive state:

```typescript
const [count, setCount] = createSignal(0)
const [name, setName] = createSignal('John')
```

- **Computed values** — use createMemo for derived state:

```typescript
const doubled = createMemo(() => count() * 2)
const fullName = createMemo(() => `${firstName()} ${lastName()}`)
```

- **Effects** — use createEffect for side effects:

```typescript
createEffect(() => {
  console.log('Count changed:', count())
})
```

- **Reactive statements** — Solid's reactivity is fine-grained, no virtual DOM diffing

---

## 4. Components & JSX

- **Props spreading** — use props spreading for cleaner code:

```typescript
function Button(props: ButtonProps) {
  return <button {...props}>{props.children}</button>
}
```

- **Children prop** — use children prop for composition:

```typescript
function Card(props: { children: JSX.Element }) {
  return <div class="card">{props.children}</div>
}

// Usage
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

- **Ref for DOM access** — use refs for direct DOM access:

```typescript
let inputRef: HTMLInputElement

function InputComponent() {
  return <input ref={inputRef} />
}
```

---

## 5. State Management

- **Signals for local state** — use signals for component-local state:

```typescript
const [isOpen, setIsOpen] = createSignal(false)
```

- **Stores for global state** — use Solid stores for global state:

```typescript
import { createStore } from 'solid-js/store'

const [user, setUser] = createStore({
  name: 'John',
  age: 30
})

setUser('name', 'Jane')
```

- **Context for dependency injection** — use context for sharing state:

```typescript
const UserContext = createContext<UserContextType>()

function UserProvider(props: { children: JSX.Element }) {
  const [user, setUser] = createStore({ name: 'John' })
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
```

---

## 6. Routing

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

## 9. Lifecycle

- **onMount** — use onMount for component initialization:

```typescript
import { onMount } from 'solid-js'

onMount(() => {
  console.log('Component mounted')
})
```

- **onCleanup** — use onCleanup for cleanup:

```typescript
import { onCleanup } from 'solid-js'

onCleanup(() => {
  console.log('Component unmounted')
})
```

- **createEffect** — use createEffect for reactive side effects

---

## 10. Testing

- **Solid Testing Library** — test components with Solid Testing Library:

```typescript
import { render, screen, fireEvent } from 'solid-testing-library'

test('increments counter', () => {
  render(() => <Counter />)
  const button = screen.getByText('Increment')
  fireEvent.click(button)
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

- **Unit tests** — test reactive logic separately
- **Integration tests** — test component interactions

---

## 11. General Rules of Thumb

- **Fine-grained reactivity** — leverage Solid's reactive system
- **Signals for state** — use signals for reactive state
- **TypeScript** — use TypeScript for type safety
- **Performance** — Solid is already performant, avoid premature optimization
- **Component composition** — use children prop for composition
- **Context for sharing** — use context for sharing state across components

---

## Quick-Start Checklist

- [ ] SolidJS with TypeScript strict mode
- [ ] Signals for reactive state management
- [ ] createMemo for derived state
- [ ] createEffect for side effects
- [ ] Solid Router for routing
- [ ] TypeScript interfaces for props
- [ ] CSS Modules or TailwindCSS for styling
- [ ] createResource for async data
- [ ] onMount/onCleanup for lifecycle
- [ ] Solid Testing Library for testing

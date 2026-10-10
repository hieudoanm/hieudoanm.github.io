# Workflow notes

Focused reference for **solidjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

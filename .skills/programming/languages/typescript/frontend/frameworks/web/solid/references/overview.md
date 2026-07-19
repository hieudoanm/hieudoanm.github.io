# Overview

Focused reference for **solidjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

# Overview

Focused reference for **solid-start-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

# Overview

Focused reference for **react-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# React Best Practices

React is a JavaScript library for building user interfaces. Best practice is to think in components, use hooks effectively, manage state properly, and optimize performance with React's built-in mechanisms.

---

## 1. Core Stack

- React **18+**
- TypeScript **strict mode**
- Modern build tools (Vite, Next.js, or Create React App)
- Testing Library for component testing

```bash
npx create-react-app my-app --template typescript
# or
npm create vite@latest my-app -- --template react-ts
```

---

## 2. Component Design

- **Functional components** — use functional components with hooks, not class components:

```tsx
function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

- **Single responsibility** — each component should do one thing well
- **Props interface** — define clear prop types with TypeScript:

```tsx
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}
```

- **Composition over inheritance** — compose components together:

```tsx
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

---

## 3. Hooks Best Practices

- **Custom hooks for reusable logic** — extract repeated logic into custom hooks:

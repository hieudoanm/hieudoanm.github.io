# Implementation notes

Focused reference for **react-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **React.memo for expensive components** — memoize components that re-render unnecessarily:

```tsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{/* expensive rendering */}</div>
})
```

- **Code splitting** — use `React.lazy` and `Suspense` for code splitting:

```tsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

- **Virtualization for long lists** — use react-window or react-virtual for long lists
- **Avoid unnecessary re-renders** — use proper memoization techniques

---

## 6. Forms

- **Controlled components** — use controlled components for forms:

```tsx
function Form() {
  const [name, setName] = useState('')

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  )
}
```

- **Form libraries** — consider React Hook Form or Formik for complex forms
- **Validation** — validate forms properly with clear error messages

---

## 7. Styling

- **CSS Modules** — scoped CSS for component-specific styles:

```tsx
import styles from './Button.module.css'

<button className={styles.button}>Click me</button>
```

- **TailwindCSS** — utility-first CSS for rapid development:

```tsx
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>
```

- **Styled-components** — CSS-in-JS for dynamic styling:

---
name: react-best-practices
description: Best practices for building React applications. Use when creating, structuring, or reviewing React code — covers components, hooks, state management, performance, and testing.
---

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

```tsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  // implementation
  return size
}
```

- **Hook rules** — only call hooks at the top level, never inside loops or conditions
- **useEffect dependencies** — include all dependencies in the dependency array:

```tsx
useEffect(() => {
  fetchData(userId)
}, [userId]) // Include userId
```

- **useMemo for expensive calculations** — memoize expensive computations:

```tsx
const sortedList = useMemo(() => {
  return list.sort((a, b) => a.id - b.id)
}, [list])
```

- **useCallback for function references** — memoize functions passed to child components:

```tsx
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

---

## 4. State Management

- **Local state for component-specific data** — use `useState` for component-local state:

```tsx
const [count, setCount] = useState(0)
```

- **Context for global state** — use React Context for app-wide state:

```tsx
const ThemeContext = createContext<ThemeContextType | null>(null)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

- **Consider state management libraries** — for complex state, consider Redux, Zustand, or Jotai
- **Derive state when possible** — avoid storing derived state:

```tsx
// Bad
const [items, setItems] = useState([])
const [total, setTotal] = useState(0)

// Good
const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items])
```

---

## 5. Performance Optimization

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

```tsx
const Button = styled.button`
  background: blue;
  color: white;
  padding: 8px 16px;
`
```

---

## 8. Error Handling

- **Error boundaries** — use error boundaries to catch React errors:

```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>
    }
    return this.props.children
  }
}
```

- **Graceful degradation** — handle errors gracefully with fallback UI

---

## 9. Testing

- **React Testing Library** — test components as users interact with them:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'

test('increments counter', () => {
  render(<Counter />)
  const button = screen.getByText('Increment')
  fireEvent.click(button)
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

- **Test behavior, not implementation** — test what users see and do
- **Integration testing** — test component interactions together

---

## 10. General Rules of Thumb

- **Functional components with hooks** — prefer over class components
- **Custom hooks for reusable logic** — extract repeated patterns
- **TypeScript for type safety** — catch errors at compile time
- **Performance optimization** — memoize when necessary
- **Test your components** — ensure they work as expected
- **Keep components small** — single responsibility principle

---

## Quick-Start Checklist

- [ ] Functional components with TypeScript
- [ ] Custom hooks for reusable logic
- [ ] Proper state management (local, context, or external)
- [ ] Performance optimization with memoization
- [ ] Error boundaries for error handling
- [ ] React Testing Library for testing
- [ ] Proper styling approach (CSS Modules, TailwindCSS, etc.)
- [ ] Form validation and controlled components
- [ ] Code splitting for large applications
- [ ] ESLint and Prettier for code quality

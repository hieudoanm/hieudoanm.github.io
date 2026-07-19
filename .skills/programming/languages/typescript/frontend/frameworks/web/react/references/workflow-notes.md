# Workflow notes

Focused reference for **react-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

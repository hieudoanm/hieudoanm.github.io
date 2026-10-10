# Review checklist

Focused reference for **react-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

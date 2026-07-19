# Review checklist

Focused reference for **solidjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

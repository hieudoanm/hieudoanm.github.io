# Review checklist

Focused reference for **svelte-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```svelte
<script>
  import { VirtualList } from 'svelte-virtual-list'
</script>

<VirtualList {items} let:item>
  <div>{item.name}</div>
</VirtualList>
```

---

## 10. Styling

- **Scoped styles** — styles are scoped by default:

```svelte
<style>
  .button {
    padding: 8px 16px;
  }
</style>
```

- **Global styles** — use `:global()` for global styles:

```svelte
<style>
  :global(.global-class) {
    color: red;
  }
</style>
```

- **CSS modules** — use CSS modules for better scoping:

```svelte
<style module>
  .button {
    padding: 8px 16px;
  }
</style>

<button class={styles.button}>Click me</button>
```

---

## 11. Testing

- **Testing Library** — test components with Testing Library:

```typescript
import { render, fireEvent } from '@testing-library/svelte'
import Counter from './Counter.svelte'

test('increments counter', async () => {
  const { getByText } = render(Counter)
  const button = getByText('Increment')
  await fireEvent.click(button)
  expect(getByText('Count: 1')).toBeInTheDocument()
})
```

- **Unit tests** — test reactive logic separately
- **E2E tests** — use Playwright for E2E testing

---

## 12. General Rules of Thumb

- **Reactivity** — leverage Svelte's reactivity system
- **Stores** — use stores for state management
- **TypeScript** — use TypeScript for type safety
- **Performance** — Svelte is already performant
- **Component composition** — use slots for composition
- **Testing** — test components with Testing Library

---

## Quick-Start Checklist

- [ ] Svelte with TypeScript strict mode
- [ ] Reactive statements with `$:`
- [ ] Stores for state management
- [ ] TypeScript interfaces for props
- [ ] Scoped styles by default
- [ ] onMount/onDestroy for lifecycle
- [ ] Event handling with `on:`
- [ ] SvelteKit for routing (if using)
- [ ] Testing Library for testing
- [ ] Component organization by feature

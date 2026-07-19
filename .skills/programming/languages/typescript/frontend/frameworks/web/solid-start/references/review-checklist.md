# Review checklist

Focused reference for **solid-start-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **CSS Modules** — use CSS Modules for scoped styles:

```typescript
import styles from './Button.module.css'

<button class={styles.button}>Click me</button>
```

- **TailwindCSS** — use TailwindCSS:

```bash
npm install -D tailwindcss
```

```typescript
<button class="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>
```

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

## 11. Testing

- **Component testing** — test components with Solid Testing Library:

```typescript
import { render, screen, fireEvent } from 'solid-testing-library'

test('increments counter', () => {
  render(() => <Counter />)
  const button = screen.getByText('Increment')
  fireEvent.click(button)
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

- **E2E testing** — use Playwright for E2E testing:

```typescript
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Home/)
})
```

---

## 12. General Rules of Thumb

- **Fine-grained reactivity** — leverage Solid's reactivity
- **Signals for state** — use signals for reactive state
- **TypeScript** — use TypeScript for type safety
- **Server-side rendering** — leverage SSR for performance
- **File-based routing** — use file-based routing
- **API routes** — use API routes for backend logic

---

## Quick-Start Checklist

- [ ] SolidStart with TypeScript strict mode
- [ ] File-based routing in `src/routes/`
- [ ] Signals for reactive state
- [ ] Server functions for data fetching
- [ ] API routes in `src/routes/api/`
- [ ] TypeScript interfaces for props
- [ ] CSS Modules or TailwindCSS
- [ ] Client directive for client-only code
- [ ] Testing setup with Solid Testing Library
- [ ] Performance optimization techniques

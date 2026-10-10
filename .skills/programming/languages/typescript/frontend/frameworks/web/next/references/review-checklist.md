# Review checklist

Focused reference for **nextjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

- **Loading states** — `loading.tsx` for skeleton screens:

```tsx
export default function Loading() {
  return <div>Loading...</div>
}
```

- **Not found pages** — `not-found.tsx` for 404s:

```tsx
export default function NotFound() {
  return <div>Page not found</div>
}
```

---

## 9. Testing

- **Playwright** for E2E testing:

```tsx
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Home/)
})
```

- **Jest + React Testing Library** for component testing:

```tsx
import { render, screen } from '@testing-library/react'

test('renders heading', () => {
  render(<Page />)
  expect(screen.getByText('Welcome')).toBeInTheDocument()
})
```

---

## 10. General Rules of Thumb

- **Server Components by default** — only use Client Components when necessary
- **Fetch data in Server Components** — avoid useEffect for data fetching
- **Use App Router for new projects** — better performance and developer experience
- **Optimize images and fonts** — use Next.js built-in optimization
- **Proper error boundaries** — handle errors gracefully
- **TypeScript strict mode** — catch type errors early
- **ESLint and Prettier** — maintain code quality

---

## Quick-Start Checklist

- [ ] App Router structure with `app/` directory
- [ ] Server Components by default, Client Components only when needed
- [ ] Proper data fetching with `fetch` and caching strategies
- [ ] `<Image>` component for all images
- [ ] `next/font` for fonts
- [ ] Error boundaries with `error.tsx`
- [ ] Loading states with `loading.tsx`
- [ ] TailwindCSS or CSS Modules for styling
- [ ] Playwright for E2E testing
- [ ] TypeScript strict mode enabled

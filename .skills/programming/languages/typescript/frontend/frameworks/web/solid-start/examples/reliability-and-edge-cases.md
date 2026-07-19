# SolidStart Best Practices: 9. Performance

## Source guidance

This example applies the **9. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Fine-grained reactivity** — Solid's reactivity is already optimized
- **Lazy loading** — lazy load components:
- **Code splitting** — SolidStart automatically code-splits routes
- **Image optimization** — optimize images for web

## Example

```typescript
import { lazy, Suspense } from 'solid-js'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for solid-start-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.

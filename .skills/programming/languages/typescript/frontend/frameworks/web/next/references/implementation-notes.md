# Implementation notes

Focused reference for **nextjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **TailwindCSS** — utility-first CSS, excellent for rapid development:

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h1 className="text-xl font-bold">Title</h1>
</div>
```

- **CSS Modules** — scoped CSS for component-specific styles:

```tsx
import styles from './Button.module.css'

<button className={styles.button}>Click me</button>
```

- **TailwindCSS + DaisyUI** — component library built on TailwindCSS:

```tsx
<button className="btn btn-primary">Click me</button>
```

---

## 7. Optimization

- **Image optimization** — use `<Image>` component:

```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // for above-the-fold images
/>
```

- **Font optimization** — use `next/font`:

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

- **Code splitting** — automatic by route, use dynamic imports for heavy components:

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

---

## 8. Error Handling

- **Error boundaries** — `error.tsx` for catching errors:

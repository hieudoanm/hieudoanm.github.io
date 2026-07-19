# Implementation notes

Focused reference for **astro-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```astro
---
import VueComponent from '../components/VueComponent.vue'
---
<VueComponent client:visible />
```

- **Directives** — use directives to control hydration:

```astro
<ReactComponent client:load />      // Load on page load
<ReactComponent client:idle />      // Load when browser is idle
<ReactComponent client:visible />   // Load when visible
<ReactComponent client:media="(max-width: 768px)" /> // Load on media query
```

---

## 7. Performance

- **Zero JavaScript by default** — Astro ships zero JavaScript by default
- **Island architecture** — hydrate only interactive components
- **Image optimization** — use Astro's image component:

```astro
---
import { Image } from 'astro:assets'
import myImage from '../images/my-image.png'
---
<Image src={myImage} alt="My image" width={800} height={600} />
```

- **Code splitting** — Astro automatically code-splits routes
- **Lazy loading** — use lazy loading for heavy components

---

## 8. Styling

- **Scoped styles** — use scoped styles in components:

```astro
<style>
  .card {
    padding: 16px;
  }
</style>
```

- **Global styles** — import global styles in layouts:

```astro
---
import '../styles/global.css'
---
```

- **TailwindCSS** — use TailwindCSS for utility-first styling:

```bash
npx astro add tailwind
```

```astro
<div class="px-4 py-2 bg-blue-500 text-white rounded">
  Button
</div>
```

---

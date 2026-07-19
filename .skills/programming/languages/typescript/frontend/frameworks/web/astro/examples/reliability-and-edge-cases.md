# Astro Best Practices: 7. Performance

## Source guidance

This example applies the **7. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Zero JavaScript by default** — Astro ships zero JavaScript by default
- **Island architecture** — hydrate only interactive components
- **Image optimization** — use Astro's image component:
- **Code splitting** — Astro automatically code-splits routes
- **Lazy loading** — use lazy loading for heavy components

## Example

```astro
---
import { Image } from 'astro:assets'
import myImage from '../images/my-image.png'
---
<Image src={myImage} alt="My image" width={800} height={600} />
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for astro-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.

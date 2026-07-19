# 2. The `css` API

Focused reference for **emotion**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. The `css` API

- `css` prop on React elements: `import { css } from '@emotion/react'` — `<div css={style}>`.
- Define styles with object syntax or template strings; labels via `label:` in objects.
- Objects support nested selectors, media queries, and the styled function pattern immediately.

```tsx
/** @jsxImportSource @emotion/react */
import type { ReactNode } from 'react';

const card = {
  label: 'card',
  display: 'grid',
  gap: '0.75rem',
  padding: '1.25rem',
  borderRadius: 12,
  '&:hover': { transform: 'translateY(-2px)' },
  '@media (min-width: 768px)': { padding: '2rem' },
};

type ArticleCardProps = { title: string; children: ReactNode };

export const ArticleCard = ({ title, children }: ArticleCardProps) => (
  <div css={card}>
    <h3 css={{ margin: 0, fontSize: '1.125rem' }}>{title}</h3>
    {children}
  </div>
);
```

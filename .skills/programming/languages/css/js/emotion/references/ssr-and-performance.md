# 6. SSR and Performance

Focused reference for **emotion**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. SSR and Performance

- With zero-config, styles inject at runtime; for SSR, use `@emotion/server` to `extractCritical`.
- Bundle smallest: tree-import only `@emotion/react` features; emotion is very small already.

```tsx
// server.tsx — extract critical CSS so server and client emit identical classes
import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';

export const render = (app: ReactElement) => {
  const cache = createCache({ key: 'app' });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const html = renderToString(<CacheProvider value={cache}>{app}</CacheProvider>);
  const chunks = extractCriticalToChunks(html);
  return { html, styles: constructStyleTagsFromChunks(chunks) };
};
```

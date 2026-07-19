# Emotion: 6. SSR and Performance

## Source guidance

This example applies the **6. SSR and Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- With zero-config, styles inject at runtime; for SSR, use `@emotion/server` to `extractCritical`.
- Bundle smallest: tree-import only `@emotion/react` features; emotion is very small already.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for emotion.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.

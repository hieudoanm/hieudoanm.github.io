# `@browser/react`

## Table of Contents

## `storage`

```tsx
import { useStorage } from '@browser/react';

type AppStorage = {
  theme: 'light' | 'dark';
  token: string;
};

const storage = useStorage<AppStorage>('local', {
  namespace: 'app',
});

const Component = () => {
  const [theme, setTheme] = storage.useValue('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme}
    </button>
  );
};
```

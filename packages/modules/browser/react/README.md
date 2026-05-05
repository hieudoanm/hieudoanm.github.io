# `@browser/react`

## Table of Contents

- [`@browser/react`](#browserreact)
  - [Table of Contents](#table-of-contents)
  - [`clipboard`](#clipboard)
  - [`storage`](#storage)

## `clipboard`

```tsx
import { useClipboard } from '@browser/react';

const Component = () => {
  const { copied, copy, paste } = useClipboard();

  return (
    <div>
      <button onClick={() => copy('Hello world!')}>Copy</button>
      <button onClick={paste}>Paste</button>
      {copied && <p>Copied!</p>}
    </div>
  );
};
```

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

# `@browser/native`

## Table of Contents

- [`@browser/native`](#browsernative)
  - [Table of Contents](#table-of-contents)
  - [`broadcast-channel`](#broadcast-channel)
  - [`clipboard`](#clipboard)
  - [`console`](#console)
  - [`indexeddb`](#indexeddb)
  - [`share`](#share)
  - [`storage`](#storage)

## `broadcast-channel`

```typescript
import { createBroadcastChannel } from '@browser/native';

const channel = createBroadcastChannel<Message>('my-channel');

if (channel.isSupported()) {
  const unsubscribe = channel.subscribe((msg) => {
    console.log('Received:', msg);
  });

  channel.publish({ hello: 'world' });

  unsubscribe();
  channel.close();
}
```

## `clipboard`

```typescript
import { createClipboard } from '@browser/native';

export interface ClipboardAPI {
  copy(text: string): Promise<void>;
  paste(): Promise<string>;
  isSupported(): boolean;
}

const clipboard: ClipboardAPI = createClipboard();

clipboard.isSupported();

await clipboard.copy('Hello world');

const text = await clipboard.paste();
console.log(text);
```

## `console`

```typescript
import { createLogger } from '@browser/native';

const logger = createLogger({
  enabled: true,
  showTimestamp: true,
  minLevel: 'debug',
  scope: 'App',
});

logger.info('App started');
logger.warn('Deprecated API');
logger.error('Failure');
logger.debug('Debug info');

const auth = logger.withScope('Auth');

auth.group('Login Flow', (log) => {
  log.info('Validating credentials');
  log.error('Invalid token');
});

logger.table([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);

logger.group('Performance', (log) => {
  log.time('fetch');
  log.timeEnd('fetch');
});
```

## `indexeddb`

```typescript
import { column, table, createDatabase, and } from '@browser/native';

const id = column<number, 'id'>('id');
const name = column<string, 'name'>('name');
const age = column<number, 'age'>('age');

const users = table('users', { id, name, age }, 'id');

const db = createDatabase('demo-db', 1, {
  users,
});

await db.open();

const result = await db.select().from(users).execute();
console.log(result);
```

## `share`

```typescript
import { createShare } from '@browser/native';

export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

export interface ShareAPI {
  share(data: ShareData): Promise<void>;
  isSupported(): boolean;
}

const share = createShare();

share.isSupported();

await share.share({
  text: 'Hello world',
});

await share.share({
  title: 'Browser SDK',
  text: 'Check this out!',
  url: 'https://example.com',
});
```

## `storage`

```typescript
import { createStorage } from '@browser/native';

const storage = createStorage<'local'>('local', {
  namespace: 'app',
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

await storage.set('user', { name: 'Alice', age: 30 });

const user = await storage.get('user');
console.log(user);

await storage.remove('user');

await storage.clear();
```

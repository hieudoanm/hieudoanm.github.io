type StorageType = 'local' | 'session';

interface StorageOptions {
  namespace?: string;
  serialize?: (value: unknown) => string;
  deserialize?: (value: string) => unknown;
}

type JsonObject = Record<string, unknown>;

const getStorage = (type: StorageType): Storage | null => {
  if (globalThis.window === undefined) {
    return null;
  }

  if (type === 'local') {
    return globalThis.window.localStorage;
  }

  return globalThis.window.sessionStorage;
};

export const createStorage = <TSchema extends JsonObject>(
  type: StorageType,
  options?: StorageOptions
) => {
  const opts: StorageOptions = options ?? {};

  const namespace: string =
    typeof opts.namespace === 'string' ? opts.namespace : '';

  const serialize: (value: unknown) => string =
    typeof opts.serialize === 'function' ? opts.serialize : JSON.stringify;

  const deserialize: (value: string) => unknown =
    typeof opts.deserialize === 'function' ? opts.deserialize : JSON.parse;

  const storage: Storage | null = getStorage(type);

  const buildKey = (key: keyof TSchema): string =>
    namespace.length > 0 ? `${namespace}:${String(key)}` : String(key);

  const set = <K extends keyof TSchema>(key: K, value: TSchema[K]): void => {
    if (!storage) return;
    storage.setItem(buildKey(key), serialize(value));
  };

  const get = <K extends keyof TSchema>(key: K): TSchema[K] | null => {
    if (!storage) return null;

    const raw: string | null = storage.getItem(buildKey(key));
    if (raw === null) return null;

    try {
      const parsed: unknown = deserialize(raw);
      return parsed as TSchema[K];
    } catch {
      return null;
    }
  };

  const remove = <K extends keyof TSchema>(key: K): void => {
    if (!storage) return;
    storage.removeItem(buildKey(key));
  };

  const has = <K extends keyof TSchema>(key: K): boolean => {
    if (!storage) return false;
    return storage.getItem(buildKey(key)) !== null;
  };

  const clear = (): void => {
    if (!storage) return;

    if (!namespace) {
      storage.clear();
      return;
    }

    const prefix = `${namespace}:`;

    for (let i = storage.length - 1; i >= 0; i--) {
      const key = storage.key(i);
      if (key?.startsWith(prefix)) {
        storage.removeItem(key);
      }
    }
  };

  return {
    set,
    get,
    remove,
    has,
    clear,
  };
};

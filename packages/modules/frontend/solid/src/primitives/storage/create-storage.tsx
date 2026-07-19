import { createSignal, onCleanup } from 'solid-js';

type StorageType = 'local' | 'session';

interface StorageOptions {
  namespace?: string;
  serialize?: (value: unknown) => string;
  deserialize?: (value: string) => unknown;
}

type JsonObject = Record<string, unknown>;

const getStorage = (type: StorageType): Storage | null => {
  if (typeof window === 'undefined') return null;
  return type === 'local' ? window.localStorage : window.sessionStorage;
};

export const createStorage = <TSchema extends JsonObject>(
  type: StorageType,
  options?: StorageOptions
) => {
  const opts = options ?? {};

  const namespace = typeof opts.namespace === 'string' ? opts.namespace : '';

  const serialize =
    typeof opts.serialize === 'function' ? opts.serialize : JSON.stringify;

  const deserialize =
    typeof opts.deserialize === 'function' ? opts.deserialize : JSON.parse;

  const storage = getStorage(type);

  const buildKey = (key: keyof TSchema) =>
    namespace ? `${namespace}:${String(key)}` : String(key);

  const getItem = <K extends keyof TSchema>(key: K): TSchema[K] | null => {
    if (!storage) return null;

    const raw = storage.getItem(buildKey(key));
    if (raw === null) return null;

    try {
      return deserialize(raw) as TSchema[K];
    } catch {
      return null;
    }
  };

  const setItem = <K extends keyof TSchema>(key: K, value: TSchema[K]) => {
    if (!storage) return;
    storage.setItem(buildKey(key), serialize(value));
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = <K extends keyof TSchema>(key: K) => {
    if (!storage) return;
    storage.removeItem(buildKey(key));
    window.dispatchEvent(new Event('storage'));
  };

  const clear = () => {
    if (!storage) return;

    if (!namespace) {
      storage.clear();
    } else {
      const prefix = `${namespace}:`;
      for (let i = storage.length - 1; i >= 0; i--) {
        const key = storage.key(i);
        if (key?.startsWith(prefix)) {
          storage.removeItem(key);
        }
      }
    }

    window.dispatchEvent(new Event('storage'));
  };

  const useValue = <K extends keyof TSchema>(
    key: K,
    initialValue: TSchema[K]
  ) => {
    const initial = getItem(key) ?? initialValue;
    const [value, setValue] = createSignal<TSchema[K]>(initial);

    const handler = () => {
      const latest = getItem(key);
      if (latest !== null) {
        setValue(() => latest);
      }
    };

    window.addEventListener('storage', handler);
    onCleanup(() => window.removeEventListener('storage', handler));

    const update = (val: TSchema[K]) => {
      setValue(() => val);
      setItem(key, val);
    };

    const remove = () => {
      removeItem(key);
      setValue(() => initialValue);
    };

    return [value, update, remove] as const;
  };

  return {
    get: getItem,
    set: setItem,
    remove: removeItem,
    clear,
    useValue,
  };
};

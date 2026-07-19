import { useCallback, useEffect, useState } from 'react';

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

export const useStorage = <TSchema extends JsonObject>(
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

  const buildKey = useCallback(
    (key: keyof TSchema) =>
      namespace ? `${namespace}:${String(key)}` : String(key),
    [namespace]
  );

  const getItem = useCallback(
    <K extends keyof TSchema>(key: K): TSchema[K] | null => {
      if (!storage) return null;

      const raw = storage.getItem(buildKey(key));
      if (raw === null) return null;

      try {
        return deserialize(raw) as TSchema[K];
      } catch {
        return null;
      }
    },
    [storage, buildKey, deserialize]
  );

  const setItem = useCallback(
    <K extends keyof TSchema>(key: K, value: TSchema[K]) => {
      if (!storage) return;
      storage.setItem(buildKey(key), serialize(value));
      window.dispatchEvent(new Event('storage'));
    },
    [storage, buildKey, serialize]
  );

  const removeItem = useCallback(
    <K extends keyof TSchema>(key: K) => {
      if (!storage) return;
      storage.removeItem(buildKey(key));
      window.dispatchEvent(new Event('storage'));
    },
    [storage, buildKey]
  );

  const clear = useCallback(() => {
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
  }, [storage, namespace]);

  const useValue = <K extends keyof TSchema>(
    key: K,
    initialValue: TSchema[K]
  ) => {
    const [value, setValue] = useState<TSchema[K]>(() => {
      const stored = getItem(key);
      return stored ?? initialValue;
    });

    useEffect(() => {
      const handler = () => {
        const latest = getItem(key);
        if (latest !== null) {
          setValue(latest);
        }
      };

      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    }, [key, getItem]);

    const update = useCallback(
      (val: TSchema[K]) => {
        setValue(val);
        setItem(key, val);
      },
      [key, setItem]
    );

    const remove = useCallback(() => {
      removeItem(key);
      setValue(initialValue);
    }, [key, removeItem, initialValue]);

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

/* eslint-disable @typescript-eslint/no-explicit-any */

export function assign<
  T extends Record<string, any>,
  U extends Record<string, any>[],
>(object: T, ...sources: U): T & U[number] {
  const result = { ...object };
  for (const source of sources) {
    if (source) {
      for (const key of Object.keys(source)) {
        (result as any)[key] = source[key];
      }
    }
  }
  return result as T & U[number];
}

export function entries<T>(object: Record<string, T>): [string, T][] {
  return Object.entries(object);
}

export function entriesIn<T>(object: Record<string, T>): [string, T][] {
  const result: [string, T][] = [];
  for (const key in object) {
    result.push([key, object[key] as T]);
  }
  return result;
}

export function findKey<T extends Record<string, any>>(
  object: T,
  predicate: (value: T[keyof T], key: string, obj: T) => unknown
): string | undefined {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      if (predicate(object[key]!, key, object)) return key;
    }
  }
  return undefined;
}

export function findLastKey<T extends Record<string, any>>(
  object: T,
  predicate: (value: T[keyof T], key: string, obj: T) => unknown
): string | undefined {
  const keys = Object.keys(object);
  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i]!;
    if (predicate(object[key]!, key, object)) return key;
  }
  return undefined;
}

export function forIn<T extends Record<string, any>>(
  object: T,
  iteratee: (value: T[keyof T], key: string, obj: T) => void
): T {
  for (const key in object) {
    iteratee(object[key]!, key, object);
  }
  return object;
}

export function forOwn<T extends Record<string, any>>(
  object: T,
  iteratee: (value: T[keyof T], key: string, obj: T) => void
): T {
  for (const key of Object.keys(object)) {
    iteratee(object[key]!, key, object);
  }
  return object;
}

export function functions<T extends Record<string, any>>(object: T): string[] {
  const result: string[] = [];
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      typeof object[key] === 'function'
    ) {
      result.push(key);
    }
  }
  return result;
}

export function get<T, K extends keyof T>(
  object: T,
  path: K | string | string[],
  defaultValue?: unknown
): T[K] | unknown {
  if (object == null) return defaultValue;
  const keys: string[] = Array.isArray(path)
    ? path
    : (path as string).split('.');
  let result: any = object;
  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }
  return result !== undefined ? result : defaultValue;
}

export function has<T extends Record<string, any>>(
  object: T,
  path: string | string[]
): boolean {
  if (object == null) return false;
  const keys = Array.isArray(path) ? path : path.split('.');
  let current: any = object;
  for (const key of keys) {
    if (current == null || !(key in current)) return false;
    current = current[key];
  }
  return true;
}

export function hasIn<T extends Record<string, any>>(
  object: T,
  path: string | string[]
): boolean {
  if (object == null) return false;
  const keys = Array.isArray(path) ? path : path.split('.');
  let current: any = object;
  for (let i = 0; i < keys.length; i++) {
    if (current == null || typeof current !== 'object') return false;
    current = current[keys[i]!];
  }
  return current !== undefined;
}

export function invert<T extends Record<string, string>>(
  object: T
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(object)) {
    result[String(object[key])] = key;
  }
  return result;
}

export function keys<T extends Record<string, any>>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}

export function mapKeys<T extends Record<string, any>>(
  object: T,
  iteratee: (value: T[keyof T], key: string, obj: T) => string
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};
  for (const key of Object.keys(object)) {
    result[iteratee(object[key]!, key, object)] = object[key]!;
  }
  return result;
}

export function mapValues<T extends Record<string, any>, R>(
  object: T,
  iteratee: (value: T[keyof T], key: string, obj: T) => R
): Record<string, R> {
  const result: Record<string, R> = {};
  for (const key of Object.keys(object)) {
    result[key] = iteratee(object[key]!, key, object);
  }
  return result;
}

export function merge<
  T extends Record<string, any>,
  U extends Record<string, any>[],
>(object: T, ...sources: U): T & U[number] {
  const result = cloneDeep(object) as any;
  for (const source of sources) {
    if (source) {
      for (const key of Object.keys(source)) {
        if (isPlainObject(result[key]) && isPlainObject(source[key])) {
          result[key] = merge(result[key], source[key]);
        } else {
          result[key] = source[key];
        }
      }
    }
  }
  return result as T & U[number];
}

export function omit<T extends Record<string, any>>(
  object: T,
  ...paths: (string | string[])[]
): Partial<T> {
  const result = { ...object } as any;
  const allPaths = paths.flat();
  for (const path of allPaths) {
    delete result[path];
  }
  return result;
}

export function omitBy<T extends Record<string, any>>(
  object: T,
  predicate: (value: T[keyof T], key: string) => boolean
): Partial<T> {
  const result: Record<string, any> = {};
  for (const key of Object.keys(object)) {
    if (!predicate(object[key]!, key)) {
      result[key] = object[key];
    }
  }
  return result as Partial<T>;
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  object: T,
  ...paths: (K | K[])[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  const allPaths = paths.flat() as K[];
  for (const key of allPaths) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

export function pickBy<T extends Record<string, any>>(
  object: T,
  predicate: (value: T[keyof T], key: string) => boolean
): Partial<T> {
  const result: Record<string, any> = {};
  for (const key of Object.keys(object)) {
    if (predicate(object[key]!, key)) {
      result[key] = object[key];
    }
  }
  return result as Partial<T>;
}

export function set<T extends Record<string, any>>(
  object: T,
  path: string | string[],
  value: any
): T {
  if (object == null) return object;
  const keys = Array.isArray(path) ? path : path.split('.');
  let current: any = object;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (current[key] == null) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]!] = value;
  return object;
}

export function toPairs<T>(object: Record<string, T>): [string, T][] {
  return Object.entries(object);
}

export function values<T extends Record<string, any>>(object: T): T[keyof T][] {
  return Object.values(object);
}

function cloneDeep<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value.getTime()) as T;
  if (value instanceof RegExp)
    return new RegExp(value.source, value.flags) as T;
  if (Array.isArray(value))
    return value.map((item) => cloneDeep(item)) as unknown as T;
  const result: Record<string, any> = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = cloneDeep((value as Record<string, any>)[key]);
    }
  }
  return result as T;
}

function isPlainObject(value: any): boolean {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

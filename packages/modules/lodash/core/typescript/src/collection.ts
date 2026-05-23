/* eslint-disable @typescript-eslint/no-explicit-any */

export function countBy<T>(
  collection: T[],
  iteratee: (value: T) => string | number
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const item of collection) {
    const key = String(iteratee(item));
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}

export function every<T>(
  collection: T[],
  predicate: (value: T, index: number, array: T[]) => unknown
): boolean {
  for (let i = 0; i < collection.length; i++) {
    if (!predicate(collection[i]!, i, collection)) return false;
  }
  return true;
}

export function filter<T>(
  collection: T[],
  predicate: (value: T, index: number, array: T[]) => unknown
): T[] {
  const result: T[] = [];
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i]!, i, collection)) {
      result.push(collection[i]!);
    }
  }
  return result;
}

export function find<T>(
  collection: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
  fromIndex: number = 0
): T | undefined {
  for (let i = fromIndex; i < collection.length; i++) {
    if (predicate(collection[i]!, i, collection)) return collection[i];
  }
  return undefined;
}

export function findLast<T>(
  collection: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
  fromIndex: number = collection.length - 1
): T | undefined {
  for (let i = fromIndex; i >= 0; i--) {
    if (predicate(collection[i]!, i, collection)) return collection[i];
  }
  return undefined;
}

export function flatMap<T, R>(
  collection: T[],
  iteratee: (value: T, index: number, array: T[]) => R[]
): R[] {
  const result: R[] = [];
  for (let i = 0; i < collection.length; i++) {
    const mapped = iteratee(collection[i]!, i, collection);
    result.push(...mapped);
  }
  return result;
}

export function flatMapDeep<T, R>(
  collection: T[],
  iteratee: (value: T, index: number, array: T[]) => any
): R[] {
  const result: R[] = [];
  for (let i = 0; i < collection.length; i++) {
    const mapped = iteratee(collection[i]!, i, collection);
    const flattened = Array.isArray(mapped) ? mapped.flat(Infinity) : [mapped];
    result.push(...flattened);
  }
  return result;
}

export function forEach<T>(
  collection: T[],
  iteratee: (value: T, index: number, array: T[]) => void
): T[] {
  for (let i = 0; i < collection.length; i++) {
    iteratee(collection[i]!, i, collection);
  }
  return collection;
}

export function groupBy<T>(
  collection: T[],
  iteratee: (value: T) => string | number
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of collection) {
    const key = String(iteratee(item));
    if (!result[key]) result[key] = [];
    result[key]!.push(item);
  }
  return result;
}

export function includes<T>(
  collection: T[],
  value: T,
  fromIndex: number = 0
): boolean {
  for (let i = fromIndex; i < collection.length; i++) {
    if (collection[i] === value) return true;
  }
  return false;
}

export function invokeMap<T, R>(
  collection: T[],
  methodName: keyof T | ((...args: any[]) => R),
  ...args: any[]
): R[] {
  const result: R[] = [];
  for (const item of collection) {
    if (typeof methodName === 'function') {
      result.push(methodName.call(item, ...args));
    } else if (item && typeof item === 'object' && methodName in item) {
      const method = (item as any)[methodName];
      result.push(
        typeof method === 'function' ? method.call(item, ...args) : method
      );
    }
  }
  return result;
}

export function keyBy<T, K extends string | number | symbol>(
  collection: T[],
  iteratee: (value: T) => K
): Record<K, T> {
  const result = {} as Record<K, T>;
  for (const item of collection) {
    result[iteratee(item)] = item;
  }
  return result;
}

export function map<T, R>(
  collection: T[],
  iteratee: (value: T, index: number, array: T[]) => R
): R[] {
  const result: R[] = [];
  for (let i = 0; i < collection.length; i++) {
    result.push(iteratee(collection[i]!, i, collection));
  }
  return result;
}

export function orderBy<T>(
  collection: T[],
  iteratees: ((value: T) => number | string)[],
  orders: ('asc' | 'desc')[] = []
): T[] {
  return [...collection].sort((a, b) => {
    for (let i = 0; i < iteratees.length; i++) {
      const fn = iteratees[i]!;
      const order = orders[i] !== 'desc' ? 1 : -1;
      const aVal = fn(a);
      const bVal = fn(b);
      if (aVal < bVal) return -1 * order;
      if (aVal > bVal) return 1 * order;
    }
    return 0;
  });
}

export function partition<T>(
  collection: T[],
  predicate: (value: T) => unknown
): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of collection) {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }
  return [pass, fail];
}

export function reduce<T, R>(
  collection: T[],
  iteratee: (accumulator: R, value: T, index: number, array: T[]) => R,
  accumulator: R
): R {
  let result = accumulator;
  for (let i = 0; i < collection.length; i++) {
    result = iteratee(result, collection[i]!, i, collection);
  }
  return result;
}

export function reduceRight<T, R>(
  collection: T[],
  iteratee: (accumulator: R, value: T, index: number, array: T[]) => R,
  accumulator: R
): R {
  let result = accumulator;
  for (let i = collection.length - 1; i >= 0; i--) {
    result = iteratee(result, collection[i]!, i, collection);
  }
  return result;
}

export function reject<T>(
  collection: T[],
  predicate: (value: T, index: number, array: T[]) => unknown
): T[] {
  const result: T[] = [];
  for (let i = 0; i < collection.length; i++) {
    if (!predicate(collection[i]!, i, collection)) {
      result.push(collection[i]!);
    }
  }
  return result;
}

export function sample<T>(collection: T[]): T | undefined {
  return collection.length > 0
    ? collection[Math.floor(Math.random() * collection.length)]
    : undefined;
}

export function shuffle<T>(collection: T[]): T[] {
  const result = [...collection];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

export function size<T>(collection: T[]): number {
  return collection.length;
}

export function some<T>(
  collection: T[],
  predicate: (value: T, index: number, array: T[]) => unknown
): boolean {
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i]!, i, collection)) return true;
  }
  return false;
}

export function sortBy<T>(
  collection: T[],
  ...iteratees: ((value: T) => number | string)[]
): T[] {
  return [...collection].sort((a, b) => {
    for (const fn of iteratees) {
      const aVal = fn(a);
      const bVal = fn(b);
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
    }
    return 0;
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export function chunk<T>(array: T[], size: number = 1): T[][] {
  const length = array.length;
  if (!length || size < 1) return [];
  const result: T[][] = [];
  let index = 0;
  while (index < length) {
    result.push(array.slice(index, (index += size)));
  }
  return result;
}

export function compact<T>(
  array: (T | false | null | undefined | 0 | '')[]
): T[] {
  return array.filter(Boolean) as T[];
}

export function concat<T>(array: T[], ...values: any[]): any[] {
  const result = [...array];
  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...value);
    } else {
      result.push(value);
    }
  }
  return result;
}

export function difference<T>(array: T[], ...values: T[][]): T[] {
  const exclude = new Set(values.flat());
  return array.filter((item) => !exclude.has(item));
}

export function differenceBy<T>(array: T[], ...args: any[]): T[] {
  const iteratee =
    typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
  const values = args.flat() as T[];
  const mapped = new Set(values.map(iteratee || ((v) => v as unknown)));
  return array.filter(
    (item) => !mapped.has(iteratee ? iteratee(item) : (item as unknown))
  );
}

export function drop<T>(array: T[], n: number = 1): T[] {
  return array.slice(n);
}

export function dropRight<T>(array: T[], n: number = 1): T[] {
  if (n < 0) return [...array];
  return array.slice(0, Math.max(0, array.length - n));
}

export function fill<T>(
  array: T[],
  value: T,
  start: number = 0,
  end: number = array.length
): T[] {
  const result = [...array];
  for (let i = start; i < end && i < result.length; i++) {
    result[i] = value;
  }
  return result;
}

export function findIndex<T>(
  array: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
  fromIndex: number = 0
): number {
  for (let i = fromIndex; i < array.length; i++) {
    if (predicate(array[i]!, i, array)) return i;
  }
  return -1;
}

export function findLastIndex<T>(
  array: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
  fromIndex: number = array.length - 1
): number {
  for (let i = fromIndex; i >= 0; i--) {
    if (predicate(array[i]!, i, array)) return i;
  }
  return -1;
}

export function flatten<T>(array: (T | T[])[]): T[] {
  const result: T[] = [];
  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  }
  return result;
}

export function flattenDeep<T>(array: any[]): T[] {
  const result: T[] = [];
  function recurse(items: any[]): void {
    for (const item of items) {
      if (Array.isArray(item)) {
        recurse(item);
      } else {
        result.push(item as T);
      }
    }
  }
  recurse(array);
  return result;
}

export function flattenDepth<T>(array: any[], depth: number = 1): T[] {
  if (depth === 0) return array as T[];
  const result: any[] = [];
  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flattenDepth(item, depth - 1));
    } else {
      result.push(item);
    }
  }
  return result as T[];
}

export function fromPairs<T>(pairs: [string, T][]): Record<string, T> {
  const result: Record<string, T> = {};
  for (const [key, value] of pairs) {
    result[key] = value;
  }
  return result;
}

export function head<T>(array: T[]): T | undefined {
  return array[0];
}

export function indexOf<T>(
  array: T[],
  value: T,
  fromIndex: number = 0
): number {
  for (let i = fromIndex; i < array.length; i++) {
    if (array[i] === value) return i;
  }
  return -1;
}

export function initial<T>(array: T[]): T[] {
  return array.slice(0, -1);
}

export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  const first = arrays[0]!;
  const rest = arrays.slice(1);
  const restSets = rest.map((arr) => new Set(arr));
  return first.filter((item) => restSets.every((set) => set.has(item)));
}

export function intersectionBy<T>(...args: any[]): T[] {
  const iteratee =
    typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
  const arrays: T[][] = args;
  if (arrays.length === 0) return [];
  const first = arrays[0]!;
  const rest = arrays.slice(1);
  const fn: (value: T) => unknown = iteratee || ((v: T) => v as unknown);
  const restMaps = rest.map((arr) => new Set(arr.map(fn)));
  return first.filter((item) => restMaps.every((set) => set.has(fn(item))));
}

export function join<T>(array: T[], separator: string = ','): string {
  let result = '';
  for (let i = 0; i < array.length; i++) {
    if (i > 0) result += separator;
    result += array[i];
  }
  return result;
}

export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

export function lastIndexOf<T>(
  array: T[],
  value: T,
  fromIndex: number = array.length - 1
): number {
  for (let i = fromIndex; i >= 0; i--) {
    if (array[i] === value) return i;
  }
  return -1;
}

export function nth<T>(array: T[], n: number = 0): T | undefined {
  return n >= 0 ? array[n] : array[array.length + n];
}

export function pull<T>(array: T[], ...values: T[]): T[] {
  const valueSet = new Set(values);
  const result: T[] = [];
  for (const item of array) {
    if (!valueSet.has(item)) {
      result.push(item);
    }
  }
  return result;
}

export function pullAll<T>(array: T[], values: T[]): T[] {
  return pull(array, ...values);
}

export function pullAllBy<T>(
  array: T[],
  values: T[],
  iteratee?: (value: T) => unknown
): T[] {
  const mappedValues = new Set(values.map((v) => (iteratee ? iteratee(v) : v)));
  return array.filter(
    (item) => !mappedValues.has(iteratee ? iteratee(item) : item)
  );
}

export function remove<T>(
  array: T[],
  predicate: (value: T, index: number, obj: T[]) => boolean
): T[] {
  const removed: T[] = [];
  const kept: T[] = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i]!;
    if (predicate(item, i, array)) {
      removed.push(item);
    } else {
      kept.push(item);
    }
  }
  return removed;
}

export function reverse<T>(array: T[]): T[] {
  return [...array].reverse();
}

export function slice<T>(
  array: T[],
  start: number = 0,
  end: number = array.length
): T[] {
  return array.slice(start, end);
}

export function sortedIndex<T>(array: T[], value: T): number {
  let low = 0;
  let high = array.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (array[mid]! < value) low = mid + 1;
    else high = mid;
  }
  return low;
}

export function sortedIndexBy<T>(
  array: T[],
  value: T,
  iteratee: (value: T) => number
): number {
  let low = 0;
  let high = array.length;
  const valueMapped = iteratee(value);
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (iteratee(array[mid]!) < valueMapped) low = mid + 1;
    else high = mid;
  }
  return low;
}

export function sortedIndexOf<T>(array: T[], value: T): number {
  return sortedIndex(array, value);
}

export function sortedLastIndex<T>(array: T[], value: T): number {
  let low = 0;
  let high = array.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (array[mid]! > value) high = mid;
    else low = mid + 1;
  }
  return low;
}

export function sortedUniq<T>(array: T[]): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (i === 0 || array[i] !== array[i - 1]) {
      result.push(array[i]!);
    }
  }
  return result;
}

export function sortedLastIndexBy<T>(
  array: T[],
  value: T,
  iteratee: (value: T) => number
): number {
  let low = 0;
  let high = array.length;
  const valueMapped = iteratee(value);
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (iteratee(array[mid]!) > valueMapped) high = mid;
    else low = mid + 1;
  }
  return low;
}

export function tail<T>(array: T[]): T[] {
  return array.slice(1);
}

export function take<T>(array: T[], n: number = 1): T[] {
  return array.slice(0, n);
}

export function takeRight<T>(array: T[], n: number = 1): T[] {
  return n < 0 ? [] : array.slice(array.length - n);
}

export function takeWhile<T>(
  array: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown
): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i]!, i, array)) break;
    result.push(array[i]!);
  }
  return result;
}

export function takeRightWhile<T>(
  array: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown
): T[] {
  const result: T[] = [];
  for (let i = array.length - 1; i >= 0; i--) {
    if (!predicate(array[i]!, i, array)) break;
    result.unshift(array[i]!);
  }
  return result;
}

export function union<T>(...arrays: T[][]): T[] {
  const result: T[] = [];
  const seen = new Set<T>();
  for (const arr of arrays) {
    for (const item of arr) {
      if (!seen.has(item)) {
        seen.add(item);
        result.push(item);
      }
    }
  }
  return result;
}

export function unionBy<T>(...args: any[]): T[] {
  const iteratee =
    typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
  const arrays: T[][] = args;
  const result: T[] = [];
  const seen = new Set<unknown>();
  const fn = iteratee || ((v: T) => v);
  for (const arr of arrays) {
    for (const item of arr) {
      const key = fn(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
  }
  return result;
}

export function uniq<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function uniqBy<T>(array: T[], iteratee: (value: T) => unknown): T[] {
  const result: T[] = [];
  const seen = new Set<unknown>();
  for (const item of array) {
    const key = iteratee(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

export function unzip<T>(arrays: T[][]): T[][] {
  const length = arrays.length ? Math.max(...arrays.map((a) => a.length)) : 0;
  const result: T[][] = [];
  for (let i = 0; i < length; i++) {
    result.push(arrays.map((a) => a[i]!));
  }
  return result;
}

export function unzipWith<T, R>(
  arrays: T[][],
  iteratee: (...values: T[]) => R
): R[] {
  const length = arrays.length ? Math.max(...arrays.map((a) => a.length)) : 0;
  const result: R[] = [];
  for (let i = 0; i < length; i++) {
    result.push(iteratee(...arrays.map((a) => a[i]!)));
  }
  return result;
}

export function without<T>(array: T[], ...values: T[]): T[] {
  return pull(array, ...values);
}

export function xor<T>(...arrays: T[][]): T[] {
  const count = new Map<T, number>();
  for (const arr of arrays) {
    const uniqArr = [...new Set(arr)];
    for (const item of uniqArr) {
      count.set(item, (count.get(item) || 0) + 1);
    }
  }
  const result: T[] = [];
  for (const [item, c] of count) {
    if (c === 1) result.push(item);
  }
  return result;
}

export function xorBy<T>(...args: any[]): T[] {
  const iteratee =
    typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
  const arrays: T[][] = args;
  const count = new Map<unknown, number>();
  const itemMap = new Map<unknown, T>();
  const fn = iteratee || ((v: T) => v as unknown);
  for (const arr of arrays) {
    const uniqArr = [...new Set(arr)];
    for (const item of uniqArr) {
      const key = fn(item);
      count.set(key, (count.get(key) || 0) + 1);
      itemMap.set(key, item);
    }
  }
  const result: T[] = [];
  for (const [key, c] of count) {
    if (c === 1) {
      const item = itemMap.get(key);
      if (item !== undefined) result.push(item);
    }
  }
  return result;
}

export function zip<T>(...arrays: T[][]): T[][] {
  return unzip(arrays);
}

export function zipObject<T>(
  props: (string | number)[],
  values: T[]
): Record<string, T> {
  const result: Record<string, T> = {};
  for (let i = 0; i < props.length; i++) {
    result[String(props[i]!)] = values[i] as T;
  }
  return result;
}

export function zipWith<T, R>(...args: any[]): R[] {
  const iteratee = args.pop();
  const arrays: T[][] = args;
  return unzipWith(arrays, iteratee);
}

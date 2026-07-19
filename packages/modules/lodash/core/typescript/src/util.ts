/* eslint-disable @typescript-eslint/no-explicit-any */

export function attempt<T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
): ReturnType<T> | Error {
  try {
    return func(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(String(e));
  }
}

export function bindAll<T extends Record<string, any>>(
  object: T,
  ...methodNames: (keyof T)[]
): T {
  for (const name of methodNames) {
    const value = object[name];
    if (typeof value === 'function') {
      (object as any)[name] = value.bind(object);
    }
  }
  return object;
}

export function constant<T>(value: T): () => T {
  return () => value;
}

export function defaultTo<T, D>(
  value: T | null | undefined,
  defaultValue: D
): T | D {
  return value == null || Number.isNaN(value as number) ? defaultValue : value;
}

export function flow<F extends (...args: any[]) => any>(
  ...funcs: F[]
): (...args: Parameters<F>) => ReturnType<F> {
  return function (this: any, ...args: any[]): any {
    let result = funcs[0]!.apply(this, args);
    for (let i = 1; i < funcs.length; i++) {
      result = funcs[i]!.call(this, result);
    }
    return result;
  };
}

export function flowRight<F extends (...args: any[]) => any>(
  ...funcs: F[]
): (...args: Parameters<F>) => ReturnType<F> {
  return flow(...funcs.reverse());
}

export function identity<T>(value: T): T {
  return value;
}

export function iteratee(
  func: ((...args: any[]) => any) | string | number | symbol | object
): (...args: any[]) => any {
  if (typeof func === 'function') return func as (...args: any[]) => any;
  if (typeof func === 'string') return (obj: any) => obj[func];
  if (typeof func === 'number' || typeof func === 'symbol')
    return (obj: any) => obj[func as any];
  if (isPlainObject(func)) return (obj: any) => isMatch(obj, func);
  return identity;
}

export function matches<T extends Record<string, any>>(
  source: T
): (object: any) => boolean {
  return (object: any) => isMatch(object, source);
}

export function matchesProperty(
  path: string | string[],
  srcValue: any
): (object: any) => boolean {
  return (object: any) => {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current = object;
    for (const key of keys) {
      if (current == null) return false;
      current = current[key];
    }
    return current === srcValue;
  };
}

export function method(
  path: string | string[],
  ...args: any[]
): (object: any) => any {
  return (object: any) => {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current: any = object;
    let parent: any = undefined;
    for (const key of keys) {
      if (current == null) return undefined;
      parent = current;
      current = current[key];
    }
    if (typeof current !== 'function') return undefined;
    return current.call(parent, ...args);
  };
}

export function methodOf(
  object: Record<string, any>,
  ...args: any[]
): (path: string | string[]) => any {
  return (path: string | string[]) => {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current: any = object;
    for (const key of keys) {
      if (current == null) return undefined;
      current = current[key];
    }
    if (typeof current !== 'function') return undefined;
    return current(...args);
  };
}

export function mixin<T extends Record<string, any>>(
  object: T,
  source: Record<string, any>,
  options?: { chain?: boolean }
): T {
  void options;
  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'function') {
      (object as any)[key] = source[key];
    }
  }
  return object;
}

export function noop(...args: any[]): undefined {
  void args;
  return undefined;
}

export function nthArg(n: number): (...args: any[]) => any {
  return (...args: any[]) => args[n >= 0 ? n : args.length + n];
}

export function over<T, R>(
  ...iteratees: ((...args: T[]) => R)[]
): (...args: T[]) => R[] {
  return (...args: T[]) => iteratees.map((fn) => fn(...args));
}

export function overEvery<T>(
  ...predicates: ((...args: T[]) => boolean)[]
): (...args: T[]) => boolean {
  return (...args: T[]) => predicates.every((p) => p(...args));
}

export function overSome<T>(
  ...predicates: ((...args: T[]) => boolean)[]
): (...args: T[]) => boolean {
  return (...args: T[]) => predicates.some((p) => p(...args));
}

export function property<T = any>(
  path: string | string[]
): (object: any) => T | undefined {
  return (object: any) => {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current = object;
    for (const key of keys) {
      if (current == null) return undefined;
      current = current[key];
    }
    return current as T | undefined;
  };
}

export function propertyOf<T extends Record<string, any>>(
  object: T
): (path: string | string[]) => any {
  return (path: string | string[]) => {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current: any = object;
    for (const key of keys) {
      if (current == null) return undefined;
      current = current[key];
    }
    return current;
  };
}

export function range(
  start: number = 0,
  end?: number,
  step: number = 1
): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  const result: number[] = [];
  if (step === 0) {
    for (let i = 0; i < end - start; i++) result.push(start);
    return result;
  }
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i);
  } else {
    for (let i = start; i > end; i += step) result.push(i);
  }
  return result;
}

export function rangeRight(
  start: number = 0,
  end?: number,
  step: number = 1
): number[] {
  return range(start, end, step).reverse();
}

export function runInContext(): void {}

export function stubArray(): any[] {
  return [];
}

export function stubFalse(): false {
  return false;
}

export function stubObject(): Record<string, never> {
  return {};
}

export function stubString(): '' {
  return '';
}

export function stubTrue(): true {
  return true;
}

export function times<T>(n: number, iteratee: (index: number) => T): T[] {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    result.push(iteratee(i));
  }
  return result;
}

export function toPath(value: string): string[] {
  return value.match(/[^.[\]]+|(?<=\[)\d+(?=\])/g) || [value];
}

let uniqueIdCounter = 0;

export function uniqueId(prefix: string = ''): string {
  return `${prefix}${++uniqueIdCounter}`;
}

function isPlainObject(value: any): boolean {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function isMatch(object: any, source: any): boolean {
  if (object === source) return true;
  if (object == null || source == null) return false;
  if (typeof source !== 'object') return object === source;
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (!isMatch(object[key], source[key])) return false;
      } else {
        if (object[key] !== source[key]) return false;
      }
    }
  }
  return true;
}

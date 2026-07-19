/* eslint-disable @typescript-eslint/no-explicit-any */

export function after<T extends (...args: any[]) => any>(
  n: number,
  func: T
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let counter = 0;
  return function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    counter++;
    if (counter >= n) return func.apply(this, args);
    return undefined;
  } as (...args: Parameters<T>) => ReturnType<T> | undefined;
}

export function ary<T extends (...args: any[]) => any>(
  func: T,
  n: number = func.length
): (...args: any[]) => ReturnType<T> {
  return function (this: any, ...args: any[]): ReturnType<T> {
    return func.apply(this, args.slice(0, n));
  };
}

export function before<T extends (...args: any[]) => any>(
  n: number,
  func: T
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let counter = 0;
  let result: ReturnType<T> | undefined;
  return function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    counter++;
    if (counter < n) {
      result = func.apply(this, args);
    }
    return result;
  } as (...args: Parameters<T>) => ReturnType<T> | undefined;
}

export function bind<T extends (...args: any[]) => any>(
  func: T,
  thisArg: any,
  ...partials: any[]
): (...args: any[]) => ReturnType<T> {
  return function (this: any, ...args: any[]): ReturnType<T> {
    return func.apply(thisArg, [...partials, ...args]);
  };
}

export function curry<T extends (...args: any[]) => any>(
  func: T,
  arity: number = func.length
): (...args: any[]) => any {
  return function curried(this: any, ...args: any[]): any {
    if (args.length >= arity) {
      return func.apply(this, args);
    }
    return function (this: any, ...nextArgs: any[]): any {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 0,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let result: ReturnType<T> | undefined;
  const { leading = false, trailing = true } = options;

  function invokeFunc(this: any): ReturnType<T> {
    result = func.apply(this, lastArgs!);
    lastArgs = null;
    return result!;
  }

  function trailingEdge(this: any): void {
    timeoutId = null;
    if (trailing && lastArgs) {
      invokeFunc.call(this);
    }
    lastArgs = null;
  }

  function debounced(this: any, ...args: Parameters<T>): void {
    const isFirstCall = timeoutId === null;
    lastArgs = args;
    if (isFirstCall) {
      if (leading) {
        invokeFunc.call(this);
      }
      timeoutId = setTimeout(() => trailingEdge.call(this), wait);
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => trailingEdge.call(this), wait);
    }
  }

  debounced.cancel = function (): void {
    if (timeoutId) {
      clearTimeout(timeoutId!);
    }
    timeoutId = null;
    lastArgs = null;
  };

  debounced.flush = function (this: any): ReturnType<T> | undefined {
    if (timeoutId && lastArgs) {
      invokeFunc.call(this);
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    return result;
  };

  return debounced;
}

export function defer<T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
): number {
  return setTimeout(() => func(...args), 1) as unknown as number;
}

export function delay<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  ...args: Parameters<T>
): number {
  return setTimeout(() => func(...args), wait) as unknown as number;
}

export function flip<T extends (...args: any[]) => any>(
  func: T
): (...args: any[]) => ReturnType<T> {
  return function (this: any, ...args: any[]): ReturnType<T> {
    return func.apply(this, [...args].reverse());
  };
}

export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => string
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : String(args[0]);
    if (cache.has(key)) return cache.get(key)!;
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
  memoized.cache = cache;
  return memoized;
}

export function negate<T extends (...args: any[]) => boolean>(
  predicate: T
): (...args: Parameters<T>) => boolean {
  return function (this: any, ...args: Parameters<T>): boolean {
    return !predicate.apply(this, args);
  };
}

export function once<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let called = false;
  let result: ReturnType<T> | undefined;
  return function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
}

export function partial<T extends (...args: any[]) => any>(
  func: T,
  ...partials: any[]
): (...args: any[]) => ReturnType<T> {
  return function (this: any, ...args: any[]): ReturnType<T> {
    const fullArgs = partials
      .map((p) => (p === partial.placeholder ? args.shift() : p))
      .concat(args);
    return func.apply(this, fullArgs);
  };
}

partial.placeholder = '_';

export function rest<T extends (...args: any[]) => any>(
  func: T,
  start: number = func.length - 1
): (...args: any[]) => ReturnType<T> {
  return function (this: any, ...args: any[]): ReturnType<T> {
    const normalArgs = args.slice(0, start);
    const restArgs = args.slice(start);
    return func.apply(this, [...normalArgs, restArgs]);
  };
}

export function spread<T extends (...args: any[]) => any>(
  func: T
): (args: any[]) => ReturnType<T> {
  return function (this: any, args: any[]): ReturnType<T> {
    return func.apply(this, args);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 0,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  const { leading = true, trailing = true } = options;
  return debounce(func, wait, { leading, trailing });
}

export function unary<T extends (...args: any[]) => any>(
  func: T
): (arg: any) => ReturnType<T> {
  return function (this: any, arg: any): ReturnType<T> {
    return func.call(this, arg);
  };
}

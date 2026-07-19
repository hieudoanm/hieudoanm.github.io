export function chain<T>(value: T): _<T> {
  return new _(value);
}

class _<T> {
  constructor(private wrapped: T) {}

  tap(interceptor: (value: T) => void): this {
    interceptor(this.wrapped);
    return this;
  }

  thru<R>(interceptor: (value: T) => R): _<R> {
    return new _(interceptor(this.wrapped));
  }

  value(): T {
    return this.wrapped;
  }

  valueOf(): T {
    return this.wrapped;
  }

  toString(): string {
    return String(this.wrapped);
  }
}

export { _ };

export function tap<T>(value: T, interceptor: (value: T) => void): T {
  interceptor(value);
  return value;
}

export function thru<T, R>(value: T, interceptor: (value: T) => R): R {
  return interceptor(value);
}

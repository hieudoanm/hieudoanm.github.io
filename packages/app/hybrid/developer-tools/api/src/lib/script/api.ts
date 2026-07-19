import { SandboxHost, message } from './types';
import { validateSchema } from '@/lib/schema';
import { JsonSchema } from '@/types/api-client';

export function formatValue(value: unknown): string {
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value);
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'function') return '[function]';
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function formatLogArg(value: unknown): string {
  if (typeof value === 'string') return value;
  return formatValue(value);
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false;
  }
  const isArrayA = Array.isArray(a);
  const isArrayB = Array.isArray(b);
  if (isArrayA !== isArrayB) return false;
  if (isArrayA && isArrayB) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (
      !deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    ) {
      return false;
    }
  }
  return true;
}

function createVarMap(store: Record<string, string>): Record<string, unknown> {
  const lookup = (key: string): string | undefined => {
    if (Object.prototype.hasOwnProperty.call(store, key)) return key;
    const lower = key.toLowerCase();
    const found = Object.keys(store).find((k) => k.toLowerCase() === lower);
    return found;
  };
  return new Proxy(
    {},
    {
      get(_target, rawKey) {
        const key = String(rawKey);
        if (key === 'get')
          return (k: unknown) => {
            const hit = lookup(String(k));
            return hit === undefined ? undefined : store[hit];
          };
        if (key === 'set')
          return (k: unknown, v: unknown) => {
            store[lookup(String(k)) ?? String(k)] = String(v);
          };
        if (key === 'unset')
          return (k: unknown) => {
            const hit = lookup(String(k));
            if (hit !== undefined) delete store[hit];
          };
        if (key === 'has')
          return (k: unknown) => lookup(String(k)) !== undefined;
        const hit = lookup(key);
        return hit === undefined ? undefined : store[hit];
      },
      set(_target, rawKey, value: unknown) {
        store[String(rawKey)] = String(value);
        return true;
      },
    }
  );
}

function createKVMap(store: Record<string, string>): Record<string, unknown> {
  const lookup = (key: string): string | undefined => {
    if (Object.prototype.hasOwnProperty.call(store, key)) return key;
    const lower = key.toLowerCase();
    return Object.keys(store).find((k) => k.toLowerCase() === lower);
  };
  return new Proxy(
    {},
    {
      get(_target, rawKey) {
        const key = String(rawKey);
        if (key === 'get')
          return (k: unknown) => {
            const hit = lookup(String(k));
            return hit === undefined ? undefined : store[hit];
          };
        if (key === 'set')
          return (k: unknown, v: unknown) => {
            store[lookup(String(k)) ?? String(k)] = String(v);
          };
        if (key === 'has')
          return (k: unknown) => lookup(String(k)) !== undefined;
        if (key === 'unset')
          return (k: unknown) => {
            const hit = lookup(String(k));
            if (hit !== undefined) delete store[hit];
          };
        const hit = lookup(key);
        return hit === undefined ? undefined : store[hit];
      },
      set(_target, rawKey, value: unknown) {
        store[String(rawKey)] = String(value);
        return true;
      },
      deleteProperty(_target, rawKey) {
        delete store[String(rawKey)];
        return true;
      },
      ownKeys() {
        return Reflect.ownKeys(store);
      },
      getOwnPropertyDescriptor() {
        return { enumerable: true, configurable: true };
      },
    }
  );
}

function createRequestObject(
  state: Record<string, unknown>
): Record<string, unknown> {
  const params = (state.params ?? {}) as Record<string, string>;
  const headers = (state.headers ?? {}) as Record<string, string>;
  const auth = (state.auth ?? {}) as Record<string, unknown>;
  return {
    get method() {
      return state.method;
    },
    set method(value: unknown) {
      state.method = String(value);
    },
    get url() {
      return state.url;
    },
    set url(value: unknown) {
      state.url = String(value);
    },
    params: createKVMap(params),
    headers: createKVMap(headers),
    body: {
      get raw() {
        return state.body;
      },
      get type() {
        return state.bodyType;
      },
      get() {
        return state.body;
      },
      set(value: unknown) {
        state.body = String(value);
      },
    },
    auth: {
      get type() {
        return auth.type;
      },
      get token() {
        return auth.token;
      },
      get username() {
        return auth.username;
      },
      get password() {
        return auth.password;
      },
      set(type: unknown, value: unknown) {
        auth[String(type)] = String(value);
      },
    },
    get timeout() {
      return state.timeout;
    },
    get redirect() {
      return state.redirect;
    },
  };
}

function createResponseObject(
  state: Record<string, unknown> | null
): Record<string, unknown> {
  if (state === null) {
    return {
      get code() {
        throw new Error(
          'No response available yet. Use pm.response in the test script.'
        );
      },
      get status() {
        throw new Error(
          'No response available yet. Use pm.response in the test script.'
        );
      },
      get headers() {
        throw new Error(
          'No response available yet. Use pm.response in the test script.'
        );
      },
      get body() {
        throw new Error(
          'No response available yet. Use pm.response in the test script.'
        );
      },
      text: () => {
        throw new Error(
          'No response available yet. Use pm.response in the test script.'
        );
      },
      json: () => {
        throw new Error(
          'No response available yet. Use pm.response in the test script.'
        );
      },
      to: { have: jsonSchemaMatcher(null) },
    };
  }
  const headers = (state.headers ?? {}) as Record<string, string>;
  return {
    code: state.code,
    status: state.code,
    statusText: state.statusText,
    responseTime: state.time,
    size: state.size,
    headers: createKVMap(headers),
    body: state.body,
    text: () => String(state.body),
    json: () => {
      const parsed = state.json as unknown;
      if (parsed !== undefined) return parsed;
      try {
        return JSON.parse(String(state.body));
      } catch {
        throw new Error('Invalid JSON in response body');
      }
    },
    to: { have: jsonSchemaMatcher(state) },
  };
}

const jsonSchemaMatcher = (state: Record<string, unknown> | null) => ({
  jsonSchema: (schema: JsonSchema): void => {
    if (state === null) {
      throw new Error(
        'No response available yet. Use pm.response in the test script.'
      );
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(String(state.body));
    } catch {
      parsed = undefined;
    }
    const result = validateSchema(schema, parsed);
    if (!result.valid) {
      throw new Error(
        `Response does not match schema: ${result.errors.join('; ')}`
      );
    }
  },
});

function makeAssertion(
  actual: unknown,
  negate: boolean
): Record<string, unknown> {
  const fail = (msg: string): never => {
    throw new Error(negate ? `Expected NOT ${msg}` : `Expected ${msg}`);
  };
  const check = (cond: boolean, msg: string): void => {
    if (negate ? cond : !cond) fail(msg);
  };
  return {
    toBe(expected: unknown) {
      check(
        Object.is(actual, expected),
        `${formatValue(actual)} to be ${formatValue(expected)}`
      );
    },
    toEqual(expected: unknown) {
      check(
        deepEqual(actual, expected),
        `${formatValue(actual)} to equal ${formatValue(expected)}`
      );
    },
    toMatch(expected: unknown) {
      const source = String(actual);
      const ok =
        expected instanceof RegExp
          ? expected.test(source)
          : source.includes(String(expected));
      check(ok, `${formatValue(actual)} to match ${formatValue(expected)}`);
    },
    toContain(expected: unknown) {
      const ok = Array.isArray(actual)
        ? (actual as unknown[]).some((item) => deepEqual(item, expected))
        : typeof actual === 'string'
          ? String(actual).includes(String(expected))
          : false;
      check(ok, `${formatValue(actual)} to contain ${formatValue(expected)}`);
    },
    toHaveLength(length: number) {
      const len =
        Array.isArray(actual) || typeof actual === 'string'
          ? (actual as { length: number }).length
          : undefined;
      check(len === length, `${formatValue(actual)} to have length ${length}`);
    },
    toBeTruthy() {
      check(Boolean(actual), `${formatValue(actual)} to be truthy`);
    },
    toBeFalsy() {
      check(!actual, `${formatValue(actual)} to be falsy`);
    },
    toBeNull() {
      check(actual === null, `${formatValue(actual)} to be null`);
    },
    toBeDefined() {
      check(actual !== undefined, `${formatValue(actual)} to be defined`);
    },
    toBeUndefined() {
      check(actual === undefined, `${formatValue(actual)} to be undefined`);
    },
    toBeGreaterThan(value: number) {
      check(
        Number(actual) > value,
        `${formatValue(actual)} to be greater than ${value}`
      );
    },
    toBeLessThan(value: number) {
      check(
        Number(actual) < value,
        `${formatValue(actual)} to be less than ${value}`
      );
    },
    toBeGreaterThanOrEqual(value: number) {
      check(
        Number(actual) >= value,
        `${formatValue(actual)} to be >= ${value}`
      );
    },
    toBeLessThanOrEqual(value: number) {
      check(
        Number(actual) <= value,
        `${formatValue(actual)} to be <= ${value}`
      );
    },
    toThrow(expected?: unknown) {
      if (typeof actual !== 'function') {
        fail(`${formatValue(actual)} to be a function`);
      }
      let thrown: unknown;
      try {
        (actual as () => unknown)();
      } catch (err) {
        thrown = err;
      }
      if (expected !== undefined) {
        const match =
          expected instanceof RegExp
            ? expected.test(message(thrown))
            : message(thrown) === String(expected);
        check(
          thrown !== undefined && match,
          `function to throw ${formatValue(expected)}`
        );
      } else {
        check(thrown !== undefined, 'function to throw');
      }
    },
  };
}

function createExpect(actual: unknown): Record<string, unknown> {
  return {
    ...makeAssertion(actual, false),
    not: makeAssertion(actual, true),
  };
}

export function createPm(hst: SandboxHost): Record<string, unknown> {
  const log =
    (level: 'log' | 'info' | 'warn' | 'error') =>
    (...args: unknown[]) => {
      hst.log(level, args.map((arg) => formatLogArg(arg)).join(' '));
    };
  const pm: Record<string, unknown> = {
    log: log('log'),
    info: log('info'),
    warn: log('warn'),
    error: log('error'),
    test: (name: unknown, fn: () => unknown) => {
      try {
        fn();
        hst.test(String(name), true);
      } catch (err) {
        hst.test(String(name), false, message(err));
      }
    },
    expect: (actual: unknown) => createExpect(actual),
    sendRequest: (
      url: unknown,
      opts: unknown,
      cb: (err: Error | null, resp?: Record<string, unknown>) => void
    ) => {
      if (!hst.sendRequest) {
        if (typeof cb === 'function')
          cb(new Error('sendRequest is not supported'));
        return;
      }
      hst.sendRequest(
        String(url),
        (opts ?? {}) as Record<string, unknown>,
        (err, resp) => {
          if (typeof cb === 'function') {
            try {
              cb(err, resp);
            } catch (e) {
              hst.log('error', `sendRequest callback error: ${message(e)}`);
            }
          }
        }
      );
    },
    setEnvironmentVariable: (key: unknown, value: unknown) => {
      hst.environment[String(key)] = String(value);
    },
    getEnvironmentVariable: (key: unknown) => hst.environment[String(key)],
    unsetEnvironmentVariable: (key: unknown) => {
      delete hst.environment[String(key)];
    },
  };
  pm.environment = createVarMap(hst.environment);
  pm.globals = createVarMap(hst.environment);
  pm.request = createRequestObject(hst.requestState);
  pm.response = createResponseObject(hst.responseState);
  return { pm };
}

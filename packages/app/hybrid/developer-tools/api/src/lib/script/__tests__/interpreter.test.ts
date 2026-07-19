import { runScript } from '@/lib/script';
import { SandboxHost, Value } from '@/lib/script/types';
import { ScriptLog, TestResult } from '@/types/api-client';

interface Harness {
  host: SandboxHost;
  logs: ScriptLog[];
  results: TestResult[];
  environment: Record<string, string>;
  requestState: Record<string, unknown>;
}

const makeHarness = (): Harness => {
  const logs: ScriptLog[] = [];
  const results: TestResult[] = [];
  const environment: Record<string, string> = {};
  const requestState: Record<string, unknown> = {
    method: 'GET',
    url: 'https://api.example.com/users',
    params: {},
    headers: {},
    body: '',
    bodyType: 'raw',
    auth: { type: 'none', token: '', username: '', password: '' },
    timeout: '',
    redirect: 'follow',
  };
  const host: SandboxHost = {
    log: (level, text) => logs.push({ id: 'l', level, text, timestamp: 0 }),
    test: (name, passed, error) =>
      results.push({ id: 't', name, passed, error }),
    environment,
    requestState,
    responseState: null,
  };
  return { host, logs, results, environment, requestState };
};

const run = (source: string): Harness => {
  const harness = makeHarness();
  runScript(source, harness.host);
  return harness;
};

const lastLog = (harness: Harness): string =>
  harness.logs[harness.logs.length - 1].text;

describe('interpreter basics', () => {
  it('evaluates arithmetic', () => {
    const h = run('pm.log(1 + 2 * 3);');
    expect(lastLog(h)).toBe('7');
  });

  it('evaluates parentheses and modulo', () => {
    const h = run('pm.log((1 + 2) * 3); pm.log(10 % 3);');
    expect(h.logs[0].text).toBe('9');
    expect(h.logs[1].text).toBe('1');
  });

  it('concatenates strings with +', () => {
    const h = run('pm.log("foo" + "bar" + 1);');
    expect(lastLog(h)).toBe('foobar1');
  });

  it('coerces numbers and strings', () => {
    const h = run('pm.log(5 + "5");');
    expect(lastLog(h)).toBe('55');
  });

  it('evaluates comparisons', () => {
    const h = run(
      'pm.log(2 < 3); pm.log("a" === "a"); pm.log(1 == "1"); pm.log(2 !== 2);'
    );
    expect(h.logs.map((l) => l.text)).toEqual([
      'true',
      'true',
      'true',
      'false',
    ]);
  });

  it('short-circuits && and ||', () => {
    const h = run(
      'let called = false; const f = () => { called = true; return true; }; const a = false && f(); const b = true || f(); pm.log(called); pm.log(a); pm.log(b);'
    );
    expect(h.logs.map((l) => l.text)).toEqual(['false', 'false', 'true']);
  });

  it('evaluates ternary', () => {
    const h = run('const x = 5 > 3 ? "yes" : "no"; pm.log(x);');
    expect(lastLog(h)).toBe('yes');
  });

  it('supports typeof', () => {
    const h = run(
      'pm.log(typeof 5); pm.log(typeof "s"); pm.log(typeof null); pm.log(typeof {}); pm.log(typeof undefined);'
    );
    expect(h.logs.map((l) => l.text)).toEqual([
      'number',
      'string',
      'object',
      'object',
      'undefined',
    ]);
  });

  it('supports unary operators', () => {
    const h = run('let n = 5; n++; ++n; pm.log(n); pm.log(-3); pm.log(!true);');
    expect(h.logs.map((l) => l.text)).toEqual(['7', '-3', 'false']);
  });

  it('supports compound assignment', () => {
    const h = run('let n = 10; n += 5; n *= 2; pm.log(n);');
    expect(lastLog(h)).toBe('30');
  });

  it('throws on undefined variable', () => {
    expect(() => run('pm.log(nope);')).toThrow('"nope" is not defined');
  });

  it('throws on const reassignment', () => {
    expect(() => run('const a = 1; a = 2;')).toThrow('Assignment to constant');
  });

  it('throws on redeclaration', () => {
    expect(() => run('let a = 1; let a = 2;')).toThrow('already been declared');
  });

  it('throws on referencing undeclared in expression', () => {
    expect(() => run('const x = missing + 1;')).toThrow('is not defined');
  });
});

describe('control flow', () => {
  it('executes if/else', () => {
    const h = run(
      'let msg = ""; if (1 > 2) { msg = "no"; } else if (2 > 1) { msg = "yes"; } else { msg = "never"; } pm.log(msg);'
    );
    expect(lastLog(h)).toBe('yes');
  });

  it('executes a for loop', () => {
    const h = run(
      'let sum = 0; for (let i = 1; i <= 100; i += 1) { sum += i; } pm.log(sum);'
    );
    expect(lastLog(h)).toBe('5050');
  });

  it('executes for...of over arrays', () => {
    const h = run(
      'const total = [1, 2, 3, 4]; let sum = 0; for (const n of total) { sum += n; } pm.log(sum);'
    );
    expect(lastLog(h)).toBe('10');
  });

  it('executes for...of over strings', () => {
    const h = run(
      'let out = ""; for (const ch of "ab") { out += ch; } pm.log(out);'
    );
    expect(lastLog(h)).toBe('ab');
  });

  it('executes while loops', () => {
    const h = run(
      'let i = 0; let count = 0; while (i < 5) { i += 1; count += 1; } pm.log(count);'
    );
    expect(lastLog(h)).toBe('5');
  });

  it('supports break and continue', () => {
    const h = run(
      'const out = []; for (let i = 0; i < 10; i += 1) { if (i === 2) { continue; } if (i === 5) { break; } out.push(i); } pm.log(out.join(","));'
    );
    expect(lastLog(h)).toBe('0,1,3,4');
  });

  it('limits runaway loops', () => {
    expect(() => run('let i = 0; while (true) { i += 1; }')).toThrow();
  });
});

describe('functions', () => {
  it('declares and calls functions', () => {
    const h = run('function add(a, b) { return a + b; } pm.log(add(2, 3));');
    expect(lastLog(h)).toBe('5');
  });

  it('supports recursion', () => {
    const h = run(
      'function fact(n) { if (n <= 1) { return 1; } return n * fact(n - 1); } pm.log(fact(5));'
    );
    expect(lastLog(h)).toBe('120');
  });

  it('supports arrow functions', () => {
    const h = run('const double = (x) => x * 2; pm.log(double(21));');
    expect(lastLog(h)).toBe('42');
  });

  it('passes user callbacks to native array methods', () => {
    const h = run(
      'const out = [1, 2, 3].map((x) => x * 2); pm.log(out.join(","));'
    );
    expect(lastLog(h)).toBe('2,4,6');
  });

  it('supports closures', () => {
    const h = run(
      'function counter() { let n = 0; return () => { n += 1; return n; }; } const c = counter(); pm.log(c()); pm.log(c());'
    );
    expect(h.logs.map((l) => l.text)).toEqual(['1', '2']);
  });
});

describe('arrays and objects', () => {
  it('creates and mutates arrays', () => {
    const h = run(
      'const arr = [1, 2, 3]; arr.push(4); arr[0] = 10; pm.log(arr.length); pm.log(arr.join("-"));'
    );
    expect(h.logs.map((l) => l.text)).toEqual(['4', '10-2-3-4']);
  });

  it('creates objects and reads members', () => {
    const h = run(
      'const user = { name: "Ada", tags: ["dev", "ops"] }; pm.log(user.name); pm.log(user.tags[0]); pm.log(user["tags"][1]);'
    );
    expect(h.logs.map((l) => l.text)).toEqual(['Ada', 'dev', 'ops']);
  });

  it('mutates object properties', () => {
    const h = run(
      'const o = { a: 1 }; o.a = 99; o.b = 2; pm.log(o.a); pm.log(o.b);'
    );
    expect(h.logs.map((l) => l.text)).toEqual(['99', '2']);
  });

  it('exposes JSON globals', () => {
    const h = run(
      'const parsed = JSON.parse("{\\"a\\":2}"); pm.log(parsed.a); pm.log(JSON.stringify(parsed));'
    );
    expect(h.logs.map((l) => l.text)).toEqual(['2', '{"a":2}']);
  });

  it('exposes Math and string methods', () => {
    const h = run(
      'pm.log(Math.max(3, 9, 4)); pm.log("hello".toUpperCase()); pm.log("a-b-c".split("-").join("_"));'
    );
    expect(h.logs.map((l) => l.text)).toEqual(['9', 'HELLO', 'a_b_c']);
  });

  it('supports regex literals', () => {
    const h = run('const re = /hello/; pm.log(re.test("say hello"));');
    expect(lastLog(h)).toBe('true');
  });

  it('supports typeof of functions', () => {
    const h = run('const f = () => 1; pm.log(typeof f);');
    expect(lastLog(h)).toBe('function');
  });
});

describe('pm.test and pm.expect', () => {
  it('records passing and failing tests', () => {
    const h = run(
      'pm.test("status is 200", () => { pm.expect(200).toBe(200); }); pm.test("body matches", () => { pm.expect("OK").toBe("nope"); });'
    );
    expect(h.results).toEqual([
      { id: 't', name: 'status is 200', passed: true },
      {
        id: 't',
        name: 'body matches',
        passed: false,
        error: 'Expected "OK" to be "nope"',
      },
    ]);
  });

  it('supports toEqual with nested objects', () => {
    const h = run(
      'pm.test("deep", () => { pm.expect({ a: { b: [1, 2] } }).toEqual({ a: { b: [1, 2] } }); }); pm.test("deep fail", () => { pm.expect({ a: 1 }).toEqual({ a: 2 }); });'
    );
    expect(h.results[0].passed).toBe(true);
    expect(h.results[1].passed).toBe(false);
  });

  it('supports toContain, toMatch and toHaveLength', () => {
    const h = run(
      'pm.test("contains", () => { pm.expect([1, 2, 3]).toContain(2); }); pm.test("match", () => { pm.expect("abc123").toMatch(/\\d+/); }); pm.test("length", () => { pm.expect([1, 2]).toHaveLength(2); }); pm.test("contains fail", () => { pm.expect([1, 2]).toContain(9); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, true, true, false]);
  });

  it('supports toThrow', () => {
    const h = run(
      'pm.test("throws", () => { pm.expect(() => { throw new Error("boom"); }).toThrow(); }); pm.test("throws fail", () => { pm.expect(() => 1 + 1).toThrow(); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, false]);
  });

  it('supports not matchers', () => {
    const h = run(
      'pm.test("not", () => { pm.expect(1).not.toBe(2); }); pm.test("not fail", () => { pm.expect(1).not.toBe(1); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, false]);
  });

  it('catches errors inside test callbacks', () => {
    const h = run('pm.test("broken", () => { const x = undefined.foo; });');
    expect(h.results[0].passed).toBe(false);
    expect(h.results[0].error).toBeTruthy();
  });
});

describe('pm.request and pm.environment', () => {
  it('reads and mutates pm.request url', () => {
    const h = run(
      'pm.request.url = "https://example.org"; pm.log(pm.request.url);'
    );
    expect(lastLog(h)).toBe('https://example.org');
    expect(h.requestState.url).toBe('https://example.org');
  });

  it('mutates headers via get/set', () => {
    const h = run(
      'pm.request.headers.set("X-Custom", "value"); pm.log(pm.request.headers.get("x-custom"));'
    );
    expect(lastLog(h)).toBe('value');
    expect(h.requestState.headers).toEqual({ 'X-Custom': 'value' });
  });

  it('mutates params via get/set', () => {
    const h = run(
      'pm.request.params.set("page", "2"); pm.log(pm.request.params.get("page"));'
    );
    expect(lastLog(h)).toBe('2');
    expect(h.requestState.params).toEqual({ page: '2' });
  });

  it('sets environment variables', () => {
    const h = run(
      'pm.setEnvironmentVariable("token", "abc"); pm.environment.set("host", "example.com"); pm.log(pm.getEnvironmentVariable("token")); pm.log(pm.environment.get("host"));'
    );
    expect(h.logs.map((l) => l.text)).toEqual(['abc', 'example.com']);
    expect(h.environment).toEqual({ token: 'abc', host: 'example.com' });
  });

  it('reads environment variables from the store', () => {
    const harness = makeHarness();
    harness.environment.baseUrl = 'https://api.example.com';
    runScript(
      'pm.log(pm.environment.get("baseUrl")); pm.log(pm.getEnvironmentVariable("baseUrl"));',
      harness.host
    );
    expect(harness.logs.map((l) => l.text)).toEqual([
      'https://api.example.com',
      'https://api.example.com',
    ]);
  });

  it('supports console.log', () => {
    const h = run('console.log("hello", 42);');
    expect(lastLog(h)).toBe('hello 42');
  });
});

describe('limits', () => {
  it('throws on invalid method value comparison', () => {
    const h = run('pm.log(0 / 0);');
    expect(lastLog(h)).toBe('NaN');
  });

  it('formats objects in logs', () => {
    const h = run('pm.log({ a: 1, b: [2] });');
    expect(lastLog(h)).toBe('{"a":1,"b":[2]}');
  });

  it('formats undefined in logs', () => {
    const h = run('pm.log(undefined);');
    expect(lastLog(h)).toBe('undefined');
  });

  it('executes nested control flow with functions', () => {
    const h = run(
      'function sumTo(n) { let sum = 0; for (let i = 1; i <= n; i += 1) { sum += i; } return sum; } const vals = [1, 2, 3].map(sumTo); pm.log(vals.join(","));'
    );
    expect(lastLog(h)).toBe('1,3,6');
  });
});

describe('edge cases', () => {
  it('throws when accessing response fields before a response', () => {
    expect(() => run('const x = pm.response.code;')).toThrow('No response');
  });

  it('throws when assigning to non-targets', () => {
    expect(() => run('(1 + 2) = 3;')).toThrow('Invalid assignment target');
  });

  it('handles all relational operators', () => {
    const h = run(
      'pm.log(3 >= 3); pm.log(3 > 4); pm.log(2 <= 2); pm.log(2 < 1); pm.log("a" >= "a");'
    );
    expect(h.logs.map((l) => l.text)).toEqual([
      'true',
      'false',
      'true',
      'false',
      'true',
    ]);
  });

  it('handles loose and strict inequality', () => {
    const h = run('pm.log(1 != "2"); pm.log(1 !== "1"); pm.log(1 != "1");');
    expect(h.logs.map((l) => l.text)).toEqual(['true', 'true', 'false']);
  });

  it('coerces values for relational comparison', () => {
    const h = run('pm.log("10" < 9);');
    expect(lastLog(h)).toBe('false');
  });

  it('supports while with continue', () => {
    const h = run(
      'let i = 0; let count = 0; while (i < 5) { i += 1; if (i % 2 === 0) { continue; } count += 1; } pm.log(count);'
    );
    expect(lastLog(h)).toBe('3');
  });

  it('supports classic for loops without init or update', () => {
    const h = run('let i = 0; for (; i < 3;) { i += 1; } pm.log(i);');
    expect(lastLog(h)).toBe('3');
  });

  it('iterates object keys with for...of', () => {
    const h = run(
      'const o = { a: 1, b: 2 }; let out = ""; for (const k of o) { out += k; } pm.log(out);'
    );
    expect(lastLog(h)).toBe('ab');
  });

  it('throws on non-iterable values', () => {
    expect(() => run('for (const x of 42) {}')).toThrow('not iterable');
  });

  it('supports empty arrays and trailing commas', () => {
    const h = run('const arr = [1, 2,]; pm.log(arr.length);');
    expect(lastLog(h)).toBe('2');
  });

  it('supports multi-property object literals', () => {
    const h = run('const o = { a: 1, b: 2, c: 3 }; pm.log(o.b);');
    expect(lastLog(h)).toBe('2');
  });

  it('supports computed member access', () => {
    const h = run('const key = "x"; const o = { x: 42 }; pm.log(o[key]);');
    expect(lastLog(h)).toBe('42');
  });

  it('supports prefix/postfix update on members', () => {
    const h = run('const o = { n: 5 }; o.n++; pm.log(o.n);');
    expect(lastLog(h)).toBe('6');
  });

  it('treats function declarations as function type', () => {
    const h = run('function f() {} pm.log(typeof f);');
    expect(lastLog(h)).toBe('function');
  });

  it('handles unary minus on numeric strings', () => {
    const h = run('pm.log(-"5");');
    expect(lastLog(h)).toBe('-5');
  });

  it('reports call errors on non-functions', () => {
    expect(() => run('const x = 5();')).toThrow('is not a function');
  });

  it('supports var declarations', () => {
    const h = run('var x = 1; pm.log(x);');
    expect(lastLog(h)).toBe('1');
  });

  it('invokes pm.sendRequest callback error when unsupported', () => {
    const h = run(
      'pm.sendRequest("https://x.com", {}, (err) => { pm.log("cb"); });'
    );
    expect(lastLog(h)).toBe('cb');
  });

  it('fails loose equality between object and string', () => {
    const h = run('pm.log({} == "x");');
    expect(lastLog(h)).toBe('false');
  });

  it('coerces loose equality between strings, booleans and null', () => {
    const h = run(
      'pm.log("1" == 1); pm.log(true == 1); pm.log(1 == true); pm.log(null == undefined); pm.log(undefined == null);'
    );
    expect(h.logs.map((l) => l.text)).toEqual([
      'true',
      'true',
      'true',
      'true',
      'true',
    ]);
  });

  it('coerces arrays and objects in arithmetic', () => {
    const h = run(
      'pm.log([5] * 2); pm.log([1, 2] - 1); pm.log([1, 2] + ""); pm.log({} + ""); pm.log("" + 5);'
    );
    expect(h.logs.map((l) => l.text)).toEqual([
      '10',
      'NaN',
      '1,2',
      '[object Object]',
      '5',
    ]);
  });

  it('creates globals on assignment to undeclared names', () => {
    const h = run('x = 5; pm.log(x);');
    expect(lastLog(h)).toBe('5');
  });

  it('rethrows non-signal errors from loop bodies', () => {
    expect(() =>
      run('for (let i = 0; i < 3; i += 1) { const x = undefined.y; }')
    ).toThrow();
  });

  it('rethrows break/continue outside loops', () => {
    expect(() => run('break;')).toThrow();
    expect(() => run('continue;')).toThrow();
  });

  it('supports break and continue in for...of blocks', () => {
    const h = run(
      'const out = []; for (const n of [1, 2, 3, 4]) { if (n === 2) { continue; } if (n === 4) { break; } out.push(n); } pm.log(out.join(","));'
    );
    expect(lastLog(h)).toBe('1,3');
  });

  it('rejects invalid update targets', () => {
    expect(() => run('++(1 + 2);')).toThrow('Invalid assignment target');
    expect(() => run('(1 + 2)++;')).toThrow('Invalid assignment target');
  });

  it('rejects writes to null members', () => {
    expect(() => run('null.x = 1;')).toThrow('Cannot set property of null');
  });

  it('supports compound assignment on members', () => {
    const h = run(
      'const o = { a: 8 }; o.a += 2; o.a -= 1; o.a *= 3; o.a /= 3; pm.log(o.a);'
    );
    expect(lastLog(h)).toBe('9');
  });

  it('wraps native function errors', () => {
    expect(() => run('const x = JSON.parse("nope");')).toThrow();
  });

  it('wraps writes to frozen objects', () => {
    expect(() => run('const o = Object.freeze({}); o.a = 1;')).toThrow(
      'Cannot set "a"'
    );
  });

  it('caps recursion depth', () => {
    expect(() => run('function f() { return f(); } f();')).toThrow(
      'Maximum call stack size exceeded'
    );
  });

  it('evaluates empty function bodies', () => {
    const h = run('function noop() {} pm.log(noop());');
    expect(lastLog(h)).toBe('undefined');
  });

  it('logs through console at every level', () => {
    const h = run(
      'console.log("l"); console.info("i"); console.warn("w"); console.error("e");'
    );
    expect(h.logs.map((l) => `${l.level}:${l.text}`)).toEqual([
      'log:l',
      'info:i',
      'warn:w',
      'error:e',
    ]);
  });
});

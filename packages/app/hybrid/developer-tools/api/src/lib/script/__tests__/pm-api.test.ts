import { runScript } from '@/lib/script';
import { SandboxHost } from '@/lib/script/types';
import { TestResult } from '@/types/api-client';

interface Harness {
  host: SandboxHost;
  logs: string[];
  levels: string[];
  results: TestResult[];
}

const makeHarness = (): Harness => {
  const logs: string[] = [];
  const levels: string[] = [];
  const results: TestResult[] = [];
  const host: SandboxHost = {
    log: (level, text) => {
      levels.push(level);
      logs.push(text);
    },
    test: (name, passed, error) =>
      results.push({ id: 't', name, passed, error }),
    environment: { existing: 'value' },
    requestState: {
      method: 'POST',
      url: 'https://api.example.com/users',
      params: { page: '1' },
      headers: { 'X-Test': 'yes' },
      body: '{"a":1}',
      bodyType: 'raw',
      auth: { type: 'bearer', token: 'tok', username: '', password: '' },
      timeout: '5000',
      redirect: 'follow',
    },
    responseState: {
      code: 201,
      statusText: 'Created',
      headers: { 'content-type': 'application/json' },
      body: '{"created":true}',
      json: { created: true },
      time: 23,
      size: 42,
    },
  };
  return { host, logs, levels, results };
};

const run = (source: string): Harness => {
  const harness = makeHarness();
  runScript(source, harness.host);
  return harness;
};

describe('logging', () => {
  it('supports all log levels', () => {
    const h = run('pm.log("a"); pm.info("b"); pm.warn("c"); pm.error("d");');
    expect(h.logs).toEqual(['a', 'b', 'c', 'd']);
    expect(h.levels).toEqual(['log', 'info', 'warn', 'error']);
  });

  it('joins multiple arguments', () => {
    const h = run('pm.log(1, "two", { three: 3 });');
    expect(h.logs[0]).toBe('1 two {"three":3}');
  });

  it('prints strings unquoted and values formatted', () => {
    const h = run('pm.log("plain", 5, true, null, undefined);');
    expect(h.logs[0]).toBe('plain 5 true null undefined');
  });

  it('falls back to String() for circular values', () => {
    const h = run(
      'const o = { a: {} }; o.a.self = o; pm.log(o); pm.log({ toString: "x" });'
    );
    expect(h.logs[0]).toBe('[object Object]');
  });
});

describe('expect matchers', () => {
  it('toBe with primitives', () => {
    const h = run(
      'pm.test("t1", () => { pm.expect(1).toBe(1); }); pm.test("t2", () => { pm.expect(1).toBe(2); }); pm.test("t3", () => { pm.expect(NaN).toBe(NaN); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, false, false]);
  });

  it('toBe with not', () => {
    const h = run('pm.test("n", () => { pm.expect(1).not.toBe(2); });');
    expect(h.results[0].passed).toBe(true);
  });

  it('toEqual and not.toEqual', () => {
    const h = run(
      'pm.test("e", () => { pm.expect([1, [2]]).toEqual([1, [2]]); }); pm.test("e2", () => { pm.expect({ a: 1 }).not.toEqual({ a: 2 }); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, true]);
  });

  it('toEqual failure modes', () => {
    const h = run(
      'pm.test("a", () => { pm.expect([1, 2]).toEqual([1]); }); pm.test("b", () => { pm.expect([1, [2]]).toEqual([1, [3]]); }); pm.test("c", () => { pm.expect([]).toEqual({}); }); pm.test("d", () => { pm.expect({ a: 1 }).toEqual({ a: 1, b: 2 }); }); pm.test("e", () => { pm.expect({ a: 1, b: 2 }).toEqual({ a: 1, c: 2 }); }); pm.test("f", () => { pm.expect({ a: 1 }).toEqual({ a: 2 }); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  });

  it('toMatch with regex and string', () => {
    const h = run(
      'pm.test("m", () => { pm.expect("hello123").toMatch(/\\d+/); }); pm.test("m2", () => { pm.expect("hello").toMatch("llo"); }); pm.test("m3", () => { pm.expect("hello").not.toMatch(/z/); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, true, true]);
  });

  it('toContain with arrays and strings', () => {
    const h = run(
      'pm.test("c", () => { pm.expect([1, { a: 2 }]).toContain({ a: 2 }); }); pm.test("c2", () => { pm.expect("abcdef").toContain("cde"); }); pm.test("c3", () => { pm.expect("abc").not.toContain("z"); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, true, true]);
  });

  it('toHaveLength on arrays and strings', () => {
    const h = run(
      'pm.test("l", () => { pm.expect([1, 2, 3]).toHaveLength(3); }); pm.test("l2", () => { pm.expect("abcd").toHaveLength(4); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, true]);
  });

  it('truthiness matchers', () => {
    const h = run(
      'pm.test("t", () => { pm.expect("x").toBeTruthy(); pm.expect(0).toBeFalsy(); }); pm.test("n", () => { pm.expect(null).toBeNull(); }); pm.test("d", () => { pm.expect(1).toBeDefined(); pm.expect(undefined).toBeUndefined(); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, true, true]);
  });

  it('comparison matchers', () => {
    const h = run(
      'pm.test("c", () => { pm.expect(5).toBeGreaterThan(4); pm.expect(5).toBeLessThan(6); pm.expect(5).toBeGreaterThanOrEqual(5); pm.expect(5).toBeLessThanOrEqual(5); }); pm.test("c2", () => { pm.expect(5).toBeGreaterThan(6); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, false]);
  });

  it('toThrow with expected messages', () => {
    const h = run(
      'pm.test("th", () => { pm.expect(() => JSON.parse("nope")).toThrow(/Unexpected/); }); pm.test("th2", () => { pm.expect(() => JSON.parse("nope")).toThrow("Unexpected"); }); pm.test("th3", () => { pm.expect(() => 1).toThrow(); });'
    );
    expect(h.results.map((r) => r.passed)).toEqual([true, false, false]);
  });

  it('expect on non-function for toThrow', () => {
    const h = run('pm.test("bad", () => { pm.expect(5).toThrow(); });');
    expect(h.results[0].passed).toBe(false);
  });
});

describe('sendRequest', () => {
  it('delegates to the host sendRequest', () => {
    const sent: string[] = [];
    const harness = makeHarness();
    harness.host.sendRequest = (url, _opts, cb) => {
      sent.push(url);
      cb(null, { code: 200 });
    };
    runScript(
      'pm.sendRequest("https://x.com", { method: "GET" }, (err, resp) => { pm.log(err === null ? "ok" : "err"); pm.log(resp.code); });',
      harness.host
    );
    expect(sent).toEqual(['https://x.com']);
    expect(harness.logs).toEqual(['ok', '200']);
  });

  it('passes host errors to the callback', () => {
    const harness = makeHarness();
    harness.host.sendRequest = (_url, _opts, cb) => {
      cb(new Error('network down'));
    };
    runScript(
      'pm.sendRequest("https://x.com", {}, (err) => { pm.log(err ? err.message : "none"); });',
      harness.host
    );
    expect(harness.logs).toEqual(['network down']);
  });

  it('logs callback errors', () => {
    const harness = makeHarness();
    harness.host.sendRequest = (_url, _opts, cb) => {
      cb(null, { code: 200 });
    };
    runScript(
      'pm.sendRequest("https://x.com", {}, () => { const z = undefined.x; });',
      harness.host
    );
    expect(harness.logs[0]).toContain('sendRequest callback error');
  });
});

describe('pm.request and pm.response', () => {
  it('reads request fields', () => {
    const h = run(
      'pm.log(pm.request.method); pm.log(pm.request.url); pm.log(pm.request.timeout); pm.log(pm.request.redirect); pm.log(pm.request.body.raw); pm.log(pm.request.body.type);'
    );
    expect(h.logs).toEqual([
      'POST',
      'https://api.example.com/users',
      '5000',
      'follow',
      '{"a":1}',
      'raw',
    ]);
  });

  it('reads request body via get()', () => {
    const h = run('pm.log(pm.request.body.get());');
    expect(h.logs).toEqual(['{"a":1}']);
  });

  it('has and unsets request headers', () => {
    const h = run(
      'pm.log(pm.request.headers.get("X-Test")); pm.log(pm.request.headers.has("X-Test")); pm.log(Object.keys(pm.request.headers).length); pm.request.headers.unset("X-Test"); pm.log(pm.request.headers.has("X-Test")); pm.log(Object.keys(pm.request.headers).length); pm.log(pm.request.headers.get("X-Test"));'
    );
    expect(h.logs).toEqual(['yes', 'true', '1', 'false', '0', 'undefined']);
  });

  it('reads auth fields and sets auth by key', () => {
    const h = run(
      'pm.log(pm.request.auth.type); pm.log(pm.request.auth.token); pm.request.auth.set("username", "u"); pm.request.auth.set("password", "p"); pm.log(pm.request.auth.username); pm.log(pm.request.auth.password);'
    );
    expect(h.logs).toEqual(['bearer', 'tok', 'u', 'p']);
  });

  it('reads response fields', () => {
    const h = run(
      'pm.log(pm.response.code); pm.log(pm.response.status); pm.log(pm.response.statusText); pm.log(pm.response.responseTime); pm.log(pm.response.size); pm.log(pm.response.text()); pm.log(pm.response.json().created);'
    );
    expect(h.logs).toEqual([
      '201',
      '201',
      'Created',
      '23',
      '42',
      '{"created":true}',
      'true',
    ]);
  });

  it('reads response headers case-insensitively', () => {
    const h = run('pm.log(pm.response.headers.get("Content-Type"));');
    expect(h.logs).toEqual(['application/json']);
  });

  it('throws on invalid JSON when no parsed value', () => {
    const harness = makeHarness();
    harness.host.responseState = {
      code: 500,
      statusText: 'ERR',
      headers: {},
      body: 'not json',
      json: undefined,
      time: 0,
      size: 0,
    };
    runScript('pm.test("j", () => { pm.response.json(); });', harness.host);
    expect(harness.results[0].passed).toBe(false);
    expect(harness.results[0].error).toContain('Invalid JSON');
  });

  it('throws when response is unavailable in the pre-request script', () => {
    const harness = makeHarness();
    harness.host.responseState = null;
    expect(() =>
      runScript('pm.log(pm.response.status);', harness.host)
    ).toThrow('No response available yet');
    expect(() =>
      runScript('pm.log(pm.response.headers);', harness.host)
    ).toThrow('No response available yet');
    expect(() =>
      runScript('pm.log(pm.response.text());', harness.host)
    ).toThrow('No response available yet');
    expect(() =>
      runScript('pm.log(pm.response.json());', harness.host)
    ).toThrow('No response available yet');
    expect(() => runScript('pm.log(pm.response.code);', harness.host)).toThrow(
      'No response available yet'
    );
    expect(() => runScript('pm.log(pm.response.body);', harness.host)).toThrow(
      'No response available yet'
    );
  });

  it('environment variable helpers', () => {
    const h = run(
      'pm.log(pm.environment.has("existing")); pm.environment.unset("existing"); pm.log(pm.environment.has("existing")); pm.log(pm.environment.get("MISSING")); pm.log(pm.getEnvironmentVariable("missing")); pm.unsetEnvironmentVariable("missing");'
    );
    expect(h.logs).toEqual(['true', 'false', 'undefined', 'undefined']);
  });

  it('sets vars via proxy assignment', () => {
    const h = run(
      'pm.environment.newkey = "xyz"; pm.log(pm.environment.get("newkey"));'
    );
    expect(h.logs).toEqual(['xyz']);
    expect(h.host.environment.newkey).toBe('xyz');
  });

  it('reads data props from environment proxy', () => {
    const h = run(
      'pm.environment.existing = "changed"; pm.log(pm.environment.existing);'
    );
    expect(h.logs).toEqual(['changed']);
  });
});

describe('pm.response.to.have.jsonSchema', () => {
  it('passes when the body matches the schema', () => {
    const h = run(
      'pm.test("s", () => { pm.response.to.have.jsonSchema({ type: "object", properties: { created: { type: "boolean" } } }); });'
    );
    expect(h.results[0].passed).toBe(true);
  });

  it('fails when the body does not match the schema', () => {
    const h = run(
      'pm.test("s", () => { pm.response.to.have.jsonSchema({ type: "object", properties: { created: { type: "string" } } }); });'
    );
    expect(h.results[0].passed).toBe(false);
    expect(h.results[0].error).toContain('does not match schema');
  });

  it('fails on an unparsable body', () => {
    const harness = makeHarness();
    harness.host.responseState = {
      code: 200,
      statusText: 'OK',
      headers: {},
      body: 'not json',
      json: undefined,
      time: 0,
      size: 0,
    };
    runScript(
      'pm.test("s", () => { pm.response.to.have.jsonSchema({ type: "object" }); });',
      harness.host
    );
    expect(harness.results[0].passed).toBe(false);
  });

  it('throws when the response is unavailable', () => {
    const harness = makeHarness();
    harness.host.responseState = null;
    expect(() =>
      runScript(
        'pm.response.to.have.jsonSchema({ type: "object" });',
        harness.host
      )
    ).toThrow('No response available yet');
  });
});

import {
  expandConfigVars,
  runPreRequestScript,
  runTestScript,
} from '@/lib/scripts';
import { emptyRequest, newKeyValue } from '@/lib/http';
import { EnvironmentVariable, ResponseMeta } from '@/types/api-client';

const env: EnvironmentVariable[] = [
  { id: '1', key: 'host', value: 'api.example.com', enabled: true },
  { id: '2', key: 'secret', value: 's3cr3t', enabled: true },
];

const request = (): ReturnType<typeof emptyRequest> => ({
  ...emptyRequest(),
  url: 'https://{{host}}/users',
  headers: [newKeyValue()],
  params: [newKeyValue()],
});

const response: ResponseMeta = {
  status: 200,
  statusText: 'OK',
  url: 'https://api.example.com/users',
  headers: { 'content-type': 'application/json' },
  body: '{"ok":true,"id":7}',
  timeMs: 12,
  sizeBytes: 18,
};

describe('runPreRequestScript', () => {
  it('passes through config unchanged without a script', () => {
    const result = runPreRequestScript(request(), env);
    expect(result.config.url).toBe('https://{{host}}/users');
    expect(result.logs).toEqual([]);
    expect(result.envVars).toEqual({
      host: 'api.example.com',
      secret: 's3cr3t',
    });
  });

  it('applies pm.request mutations to the config', () => {
    const result = runPreRequestScript(
      {
        ...request(),
        preRequestScript:
          'pm.request.headers.set("X-Script", "yes"); pm.request.url = "https://example.org/x";',
      },
      env
    );
    expect(result.config.url).toBe('https://example.org/x');
    const header = result.config.headers.find((h) => h.key === 'X-Script');
    expect(header?.value).toBe('yes');
  });

  it('captures variables set via pm.environment', () => {
    const result = runPreRequestScript(
      {
        ...request(),
        preRequestScript:
          'pm.environment.set("derived", "abc"); pm.setEnvironmentVariable("extra", "123");',
      },
      env
    );
    expect(result.envVars).toEqual({
      host: 'api.example.com',
      secret: 's3cr3t',
      derived: 'abc',
      extra: '123',
    });
  });

  it('logs and continues when the script throws', () => {
    const result = runPreRequestScript(
      { ...request(), preRequestScript: 'undefined.foo();' },
      env
    );
    expect(result.logs.length).toBeGreaterThan(0);
    expect(result.logs[0].level).toBe('error');
    expect(result.config.url).toBe('https://{{host}}/users');
  });

  it('keeps the original config on invalid method', () => {
    const result = runPreRequestScript(
      { ...request(), preRequestScript: 'pm.request.method = "BOGUS";' },
      env
    );
    expect(result.config.method).toBe('GET');
    expect(result.logs[0].text).toContain('Invalid method');
  });

  it('respects script changes to the raw body', () => {
    const result = runPreRequestScript(
      {
        ...request(),
        body: '{"a":1}',
        preRequestScript: 'pm.request.body.set("{\\"a\\":2}");',
      },
      env
    );
    expect(result.config.body).toBe('{"a":2}');
  });

  it('falls back to none auth and follow redirect on invalid values', () => {
    const result = runPreRequestScript(
      {
        ...request(),
        preRequestScript:
          'pm.request.auth.set("type", "bogus"); pm.request.redirect = "weird";',
      },
      env
    );
    expect(result.config.authType).toBe('none');
    expect(result.config.redirect).toBe('follow');
  });

  it('keeps a manual redirect from the config', () => {
    const result = runPreRequestScript(
      {
        ...request(),
        redirect: 'manual',
        preRequestScript: 'pm.log("noop");',
      },
      env
    );
    expect(result.config.redirect).toBe('manual');
  });
});

describe('runTestScript', () => {
  it('records passing and failing tests', () => {
    const result = runTestScript(
      {
        ...request(),
        testScript:
          'pm.test("code is 200", () => { pm.expect(pm.response.code).toBe(200); }); pm.test("json ok", () => { pm.expect(pm.response.json().ok).toBe(false); });',
      },
      response,
      { host: 'api.example.com' }
    );
    expect(result.results).toHaveLength(2);
    expect(result.results[0]).toMatchObject({
      name: 'code is 200',
      passed: true,
    });
    expect(result.results[1]).toMatchObject({ name: 'json ok', passed: false });
  });

  it('returns a script error for runtime failures', () => {
    const result = runTestScript(
      { ...request(), testScript: 'const x = pm.response.nope.deep;' },
      response,
      {}
    );
    expect(result.error).toBeTruthy();
    expect(result.logs[0].level).toBe('error');
  });

  it('captures logs from console and pm.log', () => {
    const result = runTestScript(
      { ...request(), testScript: 'console.log("hello"); pm.warn("careful");' },
      response,
      {}
    );
    expect(result.logs.map((l) => l.text)).toEqual(['hello', 'careful']);
  });

  it('returns empty results without a test script', () => {
    const result = runTestScript(request(), response, {});
    expect(result.results).toEqual([]);
    expect(result.logs).toEqual([]);
    expect(result.error).toBeUndefined();
  });

  it('reports invalid JSON response bodies as test failures', () => {
    const result = runTestScript(
      {
        ...request(),
        testScript: 'pm.test("json", () => { pm.response.json(); });',
      },
      { ...response, body: 'not json', status: 500 },
      {}
    );
    expect(result.results[0].passed).toBe(false);
    expect(result.results[0].error).toContain('Invalid JSON');
  });
});

describe('expandConfigVars', () => {
  it('replaces dynamic variables from envVars', () => {
    const config = {
      ...request(),
      url: 'https://api.example.com/${host}/${randomId}',
      headers: [{ id: '1', key: 'X-Token', value: '${secret}', enabled: true }],
    };
    const result = expandConfigVars(config, {
      host: 'api.example.com',
      secret: 'abc',
    });
    expect(
      result.url.startsWith('https://api.example.com/api.example.com/')
    ).toBe(true);
    expect(result.headers[0].value).toBe('abc');
  });

  it('expands builtin variables', () => {
    const result = expandConfigVars(
      { ...request(), url: 'https://api.example.com/${currentYear}' },
      {}
    );
    expect(result.url).toBe(
      `https://api.example.com/${new Date().getFullYear()}`
    );
  });

  it('leaves unknown variables as-is', () => {
    const result = expandConfigVars(
      { ...request(), url: 'https://api.example.com/${missing}' },
      {}
    );
    expect(result.url).toBe('https://api.example.com/${missing}');
  });
});

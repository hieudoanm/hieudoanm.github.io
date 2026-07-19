import { generateCode } from '@/lib/codegen';
import { emptyRequest } from '@/lib/http';

const config = {
  ...emptyRequest(),
  method: 'POST' as const,
  url: 'https://api.example.com/users',
  headers: [
    { id: '1', key: 'Content-Type', value: 'application/json', enabled: true },
  ],
  body: '{"name":"Ada"}',
  authType: 'bearer' as const,
  token: 'abc123',
};

describe('generateCode', () => {
  it('generates a curl command with method, url, headers and body', () => {
    const code = generateCode('curl', config);
    expect(code).toContain("curl -X POST 'https://api.example.com/users'");
    expect(code).toContain("-H 'Authorization: Bearer abc123'");
    expect(code).toContain("-H 'Content-Type: application/json'");
    expect(code).toContain('-d \'{"name":"Ada"}\'');
  });

  it('generates a fetch call', () => {
    const code = generateCode('fetch', config);
    expect(code).toContain(
      'const response = await fetch("https://api.example.com/users", {'
    );
    expect(code).toContain("method: 'POST',");
    expect(code).toContain("'Authorization': 'Bearer abc123',");
    expect(code).toContain('body: JSON.stringify(');
  });

  it('generates a TypeScript fetch function', () => {
    const code = generateCode('fetch-ts', config);
    expect(code).toContain(
      'export async function RequestUsers(): Promise<Response> {'
    );
    expect(code).toContain('const response = await fetch(');
    expect(code).toContain('return response;');
  });

  it('omits method for GET fetch calls', () => {
    const code = generateCode('fetch', { ...config, method: 'GET', body: '' });
    expect(code).not.toContain('method:');
  });

  it('substitutes environment variables into the generated code', () => {
    const code = generateCode(
      'curl',
      { ...emptyRequest(), url: 'https://{{host}}/users' },
      [{ id: '1', key: 'host', value: 'api.example.com', enabled: true }]
    );
    expect(code).toContain("'https://api.example.com/users'");
    expect(code).not.toContain('{{host}}');
  });

  it('falls back to an escaped string for invalid JSON bodies', () => {
    const invalid = { ...config, body: 'not-json' };
    expect(generateCode('curl', invalid)).toContain("-d 'not-json'");
    expect(generateCode('fetch', invalid)).toContain('body: "not-json",');
  });
});

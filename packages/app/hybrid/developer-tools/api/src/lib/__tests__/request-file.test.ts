import { emptyRequest } from '@/lib/http';
import {
  jsonToRequest,
  readRequestFile,
  readTextFile,
  requestToJson,
} from '@/lib/request-file';

describe('requestToJson', () => {
  it('serializes a request to JSON', () => {
    const json = requestToJson({ ...emptyRequest(), url: 'https://a.com' });
    const parsed = JSON.parse(json);
    expect(parsed.url).toBe('https://a.com');
    expect(parsed.method).toBe('GET');
  });
});

describe('jsonToRequest', () => {
  it('parses a valid request and fills defaults', () => {
    const request = jsonToRequest(
      JSON.stringify({ method: 'POST', url: 'https://a.com' })
    );
    expect(request?.method).toBe('POST');
    expect(request?.url).toBe('https://a.com');
    expect(request?.redirect).toBe('follow');
    expect(request?.timeoutMs).toBe('');
  });

  it('returns null for invalid JSON', () => {
    expect(jsonToRequest('not-json')).toBeNull();
  });

  it('returns null for non-object payloads', () => {
    expect(jsonToRequest('"hi"')).toBeNull();
    expect(jsonToRequest('null')).toBeNull();
  });

  it('returns null when method is missing', () => {
    expect(jsonToRequest(JSON.stringify({ url: 'https://a.com' }))).toBeNull();
  });
});

describe('readRequestFile', () => {
  it('reads and parses a request file', async () => {
    const file = new File([requestToJson(emptyRequest())], 'request.json', {
      type: 'application/json',
    });
    const request = await readRequestFile(file);
    expect(request?.url).toBe('');
  });

  it('resolves null for a malformed file', async () => {
    const file = new File(['not-json'], 'bad.json', {
      type: 'application/json',
    });
    expect(await readRequestFile(file)).toBeNull();
  });

  it('reads an empty string when the reader result is null', async () => {
    class MockReader {
      result: string | null = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      readAsText = (): void => {
        this.onload?.();
      };
    }
    const original = global.FileReader;
    global.FileReader = MockReader as unknown as typeof FileReader;
    try {
      expect(await readTextFile(new File(['x'], 'x.txt'))).toBe('');
    } finally {
      global.FileReader = original;
    }
  });
});

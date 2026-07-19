import {
  addHistoryEntry,
  buildHeaders,
  buildUrl,
  emptyRequest,
  executeRequest,
  loadHistory,
  newKeyValue,
  resolveBody,
  saveHistory,
} from '@/lib/http';
import { RequestConfig } from '@/types/api-client';

const makeHeaders = (entries: [string, string][]): Headers => {
  const headers = new Headers();
  entries.forEach(([key, value]) => headers.set(key, value));
  return headers;
};

const mockFetch = (
  init: Partial<Response> & { bodyText: string; headers?: Headers }
): void => {
  global.fetch = jest.fn().mockResolvedValue({
    status: 200,
    statusText: 'OK',
    url: 'https://api.example.com/users',
    headers: makeHeaders([['content-type', 'application/json']]),
    text: async () => init.bodyText,
    ...init,
  }) as jest.MockedFunction<typeof fetch>;
};

describe('buildUrl', () => {
  it('returns empty string for empty url', () => {
    expect(buildUrl('', [newKeyValue()])).toBe('');
  });

  it('returns base url when no active params', () => {
    expect(
      buildUrl('https://api.example.com/users', [
        { id: '1', key: 'q', value: 'x', enabled: false },
      ])
    ).toBe('https://api.example.com/users');
  });

  it('appends query params', () => {
    expect(
      buildUrl('https://api.example.com/users', [
        { id: '1', key: 'page', value: '2', enabled: true },
        { id: '2', key: 'sort', value: 'asc', enabled: true },
      ])
    ).toBe('https://api.example.com/users?page=2&sort=asc');
  });

  it('encodes keys and values', () => {
    expect(
      buildUrl('https://api.example.com/search', [
        { id: '1', key: 'q', value: 'a b&c', enabled: true },
      ])
    ).toBe('https://api.example.com/search?q=a%20b%26c');
  });

  it('appends to existing query with ampersand', () => {
    expect(
      buildUrl('https://api.example.com/users?limit=10', [
        { id: '1', key: 'page', value: '2', enabled: true },
      ])
    ).toBe('https://api.example.com/users?limit=10&page=2');
  });

  it('ignores rows with blank keys', () => {
    expect(
      buildUrl('https://api.example.com/users', [
        { id: '1', key: '', value: 'x', enabled: true },
        { id: '2', key: 'page', value: '2', enabled: true },
      ])
    ).toBe('https://api.example.com/users?page=2');
  });
});

describe('buildHeaders', () => {
  it('adds bearer token', () => {
    const headers = buildHeaders({
      ...emptyRequest(),
      authType: 'bearer',
      token: 'abc123',
    });
    expect(headers.Authorization).toBe('Bearer abc123');
  });

  it('adds basic auth', () => {
    const headers = buildHeaders({
      ...emptyRequest(),
      authType: 'basic',
      username: 'user',
      password: 'pass',
    });
    expect(headers.Authorization).toBe(`Basic ${btoa('user:pass')}`);
  });

  it('adds custom headers and skips disabled ones', () => {
    const headers = buildHeaders({
      ...emptyRequest(),
      headers: [
        { id: '1', key: 'X-Custom', value: 'yes', enabled: true },
        { id: '2', key: 'X-Disabled', value: 'no', enabled: false },
        { id: '3', key: '', value: 'blank', enabled: true },
      ],
    });
    expect(headers['X-Custom']).toBe('yes');
    expect(headers['X-Disabled']).toBeUndefined();
    expect(headers['']).toBeUndefined();
  });

  it('does not add auth when none selected', () => {
    const headers = buildHeaders(emptyRequest());
    expect(headers.Authorization).toBeUndefined();
  });
});

describe('resolveBody', () => {
  it('returns undefined for GET', () => {
    expect(resolveBody(emptyRequest())).toBeUndefined();
  });

  it('returns body for POST', () => {
    const request = {
      ...emptyRequest(),
      method: 'POST' as const,
      body: '{"a":1}',
    };
    expect(resolveBody(request)).toBe('{"a":1}');
  });

  it('returns undefined for empty body', () => {
    const request = { ...emptyRequest(), method: 'POST' as const, body: '' };
    expect(resolveBody(request)).toBeUndefined();
  });
});

describe('executeRequest', () => {
  it('returns response meta from fetch', async () => {
    mockFetch({ bodyText: '{"ok":true}' });
    const result = await executeRequest({
      ...emptyRequest(),
      url: 'https://api.example.com/users',
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/users',
      expect.objectContaining({ method: 'GET' })
    );
    expect(result.status).toBe(200);
    expect(result.statusText).toBe('OK');
    expect(result.body).toBe('{"ok":true}');
    expect(result.headers['content-type']).toBe('application/json');
    expect(result.sizeBytes).toBe('{"ok":true}'.length);
    expect(result.timeMs).toBeGreaterThanOrEqual(0);
  });
});

describe('history', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads entries', () => {
    const request: RequestConfig = { ...emptyRequest(), url: 'https://a.com' };
    const entries = addHistoryEntry([], request);
    saveHistory(entries);
    expect(loadHistory()).toHaveLength(1);
    expect(loadHistory()[0].request.url).toBe('https://a.com');
  });

  it('prepends new entries', () => {
    const first = addHistoryEntry([], {
      ...emptyRequest(),
      url: 'https://a.com',
    });
    const second = addHistoryEntry(first, {
      ...emptyRequest(),
      url: 'https://b.com',
    });
    expect(second[0].request.url).toBe('https://b.com');
    expect(second[1].request.url).toBe('https://a.com');
  });

  it('returns empty array on corrupt storage', () => {
    localStorage.setItem('api-client:history', 'not-json');
    expect(loadHistory()).toEqual([]);
  });
});

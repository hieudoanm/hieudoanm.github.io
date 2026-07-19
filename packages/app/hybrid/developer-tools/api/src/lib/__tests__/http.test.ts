import {
  addHistoryEntry,
  buildHeaders,
  buildUrl,
  emptyRequest,
  executeRequest,
  initTabs,
  loadDraft,
  loadHistory,
  loadTabs,
  newKeyValue,
  newTab,
  resolveBody,
  saveDraft,
  saveHistory,
  saveTabs,
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

  it('appends params to a url already ending in a question mark', () => {
    expect(
      buildUrl('https://api.example.com/users?', [
        { id: '1', key: 'page', value: '2', enabled: true },
      ])
    ).toBe('https://api.example.com/users?page=2');
  });

  it('appends params to a url already ending in an ampersand', () => {
    expect(
      buildUrl('https://api.example.com/users?limit=10&', [
        { id: '1', key: 'page', value: '2', enabled: true },
      ])
    ).toBe('https://api.example.com/users?limit=10&page=2');
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

  it('adds matching cookies when no Cookie header is set', () => {
    const headers = buildHeaders(
      { ...emptyRequest(), url: 'https://api.example.com/x' },
      [
        {
          id: '1',
          domain: 'api.example.com',
          name: 'sid',
          value: 'abc',
          path: '/',
          secure: false,
          enabled: true,
        },
      ]
    );
    expect(headers.Cookie).toBe('sid=abc');
  });

  it('keeps an existing Cookie header over the cookie jar', () => {
    const headers = buildHeaders(
      {
        ...emptyRequest(),
        url: 'https://api.example.com/x',
        headers: [{ id: '1', key: 'Cookie', value: 'manual=1', enabled: true }],
      },
      [
        {
          id: '2',
          domain: 'api.example.com',
          name: 'sid',
          value: 'abc',
          path: '/',
          secure: false,
          enabled: true,
        },
      ]
    );
    expect(headers.Cookie).toBe('manual=1');
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

  it('adds a content-type header for urlencoded bodies', async () => {
    mockFetch({ bodyText: '{}' });
    await executeRequest({
      ...emptyRequest(),
      method: 'POST',
      url: 'https://api.example.com/users',
      bodyType: 'urlencoded',
      body: 'a=1',
    });

    const [, options] = (fetch as jest.Mock).mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(options.headers).toMatchObject({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  });

  it('passes redirect mode and abort signal to fetch', async () => {
    mockFetch({ bodyText: '{}' });
    await executeRequest({
      ...emptyRequest(),
      url: 'https://api.example.com/users',
      redirect: 'manual',
    });
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/users',
      expect.objectContaining({ redirect: 'manual' })
    );
    const options = (fetch as jest.Mock).mock.calls[0][1] as RequestInit;
    expect(options.signal).toBeInstanceOf(AbortSignal);
  });

  it('aborts the request after the timeout', async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn(
      (_url: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        })
    ) as jest.MockedFunction<typeof fetch>;

    const promise = executeRequest({
      ...emptyRequest(),
      url: 'https://api.example.com/slow',
      timeoutMs: '50',
    });
    const assertion = expect(promise).rejects.toMatchObject({
      name: 'AbortError',
    });
    jest.advanceTimersByTime(100);
    await assertion;
    jest.useRealTimers();
  });

  it('substitutes environment variables before fetching', async () => {
    mockFetch({ bodyText: '{}' });
    await executeRequest(
      {
        ...emptyRequest(),
        url: 'https://{{host}}/users',
        headers: [{ id: '1', key: 'X-Api', value: '{{token}}', enabled: true }],
      },
      [
        { id: '1', key: 'host', value: 'api.example.com', enabled: true },
        { id: '2', key: 'token', value: 'secret', enabled: true },
      ]
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/users',
      expect.objectContaining({
        headers: expect.objectContaining({ 'X-Api': 'secret' }),
      })
    );
  });

  it('ignores disabled environment variables', async () => {
    mockFetch({ bodyText: '{}' });
    await executeRequest({ ...emptyRequest(), url: 'https://{{host}}/x' }, [
      { id: '1', key: 'host', value: 'api.example.com', enabled: false },
    ]);
    expect(fetch).toHaveBeenCalledWith('https://{{host}}/x', expect.anything());
  });
});

describe('executeRequest with scripts', () => {
  it('runs pre-request and test scripts around the request', async () => {
    mockFetch({ bodyText: '{"ok":true}' });
    const result = await executeRequest({
      ...emptyRequest(),
      url: 'https://api.example.com/${host}',
      headers: [{ id: '1', key: 'X-Script', value: 'before', enabled: true }],
      preRequestScript:
        'pm.request.headers.set("X-Script", "after"); pm.setEnvironmentVariable("host", "users");',
      testScript:
        'pm.test("status", () => { pm.expect(pm.response.code).toBe(200); }); pm.test("body", () => { pm.expect(pm.response.json().ok).toBe(true); }); pm.test("fail", () => { pm.expect(1).toBe(2); });',
    });

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toBe('https://api.example.com/users');
    const options = (fetch as jest.Mock).mock.calls[0][1] as RequestInit;
    expect(options.headers).toEqual(
      expect.objectContaining({ 'X-Script': 'after' })
    );
    expect(result.testResults).toHaveLength(3);
    expect(result.testResults?.[0]).toMatchObject({
      name: 'status',
      passed: true,
    });
    expect(result.testResults?.[1]).toMatchObject({
      name: 'body',
      passed: true,
    });
    expect(result.testResults?.[2]).toMatchObject({
      name: 'fail',
      passed: false,
    });
  });

  it('attaches pre-request logs and test logs to the response', async () => {
    mockFetch({ bodyText: '{}' });
    const result = await executeRequest({
      ...emptyRequest(),
      url: 'https://api.example.com/x',
      preRequestScript: 'console.log("pre");',
      testScript: 'console.log("post");',
    });
    expect(result.scriptLogs?.map((l) => l.text)).toEqual(['pre', 'post']);
  });

  it('records a test script runtime error', async () => {
    mockFetch({ bodyText: '{}' });
    const result = await executeRequest({
      ...emptyRequest(),
      url: 'https://api.example.com/x',
      testScript: 'const y = pm.response.deep.value;',
    });
    expect(result.testError).toBeTruthy();
    expect(result.testResults).toEqual([]);
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

  it('returns empty array when stored history is not an array', () => {
    localStorage.setItem('api-client:history', '{"not":"array"}');
    expect(loadHistory()).toEqual([]);
  });
});

describe('draft', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads the draft', () => {
    const request: RequestConfig = { ...emptyRequest(), url: 'https://a.com' };
    saveDraft(request);
    expect(loadDraft()?.url).toBe('https://a.com');
  });

  it('merges stored draft with defaults', () => {
    localStorage.setItem('api-client:draft', '{"url":"https://a.com"}');
    const draft = loadDraft();
    expect(draft?.url).toBe('https://a.com');
    expect(draft?.method).toBe('GET');
    expect(draft?.timeoutMs).toBe('');
    expect(draft?.redirect).toBe('follow');
  });

  it('returns null when no draft exists', () => {
    expect(loadDraft()).toBeNull();
  });

  it('returns null on corrupt storage', () => {
    localStorage.setItem('api-client:draft', 'not-json');
    expect(loadDraft()).toBeNull();
  });
});

describe('tabs', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates a tab from a request', () => {
    const request: RequestConfig = { ...emptyRequest(), url: 'https://a.com' };
    const tab = newTab(request);
    expect(tab.id).toBeTruthy();
    expect(tab.request.url).toBe('https://a.com');
  });

  it('saves and loads tabs', () => {
    const tabs = [
      newTab(),
      newTab({ ...emptyRequest(), url: 'https://b.com' }),
    ];
    saveTabs(tabs);
    expect(loadTabs()).toHaveLength(2);
    expect(loadTabs()[1].request.url).toBe('https://b.com');
  });

  it('normalizes tabs missing new fields', () => {
    localStorage.setItem(
      'api-client:tabs',
      JSON.stringify([{ id: 't1', request: { url: 'https://a.com' } }])
    );
    const tabs = loadTabs();
    expect(tabs[0].request.method).toBe('GET');
    expect(tabs[0].request.redirect).toBe('follow');
  });

  it('returns empty array on corrupt storage', () => {
    localStorage.setItem('api-client:tabs', 'not-json');
    expect(loadTabs()).toEqual([]);
  });

  it('returns empty array when stored tabs are not an array', () => {
    localStorage.setItem('api-client:tabs', '{"not":"array"}');
    expect(loadTabs()).toEqual([]);
  });

  it('normalizes tab entries missing id or request', () => {
    localStorage.setItem(
      'api-client:tabs',
      JSON.stringify([{ request: { url: 'https://a.com' } }, { id: 't2' }])
    );
    const tabs = loadTabs();
    expect(tabs[0].id).toBeTruthy();
    expect(tabs[0].request.url).toBe('https://a.com');
    expect(tabs[1].request.method).toBe('GET');
  });

  it('initializes from a saved draft when no tabs exist', () => {
    localStorage.setItem(
      'api-client:draft',
      JSON.stringify({ url: 'https://draft.com' })
    );
    const tabs = initTabs();
    expect(tabs).toHaveLength(1);
    expect(tabs[0].request.url).toBe('https://draft.com');
  });

  it('prefers saved tabs over the draft', () => {
    localStorage.setItem(
      'api-client:tabs',
      JSON.stringify([{ id: 't1', request: { url: 'https://tab.com' } }])
    );
    localStorage.setItem(
      'api-client:draft',
      JSON.stringify({ url: 'https://draft.com' })
    );
    expect(initTabs()[0].request.url).toBe('https://tab.com');
  });
});

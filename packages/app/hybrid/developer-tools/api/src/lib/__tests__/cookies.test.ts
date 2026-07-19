import {
  addCookie,
  buildCookieHeader,
  cookiesForDomain,
  hostForUrl,
  loadCookies,
  mergeCookies,
  parseSetCookie,
  parseSetCookies,
  removeCookie,
  saveCookies,
  setCookieLines,
  updateCookie,
} from '@/lib/cookies';
import { StoredCookie } from '@/types/api-client';

const cookie = (over: Partial<StoredCookie> = {}): StoredCookie => ({
  id: 'c1',
  domain: 'example.com',
  name: 'session',
  value: 'abc',
  path: '/',
  secure: false,
  enabled: true,
  ...over,
});

describe('parseSetCookie', () => {
  it('parses name and value', () => {
    expect(parseSetCookie('session=abc')).toEqual({
      name: 'session',
      value: 'abc',
      path: '/',
      secure: false,
    });
  });

  it('parses attributes', () => {
    const parsed = parseSetCookie(
      'id=123; Path=/admin; Secure; HttpOnly; Max-Age=3600'
    );
    expect(parsed).toEqual({
      name: 'id',
      value: '123',
      path: '/admin',
      secure: true,
    });
  });

  it('handles equals signs in the value', () => {
    expect(parseSetCookie('t=a=b')?.value).toBe('a=b');
  });

  it('uses the default path when Path has no value', () => {
    expect(parseSetCookie('a=1; Path=')).toMatchObject({ path: '/' });
  });

  it('ignores unknown attributes', () => {
    expect(
      parseSetCookie('a=1; SameSite=Lax; Expires=Tue, 01 Jan 2030 00:00:00 GMT')
    ).toMatchObject({
      name: 'a',
      value: '1',
    });
  });

  it('returns null for empty or malformed lines', () => {
    expect(parseSetCookie('')).toBeNull();
    expect(parseSetCookie('noequals')).toBeNull();
    expect(parseSetCookie('=value')).toBeNull();
  });
});

describe('hostForUrl', () => {
  it('strips protocol and port', () => {
    expect(hostForUrl('https://api.example.com:8443/users')).toBe(
      'api.example.com'
    );
    expect(hostForUrl('http://example.com/path')).toBe('example.com');
  });

  it('handles hostnames without protocol or port', () => {
    expect(hostForUrl('localhost')).toBe('localhost');
    expect(hostForUrl('localhost:3000')).toBe('localhost');
  });
});

describe('parseSetCookies and setCookieLines', () => {
  it('turns set-cookie headers into stored cookies', () => {
    const lines = setCookieLines({
      'set-cookie': 'a=1, b=2; Path=/',
    });
    const cookies = parseSetCookies('https://example.com/x', lines);
    expect(cookies).toHaveLength(2);
    expect(cookies[0]).toMatchObject({ name: 'a', domain: 'example.com' });
    expect(cookies[1]).toMatchObject({ name: 'b' });
  });

  it('ignores empty set-cookie headers', () => {
    expect(setCookieLines({})).toEqual([]);
  });

  it('ignores malformed lines', () => {
    expect(parseSetCookies('https://example.com', ['noequals'])).toEqual([]);
  });
});

describe('mergeCookies', () => {
  it('replaces cookies with the same name and domain', () => {
    const next = mergeCookies(
      [cookie({ id: 'c1', value: 'old' })],
      [cookie({ id: 'c2', value: 'new' })]
    );
    expect(next).toHaveLength(1);
    expect(next[0].value).toBe('new');
  });

  it('keeps unrelated cookies', () => {
    const next = mergeCookies(
      [cookie({ id: 'c1' })],
      [cookie({ id: 'c2', name: 'other' })]
    );
    expect(next).toHaveLength(2);
  });

  it('drops cookies with empty values', () => {
    const next = mergeCookies(
      [cookie({ id: 'c1', value: 'old' })],
      [cookie({ id: 'c2', value: '' })]
    );
    expect(next).toHaveLength(0);
  });
});

describe('addCookie / updateCookie / removeCookie', () => {
  it('adds a cookie with an id', () => {
    const next = addCookie([cookie({ id: 'c1' })], {
      domain: 'x.com',
      name: 'n',
      value: 'v',
      path: '/',
      secure: false,
      enabled: true,
    });
    expect(next).toHaveLength(2);
    expect(next[0]).toMatchObject({ name: 'n', domain: 'x.com' });
    expect(next[0].id).toBeTruthy();
  });

  it('updates a matching cookie', () => {
    const next = updateCookie([cookie({ id: 'c1' })], 'c1', { value: 'zzz' });
    expect(next[0].value).toBe('zzz');
  });

  it('returns the store unchanged when no cookie matches', () => {
    const store = [cookie({ id: 'c1' })];
    const next = updateCookie(store, 'missing', { value: 'x' });
    expect(next).toHaveLength(1);
    expect(next[0]).toBe(store[0]);
  });

  it('removes a cookie', () => {
    const next = removeCookie([cookie({ id: 'c1' })], 'c1');
    expect(next).toHaveLength(0);
  });
});

describe('cookiesForDomain and buildCookieHeader', () => {
  const store = [
    cookie({ id: 'c1', domain: 'example.com', name: 'a' }),
    cookie({ id: 'c2', domain: 'example.com', name: 'off', enabled: false }),
    cookie({ id: 'c3', domain: 'other.com', name: 'b' }),
    cookie({ id: 'c4', domain: 'api.example.com', name: 'c' }),
  ];

  it('matches exact domain and subdomains, ignoring disabled', () => {
    expect(cookiesForDomain(store, 'https://example.com/x')).toHaveLength(1);
    expect(cookiesForDomain(store, 'https://sub.example.com/x')[0].name).toBe(
      'a'
    );
    expect(cookiesForDomain(store, 'https://other.com/x')[0].name).toBe('b');
  });

  it('builds a cookie header', () => {
    expect(buildCookieHeader(store, 'https://example.com')).toBe('a=abc');
  });

  it('returns undefined when no cookies match', () => {
    expect(buildCookieHeader(store, 'https://nowhere.com')).toBeUndefined();
  });
});

describe('cookie persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads cookies', () => {
    saveCookies([cookie({ id: 'c1' })]);
    expect(loadCookies()).toHaveLength(1);
    expect(loadCookies()[0].name).toBe('session');
  });

  it('returns empty array on corrupt storage', () => {
    localStorage.setItem('api-client:cookies', 'not-json');
    expect(loadCookies()).toEqual([]);
  });

  it('returns empty array when stored value is not an array', () => {
    localStorage.setItem('api-client:cookies', '{"a":1}');
    expect(loadCookies()).toEqual([]);
  });
});

import {
  buildMockResponse,
  findMockEntry,
  findMockTarget,
  pathnameOf,
  tryMock,
} from '@/lib/mock';
import { newCollection, newCollectionEntry, newGroup } from '@/lib/collections';
import { emptyRequest } from '@/lib/http';
import { HttpMethod } from '@/types/api-client';

const request = (url: string, method: HttpMethod = 'GET') => ({
  ...emptyRequest(),
  url,
  method,
});

const api = {
  ...newCollection('Users API'),
  groups: [
    {
      ...newGroup('Users'),
      entries: [
        newCollectionEntry(
          'List users',
          request('https://api.example.com/users')
        ),
        newCollectionEntry(
          'Get user',
          request('https://api.example.com/users/{id}')
        ),
        newCollectionEntry(
          'Create user',
          request('https://api.example.com/users', 'POST')
        ),
      ],
    },
  ],
};

describe('pathnameOf', () => {
  it('extracts the path from absolute and relative urls', () => {
    expect(pathnameOf('https://api.example.com/users?page=1')).toBe('/users');
    expect(pathnameOf('https://api.example.com/users')).toBe('/users');
    expect(pathnameOf('/users')).toBe('/users');
    expect(pathnameOf('')).toBe('/');
    expect(pathnameOf('https://example.com')).toBe('/');
  });
});

describe('findMockEntry', () => {
  it('matches by method and exact path', () => {
    expect(
      findMockEntry(api, request('https://api.example.com/users'))?.name
    ).toBe('List users');
  });

  it('matches path parameters as wildcards', () => {
    expect(
      findMockEntry(api, request('https://api.example.com/users/42'))?.name
    ).toBe('Get user');
  });

  it('does not match a different method', () => {
    expect(
      findMockEntry(api, request('https://api.example.com/users', 'DELETE'))
    ).toBeNull();
  });

  it('does not match a different path shape', () => {
    expect(
      findMockEntry(api, request('https://api.example.com/other'))
    ).toBeNull();
    expect(
      findMockEntry(api, request('https://api.example.com/users/1/2'))
    ).toBeNull();
  });

  it('returns null for an empty collection', () => {
    expect(findMockEntry(newCollection('Empty'), request('/x'))).toBeNull();
  });
});

describe('buildMockResponse', () => {
  it('builds a 200 response with a generated body', () => {
    const entry = newCollectionEntry('List', request('/users'));
    const response = buildMockResponse(entry, request('/users'));
    expect(response.status).toBe(200);
    expect(response.body).toContain('Mock response for List');
    expect(response.timeMs).toBe(0);
  });

  it('uses the first example body when present', () => {
    const entry = newCollectionEntry('List', request('/users'));
    entry.examples = [
      { id: 'e1', name: 'Example', body: '{"ok":true}' },
      { id: 'e2', name: 'Other', body: '{"ok":false}' },
    ];
    expect(buildMockResponse(entry, request('/users')).body).toBe(
      '{"ok":true}'
    );
  });
});

describe('findMockTarget', () => {
  it('returns the collection and entry names for a match', () => {
    expect(
      findMockTarget([api], request('https://api.example.com/users'))
    ).toEqual({
      collectionName: 'Users API',
      entryName: 'List users',
    });
  });

  it('returns null when nothing matches', () => {
    expect(
      findMockTarget([api], request('https://api.example.com/other'))
    ).toBeNull();
    expect(findMockTarget([], request('/x'))).toBeNull();
  });
});

describe('tryMock', () => {
  it('returns a mock response when a collection matches', () => {
    const response = tryMock([api], request('https://api.example.com/users'));
    expect(response?.status).toBe(200);
    expect(response?.body).toContain('Mock response for List users');
  });

  it('returns null when no collection matches', () => {
    expect(tryMock([api], request('/nope'))).toBeNull();
    expect(tryMock([], request('/nope'))).toBeNull();
  });
});

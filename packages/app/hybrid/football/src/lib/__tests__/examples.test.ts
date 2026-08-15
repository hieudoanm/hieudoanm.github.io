import {
  EXAMPLE_SQUADS,
  exampleSquadUrl,
  loadExampleSquad,
} from '@/lib/examples';
import { Squad } from '@/types/football';

const makeSquad = (overrides: Partial<Squad> = {}): Squad => ({
  id: 'example',
  name: 'Test',
  formationId: '442',
  players: [],
  assignments: {},
  ...overrides,
});

describe('EXAMPLE_SQUADS', () => {
  it('exposes the example squads in public/data/json/11', () => {
    const ids = EXAMPLE_SQUADS.map((example) => example.id);
    expect(ids).toEqual([
      'liverpool-2019-2020',
      'barcelona-2008-2009',
      'barcelona-2014-2015',
      'liverpool-2004-2005',
      'manchester-city-2022-2023',
      'bayern-munich-2012-2013',
      'bayern-munich-2019-2020',
      'inter-milan-2009-2010',
      'psg-2024-2025',
    ]);
    for (const example of EXAMPLE_SQUADS) {
      expect(example.name.length).toBeGreaterThan(0);
    }
  });

  it('derives the data url from an id', () => {
    expect(exampleSquadUrl('barcelona-2008-2009')).toBe(
      '/data/json/11/barcelona-2008-2009.json'
    );
  });
});

describe('loadExampleSquad', () => {
  const example = makeSquad({ name: 'Example', formationId: '433' });

  const jsonResponse = (body: unknown, ok = true): Response =>
    ({ ok, json: async () => body }) as unknown as Response;

  const mockFetch = (
    impl: (input: RequestInfo | URL) => Promise<Response>
  ): (() => void) => {
    const original = globalThis.fetch;
    globalThis.fetch = jest.fn(impl) as unknown as typeof fetch;
    return () => {
      globalThis.fetch = original;
    };
  };

  it('loads a valid example squad by id', async () => {
    const restore = mockFetch(async () => jsonResponse(example));
    await expect(loadExampleSquad('liverpool-2019-2020')).resolves.toEqual(
      example
    );
    restore();
  });

  it('fetches the derived url for the id', async () => {
    const fetchMock = jest.fn(async () => jsonResponse(example));
    const original = globalThis.fetch;
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    await loadExampleSquad('barcelona-2008-2009');
    globalThis.fetch = original;
    expect(fetchMock).toHaveBeenCalledWith(
      '/data/json/11/barcelona-2008-2009.json'
    );
  });

  it('returns null on a non-ok response', async () => {
    const restore = mockFetch(async () => jsonResponse(null, false));
    await expect(loadExampleSquad('liverpool-2019-2020')).resolves.toBeNull();
    restore();
  });

  it('returns null when the body is not valid JSON', async () => {
    const restore = mockFetch(async () => jsonResponse('not json'));
    await expect(loadExampleSquad('liverpool-2019-2020')).resolves.toBeNull();
    restore();
  });

  it('returns null when the body is not a squad', async () => {
    const restore = mockFetch(async () => jsonResponse({ nope: true }));
    await expect(loadExampleSquad('liverpool-2019-2020')).resolves.toBeNull();
    restore();
  });

  it('returns null when fetch throws', async () => {
    const restore = mockFetch(async () => {
      throw new Error('network');
    });
    await expect(loadExampleSquad('liverpool-2019-2020')).resolves.toBeNull();
    restore();
  });

  it('falls back to a known formation for unknown ids', async () => {
    const restore = mockFetch(async () =>
      jsonResponse(makeSquad({ formationId: '0-0-0' }))
    );
    await expect(
      loadExampleSquad('liverpool-2019-2020')
    ).resolves.toMatchObject({
      formationId: '442',
    });
    restore();
  });
});

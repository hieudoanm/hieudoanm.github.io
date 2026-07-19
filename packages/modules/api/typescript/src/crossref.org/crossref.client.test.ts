import { getId, getWork } from './crossref.client.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const PROXY_URL = 'https://hieudoanm-proxy.vercel.app/api';

beforeEach(() => {
  mockFetch.mockReset();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('getId', () => {
  it('extracts DOI from https://doi.org/ URL', () => {
    expect(getId('https://doi.org/10.1000/xyz123')).toBe('10.1000/xyz123');
  });

  it('extracts DOI from http://dx.doi.org/ URL', () => {
    expect(getId('http://dx.doi.org/10.1000/xyz123')).toBe('10.1000/xyz123');
  });

  it('extracts DOI from https://dx.doi.org/ URL', () => {
    expect(getId('https://dx.doi.org/10.1000/xyz123')).toBe('10.1000/xyz123');
  });

  it('returns empty string on empty input', () => {
    expect(getId('')).toBe('');
  });
});

describe('getWork', () => {
  const crossrefResponse: Record<string, unknown> = {
    status: 'ok',
    message: {
      author: [{ given: 'John', family: 'Doe' }],
      title: ['Test Title'],
      'container-title': ['Test Journal'],
      volume: '10',
      issue: '2',
      page: '100-110',
      'published-print': { 'date-parts': [[2023]] },
    },
  };

  it('fetches work via proxy and returns formatted reference on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => crossrefResponse,
    });

    const result = await getWork('10.1000/xyz123', PROXY_URL);

    expect(result.reference).toEqual({
      id: '10.1000/xyz123',
      authors: [{ given: 'John', family: 'Doe' }],
      title: 'Test Title',
      journal: 'Test Journal',
      volume: '10',
      issue: '2',
      pages: '100-110',
      year: 2023,
      url: 'https://doi.org/10.1000/xyz123',
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${PROXY_URL}?url=https%3A%2F%2Fapi.crossref.org%2Fworks%2F10.1000%2Fxyz123`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(AbortSignal),
      }
    );
  });

  it('returns null reference on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getWork('10.1000/xyz123', PROXY_URL);

    expect(result).toEqual({ reference: null });
  });

  it('returns null reference on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not found',
    });

    const result = await getWork('10.1000/xyz123', PROXY_URL);

    expect(result).toEqual({ reference: null });
  });

  it('handles missing optional fields gracefully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'ok',
        message: {
          author: [],
          title: [],
          'container-title': [],
        },
      }),
    });

    const result = await getWork('10.1000/xyz123', PROXY_URL);

    expect(result.reference).toEqual({
      id: '10.1000/xyz123',
      authors: [],
      title: '',
      journal: '',
      volume: undefined,
      issue: undefined,
      pages: undefined,
      year: 0,
      url: 'https://doi.org/10.1000/xyz123',
    });
  });

  it('uses published-online when published-print is missing', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'ok',
        message: {
          author: [{ given: 'Jane', family: 'Smith' }],
          title: ['Online Title'],
          'container-title': ['Online Journal'],
          'published-online': { 'date-parts': [[2024]] },
        },
      }),
    });

    const result = await getWork('10.1000/abc', PROXY_URL);

    expect(result.reference?.year).toBe(2024);
  });
});

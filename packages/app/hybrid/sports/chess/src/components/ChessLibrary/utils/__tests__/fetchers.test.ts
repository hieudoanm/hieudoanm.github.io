import { fetchChessComPgn, fetchLichessPgn } from '../fetchers';

const ok = (body: string) =>
  ({
    ok: true,
    status: 200,
    text: async () => body,
  }) as Response;

describe('fetchLichessPgn', () => {
  it('requests as_pgn and returns the text', async () => {
    const fetchMock = jest.fn().mockResolvedValue(ok('1. e4'));
    (global as { fetch: typeof fetch }).fetch = fetchMock;
    const result = await fetchLichessPgn('alice', 10);
    expect(result).toBe('1. e4');
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('lichess.org/api/games/alice?max=10&as_pgn=1')
    );
  });

  it('throws when the request fails', async () => {
    (global as { fetch: typeof fetch }).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });
    await expect(fetchLichessPgn('alice')).rejects.toThrow('404');
  });
});

describe('fetchChessComPgn', () => {
  it('fetches recent archives and joins pgns', async () => {
    const jsonMock = jest
      .fn()
      .mockResolvedValueOnce({
        archives: ['https://api.chess.com/pub/a/2026/08'],
      })
      .mockResolvedValueOnce({
        games: [{ pgn: '[A]\n1.e4' }, { pgn: '[B]\n1.d4' }, {}],
      });
    const fetchMock = jest
      .fn()
      .mockResolvedValue({ ok: true, status: 200, json: jsonMock });
    (global as { fetch: typeof fetch }).fetch = fetchMock;
    const result = await fetchChessComPgn('alice', 5);
    expect(result).toContain('1.e4');
    expect(result).toContain('1.d4');
    expect(jsonMock).toHaveBeenCalledTimes(2);
  });

  it('throws when no games are found', async () => {
    const jsonMock = jest.fn().mockResolvedValue({ archives: [] });
    (global as { fetch: typeof fetch }).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jsonMock,
    });
    await expect(fetchChessComPgn('nobody')).rejects.toThrow('No games found');
  });

  it('throws when archives fetch fails', async () => {
    (global as { fetch: typeof fetch }).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 503,
    });
    await expect(fetchChessComPgn('alice')).rejects.toThrow('503');
  });

  it('skips months that fail to fetch', async () => {
    const archives = [
      'https://api.chess.com/pub/a/2026/08',
      'https://api.chess.com/pub/a/2026/07',
    ];
    const fetchMock = jest.fn().mockImplementation(async (url: string) => {
      if (url.includes('archives')) {
        return { ok: true, json: async () => ({ archives }) };
      }
      if (url.includes('2026/08')) {
        return { ok: false, status: 500 };
      }
      if (url.includes('2026/07')) {
        return {
          ok: true,
          json: async () => ({ games: [{ pgn: '[A]\n1.e4' }] }),
        };
      }
      return { ok: true, json: async () => ({ games: [] }) };
    });
    (global as { fetch: typeof fetch }).fetch = fetchMock;
    const result = await fetchChessComPgn('alice', 5);
    expect(result).toContain('1.e4');
  });

  it('throws when Lichess returns non-200', async () => {
    (global as { fetch: typeof fetch }).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 429,
    });
    await expect(fetchLichessPgn('alice')).rejects.toThrow('429');
  });
});

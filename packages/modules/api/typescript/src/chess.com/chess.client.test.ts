import { getPlayers, getPlayer, getStats } from './chess.client.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getPlayers', () => {
  it('fetches players by title', async () => {
    const players = ['player1', 'player2'];
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ players }),
    } as Response);

    const result = await getPlayers('GM');

    expect(result).toEqual(players);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.chess.com/pub/titled/GM'
    );
  });

  it('returns empty array when players field is missing', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({}),
    } as Response);

    const result = await getPlayers('GM');

    expect(result).toEqual([]);
  });
});

describe('getPlayer', () => {
  it('fetches player data by username', async () => {
    const playerData = { username: 'hikaru', title: 'GM' };
    mockFetch.mockResolvedValueOnce({
      json: async () => playerData,
    } as Response);

    const result = await getPlayer('hikaru');

    expect(result).toEqual(playerData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.chess.com/pub/player/hikaru'
    );
  });
});

describe('getStats', () => {
  it('fetches player stats by username', async () => {
    const statsData = { chess_rapid: { last: { rating: 2800 } } };
    mockFetch.mockResolvedValueOnce({
      json: async () => statsData,
    } as Response);

    const result = await getStats('hikaru');

    expect(result).toEqual(statsData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.chess.com/pub/player/hikaru/stats'
    );
  });
});

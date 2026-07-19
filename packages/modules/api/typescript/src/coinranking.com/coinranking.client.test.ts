import { getCoins, Tag } from './coinranking.client.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getCoins', () => {
  const successResponse = {
    status: 'success',
    data: {
      stats: {
        total: 100,
        totalCoins: 100,
        totalMarkets: 500,
        totalExchanges: 50,
        totalMarketCap: '1000000000',
        total24hVolume: '50000000',
      },
      coins: [
        {
          uuid: '123',
          symbol: 'BTC',
          name: 'Bitcoin',
          color: '#ff9900',
          iconUrl: 'https://example.com/btc.png',
          marketCap: '500000000',
          price: '50000',
          listedAt: 1484006400,
          tier: 1,
          change: '2.5',
          rank: 1,
          sparkline: ['50000'],
          lowVolume: false,
          coinrankingUrl: 'https://coinranking.com/coin/123',
          '24hVolume': '10000000',
          btcPrice: 1,
        },
      ],
    },
  };

  it('fetches coins without a tag', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => successResponse,
    });

    const result = await getCoins({});

    expect(result).toEqual(successResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.coinranking.com/v2/coins?'
    );
  });

  it('fetches coins with a tag filter', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => successResponse,
    });

    const result = await getCoins({ tag: Tag.DEFI });

    expect(result).toEqual(successResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.coinranking.com/v2/coins?tags=defi'
    );
  });

  it('returns fallback error response on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getCoins({});

    expect(result).toEqual({
      status: 'error',
      data: {
        stats: {
          total: 0,
          totalCoins: 0,
          totalMarkets: 0,
          totalExchanges: 0,
          totalMarketCap: '0',
          total24hVolume: '0',
        },
        coins: [],
      },
    });
  });
});

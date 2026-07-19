import { FixerClient } from './fixer.client.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const API_KEY = 'test-api-key';

beforeEach(() => {
  mockFetch.mockReset();
});

describe('FixerClient', () => {
  it('returns an object with getLatest and getSymbols', () => {
    const client = FixerClient(API_KEY);

    expect(client).toHaveProperty('getLatest');
    expect(client).toHaveProperty('getSymbols');
    expect(typeof client.getLatest).toBe('function');
    expect(typeof client.getSymbols).toBe('function');
  });

  describe('getLatest', () => {
    it('fetches latest rates with access key', async () => {
      const latestResponse = {
        success: true,
        timestamp: 1625097600,
        base: 'EUR',
        date: '2025-01-01',
        rates: { USD: 1.18, GBP: 0.85 },
      };
      mockFetch.mockResolvedValueOnce({
        json: async () => latestResponse,
      });

      const result = await FixerClient(API_KEY).getLatest();

      expect(result).toEqual(latestResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://data.fixer.io/api/latest?access_key=test-api-key'
      );
    });

    it('rejects on fetch failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(FixerClient(API_KEY).getLatest()).rejects.toThrow(
        'Network error'
      );
    });
  });

  describe('getSymbols', () => {
    it('fetches symbols with access key', async () => {
      const symbolsResponse = {
        success: true,
        symbols: { USD: 'United States Dollar', EUR: 'Euro' },
      };
      mockFetch.mockResolvedValueOnce({
        json: async () => symbolsResponse,
      });

      const result = await FixerClient(API_KEY).getSymbols();

      expect(result).toEqual(symbolsResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://data.fixer.io/api/symbols?access_key=test-api-key'
      );
    });

    it('rejects on fetch failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(FixerClient(API_KEY).getSymbols()).rejects.toThrow(
        'Network error'
      );
    });
  });
});

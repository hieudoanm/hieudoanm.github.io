import { getLatest, getCurrencies } from './frankfurter.client.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getLatest', () => {
  const latestResponse = {
    amount: 1,
    base: 'EUR',
    date: '2025-01-01',
    rates: { USD: 1.18, GBP: 0.85 },
  };

  it('fetches latest rates with default params', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => latestResponse,
    });

    const result = await getLatest();

    expect(result).toEqual(latestResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.frankfurter.app/latest?amount=1&from=EUR'
    );
  });

  it('fetches latest rates with custom amount and base', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ...latestResponse, amount: 100, base: 'USD' }),
    });

    const result = await getLatest({ amount: 100, base: 'USD' });

    expect(result.amount).toBe(100);
    expect(result.base).toBe('USD');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.frankfurter.app/latest?amount=100&from=USD'
    );
  });

  it('appends to param when target currencies are specified', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => latestResponse,
    });

    await getLatest({ to: ['USD', 'GBP'] });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.frankfurter.app/latest?amount=1&from=EUR&to=USD%2CGBP'
    );
  });

  it('does not append to param when to is empty', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => latestResponse,
    });

    await getLatest({ to: [] });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.frankfurter.app/latest?amount=1&from=EUR'
    );
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(getLatest()).rejects.toThrow('Network error');
  });
});

describe('getCurrencies', () => {
  const currenciesResponse = { USD: 'United States Dollar', EUR: 'Euro' };

  it('fetches available currencies', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => currenciesResponse,
    });

    const result = await getCurrencies();

    expect(result).toEqual(currenciesResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.frankfurter.app/currencies'
    );
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(getCurrencies()).rejects.toThrow('Network error');
  });
});

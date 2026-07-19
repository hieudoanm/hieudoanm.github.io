import { loadHistory, saveHistory, clearHistory } from '../storage';

const STORAGE_KEY = 'shopify-history';

beforeEach(() => {
  localStorage.clear();
});

describe('loadHistory', () => {
  it('returns empty array when nothing stored', () => {
    expect(loadHistory()).toEqual([]);
  });

  it('returns parsed history from localStorage', () => {
    const data = [{ url: 'https://example.com', isShopify: true }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    expect(loadHistory()).toEqual(data);
  });

  it('returns empty array on parse error', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid-json');
    expect(loadHistory()).toEqual([]);
  });
});

describe('saveHistory', () => {
  it('saves items and returns merged array', () => {
    const existing = [
      {
        url: 'a.com',
        isShopify: true,
        isPlus: false,
        confidence: 50,
        signals: [],
        checkedAt: 1,
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    const newItems = [
      {
        url: 'b.com',
        isShopify: false,
        isPlus: false,
        confidence: 10,
        signals: [],
        checkedAt: 2,
      },
    ];
    const result = saveHistory(newItems);

    expect(result).toHaveLength(2);
    expect(result[0].url).toBe('b.com');
    expect(result[1].url).toBe('a.com');
  });

  it('limits total items to 50', () => {
    const items = Array.from({ length: 60 }, (_, i) => ({
      url: `https://example${i}.com`,
      isShopify: false,
      isPlus: false,
      confidence: 0,
      signals: [],
      checkedAt: i,
    }));
    const result = saveHistory(items);
    expect(result).toHaveLength(50);
  });
});

describe('clearHistory', () => {
  it('removes the storage key', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ url: 'x' }]));
    clearHistory();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});

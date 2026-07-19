import {
  getSources,
  getTopHeadlines,
  getEverything,
  NEWS_V2_URL,
} from './newsapi.client.js';
import { Category, Country, Language, SortBy } from './newsapi.dto.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const API_KEY = 'test-api-key';
const authHeader = { 'X-Api-Key': API_KEY };

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getSources', () => {
  const sourcesResponse = {
    status: 'ok',
    sources: [
      {
        id: 'bbc-news',
        name: 'BBC News',
        description: 'BBC News',
        url: 'https://www.bbc.co.uk',
        category: 'general',
        language: 'en',
        country: 'gb',
      },
    ],
  };

  it('fetches sources with default params and api key header', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => sourcesResponse,
    });

    const result = await getSources(API_KEY);

    expect(result).toEqual(sourcesResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      `${NEWS_V2_URL}/sources?category=general&country=us&language=en`,
      { headers: authHeader }
    );
  });

  it('accepts custom params', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => sourcesResponse,
    });

    await getSources(API_KEY, {
      category: Category.TECHNOLOGY,
      country: Country.UNITED_KINGDOM,
      language: Language.ENGLISH,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `${NEWS_V2_URL}/sources?category=technology&country=gb&language=en`,
      { headers: authHeader }
    );
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(getSources(API_KEY)).rejects.toThrow('Network error');
  });
});

describe('getTopHeadlines', () => {
  const articleResponse = {
    status: 'ok',
    totalResults: 1,
    articles: [
      {
        source: { id: 'bbc-news', name: 'BBC News' },
        author: 'Author',
        title: 'Test Article',
        description: 'Description',
        url: 'https://bbc.co.uk',
        urlToImage: 'https://bbc.co.uk/image.jpg',
        publishedAt: '2025-01-01T00:00:00Z',
        content: 'Content',
      },
    ],
  };

  it('fetches top headlines with default params', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => articleResponse,
    });

    const result = await getTopHeadlines(API_KEY);

    expect(result).toEqual(articleResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      `${NEWS_V2_URL}/top-headlines?category=general&country=us&page=1&pageSize=20`,
      { headers: authHeader }
    );
  });

  it('includes query when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => articleResponse,
    });

    await getTopHeadlines(API_KEY, { query: 'bitcoin' });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('q=bitcoin'),
      { headers: authHeader }
    );
  });

  it('includes sources when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => articleResponse,
    });

    await getTopHeadlines(API_KEY, { sources: ['bbc-news', 'cnn'] });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('sources=bbc-news%2Ccnn'),
      { headers: authHeader }
    );
  });
});

describe('getEverything', () => {
  const articleResponse = {
    status: 'ok',
    totalResults: 1,
    articles: [
      {
        source: { id: 'bbc-news', name: 'BBC News' },
        author: 'Author',
        title: 'Test Article',
        description: 'Description',
        url: 'https://bbc.co.uk',
        urlToImage: 'https://bbc.co.uk/image.jpg',
        publishedAt: '2025-01-01T00:00:00Z',
        content: 'Content',
      },
    ],
  };

  it('fetches everything with default params', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => articleResponse,
    });

    const result = await getEverything(API_KEY);

    expect(result).toEqual(articleResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      `${NEWS_V2_URL}/everything?language=en&page=1&pageSize=100&sortBy=publishedAt`,
      { headers: authHeader }
    );
  });

  it('includes query params when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => articleResponse,
    });

    await getEverything(API_KEY, {
      q: 'crypto',
      from: '2025-01-01',
      to: '2025-01-31',
      sortBy: SortBy.POPULARITY,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('q=crypto'),
      { headers: authHeader }
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('from=2025-01-01'),
      { headers: authHeader }
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('to=2025-01-31'),
      { headers: authHeader }
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('sortBy=popularity'),
      { headers: authHeader }
    );
  });

  it('includes domains and excludeDomains', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => articleResponse,
    });

    await getEverything(API_KEY, {
      domains: ['bbc.co.uk'],
      excludeDomains: ['dailymail.co.uk'],
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('domains=bbc.co.uk'),
      { headers: authHeader }
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('excludeDomains=dailymail.co.uk'),
      { headers: authHeader }
    );
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(getEverything(API_KEY)).rejects.toThrow('Network error');
  });
});

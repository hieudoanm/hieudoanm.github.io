import axios from 'axios';
import { getEverything, getSources, getTopHeadlines } from '../news.client';
import { ArticleResponse, SourceResponse } from '../news.dto';
import { SearchIn } from '../news.enums';

describe('getSources', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await getSources({});
    expect(data).toEqual({} as SourceResponse);
  });

  it('error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    try {
      await getSources({});
    } catch (error) {
      expect((error as Error).message).toEqual('error');
    }
  });
});

describe('getEverything', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await getEverything();
    expect(data).toEqual({} as ArticleResponse);
  });

  it('success with paramters', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await getEverything({
      q: 'query',
      domains: ['cnn.com'],
      excludeDomains: ['foxnews.com'],
      sources: ['cnn'],
      from: '2000-01-01',
      to: '2020-01-01',
      searchIn: [SearchIn.TITLE],
    });
    expect(data).toEqual({} as ArticleResponse);
  });

  it('error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    try {
      await getEverything({});
    } catch (error) {
      expect((error as Error).message).toEqual('error');
    }
  });
});

describe('getTopHeadlines', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await getTopHeadlines({});
    expect(data).toEqual({} as ArticleResponse);
  });

  it('error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    try {
      await getTopHeadlines({});
    } catch (error) {
      expect((error as Error).message).toEqual('error');
    }
  });
});

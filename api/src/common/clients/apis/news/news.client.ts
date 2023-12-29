import axios, { AxiosRequestConfig } from 'axios';
import {
  ArticleResponse,
  EverythingRequest,
  SourceRequest,
  SourceResponse,
  TopHeadlinesRequest,
} from './news.dto';
import { Category, Country, Language, SortBy } from './news.enums';

export const NEWS_V2_URL = 'https://newsapi.org/v2';

export class NewsClient {
  private apiKey: string;

  constructor({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey;
  }

  private async get<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await axios.get<T>(url, options);
    return response.data;
  }

  public async getSources(
    {
      category = Category.GENERAL,
      country = Country.UNITED_STATES,
      language = Language.ENGLISH,
    }: SourceRequest = {
      category: Category.GENERAL,
      country: Country.UNITED_STATES,
      language: Language.ENGLISH,
    }
  ): Promise<SourceResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('category', category);
    urlSearchParams.set('country', country);
    urlSearchParams.set('language', language);
    const sourcesUrl = `${NEWS_V2_URL}/sources?${urlSearchParams.toString()}`;
    const configs = { headers: { 'X-Api-Key': this.apiKey } };
    const { status, sources } = await this.get<SourceResponse>(
      sourcesUrl,
      configs
    );
    return { status, sources };
  }

  public async getEverything(
    {
      domains = [],
      excludeDomains = [],
      language = Language.ENGLISH,
      from = '',
      page = 1,
      pageSize = 100,
      q = '',
      searchIn = [],
      sortBy = SortBy.PUBLISHED_AT,
      sources = [],
      to = '',
    }: EverythingRequest = {
      domains: [],
      excludeDomains: [],
      language: Language.ENGLISH,
      from: '',
      page: 1,
      pageSize: 100,
      q: '',
      searchIn: [],
      sortBy: SortBy.PUBLISHED_AT,
      sources: [],
      to: '',
    }
  ): Promise<ArticleResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('language', language);
    urlSearchParams.set('page', page.toString());
    urlSearchParams.set('pageSize', pageSize.toString());
    urlSearchParams.set('sortBy', sortBy);
    if (q !== '') {
      urlSearchParams.set('q', q);
    }
    if (domains.length > 0) {
      urlSearchParams.set('domains', domains.join(','));
    }
    if (excludeDomains.length > 0) {
      urlSearchParams.set('excludeDomains', excludeDomains.join(','));
    }
    if (sources.length > 0) {
      urlSearchParams.set('sources', sources.join(','));
    }
    if (from !== '') {
      urlSearchParams.set('from', from);
    }
    if (to !== '') {
      urlSearchParams.set('to', to);
    }
    if (searchIn.length > 0) {
      urlSearchParams.set('searchIn', searchIn.join(','));
    }
    const topHeadlinesUrl = `${NEWS_V2_URL}/everything?${urlSearchParams.toString()}`;
    const configs = { headers: { 'X-Api-Key': this.apiKey } };
    const { status, totalResults, articles } = await this.get<ArticleResponse>(
      topHeadlinesUrl,
      configs
    );
    return { status, totalResults, articles };
  }

  public async getTopHeadlines(
    {
      category = Category.GENERAL,
      country = Country.UNITED_STATES,
      page = 1,
      pageSize = 20,
      q = '',
      sources = [],
    }: TopHeadlinesRequest = {
      category: Category.GENERAL,
      country: Country.UNITED_STATES,
      page: 1,
      pageSize: 20,
      q: '',
      sources: [],
    }
  ): Promise<ArticleResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('category', category);
    urlSearchParams.set('country', country);
    urlSearchParams.set('page', page.toString());
    urlSearchParams.set('pageSize', pageSize.toString());
    urlSearchParams.set('q', q);
    urlSearchParams.set('sources', sources.join(','));
    const topHeadlinesUrl = `${NEWS_V2_URL}/top-headlines?${urlSearchParams.toString()}`;
    const configs = { headers: { 'X-Api-Key': this.apiKey } };
    const { status, totalResults, articles } = await this.get<ArticleResponse>(
      topHeadlinesUrl,
      configs
    );
    return { status, totalResults, articles };
  }
}

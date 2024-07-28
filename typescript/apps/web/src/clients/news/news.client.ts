import axios, { AxiosRequestConfig } from 'axios';
import {
  ArticleResponse,
  EverythingRequest,
  SourceRequest,
  SourceResponse,
  TopHeadlinesRequest,
} from './news.dto';
import { Category, Country, Language, SortBy } from './news.enums';

const NEWS_API_KEY = process.env.NEWS_API_KEY ?? '';

export const NEWS_V2_URL = 'https://newsapi.org/v2';

export const get = async <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const response = await axios.get<T>(url, config);
  return response.data;
};

export const getSources = async (
  {
    category = Category.GENERAL,
    country = Country.UNITED_STATES,
    language = Language.ENGLISH,
  }: SourceRequest = {
    category: Category.GENERAL,
    country: Country.UNITED_STATES,
    language: Language.ENGLISH,
  }
): Promise<SourceResponse> => {
  const urlSearchParams = new URLSearchParams();
  if (category) urlSearchParams.set('category', category);
  if (country) urlSearchParams.set('country', country);
  if (language) urlSearchParams.set('language', language);
  const sourcesUrl = `${NEWS_V2_URL}/sources?${urlSearchParams.toString()}`;
  const configs = { headers: { 'X-Api-Key': NEWS_API_KEY } };
  const { status, sources } = await get<SourceResponse>(sourcesUrl, configs);
  return { status, sources };
};

export const getTopHeadlines = async (
  {
    category = Category.GENERAL,
    country = Country.UNITED_STATES,
    page = 1,
    pageSize = 20,
    query = '',
    sources = [],
  }: TopHeadlinesRequest = {
    category: Category.GENERAL,
    country: Country.UNITED_STATES,
    page: 1,
    pageSize: 20,
    query: '',
    sources: [],
  }
): Promise<ArticleResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('category', category);
  urlSearchParams.set('country', country);
  if (page > 0) urlSearchParams.set('page', page.toString());
  if (pageSize > 0) urlSearchParams.set('pageSize', pageSize.toString());
  if (query !== '') urlSearchParams.set('q', query);
  if (sources.length > 0) urlSearchParams.set('sources', sources.join(','));
  const url = `${NEWS_V2_URL}/top-headlines?${urlSearchParams.toString()}`;
  const configs = { headers: { 'X-Api-Key': NEWS_API_KEY } };
  const { status, totalResults, articles } = await get<ArticleResponse>(
    url,
    configs
  );
  return { status, totalResults, articles };
};

export const getEverything = async (
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
): Promise<ArticleResponse> => {
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
  const url = `${NEWS_V2_URL}/everything?${urlSearchParams.toString()}`;
  const configs = { headers: { 'X-Api-Key': NEWS_API_KEY } };
  const { status, totalResults, articles } = await get<ArticleResponse>(
    url,
    configs
  );
  return { status, totalResults, articles };
};

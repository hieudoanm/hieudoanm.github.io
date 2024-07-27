import { Category, Country, Language, SearchIn, SortBy } from './news.enums';

export type SourceRequest = {
  category?: Category;
  country?: Country;
  language?: Language;
};

export type Source = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  language: Language;
  country: Country;
};

export type SourceResponse = {
  status: string;
  sources: Source[];
};

export type EverythingRequest = {
  domains?: string[];
  excludeDomains?: string[];
  language?: Language;
  from?: string;
  page?: number;
  pageSize?: number;
  q?: string;
  searchIn?: SearchIn[];
  sortBy?: SortBy;
  sources?: string[];
  to?: string;
};

export type TopHeadlinesRequest = {
  category?: Category;
  country?: Country;
  page?: number;
  pageSize?: number;
  query?: string;
  sources?: string[];
};

export type Article = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type ArticleResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};

import { Category, Country, Language, SearchIn, SortBy } from './news.enums';

export class SourceRequest {
  category?: Category;
  country?: Country;
  language?: Language;
}

export class Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  language: Language;
  country: Country;
}

export class SourceResponse {
  status: string;
  sources: Source[];
}

export class EverythingRequest {
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
}

export class TopHeadlinesRequest {
  category?: Category;
  country?: Country;
  page?: number;
  pageSize?: number;
  q?: string;
  sources?: string[];
}

export class Article {
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
}

export class ArticleResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

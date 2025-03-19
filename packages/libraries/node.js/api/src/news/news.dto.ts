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

export enum Country {
  UNITED_ARAB_EMIRATES = 'ae',
  ARGENTINA = 'ar',
  AUSTRIA = 'at',
  AUSTRALIA = 'au',
  BELGIUM = 'be',
  BULGARIA = 'bg',
  BRAZIL = 'br',
  CANADA = 'ca',
  SWITZERLAND = 'ch',
  CHINA = 'cn',
  COLOMBIA = 'co',
  CUBA = 'cu',
  CZECHIA = 'cz',
  GERMANY = 'de',
  EGYPT = 'eg',
  FRANCE = 'fr',
  UNITED_KINGDOM = 'gb',
  GREECE = 'gr',
  HONG_KONG = 'hk',
  HUNGARY = 'hu',
  INDONESIA = 'id',
  IRELAND = 'ie',
  ISRAEL = 'il',
  INDIA = 'in',
  ITALY = 'it',
  JAPAN = 'jp',
  SOUTH_KOREA = 'kr',
  LITHUANIA = 'lt',
  LATVIA = 'lv',
  MOROCCO = 'ma',
  MEXICO = 'mx',
  MALAYSIA = 'my',
  NIGERIA = 'ng',
  NETHERLANDS = 'nl',
  NoRway = 'no',
  NEW_ZEALAND = 'nz',
  PHILIPPINES = 'ph',
  POLAND = 'pl',
  PORTUGAL = 'PT',
  ROMANIA = 'ro',
  SERBIA = 'rs',
  RUSSIA = 'ru',
  SAUDI_ARABIA = 'sa',
  SWEDEN = 'se',
  SINGAPORE = 'sg',
  SLOVENIA = 'si',
  SLOVAKIA = 'sk',
  THAILAND = 'th',
  TURKEY = 'tr',
  TAIWAN = 'tw',
  UKRAINE = 'ua',
  UNITED_STATES = 'us',
  VENEZUELA = 've',
  SOUTH_AFRICA = 'za',
}

export enum Category {
  BUSINESS = 'business',
  ENTERTAINMENT = 'entertainment',
  GENERAL = 'general',
  HEALTH = 'health',
  SCIENCE = 'science',
  SPORTS = 'sports',
  TECHNOLOGY = 'technology',
}

export enum Language {
  ARABIC = 'ar',
  GERMAN = 'de',
  ENGLISH = 'en',
  SPANISH = 'es',
  FRENCH = 'fr',
  HEBREW = 'he',
  ITALIAN = 'it',
  DUTCH = 'nl',
  NORWEGIAN = 'no',
  PORTUGUESE = 'pt',
  RUSSIAN = 'ru',
  SWEDISH = 'sv',
  UD = 'ud',
  CHINESE = 'zh',
}

export enum SearchIn {
  CONTENT = 'content',
  DESCRIPTION = 'description',
  TITLE = 'title',
}

export enum SortBy {
  POPULARITY = 'popularity',
  PUBLISHED_AT = 'publishedAt',
  RELEVANCY = 'relevancy',
}

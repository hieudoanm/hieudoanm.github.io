export type Author = { given: string; family: string };

export type CrossReferenceResponse = {
  status: string;
  message: {
    author: { given: string; family: string }[];
    title: string[];
    'container-title': string[];
    volume: string;
    issue: string;
    page: string;
    'published-online': { 'date-parts': number[][] };
    'published-print': { 'date-parts': number[][] };
  };
};

export type Reference = {
  id: string;
  authors: Author[];
  title: string;
  journal: string;
  volume: string;
  issue: string;
  pages: string;
  year: number;
  url: string;
};

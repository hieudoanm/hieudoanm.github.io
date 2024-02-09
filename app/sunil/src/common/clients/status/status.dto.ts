export type Service =
  | 'bitbucket'
  | 'confluence'
  | 'github'
  | 'jira'
  | 'netlify'
  | 'render'
  | 'solana'
  | 'trello'
  | 'vercel';

export type StatusPageDto = {
  id: string;
  name: string;
  url: string;
  time_zone: string;
  updated_at: string;
};

export type StatusDto = {
  indicator: string;
  description: string;
};

export type StatusResponseDto = {
  page: StatusPageDto;
  status: StatusDto;
};

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

export class StatusPageDto {
  id: string;
  name: string;
  url: string;
  time_zone: string;
  updated_at: string;
}

export class StatusDto {
  indicator: string;

  description: string;
}

export class StatusResponseDto {
  page: StatusPageDto;

  status: StatusDto;
}

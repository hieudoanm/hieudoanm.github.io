export interface Analysis {
  count: Record<string, number>;
  histogram: Record<
    string,
    {
      rapid: Record<string, number>;
      blitz: Record<string, number>;
      bullet: Record<string, number>;
    }
  >;
}

export interface PlayerRatings {
  bullet: { last: number; best: number };
  blitz: { last: number; best: number };
  rapid: { last: number; best: number };
}

export type Format = 'bullet' | 'blitz' | 'rapid';

export type TitleKey =
  'gm' | 'im' | 'fm' | 'cm' | 'nm' | 'wgm' | 'wim' | 'wfm' | 'wcm' | 'wnm';

export type ComparisonTabKey = 'all' | TitleKey;

export interface PercentileResult {
  format: Format;
  rating: number;
  percentile: number;
  betterThan: number;
  total: number;
}

export interface ComparisonTab {
  key: ComparisonTabKey;
  label: string;
  description: string;
  results: PercentileResult[];
}

export interface SqlJsStatic {
  Database: new (data?: ArrayLike<number> | null) => DB;
}

export interface DB {
  exec: (sql: string) => { columns: string[]; values: unknown[][] }[];
}

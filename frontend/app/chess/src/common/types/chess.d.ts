export type Insights = {
  username?: string;
  games?: Games;
  accuracy?: Accuracy;
  results?: Results;
  opponents?: Opponent[];
};

export type Results = {
  win?: Result[];
  draw?: Result[];
  loss?: Result[];
  timeOfDays?: ResultsByTimeOfDay[];
  daysOfWeek?: ResultsByDayOfWeek[];
};

export type Result = {
  result?: string;
  count?: number;
};

export type ResultsByTimeOfDay = {
  win?: number;
  draw?: number;
  loss?: number;
  timeOfDay?: string;
};

export type ResultsByDayOfWeek = {
  win?: number;
  draw?: number;
  loss?: number;
  dayOfWeek?: string;
};

export type Games = {
  total?: number;
  win?: number;
  draw?: number;
  loss?: number;
  periods?: GamesByPeriod[];
  timeOfDays?: GamesByTimeOfDay[];
  daysOfWeek?: GamesByDayOfWeek[];
};

export type GamesByPeriod = { games?: number; period?: number };
export type GamesByTimeOfDay = { games?: number; timeOfDay?: string };
export type GamesByDayOfWeek = { games?: number; dayOfWeek?: string };

export type Accuracy = {
  average?: number;
  win?: number;
  draw?: number;
  loss?: number;
  periods?: AccuracyByPeriod[];
  timeOfDays?: AccuracyByTimeOfDay[];
  daysOfWeek?: AccuracyByDayOfWeek[];
};

export type AccuracyByPeriod = { average?: number; period?: number };
export type AccuracyByTimeOfDay = { average?: number; timeOfDay?: string };
export type AccuracyByDayOfWeek = { average?: number; dayOfWeek?: string };

export type Opponent = {
  opponent?: string;
  games?: number;
  win?: number;
  draw?: number;
  loss?: number;
};

export type ChessTitle =
  | 'GM'
  | 'IM'
  | 'FM'
  | 'CM'
  | 'NM'
  | 'WGM'
  | 'WIM'
  | 'WFM'
  | 'WCM'
  | 'WNM'
  | 'AGM'
  | 'AIM'
  | 'AFM'
  | 'ACM';

export type ChessGame = {
  id: string;
  timeClass: string;
  whiteUsername: string;
  blackUsername: string;
  whiteResult: string;
  whiteRating: string;
  blackResult: string;
  blackRating: string;
  endTime: Date;
};

export type ChessPlayer = {
  name: string;
  verified: boolean;
  isStreamer: boolean;
  title: ChessTitle;
  username: string;
  avatar: string;
  followers: number;
  country: string;
  countryCode: string;
  twitchUrl: string;
  archives: string[];
  stats: ChessStats[];
};

export type ChessStats = {
  timeClass: ChessTimeClass;
  last: number;
  best: number;
  win: number;
  draw: number;
  loss: number;
};

export type ChessTimeClass = 'bullet' | 'blitz' | 'rapid';

export type ChessOpening = { eco: string; name: string };

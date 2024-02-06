export type Insights = {
  username: string;
  accuracy: Accuracy;
  games: Games;
  opponents: Opponent[];
  results: Results;
};

export type CountByColumn = {
  count: number;
  column: number;
};

export type GamesByYear = {
  games: number;
  period: number;
};

export type GamesByTimeOfDay = {
  games: number;
  timeOfDay: string;
};

export type GamesByDayOfWeek = {
  games: number;
  dayOfWeek: string;
};

export type Games = {
  total: number;
  win: number;
  draw: number;
  loss: number;
  periods: GamesByYear[];
  timeOfDays: GamesByTimeOfDay[];
  daysOfWeek: GamesByDayOfWeek[];
};

export type Opponent = {
  opponent: string;
  games: number;
  win: number;
  draw: number;
  loss: number;
};

export type Result = {
  result: string;
  count: number;
};

export type ResultsByTimeOfDay = {
  win: number;
  draw: number;
  loss: number;
  timeOfDay: string;
};

export type ResultsByDayOfWeek = {
  win: number;
  draw: number;
  loss: number;
  dayOfWeek: string;
};

export type Results = {
  win: Result[];
  draw: Result[];
  loss: Result[];
  timeOfDays: ResultsByTimeOfDay[];
  daysOfWeek: ResultsByDayOfWeek[];
};

export type AverageByColumn = {
  average: number;
  column: number;
};

export type AccuracyByPeriod = {
  average: number;
  period: number;
};

export type AccuracyByTimeOfDay = {
  average: number;
  timeOfDay: string;
};

export type AccuracyByDayOfWeek = {
  average: number;
  dayOfWeek: string;
};

export type Accuracy = {
  average: number;
  win: number;
  draw: number;
  loss: number;
  periods: AccuracyByPeriod[];
  timeOfDays: AccuracyByTimeOfDay[];
  daysOfWeek: AccuracyByDayOfWeek[];
};

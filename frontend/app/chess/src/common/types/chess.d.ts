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

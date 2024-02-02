export type GamesByPeriodDto = {
  games: number;
  period: number;
};
export type GamesByTimeOfDayDto = {
  games: number;
  timeOfDay: string;
};

export type GamesByDayOfWeekDto = {
  games: number;
  dayOfWeek: string;
};

export type GamesDto = {
  total: number;
  win: number;
  draw: number;
  loss: number;
  periods: GamesByPeriodDto[];
  timeOfDays: GamesByTimeOfDayDto[];
  daysOfWeek: GamesByDayOfWeekDto[];
};

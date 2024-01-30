export type ResultDto = {
  result: string;
  count: number;
};

export type ResultsByTimeOfDayDto = {
  win: number;
  draw: number;
  loss: number;
  timeOfDay: string;
};

export type ResultsByDayOfWeekDto = {
  win: number;
  draw: number;
  loss: number;
  dayOfWeek: string;
};

export type ResultsDto = {
  win: ResultDto[];
  draw: ResultDto[];
  loss: ResultDto[];
  timeOfDays: ResultsByTimeOfDayDto[];
  daysOfWeek: ResultsByDayOfWeekDto[];
};

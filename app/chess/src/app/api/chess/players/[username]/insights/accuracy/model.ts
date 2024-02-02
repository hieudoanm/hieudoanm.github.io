export type AccuracyByPeriodDto = {
  average: number;
  period: number;
};

export type AccuracyByTimeOfDayDto = {
  average: number;
  timeOfDay: string;
};

export type AccuracyByDayOfWeekDto = {
  average: number;
  dayOfWeek: string;
};

export type AccuracyDto = {
  average: number;
  win: number;
  draw: number;
  loss: number;
  periods: AccuracyByPeriodDto[];
  timeOfDays: AccuracyByTimeOfDayDto[];
  daysOfWeek: AccuracyByDayOfWeekDto[];
};

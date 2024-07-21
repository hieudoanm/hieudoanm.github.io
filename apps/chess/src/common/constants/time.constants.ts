import { DayOfWeek, TimeOfDay, TimeRange } from '@chess/common/types/time';

export const ONE_SECOND: number = 1000;
export const ONE_MINUTE: number = ONE_SECOND * 60;
export const ONE_HOUR: number = ONE_MINUTE * 60;
export const ONE_DAY: number = ONE_HOUR * 24;
export const ONE_WEEK: number = ONE_DAY * 7;
export const ONE_MONTH: number = ONE_DAY * 30;
export const ONE_QUARTER: number = ONE_DAY * 90;
export const ONE_YEAR: number = ONE_DAY * 365;

export const TIME_RANGE_IN_MILLISECONDS = new Map<TimeRange, number>();
TIME_RANGE_IN_MILLISECONDS.set('week', ONE_WEEK);
TIME_RANGE_IN_MILLISECONDS.set('month', ONE_MONTH);
TIME_RANGE_IN_MILLISECONDS.set('quarter', ONE_QUARTER);
TIME_RANGE_IN_MILLISECONDS.set('year', ONE_YEAR);

export const TIME_RANGE_IN_DAYS = new Map<TimeRange, number>();
TIME_RANGE_IN_DAYS.set('week', 7);
TIME_RANGE_IN_DAYS.set('month', 30);
TIME_RANGE_IN_DAYS.set('quarter', 90);
TIME_RANGE_IN_DAYS.set('year', 365);

export const DAYS_OF_WEEK: Set<DayOfWeek> = new Set<DayOfWeek>();
DAYS_OF_WEEK.add('sunday');
DAYS_OF_WEEK.add('monday');
DAYS_OF_WEEK.add('tuesday');
DAYS_OF_WEEK.add('wednesday');
DAYS_OF_WEEK.add('thursday');
DAYS_OF_WEEK.add('friday');
DAYS_OF_WEEK.add('saturday');

export const TIME_OF_DAYS: Set<TimeOfDay> = new Set<TimeOfDay>();
TIME_OF_DAYS.add('night');
TIME_OF_DAYS.add('morning');
TIME_OF_DAYS.add('afternoon');
TIME_OF_DAYS.add('evening');

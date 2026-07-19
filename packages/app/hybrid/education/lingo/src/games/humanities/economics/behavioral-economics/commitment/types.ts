export type Phase = 'setup' | 'choose' | 'reveal' | 'done';

export interface DayResult {
  day: number;
  intendedSave: number;
  actualSave: number;
  newBalance: number;
  consume: number;
  consumptionUtility: number;
  splurgeLoss: number;
}

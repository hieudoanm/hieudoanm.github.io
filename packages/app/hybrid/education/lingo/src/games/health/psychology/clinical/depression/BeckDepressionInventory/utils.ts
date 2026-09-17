import { BDI_ITEMS } from './items';

export { BDI_ITEMS } from './items';
export type { BeckItem, BeckOption } from './items';

export interface BdiInterpretation {
  label: string;
  range: string;
}

export const computeBdiScore = (selected: number[]): number =>
  selected.reduce((total, optionIndex, i) => {
    const options = BDI_ITEMS[i]?.options ?? [];
    return total + (options[optionIndex]?.value ?? 0);
  }, 0);

export const hasBdiSuicidalThoughts = (selected: number[]): boolean => {
  const options = BDI_ITEMS[8]?.options ?? [];
  const value = options[selected[8] ?? -1]?.value ?? 0;
  return value > 0;
};

export const interpretBdiScore = (score: number): BdiInterpretation => {
  if (score >= 29) return { label: 'Severe depression', range: '29–63' };
  if (score >= 20) return { label: 'Moderate depression', range: '20–28' };
  if (score >= 14) return { label: 'Mild depression', range: '14–19' };
  return { label: 'Minimal depression', range: '0–13' };
};

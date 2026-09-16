import { FRAMER_CATEGORIES, SCENARIOS, WIND_FALL_AMOUNT } from './constants';
import type { ChoiceId, WindfallCategory } from './types';

export interface AllocationRow {
  category: WindfallCategory;
  amount: number;
}

export const scoreFor = (answers: ChoiceId[]): number =>
  answers.reduce(
    (sum, choice, index) =>
      sum + (SCENARIOS[index]?.rational === choice ? 1 : 0),
    0
  );

export const totalAllocated = (allocations: Record<string, number>): number =>
  Object.values(allocations).reduce((sum, amount) => sum + amount, 0);

export const isValidAllocation = (
  allocations: Record<string, number>
): boolean => {
  const keys = Object.keys(allocations);
  return (
    keys.length === FRAMER_CATEGORIES.length &&
    keys.every((key) =>
      FRAMER_CATEGORIES.some((category) => category.id === key)
    ) &&
    totalAllocated(allocations) === WIND_FALL_AMOUNT
  );
};

export const allocationRows = (
  allocations: Record<string, number>
): AllocationRow[] =>
  FRAMER_CATEGORIES.map((category) => ({
    category,
    amount: allocations[category.id] ?? 0,
  }));

import { GROWTH_RATE, MAX_STOCK } from './constants';

export const growthFor = (stock: number): number =>
  Math.min(
    MAX_STOCK,
    Math.max(0, Math.round(GROWTH_RATE * (stock / MAX_STOCK)))
  );

export const nextStock = (
  stock: number,
  totalHarvest: number,
  max: number = MAX_STOCK
): number =>
  Math.min(max, Math.max(0, stock - totalHarvest + growthFor(stock)));

export const harvest = (requested: number, stock: number): number =>
  Math.min(requested, stock);

export const hasCollapsed = (stock: number): boolean => stock <= 0;

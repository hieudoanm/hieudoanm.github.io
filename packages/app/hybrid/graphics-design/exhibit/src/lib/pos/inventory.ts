import type { Item } from '@/types/pos';

export const isLowStock = (item: Item): boolean =>
  item.stock <= item.lowStockThreshold;

export const filterLowStockItems = (items: Item[]): Item[] =>
  items.filter(isLowStock);

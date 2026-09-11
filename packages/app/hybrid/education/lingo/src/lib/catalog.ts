import { ComponentType } from 'react';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export const DIFFICULTIES: readonly Difficulty[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
];

export const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

export type DifficultyFilter = 'All' | Difficulty;

export type SortOrder =
  'default' | 'label-asc' | 'label-desc' | 'category' | 'easiest' | 'hardest';

export type GroupBy = 'category' | 'difficulty' | 'letter';

export const difficultyStyles: Record<Difficulty, string> = {
  Beginner: 'badge-success',
  Intermediate: 'badge-warning',
  Advanced: 'badge-error',
};

export interface CourseItem {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  gameHref?: string;
  badge?: string;
  category?: string;
  difficulty?: Difficulty;
}

export function compareBy(
  sort: SortOrder
): ((a: CourseItem, b: CourseItem) => number) | null {
  switch (sort) {
    case 'label-asc':
      return (a, b) => a.label.localeCompare(b.label);
    case 'label-desc':
      return (a, b) => b.label.localeCompare(a.label);
    case 'category':
      return (a, b) =>
        (a.category ?? '').localeCompare(b.category ?? '') ||
        a.label.localeCompare(b.label);
    case 'easiest':
      return (a, b) =>
        DIFFICULTY_ORDER[a.difficulty ?? 'Beginner'] -
          DIFFICULTY_ORDER[b.difficulty ?? 'Beginner'] ||
        a.label.localeCompare(b.label);
    case 'hardest':
      return (a, b) =>
        DIFFICULTY_ORDER[b.difficulty ?? 'Beginner'] -
          DIFFICULTY_ORDER[a.difficulty ?? 'Beginner'] ||
        a.label.localeCompare(b.label);
    default:
      return null;
  }
}

export function groupKeyOf(item: CourseItem, groupBy: GroupBy): string {
  switch (groupBy) {
    case 'category':
      return item.category ?? 'Uncategorized';
    case 'difficulty':
      return item.difficulty ?? 'Unknown';
    case 'letter':
      return (item.label.charAt(0) || '?').toUpperCase();
  }
}

export function compareGroupKeys(
  groupBy: GroupBy
): (a: string, b: string) => number {
  if (groupBy === 'difficulty') {
    return (a, b) =>
      (DIFFICULTY_ORDER[a as Difficulty] ?? 99) -
      (DIFFICULTY_ORDER[b as Difficulty] ?? 99);
  }
  return (a, b) => a.localeCompare(b);
}

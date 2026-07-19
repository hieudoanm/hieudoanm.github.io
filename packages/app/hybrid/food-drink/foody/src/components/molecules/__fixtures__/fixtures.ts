import type { Cuisine, Food } from '@/data';

export const FIXTURE_CUISINES: Cuisine[] = [
  { emoji: '🇮🇹', value: 'italian', label: 'Italy' },
  { emoji: '🇯🇵', value: 'japanese', label: 'Japan' },
];

export const FIXTURE_FOODS: Food[] = [
  { emoji: '🍕', value: 'pizza', label: 'Pizza', category: 'italian' },
  { emoji: '🍝', value: 'pasta', label: 'Pasta', category: 'italian' },
  { emoji: '🍣', value: 'sushi', label: 'Sushi', category: 'japanese' },
];

export const FIXTURE_FOODS_MAP: Record<string, string[]> = {
  ...Object.fromEntries(
    FIXTURE_CUISINES.map((cuisine) => [
      cuisine.value,
      FIXTURE_FOODS.filter((food) => food.category === cuisine.value).map(
        (food) => food.label
      ),
    ])
  ),
  all: FIXTURE_FOODS.map((food) => food.label),
};

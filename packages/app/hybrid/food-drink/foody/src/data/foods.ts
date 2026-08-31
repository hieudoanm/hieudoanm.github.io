import foods from './foods.json';
import { CUISINES } from './cuisines';
import type { Food } from './types';

export const FOODS: Food[] = foods as Food[];

export const FOOD_OPTIONS: Record<string, string[]> = {
  ...Object.fromEntries(
    CUISINES.map((cuisine) => [
      cuisine.value,
      FOODS.filter((food) => food.category === cuisine.value).map(
        (food) => food.label
      ),
    ])
  ),
  ...Object.fromEntries(FOODS.map((food) => [food.value, [food.label]])),
  all: FOODS.map((food) => food.label),
};

export const TOTAL_FOODS = FOODS.length;

export { CUISINES };

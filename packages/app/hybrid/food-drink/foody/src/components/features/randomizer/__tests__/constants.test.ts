import { CUISINES, FOOD_OPTIONS, FOODS, TOTAL_FOODS } from '../constants';

describe('randomizer data', () => {
  it('contains 32 foods', () => {
    expect(TOTAL_FOODS).toBe(32);
    expect(FOODS).toHaveLength(TOTAL_FOODS);
  });

  it('has unique food values and non-empty labels', () => {
    const values = FOODS.map((food) => food.value);
    expect(new Set(values).size).toBe(values.length);
    FOODS.forEach((food) => {
      expect(food.label.length).toBeGreaterThan(0);
      expect(food.emoji.length).toBeGreaterThan(0);
    });
  });

  it('assigns every food to a known cuisine', () => {
    const cuisineValues = CUISINES.map((cuisine) => cuisine.value);
    FOODS.forEach((food) => {
      expect(cuisineValues).toContain(food.category);
    });
  });

  it('exposes options per cuisine plus a combined all list', () => {
    expect(FOOD_OPTIONS.all).toHaveLength(TOTAL_FOODS);
    CUISINES.forEach((cuisine) => {
      const expected = FOODS.filter(
        (food) => food.category === cuisine.value
      ).map((food) => food.label);
      expect(FOOD_OPTIONS[cuisine.value]).toEqual(expected);
    });
  });

  it('maps a locked dish to itself so spins always land', () => {
    expect(FOOD_OPTIONS.sushi).toEqual(['Sushi']);
    expect(Object.keys(FOOD_OPTIONS)).toHaveLength(
      TOTAL_FOODS + CUISINES.length + 1
    );
  });

  it('covers Italy, Korea, Japan, Thailand, Vietnam and Mexico', () => {
    expect(CUISINES.map((cuisine) => cuisine.value)).toEqual([
      'italian',
      'korean',
      'japanese',
      'thai',
      'vietnamese',
      'mexican',
    ]);
  });
});

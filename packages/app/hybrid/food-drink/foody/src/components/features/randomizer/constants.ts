import type { Cuisine, Food } from './types';

export const CUISINES: Cuisine[] = [
  { emoji: '🇮🇹', value: 'italian', label: 'Italy' },
  { emoji: '🇰🇷', value: 'korean', label: 'Korea' },
  { emoji: '🇯🇵', value: 'japanese', label: 'Japan' },
  { emoji: '🇹🇭', value: 'thai', label: 'Thailand' },
  { emoji: '🇻🇳', value: 'vietnamese', label: 'Vietnam' },
  { emoji: '🇲🇽', value: 'mexican', label: 'Mexico' },
];

export const FOODS: Food[] = [
  {
    emoji: '🍕',
    value: 'margherita-pizza',
    label: 'Margherita Pizza',
    category: 'italian',
  },
  {
    emoji: '🍝',
    value: 'spaghetti-carbonara',
    label: 'Spaghetti Carbonara',
    category: 'italian',
  },
  { emoji: '🥘', value: 'lasagna', label: 'Lasagna', category: 'italian' },
  { emoji: '🍚', value: 'risotto', label: 'Risotto', category: 'italian' },
  { emoji: '🍰', value: 'tiramisu', label: 'Tiramisu', category: 'italian' },
  {
    emoji: '🥖',
    value: 'bruschetta',
    label: 'Bruschetta',
    category: 'italian',
  },

  { emoji: '🍲', value: 'bibimbap', label: 'Bibimbap', category: 'korean' },
  { emoji: '🍡', value: 'tteokbokki', label: 'Tteokbokki', category: 'korean' },
  { emoji: '🥩', value: 'bulgogi', label: 'Bulgogi', category: 'korean' },
  {
    emoji: '🍛',
    value: 'kimchi-fried-rice',
    label: 'Kimchi Fried Rice',
    category: 'korean',
  },
  {
    emoji: '🥓',
    value: 'samgyeopsal',
    label: 'Samgyeopsal',
    category: 'korean',
  },

  { emoji: '🍣', value: 'sushi', label: 'Sushi', category: 'japanese' },
  { emoji: '🍜', value: 'ramen', label: 'Ramen', category: 'japanese' },
  { emoji: '🍤', value: 'tempura', label: 'Tempura', category: 'japanese' },
  { emoji: '🍥', value: 'udon', label: 'Udon', category: 'japanese' },
  { emoji: '🐙', value: 'takoyaki', label: 'Takoyaki', category: 'japanese' },
  { emoji: '🍙', value: 'onigiri', label: 'Onigiri', category: 'japanese' },

  { emoji: '🥜', value: 'pad-thai', label: 'Pad Thai', category: 'thai' },
  {
    emoji: '🦐',
    value: 'tom-yum-goong',
    label: 'Tom Yum Goong',
    category: 'thai',
  },
  { emoji: '🥘', value: 'green-curry', label: 'Green Curry', category: 'thai' },
  {
    emoji: '🥭',
    value: 'mango-sticky-rice',
    label: 'Mango Sticky Rice',
    category: 'thai',
  },
  { emoji: '🌶️', value: 'som-tam', label: 'Som Tam', category: 'thai' },

  { emoji: '🍜', value: 'pho', label: 'Pho', category: 'vietnamese' },
  { emoji: '🥖', value: 'banh-mi', label: 'Banh Mi', category: 'vietnamese' },
  { emoji: '🍖', value: 'bun-cha', label: 'Bun Cha', category: 'vietnamese' },
  { emoji: '🥗', value: 'goi-cuon', label: 'Goi Cuon', category: 'vietnamese' },
  { emoji: '🍳', value: 'banh-xeo', label: 'Banh Xeo', category: 'vietnamese' },

  {
    emoji: '🌮',
    value: 'tacos-al-pastor',
    label: 'Tacos al Pastor',
    category: 'mexican',
  },
  {
    emoji: '🧀',
    value: 'quesadilla',
    label: 'Quesadilla',
    category: 'mexican',
  },
  { emoji: '🌽', value: 'elote', label: 'Elote', category: 'mexican' },
  {
    emoji: '🫕',
    value: 'enchiladas',
    label: 'Enchiladas',
    category: 'mexican',
  },
  { emoji: '🥨', value: 'churros', label: 'Churros', category: 'mexican' },
];

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

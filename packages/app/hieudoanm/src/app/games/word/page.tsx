'use client';

import { CategoryPage } from '../_shared/CategoryPage';
import { CATEGORY_CONFIGS } from '../_shared/_maps';

const GamesCategoryWord = () => {
  return <CategoryPage category="word" make={CATEGORY_CONFIGS['word'].make} />;
};
export default GamesCategoryWord;

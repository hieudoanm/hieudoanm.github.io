'use client';

import { CategoryPage } from '../_shared/CategoryPage';
import { CATEGORY_CONFIGS } from '../_shared/_maps';

const GamesCategoryChess = () => {
  return (
    <CategoryPage category="chess" make={CATEGORY_CONFIGS['chess'].make} />
  );
};
export default GamesCategoryChess;

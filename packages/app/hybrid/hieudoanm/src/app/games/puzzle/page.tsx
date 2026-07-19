'use client';

import { CategoryPage } from '../_shared/CategoryPage';
import { CATEGORY_CONFIGS } from '../_shared/_maps';

const GamesCategoryPuzzle = () => {
  return (
    <CategoryPage category="puzzle" make={CATEGORY_CONFIGS['puzzle'].make} />
  );
};
export default GamesCategoryPuzzle;

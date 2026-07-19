'use client';

import { CategoryPage } from '../_shared/CategoryPage';
import { CATEGORY_CONFIGS } from '../_shared/_maps';

const GamesCategoryArcade = () => {
  return (
    <CategoryPage category="arcade" make={CATEGORY_CONFIGS['arcade'].make} />
  );
};
export default GamesCategoryArcade;

'use client';

import { CategoryPage } from '../_shared/CategoryPage';
import { CATEGORY_CONFIGS } from '../_shared/_maps';

const GamesCategoryMemory = () => {
  return (
    <CategoryPage category="memory" make={CATEGORY_CONFIGS['memory'].make} />
  );
};
export default GamesCategoryMemory;

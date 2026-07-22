'use client';

import { CategoryPage } from '../_shared/CategoryPage';
import { CATEGORY_CONFIGS } from '../_shared/_maps';

const GamesCategoryCasino = () => {
  return (
    <CategoryPage category="casino" make={CATEGORY_CONFIGS['casino'].make} />
  );
};
export default GamesCategoryCasino;

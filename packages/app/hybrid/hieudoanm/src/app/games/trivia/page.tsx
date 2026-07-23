'use client';

import { CategoryPage } from '../_shared/CategoryPage';
import { CATEGORY_CONFIGS } from '../_shared/_maps';

const GamesCategoryTrivia = () => {
  return (
    <CategoryPage category="trivia" make={CATEGORY_CONFIGS['trivia'].make} />
  );
};
export default GamesCategoryTrivia;

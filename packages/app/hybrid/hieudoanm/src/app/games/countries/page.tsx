'use client';

import { CategoryPage } from '../_shared/CategoryPage';
import { CATEGORY_CONFIGS } from '../_shared/_maps';

const GamesCategoryCountries = () => {
  return (
    <CategoryPage
      category="countries"
      make={CATEGORY_CONFIGS['countries'].make}
    />
  );
};
export default GamesCategoryCountries;

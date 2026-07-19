'use client';

import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';
import { getGameSections } from '@hieudoanm.github.io/components/routes/games/data/games';

const CATEGORY = 'puzzle';

export default function PuzzleCategoryPage() {
  const sections = getGameSections();
  const title = sections.find((s) => s.id === CATEGORY)?.label ?? CATEGORY;
  return (
    <AppsStoreTemplate title={title} sections={sections} section={CATEGORY} />
  );
}

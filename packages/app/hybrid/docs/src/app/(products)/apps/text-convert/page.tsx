'use client';

import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';
import { getAppSections } from '@hieudoanm.github.io/components/routes/apps/data/apps';

const CATEGORY = 'text-convert';

export default function TextConvertCategoryPage() {
  const sections = getAppSections();
  const title = sections.find((s) => s.id === CATEGORY)?.label ?? CATEGORY;
  return (
    <AppsStoreTemplate title={title} sections={sections} section={CATEGORY} />
  );
}

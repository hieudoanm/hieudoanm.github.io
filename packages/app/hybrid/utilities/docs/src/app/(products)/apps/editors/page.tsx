'use client';

import { getAppSections } from '@hieudoanm.github.io/components/routes/apps/data/apps';
import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';
import { NextPage } from 'next';

const CATEGORY = 'editors';

const EditorsCategoryPage: NextPage = () => {
  const sections = getAppSections();
  const title = sections.find((s) => s.id === CATEGORY)?.label ?? CATEGORY;
  return (
    <AppsStoreTemplate title={title} sections={sections} section={CATEGORY} />
  );
};

export default EditorsCategoryPage;

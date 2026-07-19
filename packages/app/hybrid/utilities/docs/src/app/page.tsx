'use client';

import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';
import { getHomeSections } from '@hieudoanm.github.io/components/routes/apps/data/apps';

const sections = getHomeSections();

const StartPage = () => (
  <AppsStoreTemplate title="Start Page" sections={sections} />
);

export default StartPage;

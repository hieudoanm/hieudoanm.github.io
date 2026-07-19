'use client';

import { FC, useMemo } from 'react';

import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';
import { useSidebar } from '@hieudoanm.github.io/components/organisms/layout/SidebarProvider';
import { APP_SECTIONS } from '@hieudoanm.github.io/components/routes/apps/apps-data';
import { BOOKMARK_SECTIONS } from './bookmarks-data';

export const Start: FC = () => {
  const { toolSections } = useSidebar();

  const sections = useMemo(
    () => [
      ...BOOKMARK_SECTIONS,
      ...Object.entries(toolSections)
        .map(([id, items]) => ({
          label: APP_SECTIONS.find((s) => s.id === id)?.label ?? id,
          items,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ],
    [toolSections]
  );

  return <AppsStoreTemplate title="Start Page" sections={sections} />;
};
Start.displayName = 'Start';

'use client';

import { Highlight } from '@/components/atoms/Highlight';
import type { AppData } from '@/lib/downloads';
import Link from 'next/link';
import type { FC } from 'react';

interface AppListRowProps {
  app: AppData;
  isFavorite: (slug: string) => boolean;
  highlightQuery: string;
}

export const AppListRow: FC<AppListRowProps> = ({
  app,
  isFavorite,
  highlightQuery,
}) => (
  <Link
    href={`/app/${app.slug}/`}
    className="card bg-base-200 border-base-300 hover:bg-base-300 flex flex-row items-center gap-3 border p-3 transition-colors">
    <span className="text-primary text-sm">
      {isFavorite(app.slug) ? '\u2665' : '\u2661'}
    </span>
    <span className="text-sm">
      <Highlight text={app.label} query={highlightQuery} />
    </span>
    <span className="text-base-content/40 ml-auto text-xs">
      {app.primaryCategory}
    </span>
  </Link>
);

AppListRow.displayName = 'AppListRow';

'use client';

import { FC, memo } from 'react';
import { TocItem } from '../constants';

interface TocSidebarProps {
  items: TocItem[];
  onScrollTo: (line: number) => void;
}

export const TocSidebar: FC<TocSidebarProps> = memo(({ items, onScrollTo }) => (
  <div className="border-base-300 w-48 flex-shrink-0 overflow-y-auto border-r p-2 text-xs">
    {items.length > 0 ? (
      <nav className="space-y-0.5">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            className="hover:bg-base-300 block w-full cursor-pointer truncate rounded px-2 py-0.5 text-left"
            style={{ paddingLeft: `${8 + (item.level - 1) * 12}px` }}
            onClick={() => onScrollTo(item.line)}
            title={item.text}>
            {item.text}
          </button>
        ))}
      </nav>
    ) : (
      <p className="text-base-content/40 p-2">No headings</p>
    )}
  </div>
));
TocSidebar.displayName = 'TocSidebar';

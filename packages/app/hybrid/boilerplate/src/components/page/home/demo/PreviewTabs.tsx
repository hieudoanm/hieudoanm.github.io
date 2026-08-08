'use client';

import { FC, ReactNode, useState } from 'react';
import { PreviewTabsPane } from './PreviewTabsPane';

const TABS = ['Color Palette', 'Components', 'Pages'] as const;

export const PreviewTabs: FC<{
  colors: Record<string, string>;
  children: ReactNode;
}> = ({ colors, children }) => {
  const [active, setActive] = useState<string>('Components');

  return (
    <div className="bg-base-200 flex flex-1 flex-col overflow-hidden">
      <div className="border-base-300 border-b">
        <div className="tabs tabs-box mx-auto max-w-5xl">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab ${active === tab ? 'tab-active' : ''}`}
              onClick={() => setActive(tab)}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <PreviewTabsPane active={active} colors={colors}>
          {children}
        </PreviewTabsPane>
      </div>
    </div>
  );
};
PreviewTabs.displayName = 'PreviewTabs';

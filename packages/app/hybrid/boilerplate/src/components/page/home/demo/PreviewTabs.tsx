'use client';

import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { PreviewTabsPane } from './PreviewTabsPane';

const TABS = ['Color Palette', 'Components', 'Pages'] as const;

export const PreviewTabs: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [active, setActive] = useState<string>('Components');

  return (
    <div className="bg-base-200 flex flex-1 flex-col overflow-hidden">
      <div className="border-base-300 border-b">
        <div className="tabs tabs-box mx-auto max-w-5xl">
          {TABS.map((tab) => {
            if (tab === 'Color Palette') {
              return (
                <Link key={tab} href="/colors" className="tab">
                  {tab}
                </Link>
              );
            }
            return (
              <button
                key={tab}
                className={`tab ${active === tab ? 'tab-active' : ''}`}
                onClick={() => setActive(tab)}>
                {tab}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <PreviewTabsPane active={active}>{children}</PreviewTabsPane>
      </div>
    </div>
  );
};
PreviewTabs.displayName = 'PreviewTabs';

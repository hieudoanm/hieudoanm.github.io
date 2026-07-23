import { FC, ReactNode, useState } from 'react';
import { ColorPalette } from './ColorPalette';

const TABS = ['Color Palette', 'Components Demo'] as const;

export const PreviewTabs: FC<{
  colors: Record<string, string>;
  children: ReactNode;
}> = ({ colors, children }) => {
  const [active, setActive] = useState<string>('Components Demo');
  return (
    <div className="flex-1 overflow-auto">
      <div className="border-base-300 border-b">
        <div className="tabs tabs-border mx-auto max-w-5xl">
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
      {active === 'Color Palette' ? <ColorPalette colors={colors} /> : children}
    </div>
  );
};
PreviewTabs.displayName = 'PreviewTabs';

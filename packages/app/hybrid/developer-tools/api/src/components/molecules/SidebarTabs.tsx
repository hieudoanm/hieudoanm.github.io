'use client';

import { type FC } from 'react';

type SidebarSection = 'history' | 'collections' | 'runner' | 'design';

interface SidebarTabsProps {
  value: SidebarSection;
  onChange: (tab: SidebarSection) => void;
}

export const SidebarTabs: FC<SidebarTabsProps> = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as SidebarSection)}
    aria-label="Sidebar section"
    className="select select-bordered select-sm w-full">
    <option value="history">History</option>
    <option value="collections">Collections</option>
    <option value="runner">Runner</option>
    <option value="design">Design</option>
  </select>
);

SidebarTabs.displayName = 'SidebarTabs';

'use client';

import { type FC } from 'react';

interface SidebarTabsProps {
  value: 'history' | 'collections';
  onChange: (tab: 'history' | 'collections') => void;
}

export const SidebarTabs: FC<SidebarTabsProps> = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as 'history' | 'collections')}
    aria-label="Sidebar section"
    className="select select-bordered select-sm w-full">
    <option value="history">History</option>
    <option value="collections">Collections</option>
  </select>
);

SidebarTabs.displayName = 'SidebarTabs';

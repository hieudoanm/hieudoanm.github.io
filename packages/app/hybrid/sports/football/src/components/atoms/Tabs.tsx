'use client';

import { FC, ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export const Tabs: FC<TabsProps> = ({ items, activeId, onChange }) => {
  const active = items.find((item) => item.id === activeId) ?? items[0];
  return (
    <div className="flex flex-col gap-3">
      <div role="tablist" className="tabs tabs-bordered tabs-sm">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={item.id === active.id}
            aria-controls={`panel-${item.id}`}
            onClick={() => onChange(item.id)}
            className={`tab ${item.id === active.id ? 'tab-active' : ''}`}>
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={item.id !== active.id}
          className="border-base-300 rounded-box bg-base-200/40 border p-3">
          {item.content}
        </div>
      ))}
    </div>
  );
};

Tabs.displayName = 'Tabs';

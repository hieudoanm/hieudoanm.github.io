'use client';

import { type SidebarSection } from '@/components/molecules/SidebarTabs';
import { type FC } from 'react';
import { FiClock } from 'react-icons/fi';

const SIDEBAR_LABELS: Record<SidebarSection, string> = {
  history: 'History',
  collections: 'Collections',
  runner: 'Runner',
  design: 'Design',
};

interface SidebarToggleProps {
  tab: SidebarSection;
  count: number;
  onClick: () => void;
}

export const SidebarToggle: FC<SidebarToggleProps> = ({
  tab,
  count,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="btn btn-ghost btn-xs gap-1">
    <FiClock className="size-4" />
    <span>{SIDEBAR_LABELS[tab]}</span>
    <span className="badge badge-neutral badge-sm">{count}</span>
  </button>
);

SidebarToggle.displayName = 'SidebarToggle';

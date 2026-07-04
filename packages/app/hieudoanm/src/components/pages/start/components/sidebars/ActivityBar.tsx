import { type FC } from 'react';
import {
  PiGauge,
  PiCheckSquare,
  PiClock,
  PiCurrencyDollar,
  PiCalendarBlank,
  PiIdentificationCard,
  PiGlobeHemisphereWest,
  PiPackage,
  PiWrench,
} from 'react-icons/pi';

import type { SidebarTab } from '../../types';

interface ActivityBarProps {
  activeTab: SidebarTab | null;
  onToggle: (tab: SidebarTab) => void;
}

const TABS: {
  id: SidebarTab;
  label: string;
  icon: FC<{ className?: string; size?: number }>;
}[] = [
  { id: 'tools', label: 'Tools', icon: PiWrench },
  { id: 'status', label: 'Status', icon: PiGauge },
  { id: 'tasks', label: 'Tasks', icon: PiCheckSquare },
  { id: 'time', label: 'Time', icon: PiClock },
  { id: 'currency', label: 'Currency', icon: PiCurrencyDollar },
  { id: 'calendar', label: 'Calendar', icon: PiCalendarBlank },
  { id: 'passport', label: 'Passport', icon: PiIdentificationCard },
  { id: 'downloads', label: 'Downloads', icon: PiPackage },
  { id: 'world-clock', label: 'World Clock', icon: PiGlobeHemisphereWest },
];

export const ActivityBar: FC<ActivityBarProps> = ({ activeTab, onToggle }) => (
  <div className="bg-base-200 flex w-12 flex-col items-center gap-2 py-2">
    {TABS.map(({ id, label, icon: Icon }) => (
      <button
        key={id}
        onClick={() => onToggle(id)}
        className={`btn btn-ghost btn-square btn-sm ${activeTab === id ? 'text-primary' : 'text-base-content/60'}`}
        title={activeTab === id ? `Close ${label}` : `Open ${label}`}>
        <Icon className="h-5 w-5" />
      </button>
    ))}
    <div className="flex-1" />
  </div>
);

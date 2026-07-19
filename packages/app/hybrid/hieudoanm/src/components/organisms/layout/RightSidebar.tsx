import { getTimeInZone, timezones } from '@hieudoanm.github.io/data/timezones';
import dynamic from 'next/dynamic';
import { type FC, useCallback, useEffect, useState } from 'react';
import {
  PiCalendarBlank,
  PiCheckSquare,
  PiClock,
  PiCurrencyDollar,
  PiGauge,
  PiGlobeHemisphereWest,
  PiIdentificationCard,
} from 'react-icons/pi';

import type { SidebarTab } from '@hieudoanm.github.io/components/organisms/layout/types';

const StatusTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/organisms/layout/tabs/StatusTab').then(
      (m) => m.StatusTab
    ),
  { ssr: false }
);
const TasksTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/organisms/layout/tabs/TasksTab').then(
      (m) => m.TasksTab
    ),
  { ssr: false }
);
const TimeTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/organisms/layout/tabs/TimeTab').then(
      (m) => m.TimeTab
    ),
  { ssr: false }
);
const CurrencyTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/organisms/layout/tabs/CurrencyTab').then(
      (m) => m.CurrencyTab
    ),
  { ssr: false }
);
const CalendarTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/organisms/layout/tabs/CalendarTab').then(
      (m) => m.CalendarTab
    ),
  { ssr: false }
);
const PassportTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/organisms/layout/tabs/PassportTab').then(
      (m) => m.PassportTab
    ),
  { ssr: false }
);
const ClockTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/organisms/layout/tabs/ClockTab').then(
      (m) => m.ClockTab
    ),
  { ssr: false }
);

const TABS: {
  id: SidebarTab;
  label: string;
  icon: FC<{ className?: string; size?: number }>;
}[] = [
  { id: 'status', label: 'Status', icon: PiGauge },
  { id: 'tasks', label: 'Tasks', icon: PiCheckSquare },
  { id: 'time', label: 'Time', icon: PiClock },
  { id: 'currency', label: 'Currency', icon: PiCurrencyDollar },
  { id: 'calendar', label: 'Calendar', icon: PiCalendarBlank },
  { id: 'passport', label: 'Passport', icon: PiIdentificationCard },
  { id: 'world-clock', label: 'World Clock', icon: PiGlobeHemisphereWest },
];

export const RightSidebar: FC = () => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTab | null>(null);
  const [times, setTimes] = useState(() =>
    timezones.map(({ tz }) => getTimeInZone(tz))
  );

  useEffect(() => {
    const interval = setInterval(
      () => setTimes(timezones.map(({ tz }) => getTimeInZone(tz))),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = useCallback(
    (tab: SidebarTab) =>
      setSidebarTab((prev: SidebarTab | null) => (prev === tab ? null : tab)),
    []
  );

  const renderSidebarContent = useCallback(
    (tab: SidebarTab) => {
      switch (tab) {
        case 'status':
          return <StatusTab />;
        case 'tasks':
          return <TasksTab />;
        case 'time':
          return <TimeTab />;
        case 'currency':
          return <CurrencyTab />;
        case 'calendar':
          return <CalendarTab />;
        case 'passport':
          return <PassportTab />;
        case 'world-clock':
          return <ClockTab times={times} />;
      }
    },
    [times]
  );

  return (
    <div className="flex">
      {sidebarTab !== null && (
        <aside className="bg-base-200 border-base-300 flex w-80 shrink-0 flex-col overflow-hidden border-r">
          <div className="min-h-0 flex-1 overflow-y-auto">
            {renderSidebarContent(sidebarTab)}
          </div>
        </aside>
      )}
      <div className="bg-base-200 flex w-12 flex-col items-center gap-2 py-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => toggleSidebar(id)}
            className={`btn btn-ghost btn-square btn-sm ${sidebarTab === id ? 'bg-primary/20 text-primary' : 'text-base-content/60'}`}
            title={sidebarTab === id ? `Close ${label}` : `Open ${label}`}>
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
};

RightSidebar.displayName = 'RightSidebar';

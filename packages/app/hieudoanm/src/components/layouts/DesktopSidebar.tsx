import { getTimeInZone, timezones } from '@hieudoanm.github.io/data/timezones';
import dynamic from 'next/dynamic';
import { FC, useCallback, useEffect, useState } from 'react';

import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';

import { SidebarTab } from '@hieudoanm.github.io/components/pages/start/types';
import { ActivityBar } from './ActivityBar';

const StatusTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/StatusTab').then(
      (m) => m.StatusTab
    ),
  { ssr: false }
);
const TasksTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/TasksTab').then(
      (m) => m.TasksTab
    ),
  { ssr: false }
);
const TimeTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/TimeTab').then(
      (m) => m.TimeTab
    ),
  { ssr: false }
);
const CurrencyTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/CurrencyTab').then(
      (m) => m.CurrencyTab
    ),
  { ssr: false }
);
const CalendarTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/CalendarTab').then(
      (m) => m.CalendarTab
    ),
  { ssr: false }
);
const PassportTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/PassportTab').then(
      (m) => m.PassportTab
    ),
  { ssr: false }
);
const AppsTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/AppsTab').then(
      (m) => m.AppsTab
    ),
  { ssr: false }
);
const GamesTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/GamesTab').then(
      (m) => m.GamesTab
    ),
  { ssr: false }
);
const DownloadsTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/DownloadsTab').then(
      (m) => m.DownloadsTab
    ),
  { ssr: false }
);
const ClockTab = dynamic(
  () =>
    import('@hieudoanm.github.io/components/layouts/tabs/ClockTab').then(
      (m) => m.ClockTab
    ),
  { ssr: false }
);

interface DesktopSidebarProps {
  toolSections: Record<string, Tool[]>;
}

export const DesktopSidebar: FC<DesktopSidebarProps> = ({ toolSections }) => {
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
        case 'apps':
          return <AppsTab toolSections={toolSections} />;
        case 'games':
          return <GamesTab />;
        case 'downloads':
          return <DownloadsTab />;
        case 'world-clock':
          return <ClockTab times={times} />;
      }
    },
    [times, toolSections]
  );

  return (
    <>
      <ActivityBar activeTab={sidebarTab} onToggle={toggleSidebar} />
      {sidebarTab !== null && (
        <aside className="bg-base-200 flex w-80 shrink-0 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto">
            {renderSidebarContent(sidebarTab)}
          </div>
        </aside>
      )}
    </>
  );
};
DesktopSidebar.displayName = 'DesktopSidebar';

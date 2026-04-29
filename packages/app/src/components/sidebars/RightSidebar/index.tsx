// components/sidebars/RightSidebar.tsx
import { WeatherData } from '@hieudoanm/data/weather';
import { FC, useState } from 'react';
import { CalendarTab } from './CalendarTab';
import { ClockWeatherTab } from './ClockWeatherTab';
import { CurrencyTab } from './CurrencyTab';

// ── Types ────────────────────────────────────────────────────────────────────

type RightTab = 'calendar' | 'clock' | 'currency';

const TABS: { id: RightTab; label: string }[] = [
  { id: 'calendar', label: 'Calendar' },
  { id: 'clock', label: 'Clock' },
  { id: 'currency', label: 'Currency' },
];

// ── RightSidebar ─────────────────────────────────────────────────────────────

export const RightSidebar: FC<{
  times: string[];
  weatherQueries: { data: WeatherData | undefined }[];
}> = ({ times, weatherQueries }) => {
  const [tab, setTab] = useState<RightTab>('calendar');

  return (
    <aside className="bg-base-200 border-base-300 flex min-h-0 flex-col overflow-hidden border-l">
      {/* Tab bar */}
      <div className="border-base-300 flex border-b">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 py-3 text-[10px] font-bold tracking-widest uppercase transition-all duration-200 ${
              tab === id
                ? 'border-primary text-primary border-b-2'
                : 'text-base-content/40 hover:text-base-content/70'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'calendar' && <CalendarTab />}
        {tab === 'clock' && (
          <ClockWeatherTab times={times} weatherQueries={weatherQueries} />
        )}
        {tab === 'currency' && <CurrencyTab />}
      </div>
    </aside>
  );
};

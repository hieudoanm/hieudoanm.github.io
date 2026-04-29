// components/sidebars/RightSidebar.tsx
import { WeatherData } from '@hieudoanm/data/weather';
import { FC, useState } from 'react';
import { CurrencyTab } from './tabs/CurrencyTab';
import { DateTimeTab } from './tabs/DateTimeTab';
import { PassportTab } from './tabs/PassportTab';

type RightTab = 'currency' | 'date-time' | 'passport';

const TABS: { id: RightTab; label: string }[] = [
  { id: 'currency', label: 'Currency' },
  { id: 'date-time', label: 'Date/Time' },
  { id: 'passport', label: 'Passport' },
];

export const RightSidebar: FC<{
  times: string[];
  weatherQueries: { data: WeatherData | undefined }[];
}> = ({ times, weatherQueries }) => {
  const [tab, setTab] = useState<RightTab>('date-time');

  return (
    <aside className="bg-base-200 border-base-300 flex min-h-0 flex-col overflow-hidden border-l">
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
      <div className="flex-1 overflow-y-auto">
        {tab === 'currency' && <CurrencyTab />}
        {tab === 'date-time' && (
          <DateTimeTab times={times} weatherQueries={weatherQueries} />
        )}
        {tab === 'passport' && <PassportTab />}
      </div>
    </aside>
  );
};

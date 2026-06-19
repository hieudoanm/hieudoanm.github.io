import { createSignal } from 'solid-js';
import { CurrencyTab } from './tabs/CurrencyTab';
import { DateTimeTab } from './tabs/DateTimeTab';
import { PassportTab } from './tabs/PassportTab';

type RightTab = 'currency' | 'date-time' | 'passport';

const TABS: { id: RightTab; label: string }[] = [
  { id: 'currency', label: 'Currency' },
  { id: 'date-time', label: 'Date/Time' },
  { id: 'passport', label: 'Passport' },
];

export const RightSidebar = (props: { times: string[] }) => {
  const [tab, setTab] = createSignal<RightTab>('date-time');
  const currentTab = tab();

  return (
    <aside class="bg-base-200 border-base-300 flex min-h-0 flex-col overflow-hidden border-l">
      <div class="border-base-300 flex border-b">
        {TABS.map(({ id, label }) => (
          <button
            onClick={() => setTab(id)}
            class={`flex-1 py-3 text-[10px] font-bold tracking-widest uppercase transition-all duration-200 ${
              currentTab === id
                ? 'border-primary text-primary border-b-2'
                : 'text-base-content/40 hover:text-base-content/70'
            }`}>
            {label}
          </button>
        ))}
      </div>
      <div class="flex-1 overflow-y-auto">
        {currentTab === 'currency' && <CurrencyTab />}
        {currentTab === 'date-time' && <DateTimeTab times={props.times} />}
        {currentTab === 'passport' && <PassportTab />}
      </div>
    </aside>
  );
};

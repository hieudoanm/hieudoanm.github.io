import { createSignal } from 'solid-js';
import { FreeModelsTab } from './tabs/FreeModelsTab';
import { StatusTab } from './tabs/StatusTab';
import { TasksTab } from './tabs/TasksTab';
import { TimeTab } from './tabs/TimeTab';

type LeftTab = 'free' | 'status' | 'tasks' | 'time';

const TABS: { id: LeftTab; label: string }[] = [
  { id: 'free', label: 'Free' },
  { id: 'status', label: 'Status' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'time', label: 'Time' },
];

export const LeftSidebar = () => {
  const [tab, setTab] = createSignal<LeftTab>('tasks');
  const currentTab = tab();

  return (
    <aside class="bg-base-200 border-base-300 flex min-h-0 flex-col overflow-hidden border-r">
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

      <div class="min-h-0 flex-1">
        {currentTab === 'free' && <FreeModelsTab />}
        {currentTab === 'status' && <StatusTab />}
        {currentTab === 'tasks' && <TasksTab />}
        {currentTab === 'time' && <TimeTab />}
      </div>
    </aside>
  );
};

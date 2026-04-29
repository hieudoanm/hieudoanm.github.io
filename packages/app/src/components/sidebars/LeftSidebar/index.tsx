import { FC, useState } from 'react';
import { StatusTab } from './tabs/StatusTab';
import { TasksTab } from './tabs/TasksTab';

type LeftTab = 'status' | 'tasks';

const TABS: { id: LeftTab; label: string }[] = [
  { id: 'status', label: 'Status' },
  { id: 'tasks', label: 'Tasks' },
];

export const LeftSidebar: FC = () => {
  const [tab, setTab] = useState<LeftTab>('status');

  return (
    <aside className="bg-base-200 border-base-300 flex min-h-0 flex-col overflow-hidden border-r">
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
      <div className="min-h-0 flex-1">
        {tab === 'status' && <StatusTab />}
        {tab === 'tasks' && <TasksTab />}
      </div>
    </aside>
  );
};

'use client';

import { type FC, Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { ProjectSidebar } from '@/components/organisms/ProjectSidebar';
import { KanbanBoard } from '@/components/organisms/KanbanBoard';
import { ListView } from '@/components/organisms/ListView';
import { CalendarView } from '@/components/organisms/CalendarView';
import { TimelineView } from '@/components/organisms/TimelineView';
import {
  ViewSwitcher,
  type ViewMode,
} from '@/components/organisms/ViewSwitcher';
import { TasksView } from '@/components/organisms/TasksView';

const normalizeView = (value: string): ViewMode =>
  value === 'list' ||
  value === 'calendar' ||
  value === 'timeline' ||
  value === 'tasks'
    ? value
    : 'kanban';

const AppShell: FC = () => {
  const { boards, settings, isLoading } = useData();
  const searchParams = useSearchParams();
  const requestedId = searchParams.get('id');
  const activeBoard = boards.find((b) => b.id === requestedId) ?? boards[0];

  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [view, setView] = useState<ViewMode>(() =>
    normalizeView(settings?.defaultView ?? 'kanban')
  );
  const viewTouched = useRef(false);

  useEffect(() => {
    if (!isLoading && !viewTouched.current) {
      setView(normalizeView(settings?.defaultView ?? 'kanban'));
    }
  }, [isLoading, settings?.defaultView]);

  const handleViewChange = (next: ViewMode) => {
    viewTouched.current = true;
    setView(next);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ProjectSidebar
        search={search}
        onSearchChange={setSearch}
        searchRef={searchRef}
        onOpenArchive={() => setShowArchive(true)}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((c) => !c)}
      />
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : activeBoard ? (
        <div className="flex min-w-0 flex-1 flex-col">
          <ViewSwitcher value={view} onChange={handleViewChange} />
          {view === 'list' && <ListView boardId={activeBoard.id} />}
          {view === 'calendar' && <CalendarView boardId={activeBoard.id} />}
          {view === 'timeline' && <TimelineView boardId={activeBoard.id} />}
          {view === 'tasks' && <TasksView />}
          {view === 'kanban' && (
            <KanbanBoard
              key={activeBoard.id}
              boardId={activeBoard.id}
              search={search}
              searchRef={searchRef}
              showArchive={showArchive}
              setShowArchive={setShowArchive}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-base-content/50">
            No projects yet. Create one from the sidebar.
          </p>
        </div>
      )}
    </div>
  );
};

const HomePage: FC = () => (
  <Providers>
    <Suspense fallback={null}>
      <AppShell />
    </Suspense>
  </Providers>
);

export default HomePage;

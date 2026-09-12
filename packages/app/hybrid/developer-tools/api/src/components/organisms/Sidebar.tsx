'use client';

import { CollectionsPanel } from '@/components/organisms/CollectionsPanel';
import { DesignPanel } from '@/components/organisms/DesignPanel';
import { HistoryList } from '@/components/organisms/HistoryList';
import { RunnerPanel } from '@/components/organisms/RunnerPanel';
import { type SidebarSection } from '@/components/molecules/SidebarTabs';
import { SidebarTabs } from '@/components/molecules/SidebarTabs';
import {
  EnvironmentVariable,
  HistoryEntry,
  RequestCollection,
  RequestConfig,
  ResponseMeta,
  StoredCookie,
} from '@/types/api-client';
import { type FC, type ReactNode } from 'react';

interface SidebarProps {
  tab: SidebarSection;
  onTabChange: (tab: SidebarSection) => void;
  entries: HistoryEntry[];
  activeId: string | null;
  onSelectHistory: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
  collections: RequestCollection[];
  env: EnvironmentVariable[];
  cookies: StoredCookie[];
  request: RequestConfig;
  mockEnabled: boolean;
  onMockToggle: () => void;
  activeEntryId: string | null;
  response: ResponseMeta | null;
  onLoadCollectionEntry: (request: RequestConfig, entryId: string) => void;
  onCollectionsChange: (next: RequestCollection[]) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  tab,
  onTabChange,
  entries,
  activeId,
  onSelectHistory,
  onClearHistory,
  collections,
  env,
  cookies,
  request,
  mockEnabled,
  onMockToggle,
  activeEntryId,
  response,
  onLoadCollectionEntry,
  onCollectionsChange,
}) => {
  const renderPanel = (): ReactNode => {
    if (tab === 'history') {
      return (
        <HistoryList
          entries={entries}
          activeId={activeId}
          onSelect={onSelectHistory}
          onClear={onClearHistory}
        />
      );
    }
    if (tab === 'runner') {
      return (
        <RunnerPanel collections={collections} env={env} cookies={cookies} />
      );
    }
    if (tab === 'design') {
      return (
        <DesignPanel
          collections={collections}
          request={request}
          mockEnabled={mockEnabled}
          onMockToggle={onMockToggle}
        />
      );
    }
    return (
      <CollectionsPanel
        collections={collections}
        request={request}
        activeEntryId={activeEntryId}
        response={response}
        onLoad={onLoadCollectionEntry}
        onUpdate={onCollectionsChange}
      />
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <SidebarTabs value={tab} onChange={onTabChange} />
      {renderPanel()}
    </div>
  );
};

Sidebar.displayName = 'Sidebar';

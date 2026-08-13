'use client';

import { useApiClient } from '@/hooks/useApiClient';
import { CollectionsPanel } from '@/components/organisms/CollectionsPanel';
import { HistoryList } from '@/components/organisms/HistoryList';
import { RequestComposer } from '@/components/molecules/RequestComposer';
import { RequestTabBar } from '@/components/molecules/RequestTabBar';
import { RequestTabs } from '@/components/organisms/RequestTabs';
import { ResponsePanel } from '@/components/organisms/ResponsePanel';
import { SidebarTabs } from '@/components/molecules/SidebarTabs';
import { type FC } from 'react';
import { FiClock } from 'react-icons/fi';

export const ApiClient: FC = () => {
  const api = useApiClient();

  const sidebar = (
    <div className="flex flex-col gap-2">
      <SidebarTabs value={api.sidebarTab} onChange={api.onSidebarTab} />
      {api.sidebarTab === 'history' ? (
        <HistoryList
          entries={api.history}
          activeId={api.activeId}
          onSelect={api.onSelectHistory}
          onClear={api.onClearHistory}
        />
      ) : (
        <CollectionsPanel
          collections={api.collections}
          request={api.request}
          activeEntryId={api.activeEntryId}
          onLoad={api.onLoadCollectionEntry}
          onUpdate={api.onCollectionsChange}
        />
      )}
    </div>
  );

  return (
    <div className="flex h-full flex-col gap-3 lg:flex-row">
      <div className="lg:hidden">
        <button
          type="button"
          onClick={api.onToggleSidebar}
          className="btn btn-ghost btn-xs gap-1">
          <FiClock className="size-4" />
          <span>
            {api.sidebarTab === 'history' ? 'History' : 'Collections'}
          </span>
          <span className="badge badge-neutral badge-sm">
            {api.sidebarTab === 'history'
              ? api.history.length
              : api.collections.length}
          </span>
        </button>
        {api.showSidebar && sidebar}
      </div>

      <aside className="hidden w-64 shrink-0 overflow-y-auto lg:block">
        {sidebar}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <RequestTabBar
          tabs={api.tabs}
          activeId={api.activeId}
          onActivate={api.onActivateTab}
          onClose={api.onCloseTab}
          onAdd={api.onAddTab}
        />
        <RequestComposer
          request={api.request}
          loading={api.loading}
          onChange={api.onRequestChange}
          onSend={api.onSend}
        />
        <RequestTabs
          request={api.request}
          onChange={api.onRequestChange}
          env={api.env}
          onEnvChange={api.onEnvChange}
        />
        <ResponsePanel
          response={api.response}
          loading={api.loading}
          error={api.error}
          compareWith={api.prevResponse}
        />
      </div>
    </div>
  );
};

ApiClient.displayName = 'ApiClient';

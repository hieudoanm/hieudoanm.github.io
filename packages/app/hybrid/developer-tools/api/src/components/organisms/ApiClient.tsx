'use client';

import { useApiClient } from '@/hooks/useApiClient';
import { CollectionsPanel } from '@/components/organisms/CollectionsPanel';
import { DesignPanel } from '@/components/organisms/DesignPanel';
import { GrpcPanel } from '@/components/organisms/GrpcPanel';
import { HistoryList } from '@/components/organisms/HistoryList';
import { MqttPanel } from '@/components/organisms/MqttPanel';
import { ProtocolSwitch } from '@/components/molecules/ProtocolSwitch';
import { RequestComposer } from '@/components/molecules/RequestComposer';
import { RequestTabBar } from '@/components/molecules/RequestTabBar';
import { RequestTabs } from '@/components/organisms/RequestTabs';
import { ResponsePanel } from '@/components/organisms/ResponsePanel';
import { RunnerPanel } from '@/components/organisms/RunnerPanel';
import { SidebarTabs } from '@/components/molecules/SidebarTabs';
import { WebSocketPanel } from '@/components/organisms/WebSocketPanel';
import { type FC } from 'react';
import { FiClock } from 'react-icons/fi';

const SIDEBAR_LABELS: Record<string, string> = {
  history: 'History',
  collections: 'Collections',
  runner: 'Runner',
  design: 'Design',
};

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
      ) : api.sidebarTab === 'runner' ? (
        <RunnerPanel
          collections={api.collections}
          env={api.env}
          cookies={api.cookies}
        />
      ) : api.sidebarTab === 'design' ? (
        <DesignPanel
          collections={api.collections}
          request={api.request}
          mockEnabled={api.mockEnabled}
          onMockToggle={api.onMockToggle}
        />
      ) : (
        <CollectionsPanel
          collections={api.collections}
          request={api.request}
          activeEntryId={api.activeEntryId}
          response={api.response}
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
          <span>{SIDEBAR_LABELS[api.sidebarTab]}</span>
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
        <ProtocolSwitch value={api.protocol} onChange={api.onProtocolChange} />
        {api.protocol === 'http' ? (
          <>
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
              files={api.files}
              onFilesChange={api.onFilesChange}
            />
            <ResponsePanel
              response={api.response}
              loading={api.loading}
              error={api.error}
              compareWith={api.prevResponse}
            />
          </>
        ) : api.protocol === 'websocket' ? (
          <WebSocketPanel />
        ) : api.protocol === 'grpc' ? (
          <GrpcPanel />
        ) : (
          <MqttPanel />
        )}
      </div>
    </div>
  );
};

ApiClient.displayName = 'ApiClient';

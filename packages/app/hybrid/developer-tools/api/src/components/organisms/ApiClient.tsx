'use client';

import { useApiClient } from '@/hooks/useApiClient';
import { GrpcPanel } from '@/components/organisms/GrpcPanel';
import { MqttPanel } from '@/components/organisms/MqttPanel';
import { ProtocolSwitch } from '@/components/molecules/ProtocolSwitch';
import { RequestComposer } from '@/components/molecules/RequestComposer';
import { RequestTabBar } from '@/components/molecules/RequestTabBar';
import { RequestTabs } from '@/components/organisms/RequestTabs';
import { ResponsePanel } from '@/components/organisms/ResponsePanel';
import { Sidebar } from '@/components/organisms/Sidebar';
import { SidebarToggle } from '@/components/molecules/SidebarToggle';
import { WebSocketPanel } from '@/components/organisms/WebSocketPanel';
import { type FC, type ReactNode, Fragment } from 'react';

export const ApiClient: FC = () => {
  const api = useApiClient();

  const sidebar = (
    <Sidebar
      tab={api.sidebarTab}
      onTabChange={api.onSidebarTab}
      entries={api.history}
      activeId={api.activeId}
      onSelectHistory={api.onSelectHistory}
      onClearHistory={api.onClearHistory}
      collections={api.collections}
      env={api.env}
      cookies={api.cookies}
      request={api.request}
      mockEnabled={api.mockEnabled}
      onMockToggle={api.onMockToggle}
      activeEntryId={api.activeEntryId}
      response={api.response}
      onLoadCollectionEntry={api.onLoadCollectionEntry}
      onCollectionsChange={api.onCollectionsChange}
    />
  );

  const renderWorkspace = (): ReactNode => {
    if (api.protocol === 'http') {
      return (
        <Fragment>
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
        </Fragment>
      );
    }
    if (api.protocol === 'websocket') {
      return <WebSocketPanel />;
    }
    if (api.protocol === 'grpc') {
      return <GrpcPanel />;
    }
    return <MqttPanel />;
  };

  return (
    <div className="flex h-full flex-col gap-3 lg:flex-row">
      <div className="lg:hidden">
        <SidebarToggle
          tab={api.sidebarTab}
          count={
            api.sidebarTab === 'history'
              ? api.history.length
              : api.collections.length
          }
          onClick={api.onToggleSidebar}
        />
        {api.showSidebar && sidebar}
      </div>

      <aside className="border-base-300 hidden min-h-0 w-64 shrink-0 overflow-y-auto border-r p-4 lg:block">
        {sidebar}
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-y-auto">
        <ProtocolSwitch value={api.protocol} onChange={api.onProtocolChange} />
        {renderWorkspace()}
      </div>
    </div>
  );
};

ApiClient.displayName = 'ApiClient';

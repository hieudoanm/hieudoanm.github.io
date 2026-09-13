'use client';

import { useApiClient } from '@/hooks/useApiClient';
import { DesignPanel } from '@/components/organisms/DesignPanel';
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
      activeEntryId={api.activeEntryId}
      response={api.response}
      onLoadCollectionEntry={api.onLoadCollectionEntry}
      onCollectionsChange={api.onCollectionsChange}
    />
  );

  const renderWorkspace = (): ReactNode => {
    let workspace: ReactNode;
    if (api.protocol === 'http') {
      workspace = (
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
    } else if (api.protocol === 'websocket') {
      workspace = <WebSocketPanel />;
    } else if (api.protocol === 'grpc') {
      workspace = <GrpcPanel />;
    } else {
      workspace = <MqttPanel />;
    }
    return (
      <Fragment>
        <ProtocolSwitch value={api.protocol} onChange={api.onProtocolChange} />
        {workspace}
      </Fragment>
    );
  };

  return (
    <div className="flex h-full flex-col lg:flex-row">
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
        {api.showSidebar && (
          <div className="bg-base-100 text-base-content">{sidebar}</div>
        )}
      </div>

      <aside className="bg-base-100 border-base-300 text-base-content hidden min-h-0 w-64 shrink-0 overflow-y-auto border-r p-4 lg:block">
        {sidebar}
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
        <div className="tabs tabs-boxed tabs-sm w-fit" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={api.workspaceView === 'request'}
            aria-label="Request view"
            onClick={() => api.onWorkspaceView('request')}
            className={`tab ${api.workspaceView === 'request' ? 'tab-active' : ''}`}>
            Request
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={api.workspaceView === 'design'}
            aria-label="Design view"
            onClick={() => api.onWorkspaceView('design')}
            className={`tab ${api.workspaceView === 'design' ? 'tab-active' : ''}`}>
            Design
          </button>
        </div>
        {api.workspaceView === 'design' ? (
          <DesignPanel
            collections={api.collections}
            request={api.request}
            mockEnabled={api.mockEnabled}
            onMockToggle={api.onMockToggle}
          />
        ) : (
          renderWorkspace()
        )}
      </div>
    </div>
  );
};

ApiClient.displayName = 'ApiClient';

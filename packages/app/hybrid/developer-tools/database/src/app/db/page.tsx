'use client';

import { Suspense, type FC } from 'react';

import { DataView } from '@/components/molecules/DataView';
import { DbBookmarkDialog } from '@/components/molecules/DbBookmarkDialog';
import { DbDropOverlay } from '@/components/molecules/DbDropOverlay';
import { DbEditorPanel } from '@/components/molecules/DbEditorPanel';
import { DbFooter } from '@/components/molecules/DbFooter';
import { DbHeader } from '@/components/molecules/DbHeader';
import { DbModals } from '@/components/molecules/DbModals';
import { DbSchemaSidebar } from '@/components/molecules/DbSchemaSidebar';
import { DbSidePanel } from '@/components/molecules/DbSidePanel';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useDbPage } from '@/hooks/useDbPage';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';

const DBContent: FC = () => {
  const p = useDbPage();
  const { deleteBookmark = () => {} } = useData();
  const { addToast } = useToast();

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      onDragOver={p.handleDragOver}
      onDragLeave={p.handleDragLeave}
      onDrop={p.handleDrop}>
      <DbDropOverlay isDragging={p.isDragging} />
      <DbModals
        showExport={p.showExport}
        activeTab={p.activeTab}
        activeTable={p.activeTable}
        exportColumns={p.exportColumns}
        exportRows={p.filteredRows}
        onCloseExport={() => p.setShowExport(false)}
        showImport={p.showImport}
        tables={p.tables}
        onImport={p.importRowsAsync}
        onCloseImport={() => p.setShowImport(false)}
        designerOpen={p.designerOpen}
        designingTable={p.designingTable}
        design={p.design}
        onSaveDesign={p.handleSaveDesign}
        onCloseDesigner={() => p.setDesignerOpen(false)}
        showViz={p.showViz}
        dbInstance={p.dbInstance}
        dbFileName={p.dbFileName}
        onCloseViz={() => p.setShowViz(false)}
      />
      <DbBookmarkDialog
        open={p.bookmarkOpen}
        name={p.bmName}
        folder={p.bmFolder}
        newFolder={p.bmNewFolder}
        folders={p.folders}
        onNameChange={p.setBmName}
        onFolderChange={p.setBmFolder}
        onNewFolderChange={p.setBmNewFolder}
        onSave={p.handleSaveBookmark}
        onClose={() => p.setBookmarkOpen(false)}
      />
      <DbSidePanel
        panel={p.panel}
        onClose={() => p.setPanel(null)}
        history={p.history}
        groupedBookmarks={p.groupedBookmarks}
        onRerun={p.handleExecute}
        onUseSql={p.setSql}
        onDeleteBookmark={async (id) => {
          await deleteBookmark(id);
          addToast('Bookmark deleted', 'success');
        }}
      />
      <DbHeader
        title={p.currentConnection?.name ?? 'Database'}
        loading={p.loading}
        dbFileName={p.dbFileName}
        opfsFiles={p.opfsFiles}
        hasDb={!!p.dbInstance}
        activeTable={p.activeTable}
        sidebarOpen={p.sidebarOpen}
        panel={p.panel}
        onBack={() => p.router.push('/')}
        onOpenFile={() => p.fileInputRef.current?.click()}
        onNewDb={p.createNewDb}
        onLoadOpfs={p.handleLoadOpfs}
        onSave={p.handleSave}
        onExport={p.handleExport}
        onExportSql={p.handleExportSql}
        onToggleSidebar={() => p.setSidebarOpen(!p.sidebarOpen)}
        onNewTable={p.openNewTable}
        onEditTable={p.openEditTable}
        onShowViz={() => p.setShowViz(true)}
        onTogglePanel={(panel) => p.setPanel(p.panel === panel ? null : panel)}
        onExecute={() => p.handleExecute()}
        onExplain={p.handleExplain}
        onFormat={p.handleFormat}
        onCopyResult={p.handleCopyResult}
        onBookmark={p.openBookmarkDialog}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <DbSchemaSidebar
          open={p.sidebarOpen}
          tables={p.tables}
          activeTable={p.activeTable}
          opfsFiles={p.opfsFiles}
          expandedTables={p.expandedTables}
          width={p.sidebarWidth}
          searchRef={p.searchInputRef}
          onToggleTable={p.toggleTable}
          onSelectTable={p.handleSelectTable}
          onLoadOpfs={p.handleLoadOpfs}
          onStartResize={p.startResize}
        />

        <main className="bg-base-100 flex flex-1 flex-col overflow-hidden">
          <DbEditorPanel
            sql={p.sql}
            onSqlChange={p.setSql}
            errorLine={p.errorLine}
            onRun={p.handleExecute}
            onSuggest={p.suggestions}
            tabs={p.tabs}
            activeTabId={p.activeTabId}
            onSelectTab={p.setActiveTabId}
            onCloseTab={p.closeTab}
          />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {!p.dbInstance ? (
              <EmptyState
                loading={p.loading}
                loadingMsg={p.loadingMsg}
                onOpen={() => p.fileInputRef.current?.click()}
                onNewDb={p.createNewDb}
              />
            ) : (
              <DataView
                activeTable={p.visibleActiveTable}
                loading={p.loading}
                queryResult={
                  p.activeTab
                    ? {
                        columns: p.activeTab.columns,
                        rows: p.activeTab.rows,
                      }
                    : p.queryResult
                }
                filteredRows={p.filteredRows}
                search={p.search}
                sortCol={p.sortCol}
                sortDir={p.sortDir}
                page={p.page}
                totalPages={p.totalPages}
                pageRows={p.pageRows}
                pageOriginalIndices={p.pageOriginalIndices}
                colFilters={p.colFilters}
                editable={!!p.visibleActiveTable}
                onSearch={(v) => {
                  p.setSearch(v);
                  p.resetPage();
                }}
                onColFilter={(ci, v) => {
                  p.setColFilters((prev) => ({ ...prev, [ci]: v }));
                  p.resetPage();
                }}
                onSort={p.handleSort}
                onExport={() => p.setShowExport(true)}
                onImport={p.openImport}
                onAddRow={p.handleAddRow}
                onUpdateCell={p.handleUpdateCell}
                onDeleteRow={p.handleDeleteRow}
                onCopyRow={p.handleCopyRow}
                onPrevPage={() => p.setPage((x) => Math.max(0, x - 1))}
                onNextPage={() =>
                  p.setPage((x) => Math.min(p.totalPages - 1, x + 1))
                }
              />
            )}
          </div>
        </main>
      </div>

      <DbFooter hasDb={!!p.dbInstance} status={p.status} />

      <input
        ref={p.fileInputRef}
        type="file"
        accept=".db,.sqlite,.sqlite3"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) p.handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
};

const DBPage: FC = () => (
  <Providers>
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }>
      <DBContent />
    </Suspense>
  </Providers>
);
export default DBPage;

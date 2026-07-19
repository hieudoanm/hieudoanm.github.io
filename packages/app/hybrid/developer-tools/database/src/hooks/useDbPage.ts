'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useDbPageActions } from '@/hooks/useDbPageActions';
import { useDbPageLayout } from '@/hooks/useDbPageLayout';
import { useDbPageQuery } from '@/hooks/useDbPageQuery';
import { useDbPageSelection } from '@/hooks/useDbPageSelection';
import { useDbPageState } from '@/hooks/useDbPageState';
import { useSqlDatabase } from '@/hooks/useSqlDatabase';
import { fetchExampleBytes } from '@/lib/examples';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { copyToClipboard } from '@/utils/format';
import { buildSuggestions } from '@/utils/autocomplete';
import { formatSql } from '@/utils/sqlFormat';

export const useDbPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const example = searchParams.get('example');
  const openedExampleRef = useRef<string | null>(null);
  const {
    connections,
    currentConnection,
    setCurrentConnection,
    addBookmark,
    bookmarks = [],
    isLoading,
  } = useData();
  const { addToast } = useToast();
  const sqlDatabase = useSqlDatabase();
  const state = useDbPageState();

  useEffect(() => {
    if (id) {
      const conn = connections.find((c) => c.id === id);
      if (conn) setCurrentConnection(conn);
      else if (!isLoading && connections.length > 0) router.push('/');
    }
  }, [id, connections, setCurrentConnection, isLoading, router]);

  useEffect(() => {
    if (!example || openedExampleRef.current === example) return;
    openedExampleRef.current = example;
    fetchExampleBytes(example)
      .then((bytes) => sqlDatabase.openDb(bytes, `${example}.sqlite`))
      .catch((error: unknown) =>
        addToast(
          error instanceof Error ? error.message : String(error),
          'error'
        )
      );
  }, [example, sqlDatabase.openDb, addToast]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) =>
      sqlDatabase.openDb(
        new Uint8Array(ev.target!.result as ArrayBuffer),
        file.name
      );
    reader.readAsArrayBuffer(file);
  };

  const layout = useDbPageLayout({ state, onFile: handleFile });

  const query = useDbPageQuery({
    state,
    dbInstance: sqlDatabase.dbInstance,
    runQuery: sqlDatabase.runQuery,
    explainQuery: sqlDatabase.explainQuery,
    connectionId: currentConnection?.id ?? '',
    bookmarks,
    addBookmark,
    addToast,
  });

  const activeTab = query.activeTab;
  const visibleColumns = activeTab
    ? activeTab.columns
    : sqlDatabase.queryResult.columns;
  const visibleRows = activeTab ? activeTab.rows : sqlDatabase.queryResult.rows;
  const visibleActiveTable = activeTab ? null : sqlDatabase.activeTable;

  const selection = useDbPageSelection({ state, rows: visibleRows });

  const actions = useDbPageActions({
    state,
    activeTable: sqlDatabase.activeTable,
    queryResult: sqlDatabase.queryResult,
    tables: sqlDatabase.tables,
    dbInstance: sqlDatabase.dbInstance,
    dbFileName: sqlDatabase.dbFileName,
    addToast,
    updateCell: sqlDatabase.updateCell,
    deleteRow: sqlDatabase.deleteRow,
    addRow: sqlDatabase.addRow,
    getTableDesign: sqlDatabase.getTableDesign,
    createTableFromDesign: sqlDatabase.createTableFromDesign,
    alterTableFromDesign: sqlDatabase.alterTableFromDesign,
    dumpSql: sqlDatabase.dumpSql,
  });

  const errorLine = useMemo(() => {
    if (!sqlDatabase.error) return null;
    const m =
      sqlDatabase.error.match(/line\s+(\d+)/i) ??
      sqlDatabase.error.match(/at\s+line\s+(\d+)/i);
    return m ? Number(m[1]) : null;
  }, [sqlDatabase.error]);

  const handleSelectTable = (name: string) => {
    sqlDatabase.selectTable(name);
    state.setTabs([]);
    state.setActiveTabId(null);
    state.setSearch('');
    state.setColFilters({});
    selection.resetPage();
    if (window.innerWidth < 640) state.setSidebarOpen(false);
  };

  const handleFormat = () => {
    if (!state.sql.trim()) return;
    state.setSql(formatSql(state.sql));
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.shiftKey && e.code === 'Enter') {
        e.preventDefault();
        handleFormat();
        return;
      }
      if (e.code === 'KeyK') {
        e.preventDefault();
        if (!state.sidebarOpen) state.setSidebarOpen(true);
        requestAnimationFrame(() => state.searchInputRef.current?.focus());
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const handleCopyResult = async () => {
    if (!visibleColumns.length) return;
    const text = JSON.stringify(visibleRows, null, 2);
    await copyToClipboard(text);
    addToast('Result copied', 'success');
  };

  const exportColumns = activeTab
    ? activeTab.columns
    : sqlDatabase.queryResult.columns;

  const suggestions = (text: string, cursor: number) =>
    buildSuggestions(text, cursor, {
      tables: sqlDatabase.tables.map((t) => ({
        name: t.name,
        columns: t.columns.map((c) => c.name),
      })),
    });

  return {
    router,
    currentConnection,
    dbInstance: sqlDatabase.dbInstance,
    dbFileName: sqlDatabase.dbFileName,
    tables: sqlDatabase.tables,
    activeTable: sqlDatabase.activeTable,
    queryResult: sqlDatabase.queryResult,
    error: sqlDatabase.error,
    loading: sqlDatabase.loading,
    loadingMsg: sqlDatabase.loadingMsg,
    status: sqlDatabase.status,
    opfsFiles: sqlDatabase.opfsFiles,
    fileInputRef: state.fileInputRef,
    searchInputRef: state.searchInputRef,
    sql: state.sql,
    setSql: state.setSql,
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: state.setSidebarOpen,
    sidebarWidth: layout.sidebarWidth,
    expandedTables: layout.expandedTables,
    sortCol: selection.sortCol,
    sortDir: selection.sortDir,
    page: selection.page,
    setPage: selection.setPage,
    search: selection.search,
    setSearch: selection.setSearch,
    colFilters: selection.colFilters,
    setColFilters: selection.setColFilters,
    isDragging: layout.isDragging,
    showExport: actions.showExport,
    setShowExport: actions.setShowExport,
    showImport: actions.showImport,
    setShowImport: actions.setShowImport,
    designerOpen: actions.designerOpen,
    setDesignerOpen: actions.setDesignerOpen,
    designingTable: actions.designingTable,
    design: actions.design,
    showViz: actions.showViz,
    setShowViz: actions.setShowViz,
    tabs: query.tabs,
    setTabs: query.setTabs,
    activeTabId: query.activeTabId,
    setActiveTabId: query.setActiveTabId,
    history: query.history,
    panel: query.panel,
    setPanel: query.setPanel,
    bookmarkOpen: query.bookmarkOpen,
    setBookmarkOpen: query.setBookmarkOpen,
    bmName: query.bmName,
    setBmName: query.setBmName,
    bmFolder: query.bmFolder,
    setBmFolder: query.setBmFolder,
    bmNewFolder: query.bmNewFolder,
    setBmNewFolder: query.setBmNewFolder,
    activeTab,
    visibleColumns,
    visibleRows,
    visibleActiveTable,
    filteredRows: selection.filteredRows,
    totalPages: selection.totalPages,
    pageRows: selection.pageRows,
    pageOriginalIndices: selection.pageOriginalIndices,
    errorLine,
    folders: query.folders,
    groupedBookmarks: query.groupedBookmarks,
    exportColumns,
    createNewDb: sqlDatabase.createNewDb,
    handleLoadOpfs: sqlDatabase.handleLoadOpfs,
    handleSave: sqlDatabase.handleSave,
    handleExport: sqlDatabase.handleExport,
    handleFile,
    handleExecute: query.handleExecute,
    handleExplain: query.handleExplain,
    closeTab: query.closeTab,
    handleSelectTable,
    handleFormat,
    handleCopyResult,
    handleAddRow: actions.handleAddRow,
    handleUpdateCell: actions.handleUpdateCell,
    handleDeleteRow: actions.handleDeleteRow,
    handleCopyRow: actions.handleCopyRow,
    openNewTable: actions.openNewTable,
    openEditTable: actions.openEditTable,
    handleSaveDesign: actions.handleSaveDesign,
    openBookmarkDialog: query.openBookmarkDialog,
    handleSaveBookmark: query.handleSaveBookmark,
    toggleTable: layout.toggleTable,
    startResize: layout.startResize,
    handleSort: selection.handleSort,
    handleDragOver: layout.handleDragOver,
    handleDragLeave: layout.handleDragLeave,
    handleDrop: layout.handleDrop,
    handleExportSql: actions.handleExportSql,
    openImport: actions.openImport,
    importRowsAsync: sqlDatabase.importRowsAsync,
    resetPage: selection.resetPage,
    suggestions,
  };
};

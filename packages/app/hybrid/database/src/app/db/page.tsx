'use client';

import { type FC, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiBookmark, FiCopy, FiPlay } from 'react-icons/fi';

import { DataView } from '@/components/molecules/DataView';
import { EmptyState } from '@/components/molecules/EmptyState';
import { ExportModal } from '@/components/molecules/ExportModal';
import { SheetsSidebar } from '@/components/molecules/SheetsSidebar';
import { SheetsToolbar } from '@/components/molecules/SheetsToolbar';
import { useSqlDatabase } from '@/hooks/useSqlDatabase';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { copyToClipboard } from '@/utils/format';

const PAGE_SIZE = 100;

const DBContent: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const {
    connections,
    currentConnection,
    setCurrentConnection,
    addBookmark,
    isLoading,
  } = useData();
  const { addToast } = useToast();
  const {
    dbInstance,
    dbFileName,
    tables,
    activeTable,
    queryResult,
    loading,
    loadingMsg,
    status,
    opfsFiles,
    openDb,
    createNewDb,
    selectTable,
    runQuery,
    handleSave,
    handleLoadOpfs,
    handleExport,
  } = useSqlDatabase();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sql, setSql] = useState('SELECT * FROM customers LIMIT 10');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>(
    {}
  );
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    if (id) {
      const conn = connections.find((c) => c.id === id);
      if (conn) setCurrentConnection(conn);
      else if (!isLoading && connections.length > 0) router.push('/');
    }
  }, [id, connections, setCurrentConnection, isLoading, router]);

  const filteredRows = useMemo(() => {
    let rows = [...queryResult.rows];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((r) =>
        r.some((v) =>
          String(v ?? '')
            .toLowerCase()
            .includes(q)
        )
      );
    }
    if (sortCol !== null) {
      rows.sort((a, b) => {
        const av = a[sortCol],
          bv = b[sortCol];
        if (av === null && bv === null) return 0;
        if (av === null) return 1;
        if (bv === null) return -1;
        if (av instanceof Uint8Array || bv instanceof Uint8Array) return 0;
        return av < bv ? -sortDir : av > bv ? sortDir : 0;
      });
    }
    return rows;
  }, [queryResult.rows, search, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const pageRows = filteredRows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) =>
      openDb(new Uint8Array(ev.target!.result as ArrayBuffer), file.name);
    reader.readAsArrayBuffer(file);
  };

  const handleExecute = () => {
    if (!sql.trim()) return;
    if (!dbInstance) {
      addToast('Open or create a database first', 'info');
      return;
    }
    runQuery(sql.trim());
  };

  const handleCopyResult = async () => {
    if (!queryResult.columns.length) return;
    const text = JSON.stringify(queryResult.rows, null, 2);
    await copyToClipboard(text);
    addToast('Result copied', 'success');
  };

  const toggleTable = (name: string) =>
    setExpandedTables((p) => ({ ...p, [name]: !p[name] }));

  const resetPage = () => setPage(0);

  const handleSort = (colIdx: number) => {
    if (sortCol === colIdx) setSortDir((d) => (d === 1 ? -1 : 1) as 1 | -1);
    else {
      setSortCol(colIdx);
      setSortDir(1);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      {isDragging && (
        <div className="bg-base-100/80 pointer-events-none fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="border-primary rounded-2xl border-2 border-dashed p-16 text-center">
            <p className="text-primary text-xl font-normal tracking-widest uppercase">
              Drop .db file
            </p>
          </div>
        </div>
      )}
      {showExport && queryResult.columns.length > 0 && (
        <ExportModal
          tableName={activeTable ?? 'query_result'}
          columns={queryResult.columns}
          rows={filteredRows}
          onClose={() => setShowExport(false)}
        />
      )}
      <header className="border-base-300 flex flex-shrink-0 items-center gap-2 border-b px-3 py-2">
        <button
          type="button"
          aria-label="Back"
          onClick={() => router.push('/')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold">
          {currentConnection?.name ?? 'Database'}
        </span>
        <div className="bg-base-300 mx-1 h-5 w-px" />
        <SheetsToolbar
          loading={loading}
          dbFileName={dbFileName}
          opfsFiles={opfsFiles}
          dbInstance={!!dbInstance}
          onOpen={() => fileInputRef.current?.click()}
          onNewDb={createNewDb}
          onLoadOpfs={handleLoadOpfs}
          onSave={handleSave}
          onExport={handleExport}
        />
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-ghost btn-sm">
          Schema
        </button>
        <button
          type="button"
          onClick={handleExecute}
          className="btn btn-primary btn-sm">
          <FiPlay className="size-4" /> Execute
        </button>
        <button
          type="button"
          aria-label="Copy result"
          onClick={handleCopyResult}
          className="btn btn-ghost btn-sm">
          <FiCopy className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Bookmark query"
          onClick={() => {
            addBookmark('Bookmark', sql);
            addToast('Bookmarked', 'success');
          }}
          className="btn btn-ghost btn-sm">
          <FiBookmark className="size-4" />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <SheetsSidebar
            tables={tables}
            activeTable={activeTable}
            opfsFiles={opfsFiles}
            expandedTables={expandedTables}
            onToggleTable={toggleTable}
            onSelectTable={selectTable}
            onLoadOpfs={handleLoadOpfs}
          />
        )}

        <main className="bg-base-100 flex flex-1 flex-col overflow-hidden">
          <div className="border-base-300 border-b p-3">
            <textarea
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey))
                  handleExecute();
              }}
              className="textarea textarea-bordered w-full font-mono text-sm"
              rows={4}
              placeholder="Enter SQL query..."
            />
            <p className="text-base-content/40 mt-1 text-xs">
              Ctrl+Enter to execute
            </p>
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {!dbInstance ? (
              <EmptyState
                loading={loading}
                loadingMsg={loadingMsg}
                onOpen={() => fileInputRef.current?.click()}
                onNewDb={createNewDb}
              />
            ) : (
              <DataView
                activeTable={activeTable}
                loading={loading}
                queryResult={queryResult}
                filteredRows={filteredRows}
                search={search}
                sortCol={sortCol}
                sortDir={sortDir}
                page={page}
                totalPages={totalPages}
                pageRows={pageRows}
                onSearch={(v) => {
                  setSearch(v);
                  resetPage();
                }}
                onSort={handleSort}
                onExport={() => setShowExport(true)}
                onPrevPage={() => setPage((p) => Math.max(0, p - 1))}
                onNextPage={() =>
                  setPage((p) => Math.min(totalPages - 1, p + 1))
                }
              />
            )}
          </div>
        </main>
      </div>

      <footer className="bg-base-200 border-base-300 flex flex-shrink-0 items-center gap-3 border-t px-4 py-1.5">
        {dbInstance && (
          <span className="bg-primary inline-block h-2 w-2 flex-shrink-0 animate-pulse rounded-full" />
        )}
        <span className="text-base-content/40 truncate font-mono text-[11px]">
          {status}
        </span>
        <span className="text-base-content/20 ml-auto font-mono text-[11px]">
          SQLite WASM · OPFS
        </span>
      </footer>

      <input
        ref={fileInputRef}
        type="file"
        accept=".db,.sqlite,.sqlite3"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
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

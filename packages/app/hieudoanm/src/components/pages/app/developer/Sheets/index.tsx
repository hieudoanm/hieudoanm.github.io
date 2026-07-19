import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { FC, useMemo, useState } from 'react';

import { DataView } from './components/DataView';
import { EmptyState } from './components/EmptyState';
import { Export } from './components/Export';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { PAGE_SIZE } from './constants';
import { useSqlDatabase } from './hooks/useSqlDatabase';

export const Sheets: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    handleSave,
    handleLoadOpfs,
    handleExport,
  } = useSqlDatabase();

  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showExport, setShowExport] = useState(false);

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

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) =>
      openDb(new Uint8Array(ev.target!.result as ArrayBuffer), file.name);
    reader.readAsArrayBuffer(file);
  };
  Sheets.displayName = 'Sheets';

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      openDb(new Uint8Array(ev.target!.result as ArrayBuffer), file.name);
    reader.readAsArrayBuffer(file);
  };

  const resetPage = () => setPage(0);

  const handleSort = (colIdx: number) => {
    if (sortCol === colIdx) setSortDir((d) => (d === 1 ? -1 : 1) as 1 | -1);
    else {
      setSortCol(colIdx);
      setSortDir(1);
    }
  };

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const pageRows = filteredRows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <FullScreen onClose={onClose} title="Sheets">
      {showExport && activeTable && (
        <Export
          tableName={activeTable}
          columns={queryResult.columns}
          rows={filteredRows}
          onClose={() => setShowExport(false)}
        />
      )}
      {isDragging && (
        <div className="bg-base-100/80 pointer-events-none fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="border-primary rounded-2xl border-2 border-dashed p-16 text-center">
            <p className="text-primary text-xl font-normal tracking-widest uppercase">
              Drop .db file
            </p>
          </div>
        </div>
      )}
      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <Topbar
          loading={loading}
          dbFileName={dbFileName}
          opfsFiles={opfsFiles}
          dbInstance={!!dbInstance}
          onOpen={() => {}}
          onNewDb={createNewDb}
          onLoadOpfs={handleLoadOpfs}
          onSave={handleSave}
          onExport={handleExport}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            tables={tables}
            activeTable={activeTable}
            opfsFiles={opfsFiles}
            onSelectTable={selectTable}
            onLoadOpfs={handleLoadOpfs}
          />

          <main className="bg-base-100 flex flex-1 flex-col overflow-hidden">
            {!dbInstance ? (
              <EmptyState
                loading={loading}
                loadingMsg={loadingMsg}
                onOpen={() => {}}
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
      </div>

      <Dropzone
        accept=".db,.sqlite,.sqlite3"
        onFile={handleFile}
        className="hidden"
      />
    </FullScreen>
  );
};

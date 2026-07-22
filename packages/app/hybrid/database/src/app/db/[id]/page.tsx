'use client';

import { type FC, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { formatSQL, copyToClipboard } from '@/utils/format';
import { useToast } from '@/providers/ToastProvider';
import {
  FiArrowLeft,
  FiPlay,
  FiCopy,
  FiBookmark,
  FiDatabase,
  FiTable,
  FiChevronRight,
  FiChevronDown,
} from 'react-icons/fi';

const DBContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const {
    connections,
    currentConnection,
    setCurrentConnection,
    schemas,
    queryResult,
    runQuery,
    addBookmark,
    history,
    isLoading,
  } = useData();
  const { addToast } = useToast();
  const [sql, setSql] = useState('SELECT * FROM users LIMIT 10');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (id) {
      const conn = connections.find((c) => c.id === id);
      if (conn) setCurrentConnection(conn);
      else if (!isLoading && connections.length > 0) router.push('/');
    }
  }, [id, connections, setCurrentConnection, isLoading, router]);

  const handleExecute = () => {
    if (sql.trim()) runQuery(sql.trim());
  };

  const handleCopyResult = async () => {
    if (!queryResult) return;
    const text = JSON.stringify(queryResult.rows, null, 2);
    await copyToClipboard(text);
    addToast('Result copied', 'success');
  };

  const toggleTable = (name: string) =>
    setExpandedTables((p) => ({ ...p, [name]: !p[name] }));

  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <aside className="bg-base-200 border-base-300 w-64 overflow-y-auto border-r">
          <div className="border-base-300 flex items-center gap-2 border-b p-3">
            <FiDatabase className="size-4" />
            <span className="truncate text-sm font-semibold">
              {currentConnection?.name ?? 'Database'}
            </span>
          </div>
          <div className="p-2">
            {schemas.map((table) => (
              <div key={table.name} className="mb-1">
                <button
                  type="button"
                  onClick={() => toggleTable(table.name)}
                  className="hover:bg-base-300 flex w-full items-center gap-2 rounded px-2 py-1 text-sm">
                  {expandedTables[table.name] ? (
                    <FiChevronDown className="size-3" />
                  ) : (
                    <FiChevronRight className="size-3" />
                  )}
                  <FiTable className="size-3" />
                  <span>{table.name}</span>
                  <span className="badge badge-xs ml-auto">
                    {table.rowCount}
                  </span>
                </button>
                {expandedTables[table.name] && (
                  <div className="ml-6 space-y-0.5">
                    {table.columns.map((col) => (
                      <div
                        key={col.name}
                        className="flex items-center gap-2 text-xs opacity-70">
                        {col.primaryKey && (
                          <span className="text-warning">PK</span>
                        )}
                        <span>{col.name}</span>
                        <span className="opacity-50">{col.type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      )}
      <main className="flex flex-1 flex-col">
        <div className="border-base-300 flex items-center gap-2 border-b px-4 py-2">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="btn btn-neutral btn-sm btn-circle">
            <FiArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-ghost btn-sm">
            Schema
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={handleExecute}
            className="btn btn-primary btn-sm">
            <FiPlay className="size-4" /> Execute
          </button>
          <button
            type="button"
            onClick={handleCopyResult}
            className="btn btn-ghost btn-sm">
            <FiCopy className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              addBookmark('Bookmark', sql);
              addToast('Bookmarked', 'success');
            }}
            className="btn btn-ghost btn-sm">
            <FiBookmark className="size-4" />
          </button>
        </div>
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
        <div className="flex-1 overflow-auto p-3">
          {queryResult ? (
            <div>
              <p className="text-base-content/50 mb-2 text-xs">
                {queryResult.rowCount} rows ({queryResult.executionTime}ms)
              </p>
              <div className="overflow-x-auto">
                <table className="table-zebra table-sm table">
                  <thead>
                    <tr>
                      {queryResult.columns.map((c) => (
                        <th key={c}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResult.rows.map((row, i) => (
                      <tr key={i}>
                        {queryResult.columns.map((c) => (
                          <td key={c} className="font-mono text-xs">
                            {row[c] === null ? (
                              <span className="italic opacity-40">NULL</span>
                            ) : (
                              String(row[c])
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center opacity-30">
              Execute a query to see results
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const DBPage: FC = () => (
  <Providers>
    <DBContent />
  </Providers>
);
export default DBPage;

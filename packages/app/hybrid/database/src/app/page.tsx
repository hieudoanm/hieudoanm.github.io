'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { formatRelativeTime, formatFileSize } from '@/utils/format';
import { FiPlus, FiDatabase, FiTrash2, FiSearch } from 'react-icons/fi';

const HomeContent: FC = () => {
  const {
    connections,
    createConnection,
    deleteConnection,
    setCurrentConnection,
    isLoading,
  } = useData();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [readOnly, setReadOnly] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = connections.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!name.trim() || !filePath.trim()) return;
    await createConnection(name.trim(), filePath.trim(), readOnly);
    setName('');
    setFilePath('');
    setReadOnly(false);
    setShowModal(false);
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-bold">Database Manager</h1>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="btn btn-primary btn-sm">
          <FiPlus className="size-4" /> New Connection
        </button>
      </header>
      <main className="mx-auto max-w-4xl p-6">
        <div className="mb-6 flex items-center gap-2">
          <FiSearch className="size-4 opacity-50" />
          <input
            type="text"
            placeholder="Search connections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-sm flex-1"
          />
        </div>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-24 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((conn) => (
              <Link
                key={conn.id}
                href={`/db/${conn.id}`}
                onClick={() => setCurrentConnection(conn)}
                className="card bg-base-200 card-body hover:bg-base-300 flex-row items-center gap-4 transition-colors">
                <FiDatabase className="text-primary size-8" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{conn.name}</h3>
                  <p className="text-base-content/50 text-sm">
                    {conn.filePath}
                  </p>
                  <div className="mt-1 flex gap-3 text-xs opacity-60">
                    <span>{formatFileSize(conn.size)}</span>
                    <span>{formatRelativeTime(conn.lastConnected)}</span>
                    {conn.readOnly && (
                      <span className="badge badge-warning badge-xs">
                        Read Only
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteConnection(conn.id);
                  }}
                  className="btn btn-ghost btn-sm btn-circle">
                  <FiTrash2 className="size-4" />
                </button>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="text-base-content/50 py-8 text-center">
                No connections found
              </p>
            )}
          </div>
        )}
      </main>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 card w-full max-w-md shadow-xl">
            <div className="card-body">
              <h2 className="card-title">New Connection</h2>
              <input
                type="text"
                placeholder="Connection name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="File path (e.g., /data/mydb.db)"
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                className="input input-bordered w-full"
              />
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={readOnly}
                  onChange={(e) => setReadOnly(e.target.checked)}
                />
                <span className="label-text">Read Only</span>
              </label>
              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  className="btn btn-primary">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage: FC = () => (
  <Providers>
    <HomeContent />
  </Providers>
);
export default HomePage;

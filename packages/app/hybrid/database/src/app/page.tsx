'use client';

import { type FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { formatRelativeTime, formatFileSize } from '@/utils/format';
import { ConnectionModal } from '@/components/molecules/ConnectionModal';
import { listExamples, type ExampleDatabase } from '@/lib/examples';
import type { DatabaseConnection } from '@/types';
import {
  FiPlus,
  FiDatabase,
  FiTrash2,
  FiEdit2,
  FiSearch,
  FiBookOpen,
} from 'react-icons/fi';

const HomeContent: FC = () => {
  const {
    connections,
    createConnection,
    updateConnection,
    deleteConnection,
    setCurrentConnection,
    isLoading,
  } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<DatabaseConnection | null>(null);
  const [search, setSearch] = useState('');
  const [examples, setExamples] = useState<ExampleDatabase[]>([]);

  useEffect(() => {
    listExamples().then(setExamples);
  }, []);

  const filtered = connections.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 border-b px-6 py-4">
        <h1 className="text-xl font-bold">Database Manager</h1>
        <div className="flex items-center gap-3">
          <Link href="/posts" className="btn btn-ghost btn-sm gap-2">
            <FiBookOpen className="size-4" /> Schema Library
          </Link>
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
            className="btn btn-primary btn-sm">
            <FiPlus className="size-4" /> New Connection
          </button>
        </div>
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
                href={`/db?id=${conn.id}`}
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
                  aria-label="Edit connection"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditing(conn);
                    setShowModal(true);
                  }}
                  className="btn btn-ghost btn-sm btn-circle">
                  <FiEdit2 className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Delete connection"
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
        {examples.length > 0 && (
          <section className="my-8">
            <h2 className="mb-1 text-sm font-semibold tracking-wider uppercase">
              Example databases
            </h2>
            <p className="text-base-content/50 mb-3 text-sm">
              Sample schemas from the Schema Library — click one to open it
              instantly.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {examples.map((example) => (
                <Link
                  key={example.slug}
                  href={`/db?example=${example.slug}`}
                  className="card bg-base-200 card-body hover:bg-base-300 transition-colors">
                  <FiBookOpen className="text-primary size-6" />
                  <h3 className="font-semibold">{example.title}</h3>
                  <p className="text-base-content/50 line-clamp-2 text-sm">
                    {example.description}
                  </p>
                  <div className="mt-1 flex gap-3 text-xs opacity-60">
                    <span>{example.tableCount} tables</span>
                    <span>{formatFileSize(example.size)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      {showModal && (
        <ConnectionModal
          editing={editing}
          onClose={() => setShowModal(false)}
          onCreate={createConnection}
          onUpdate={updateConnection}
        />
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

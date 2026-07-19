'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import {
  formatRelativeTime,
  maskPassword,
  copyToClipboard,
} from '@/utils/format';
import { useToast } from '@/providers/ToastProvider';
import {
  FiPlus,
  FiSearch,
  FiStar,
  FiCopy,
  FiGlobe,
  FiCreditCard,
  FiFileText,
  FiKey,
  FiUser,
} from 'react-icons/fi';
import type { VaultItemType } from '@/types';

const typeIcons: Record<VaultItemType, typeof FiGlobe> = {
  login: FiGlobe,
  card: FiCreditCard,
  identity: FiUser,
  note: FiFileText,
  ssh: FiKey,
};
const typeColors: Record<VaultItemType, string> = {
  login: 'text-primary',
  card: 'text-secondary',
  identity: 'text-accent',
  note: 'text-info',
  ssh: 'text-warning',
};

const HomeContent: FC = () => {
  const { items, isLoading, toggleFavorite, deleteItem } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<VaultItemType | 'all'>('all');
  const [showAdd, setShowAdd] = useState(false);
  const [newType, setNewType] = useState<VaultItemType>('login');
  const [newTitle, setNewTitle] = useState('');
  const { createItem } = useData();

  const filtered = items.filter((i) => {
    const matchSearch =
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      (i.username ?? '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || i.type === filter;
    return matchSearch && matchFilter;
  });

  const handleCopy = async (text: string, label: string) => {
    await copyToClipboard(text);
    addToast(`${label} copied`, 'success');
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await createItem({
      type: newType,
      title: newTitle.trim(),
      username: '',
      password: '',
      url: '',
      notes: '',
      favorite: false,
      tags: [],
    });
    setNewTitle('');
    setShowAdd(false);
    addToast('Item created', 'success');
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-bold">Password Vault</h1>
        <div className="flex gap-2">
          <Link href="/generator" className="btn btn-ghost btn-sm">
            Generator
          </Link>
          <Link href="/health" className="btn btn-ghost btn-sm">
            Health
          </Link>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="btn btn-primary btn-sm">
            <FiPlus className="size-4" /> New
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-6">
        <div className="mb-4 flex items-center gap-2">
          <FiSearch className="size-4 opacity-50" />
          <input
            type="text"
            placeholder="Search vault..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-sm flex-1"
          />
        </div>
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {(['all', 'login', 'card', 'identity', 'note', 'ssh'] as const).map(
            (t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`btn btn-xs ${filter === t ? 'btn-primary' : 'btn-ghost'}`}>
                {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            )
          )}
        </div>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-20 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((item) => {
              const Icon = typeIcons[item.type];
              return (
                <Link
                  key={item.id}
                  href={`/item/${item.id}`}
                  className="card bg-base-200 card-body hover:bg-base-300 flex-row items-center gap-3 p-3 transition-colors">
                  <Icon className={`size-6 ${typeColors[item.type]}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      {item.favorite && (
                        <FiStar className="text-warning fill-warning size-3" />
                      )}
                    </div>
                    <p className="text-base-content/50 text-xs">
                      {item.username || item.type}
                    </p>
                    <div className="mt-1 flex gap-2 text-xs opacity-50">
                      {item.tags.map((t) => (
                        <span key={t} className="badge badge-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {item.password && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(item.password!, 'Password');
                        }}
                        className="btn btn-ghost btn-xs btn-circle">
                        <FiCopy className="size-3" />
                      </button>
                    )}
                    {item.username && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(item.username!, 'Username');
                        }}
                        className="btn btn-ghost btn-xs btn-circle">
                        <FiUser className="size-3" />
                      </button>
                    )}
                  </div>
                  <span className="text-base-content/30 text-xs">
                    {formatRelativeTime(item.updatedAt)}
                  </span>
                </Link>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-base-content/50 py-8 text-center">
                No items found
              </p>
            )}
          </div>
        )}
      </main>
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 card w-full max-w-md shadow-xl">
            <div className="card-body">
              <h2 className="card-title">New Item</h2>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as VaultItemType)}
                className="select select-bordered w-full">
                <option value="login">Login</option>
                <option value="card">Card</option>
                <option value="identity">Identity</option>
                <option value="note">Secure Note</option>
                <option value="ssh">SSH Key</option>
              </select>
              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="input input-bordered w-full"
              />
              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
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

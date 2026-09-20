'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import {
  FiShoppingCart,
  FiCoffee,
  FiGrid,
  FiList,
  FiStar,
  FiSearch,
  FiMessageSquare,
  FiCreditCard,
} from 'react-icons/fi';

interface App {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  status: 'ready' | 'coming-soon' | 'in-progress';
  category: string;
}

const apps: App[] = [
  {
    id: 'pos',
    name: 'POS',
    description:
      'Minimal Point of Sale client with inventory, shifts, and reporting',
    icon: <FiShoppingCart className="size-8" />,
    href: '/pos',
    status: 'ready',
    category: 'Business',
  },
  {
    id: 'menu',
    name: 'Menu',
    description: 'Digital menu board for restaurants and cafes',
    icon: <FiCoffee className="size-8" />,
    href: '/menu',
    status: 'coming-soon',
    category: 'Business',
  },
  {
    id: 'wallet',
    name: 'Wallet',
    description:
      'Personal banking with accounts, cards, payments, budgets, and reports',
    icon: <FiCreditCard className="size-8" />,
    href: '/wallet',
    status: 'ready',
    category: 'Finance',
  },
  {
    id: 'chat',
    name: 'Chat',
    description:
      'Real-time messaging with groups, calls, and end-to-end encryption',
    icon: <FiMessageSquare className="size-8" />,
    href: '/chat',
    status: 'ready',
    category: 'Social Networking',
  },
];

type ViewMode = 'grid' | 'list';

const HomeContent: FC = () => {
  const [view, setView] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const categories = ['all', ...new Set(apps.map((a) => a.category))];

  const filtered = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || app.category === category;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: App['status']) => {
    switch (status) {
      case 'ready':
        return <span className="badge badge-success badge-sm">Ready</span>;
      case 'coming-soon':
        return (
          <span className="badge badge-warning badge-sm">Coming Soon</span>
        );
      case 'in-progress':
        return <span className="badge badge-info badge-sm">In Progress</span>;
    }
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Exibit</h1>
            <p className="text-sm opacity-60">
              UI Exhibition — Showcase of Applications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label={view === 'grid' ? 'List view' : 'Grid view'}>
              {view === 'grid' ? (
                <FiList className="size-4" />
              ) : (
                <FiGrid className="size-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <FiSearch className="size-4 opacity-50" />
          <input
            type="text"
            placeholder="Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-sm min-w-[200px] flex-1"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-sm min-w-[140px]">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {view === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((app) => (
              <article
                key={app.id}
                className="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors">
                <div className="card-body p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="bg-primary/10 text-primary rounded-lg p-3">
                      {app.icon}
                    </div>
                    {getStatusBadge(app.status)}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{app.name}</h3>
                  <p className="mb-4 line-clamp-2 text-sm opacity-70">
                    {app.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="badge badge-ghost badge-sm">
                      {app.category}
                    </span>
                    <Link
                      href={app.href}
                      className="btn btn-primary btn-sm"
                      target={
                        app.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        app.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }>
                      {app.status === 'ready'
                        ? 'Open'
                        : app.status === 'coming-soon'
                          ? 'Notify Me'
                          : 'View Progress'}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <FiStar className="mx-auto size-12 opacity-30" />
                <p className="text-base-content/50 mt-4">No apps found</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((app) => (
              <article
                key={app.id}
                className="card bg-base-200 hover:bg-base-300 transition-colors">
                <div className="card-body flex items-center gap-4 p-4">
                  <div className="bg-primary/10 text-primary rounded-lg p-3">
                    {app.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{app.name}</h3>
                      {getStatusBadge(app.status)}
                    </div>
                    <p className="truncate text-sm opacity-70">
                      {app.description}
                    </p>
                    <span className="badge badge-ghost badge-sm">
                      {app.category}
                    </span>
                  </div>
                  <Link
                    href={app.href}
                    className="btn btn-primary btn-sm"
                    target={app.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      app.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }>
                    {app.status === 'ready'
                      ? 'Open'
                      : app.status === 'coming-soon'
                        ? 'Notify Me'
                        : 'View Progress'}
                  </Link>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <FiStar className="mx-auto size-12 opacity-30" />
                <p className="text-base-content/50 mt-4">No apps found</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-base-300 border-t px-6 py-4">
        <p className="mx-auto max-w-6xl text-center text-sm opacity-50">
          Built with Next.js, React, TypeScript, and DaisyUI
        </p>
      </footer>
    </div>
  );
};

const HomePage: FC = () => <HomeContent />;

export default HomePage;

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { formatDate } from '@/lib/utils';
import type { TournamentStatus } from '@/types';

const statusFilters: { label: string; value: TournamentStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

const statusBadgeClass: Record<TournamentStatus, string> = {
  draft: 'badge-neutral',
  upcoming: 'badge-info',
  'in-progress': 'badge-warning',
  completed: 'badge-success',
  cancelled: 'badge-error',
};

const formatLabel: Record<string, string> = {
  'single-elimination': 'Single Elim.',
  'double-elimination': 'Double Elim.',
  'round-robin': 'Round Robin',
  swiss: 'Swiss',
  'group-stage': 'Group Stage',
  league: 'League',
};

const DashboardPage = () => {
  const { tournaments, participants, loading } = useData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<TournamentStatus | 'all'>('all');

  const filtered = tournaments.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getParticipantCount = (tournamentId: string) =>
    participants.filter((p) => p.tournamentId === tournamentId).length;

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1>Tourney</h1>
          <Link href="/create" className="btn btn-primary btn-sm">
            Create
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col p-6">
        <input
          type="text"
          placeholder="Search tournaments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered mb-4 w-full"
        />

        <div className="mb-6 flex gap-2 overflow-x-auto">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`btn btn-sm rounded-full ${
                filter === f.value ? 'btn-primary' : 'btn-ghost'
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <p className="mb-4 text-6xl">🏆</p>
              <h2 className="text-base-content/50 mb-2">No tournaments yet</h2>
              <p className="text-base-content/30 mb-6 text-sm">
                Create your first tournament to get started
              </p>
              <Link href="/create" className="btn btn-primary btn-sm">
                Create Tournament
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((t) => (
              <Link
                key={t.id}
                href={`/tournament?id=${t.id}`}
                className="border-base-content/10 bg-base-200 hover:bg-base-300 rounded-2xl border p-4 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base-content text-base font-medium">
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-sm badge-outline">
                        {formatLabel[t.format] ?? t.format}
                      </span>
                      <span
                        className={`badge badge-sm ${statusBadgeClass[t.status]}`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-base-content/50 flex flex-col items-end gap-1 text-xs">
                    <span>
                      {getParticipantCount(t.id)}/{t.maxParticipants}
                    </span>
                    <span>{formatDate(t.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <nav className="border-base-300 bg-base-100 fixed bottom-0 flex w-full justify-around border-t py-3">
        <Link href="/" className="btn btn-ghost btn-sm">
          Dashboard
        </Link>
        <Link href="/create" className="btn btn-ghost btn-sm">
          Create
        </Link>
        <Link href="/profile" className="btn btn-ghost btn-sm">
          Profile
        </Link>
      </nav>
    </div>
  );
};

export default DashboardPage;

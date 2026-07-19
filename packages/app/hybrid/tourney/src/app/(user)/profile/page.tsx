'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';
import { formatDate } from '@/lib/utils';

const ProfilePage = () => {
  const { tournaments, matches, participants } = useData();

  const totalTournaments = tournaments.length;

  const totalMatches = matches.length;

  const completedMatches = useMemo(
    () => matches.filter((m) => m.status === 'completed'),
    [matches]
  );

  const allParticipantIds = useMemo(
    () => new Set(participants.map((p) => p.id)),
    [participants]
  );

  const winRate = useMemo(() => {
    if (completedMatches.length === 0) return null;
    const wins = completedMatches.filter(
      (m) => m.winnerId && allParticipantIds.has(m.winnerId)
    ).length;
    return Math.round((wins / completedMatches.length) * 100);
  }, [completedMatches, allParticipantIds]);

  const recentActivity = useMemo(() => {
    const activities: { label: string; date: number; type: string }[] = [];

    for (const t of tournaments) {
      activities.push({
        label: `Created "${t.name}"`,
        date: t.createdAt,
        type: 'tournament',
      });
      if (t.status === 'in-progress') {
        activities.push({
          label: `"${t.name}" is in progress`,
          date: t.updatedAt,
          type: 'tournament',
        });
      }
      if (t.status === 'completed') {
        activities.push({
          label: `"${t.name}" completed`,
          date: t.updatedAt,
          type: 'tournament',
        });
      }
    }

    for (const m of completedMatches) {
      const p1 = participants.find((p) => p.id === m.participant1Id);
      const p2 = participants.find((p) => p.id === m.participant2Id);
      const winner = participants.find((p) => p.id === m.winnerId);
      if (p1 && p2 && winner) {
        activities.push({
          label: `${winner.name} won vs ${winner.id === m.participant1Id ? p2.name : p1.name}`,
          date: m.round,
          type: 'match',
        });
      }
    }

    return activities.sort((a, b) => b.date - a.date).slice(0, 10);
  }, [tournaments, completedMatches, participants]);

  return (
    <div className="flex min-h-dvh flex-col items-center px-6 pt-24 pb-20">
      <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
        Profile
      </p>

      <h1 className="mb-3">Profile</h1>

      <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
        Your tournament stats and activity
      </p>

      <div className="border-base-content/10 bg-base-200 mb-8 w-full max-w-lg rounded-2xl border p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-base-content/50 text-sm">
              Tournaments Created
            </span>
            <span className="font-mono text-sm font-bold">
              {totalTournaments}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base-content/50 text-sm">
              Matches Tracked
            </span>
            <span className="font-mono text-sm font-bold">{totalMatches}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base-content/50 text-sm">Win Rate</span>
            <span className="font-mono text-sm font-bold">
              {winRate !== null ? `${winRate}%` : '-'}
            </span>
          </div>
        </div>
      </div>

      <div className="border-base-content/10 bg-base-200 mb-8 w-full max-w-lg rounded-2xl border p-6">
        <h2 className="text-base-content/50 mb-4 text-xs tracking-[0.2em] uppercase">
          Recent Activity
        </h2>
        {recentActivity.length > 0 ? (
          <div className="flex flex-col gap-3">
            {recentActivity.map((a, i) => (
              <div
                key={`${a.type}-${i}`}
                className="flex items-center justify-between">
                <span className="text-sm">{a.label}</span>
                <span className="text-base-content/50 text-xs">
                  {formatDate(a.date)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base-content/50 text-center text-sm">
            No activity yet
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/settings" className="btn btn-ghost btn-sm">
          Settings
        </Link>
        <Link href="/version" className="btn btn-ghost btn-sm">
          Version
        </Link>
      </div>

      <Navbar items={NAV_ITEMS} />
    </div>
  );
};

export default ProfilePage;

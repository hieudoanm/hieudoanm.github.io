'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';
import { Header } from '@/components/organisms/Header';
import type { MatchStatus } from '@/types';

const statusBadgeClass: Record<MatchStatus, string> = {
  scheduled: 'badge-neutral',
  'in-progress': 'badge-warning',
  completed: 'badge-success',
  postponed: 'badge-info',
  walkover: 'badge-error',
};

const MatchDetailPageContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { participants, matches, updateMatch } = useData();

  const match = useMemo(() => matches.find((m) => m.id === id), [matches, id]);

  const participant1 = useMemo(
    () =>
      match?.participant1Id
        ? participants.find((p) => p.id === match.participant1Id)
        : undefined,
    [participants, match]
  );

  const participant2 = useMemo(
    () =>
      match?.participant2Id
        ? participants.find((p) => p.id === match.participant2Id)
        : undefined,
    [participants, match]
  );

  const [score1, setScore1] = useState<string>('');
  const [score2, setScore2] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const handleSaveScore = async () => {
    if (!match) return;
    setSaving(true);
    await updateMatch({
      ...match,
      participant1Score: score1 === '' ? null : Number(score1),
      participant2Score: score2 === '' ? null : Number(score2),
      status: 'completed',
    });
    setSaving(false);
  };

  const handleSetWinner = async (winnerId: string) => {
    if (!match) return;
    await updateMatch({
      ...match,
      winnerId,
      status: 'completed',
    });
  };

  if (!id || !match) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6">
        <p className="mb-4 text-6xl">⚠️</p>
        <h2 className="text-base-content/50 mb-2">Match not found</h2>
        <Link href="/" className="btn btn-primary btn-sm mt-4">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col pb-20">
      <Header
        title="Match Detail"
        badges={
          <span className={`badge badge-sm ${statusBadgeClass[match.status]}`}>
            {match.status}
          </span>
        }
        action={
          <Link
            href={`/matches?tournamentId=${match.tournamentId}`}
            className="btn btn-ghost btn-sm">
            Back
          </Link>
        }
      />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 p-6">
        <div className="border-base-content/10 bg-base-200 rounded-2xl border p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 flex-col items-center gap-2">
              <span
                className={`text-lg font-bold ${
                  match.winnerId === match.participant1Id ? 'text-primary' : ''
                }`}>
                {participant1?.name ?? 'TBD'}
              </span>
              {match.winnerId === match.participant1Id && (
                <span className="badge badge-primary badge-sm">Winner</span>
              )}
            </div>

            <span className="text-base-content/50 font-mono text-2xl">vs</span>

            <div className="flex flex-1 flex-col items-center gap-2">
              <span
                className={`text-lg font-bold ${
                  match.winnerId === match.participant2Id ? 'text-primary' : ''
                }`}>
                {participant2?.name ?? 'TBD'}
              </span>
              {match.winnerId === match.participant2Id && (
                <span className="badge badge-primary badge-sm">Winner</span>
              )}
            </div>
          </div>
        </div>

        <div className="border-base-content/10 bg-base-200 rounded-2xl border p-4">
          <h3 className="mb-3 text-sm font-medium">Score</h3>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              placeholder="0"
              className="input input-bordered input-sm w-20 text-center"
              min={0}
            />
            <span className="text-base-content/50 font-mono">:</span>
            <input
              type="number"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
              placeholder="0"
              className="input input-bordered input-sm w-20 text-center"
              min={0}
            />
            <button
              onClick={handleSaveScore}
              className="btn btn-primary btn-sm"
              disabled={saving}>
              {saving ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>

        {match.participant1Id && match.participant2Id && (
          <div className="border-base-content/10 bg-base-200 rounded-2xl border p-4">
            <h3 className="mb-3 text-sm font-medium">Set Winner</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleSetWinner(match.participant1Id!)}
                className={`btn btn-sm flex-1 ${
                  match.winnerId === match.participant1Id
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}>
                {participant1?.name ?? 'Player 1'}
              </button>
              <button
                onClick={() => handleSetWinner(match.participant2Id!)}
                className={`btn btn-sm flex-1 ${
                  match.winnerId === match.participant2Id
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}>
                {participant2?.name ?? 'Player 2'}
              </button>
            </div>
          </div>
        )}

        <Link
          href={`/matches?tournamentId=${match.tournamentId}`}
          className="btn btn-ghost btn-sm w-full">
          Back to Matches
        </Link>
      </main>

      <Navbar items={NAV_ITEMS} />
    </div>
  );
};

const MatchDetailPage = () => (
  <Suspense>
    <MatchDetailPageContent />
  </Suspense>
);

export default MatchDetailPage;

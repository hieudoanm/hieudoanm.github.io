'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { createMatch } from '@/data/models';
import type { MatchStatus } from '@/types';

const statusBadgeClass: Record<MatchStatus, string> = {
  scheduled: 'badge-neutral',
  'in-progress': 'badge-warning',
  completed: 'badge-success',
  postponed: 'badge-info',
  walkover: 'badge-error',
};

const MatchesPageContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const {
    tournaments,
    participants,
    matches,
    createMatch: addMatch,
  } = useData();

  const tournament = useMemo(
    () => tournaments.find((t) => t.id === id),
    [tournaments, id]
  );

  const tournamentParticipants = useMemo(
    () => participants.filter((p) => p.tournamentId === id),
    [participants, id]
  );

  const tournamentMatches = useMemo(
    () => matches.filter((m) => m.tournamentId === id),
    [matches, id]
  );

  const getParticipantName = (participantId: string | null): string => {
    if (!participantId) return 'TBD';
    return (
      tournamentParticipants.find((p) => p.id === participantId)?.name ?? 'TBD'
    );
  };

  if (!id || !tournament) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="mb-4 text-6xl">⚠️</p>
        <h2 className="text-base-content/50 mb-2">Tournament not found</h2>
        <Link href="/" className="btn btn-primary btn-sm mt-4">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  const rounds = Array.from(
    new Set(tournamentMatches.map((m) => m.round))
  ).sort((a, b) => a - b);

  const handleAddMatch = async () => {
    const round = rounds.length > 0 ? Math.max(...rounds) + 1 : 1;
    await addMatch({
      tournamentId: id,
      round,
      participant1Id: null,
      participant2Id: null,
      participant1Score: null,
      participant2Score: null,
      winnerId: null,
      status: 'scheduled',
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg">{tournament.name}</h1>
            <p className="text-base-content/50 text-sm">
              Matches ({tournamentMatches.length})
            </p>
          </div>
          <Link href={`/tournament?id=${id}`} className="btn btn-ghost btn-sm">
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col p-6">
        <button
          onClick={handleAddMatch}
          className="btn btn-primary btn-sm mb-4 w-fit">
          Add Match
        </button>

        <div className="flex flex-col gap-6">
          {rounds.map((round) => (
            <div key={round}>
              <h3 className="mb-2 text-sm font-medium">Round {round}</h3>
              <div className="flex flex-col gap-2">
                {tournamentMatches
                  .filter((m) => m.round === round)
                  .map((m) => (
                    <Link
                      key={m.id}
                      href={`/match?id=${m.id}`}
                      className="border-base-content/10 bg-base-200 hover:bg-base-300 rounded-xl border p-3 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <span className="min-w-[80px] text-right text-sm font-medium">
                          {getParticipantName(m.participant1Id)}
                        </span>
                        <span className="text-base-content/50 font-mono text-sm">
                          {m.participant1Score ?? '-'} :{' '}
                          {m.participant2Score ?? '-'}
                        </span>
                        <span className="min-w-[80px] text-left text-sm font-medium">
                          {getParticipantName(m.participant2Id)}
                        </span>
                        <span
                          className={`badge badge-sm ${statusBadgeClass[m.status]}`}>
                          {m.status}
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {tournamentMatches.length === 0 && (
          <div className="text-base-content/50 py-8 text-center text-sm">
            No matches yet. Start the tournament or add matches manually.
          </div>
        )}
      </main>
    </div>
  );
};

const MatchesPage = () => (
  <Suspense>
    <MatchesPageContent />
  </Suspense>
);

export default MatchesPage;

'use client';

import type { FC } from 'react';
import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';
import { Header } from '@/components/organisms/Header';
import { MatchListItem } from './MatchListItem';

const MatchesPageContent: FC = () => {
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
      <div className="flex min-h-dvh flex-col items-center justify-center px-6">
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
    <div className="flex min-h-dvh flex-col pb-20">
      <Header
        title={tournament.name}
        subtitle={`Matches (${tournamentMatches.length})`}
        action={
          <Link href={`/tournament?id=${id}`} className="btn btn-ghost btn-sm">
            Back
          </Link>
        }
      />

      <main className="container mx-auto flex flex-1 flex-col p-6">
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
                    <MatchListItem
                      key={m.id}
                      id={m.id}
                      participant1Name={getParticipantName(m.participant1Id)}
                      participant2Name={getParticipantName(m.participant2Id)}
                      participant1Score={m.participant1Score}
                      participant2Score={m.participant2Score}
                      status={m.status}
                    />
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

      <Navbar items={NAV_ITEMS} />
    </div>
  );
};

export const MatchesPage: FC = () => (
  <Suspense>
    <MatchesPageContent />
  </Suspense>
);

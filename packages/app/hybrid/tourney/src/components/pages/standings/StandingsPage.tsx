'use client';

import type { FC } from 'react';
import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';
import { Header } from '@/components/organisms/Header';
import { calculateStandings } from '@/data/models';
import { StandingsTable } from './StandingsTable';

const StandingsPageContent: FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { tournaments, participants, matches } = useData();

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

  const standings = useMemo(
    () =>
      calculateStandings(
        tournamentMatches,
        tournamentParticipants.map((p) => p.id)
      ),
    [tournamentMatches, tournamentParticipants]
  );

  const getParticipantName = (participantId: string): string =>
    tournamentParticipants.find((p) => p.id === participantId)?.name ??
    'Unknown';

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

  return (
    <div className="flex min-h-dvh flex-col pb-20">
      <Header
        title={tournament.name}
        subtitle="Standings"
        action={
          <Link href={`/tournament?id=${id}`} className="btn btn-ghost btn-sm">
            Back
          </Link>
        }
      />

      <main className="container mx-auto flex flex-1 flex-col p-6">
        <StandingsTable
          standings={standings}
          getParticipantName={getParticipantName}
        />

        {standings.length === 0 && (
          <div className="text-base-content/50 py-8 text-center text-sm">
            No standings available yet. Complete some matches first.
          </div>
        )}
      </main>

      <Navbar items={NAV_ITEMS} />
    </div>
  );
};

export const StandingsPage: FC = () => (
  <Suspense>
    <StandingsPageContent />
  </Suspense>
);

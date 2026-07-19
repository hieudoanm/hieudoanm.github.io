'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';
import { Header } from '@/components/organisms/Header';
import { calculateStandings } from '@/data/models';

const StandingsPageContent = () => {
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

  const positionIcon = (pos: number): string => {
    if (pos === 1) return '🥇';
    if (pos === 2) return '🥈';
    if (pos === 3) return '🥉';
    return `#${pos}`;
  };

  const positionColor = (pos: number): string => {
    if (pos === 1) return 'bg-yellow-500/10 border-yellow-500/30';
    if (pos === 2) return 'bg-gray-400/10 border-gray-400/30';
    if (pos === 3) return 'bg-orange-500/10 border-orange-500/30';
    return '';
  };

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

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col p-6">
        <div className="border-base-content/10 bg-base-200 overflow-x-auto rounded-2xl border">
          <table>
            <thead>
              <tr>
                <th className="w-16 text-center">#</th>
                <th>Participant</th>
                <th className="w-12 text-center">P</th>
                <th className="w-12 text-center">W</th>
                <th className="w-12 text-center">D</th>
                <th className="w-12 text-center">L</th>
                <th className="w-16 text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s) => (
                <tr key={s.participantId} className={positionColor(s.position)}>
                  <td className="text-center">{positionIcon(s.position)}</td>
                  <td className="font-medium">
                    {getParticipantName(s.participantId)}
                  </td>
                  <td className="text-center font-mono text-sm">{s.played}</td>
                  <td className="text-center font-mono text-sm">{s.won}</td>
                  <td className="text-center font-mono text-sm">{s.drawn}</td>
                  <td className="text-center font-mono text-sm">{s.lost}</td>
                  <td className="text-center font-mono text-sm font-bold">
                    {s.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

const StandingsPage = () => (
  <Suspense>
    <StandingsPageContent />
  </Suspense>
);

export default StandingsPage;

'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';
import { Header } from '@/components/organisms/Header';

const BracketPageContent = () => {
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

  const getParticipantName = (participantId: string | null): string => {
    if (!participantId) return 'BYE';
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

  const isElimination =
    tournament.format === 'single-elimination' ||
    tournament.format === 'double-elimination';

  const rounds = Array.from(
    new Set(tournamentMatches.map((m) => m.round))
  ).sort((a, b) => a - b);

  return (
    <div className="flex min-h-dvh flex-col pb-20">
      <Header
        title={tournament.name}
        subtitle="Bracket"
        action={
          <Link href={`/tournament?id=${id}`} className="btn btn-ghost btn-sm">
            Back
          </Link>
        }
      />

      <main className="flex-1 overflow-x-auto p-6">
        {isElimination ? (
          <div className="flex gap-6">
            {rounds.map((round) => {
              const roundMatches = tournamentMatches.filter(
                (m) => m.round === round
              );
              const roundLabel =
                round === rounds[rounds.length - 1] && rounds.length > 1
                  ? 'Final'
                  : round === rounds[rounds.length - 2] && rounds.length > 2
                    ? 'Semi-Final'
                    : `Round ${round}`;

              return (
                <div key={round} className="min-w-[220px] flex-shrink-0">
                  <h3 className="mb-3 text-center text-sm font-medium">
                    {roundLabel}
                  </h3>
                  <div
                    className="flex flex-col gap-4"
                    style={{
                      justifyContent: 'space-around',
                      minHeight: `${roundMatches.length * 100}px`,
                    }}>
                    {roundMatches.map((m) => (
                      <div
                        key={m.id}
                        className="border-base-content/10 bg-base-200 overflow-hidden rounded-xl border">
                        <div
                          className={`flex items-center justify-between px-3 py-2 ${
                            m.winnerId === m.participant1Id
                              ? 'bg-primary/10'
                              : ''
                          }`}>
                          <span
                            className={`text-sm ${
                              m.winnerId === m.participant1Id
                                ? 'text-primary font-bold'
                                : ''
                            }`}>
                            {getParticipantName(m.participant1Id)}
                          </span>
                          <span className="font-mono text-sm">
                            {m.participant1Score ?? '-'}
                          </span>
                        </div>
                        <div className="border-base-content/10 border-t" />
                        <div
                          className={`flex items-center justify-between px-3 py-2 ${
                            m.winnerId === m.participant2Id
                              ? 'bg-primary/10'
                              : ''
                          }`}>
                          <span
                            className={`text-sm ${
                              m.winnerId === m.participant2Id
                                ? 'text-primary font-bold'
                                : ''
                            }`}>
                            {getParticipantName(m.participant2Id)}
                          </span>
                          <span className="font-mono text-sm">
                            {m.participant2Score ?? '-'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {rounds.map((round) => (
              <div key={round}>
                <h3 className="mb-2 text-sm font-medium">Round {round}</h3>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {tournamentMatches
                    .filter((m) => m.round === round)
                    .map((m) => (
                      <div
                        key={m.id}
                        className="border-base-content/10 bg-base-200 rounded-xl border p-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm ${
                              m.winnerId === m.participant1Id
                                ? 'text-primary font-bold'
                                : ''
                            }`}>
                            {getParticipantName(m.participant1Id)}
                          </span>
                          <span className="text-base-content/50 font-mono text-sm">
                            {m.participant1Score ?? '-'} :{' '}
                            {m.participant2Score ?? '-'}
                          </span>
                          <span
                            className={`text-sm ${
                              m.winnerId === m.participant2Id
                                ? 'text-primary font-bold'
                                : ''
                            }`}>
                            {getParticipantName(m.participant2Id)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Navbar items={NAV_ITEMS} />
    </div>
  );
};

const BracketPage = () => (
  <Suspense>
    <BracketPageContent />
  </Suspense>
);

export default BracketPage;

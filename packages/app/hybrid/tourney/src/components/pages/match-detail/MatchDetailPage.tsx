'use client';

import type { FC } from 'react';
import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';
import { Header } from '@/components/organisms/Header';
import { MatchParticipants } from './MatchParticipants';
import { ScoreEditor } from './ScoreEditor';
import { WinnerSelector } from './WinnerSelector';
import type { MatchStatus } from '@/types';

const statusBadgeClass: Record<MatchStatus, string> = {
  scheduled: 'badge-neutral',
  'in-progress': 'badge-warning',
  completed: 'badge-success',
  postponed: 'badge-info',
  walkover: 'badge-error',
};

const MatchDetailPageContent: FC = () => {
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

      <main className="container mx-auto flex flex-1 flex-col gap-6 p-6">
        <MatchParticipants
          participant1Name={participant1?.name ?? 'TBD'}
          participant2Name={participant2?.name ?? 'TBD'}
          winnerId={match.winnerId}
          participant1Id={match.participant1Id}
          participant2Id={match.participant2Id}
        />

        <ScoreEditor
          score1={score1}
          score2={score2}
          onScore1Change={setScore1}
          onScore2Change={setScore2}
          onSave={handleSaveScore}
          saving={saving}
        />

        {match.participant1Id && match.participant2Id && (
          <WinnerSelector
            participant1Id={match.participant1Id}
            participant2Id={match.participant2Id}
            participant1Name={participant1?.name ?? 'Player 1'}
            participant2Name={participant2?.name ?? 'Player 2'}
            winnerId={match.winnerId}
            onSelect={handleSetWinner}
          />
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

export const MatchDetailPage: FC = () => (
  <Suspense>
    <MatchDetailPageContent />
  </Suspense>
);

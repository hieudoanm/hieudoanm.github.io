'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { formatDate } from '@/lib/utils';
import { generateBracket } from '@/lib/formats';
import { calculateStandings } from '@/data/models';
import type { TournamentStatus } from '@/types';

const statusBadgeClass: Record<TournamentStatus, string> = {
  draft: 'badge-neutral',
  upcoming: 'badge-info',
  'in-progress': 'badge-warning',
  completed: 'badge-success',
  cancelled: 'badge-error',
};

const formatLabel: Record<string, string> = {
  'single-elimination': 'Single Elimination',
  'double-elimination': 'Double Elimination',
  'round-robin': 'Round Robin',
  swiss: 'Swiss System',
  'group-stage': 'Group Stage + Knockout',
  league: 'League',
};

type Tab = 'overview' | 'bracket' | 'standings' | 'matches' | 'participants';

const tabs: { label: string; value: Tab }[] = [
  { label: 'Overview', value: 'overview' },
  { label: 'Bracket', value: 'bracket' },
  { label: 'Standings', value: 'standings' },
  { label: 'Matches', value: 'matches' },
  { label: 'Participants', value: 'participants' },
];

const TournamentDetailPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const {
    tournaments,
    participants,
    matches,
    updateTournament,
    deleteTournament,
    createMatches,
  } = useData();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleStart = async () => {
    if (!tournament) return;
    const participantIds = tournamentParticipants.map((p) => p.id);
    if (participantIds.length < 2) return;
    const bracketMatches = generateBracket(
      tournament.format,
      tournament.id,
      participantIds
    );
    await createMatches(bracketMatches);
    await updateTournament({ ...tournament, status: 'in-progress' });
  };

  const handleDelete = async () => {
    if (!tournament) return;
    await deleteTournament(tournament.id);
    router.push('/');
  };

  if (!id) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="mb-4 text-6xl">⚠️</p>
        <h2 className="text-base-content/50 mb-2">No tournament selected</h2>
        <Link href="/" className="btn btn-primary btn-sm mt-4">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg">{tournament.name}</h1>
              <span
                className={`badge badge-sm ${statusBadgeClass[tournament.status]}`}>
                {tournament.status}
              </span>
              <span className="badge badge-sm badge-outline">
                {formatLabel[tournament.format]}
              </span>
            </div>
          </div>
          <Link href="/" className="btn btn-ghost btn-sm">
            Back
          </Link>
        </div>
      </header>

      <div className="border-base-300 bg-base-100 sticky top-[65px] z-10 border-b px-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`btn btn-sm btn-ghost rounded-b-none ${
                activeTab === tab.value
                  ? 'text-primary border-primary border-b-2'
                  : ''
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col p-6">
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6">
            {tournament.description && (
              <div className="border-base-content/10 bg-base-200 rounded-2xl border p-4">
                <p className="text-base-content/50 text-sm">Description</p>
                <p className="mt-1">{tournament.description}</p>
              </div>
            )}

            <div className="border-base-content/10 bg-base-200 rounded-2xl border p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-base-content/50 text-sm">Format</span>
                  <span className="font-mono text-sm font-bold">
                    {formatLabel[tournament.format]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/50 text-sm">
                    Participants
                  </span>
                  <span className="font-mono text-sm font-bold">
                    {tournamentParticipants.length}/{tournament.maxParticipants}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/50 text-sm">Matches</span>
                  <span className="font-mono text-sm font-bold">
                    {tournamentMatches.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/50 text-sm">Created</span>
                  <span className="font-mono text-sm font-bold">
                    {formatDate(tournament.createdAt)}
                  </span>
                </div>
                {tournament.startDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/50 text-sm">
                      Start Date
                    </span>
                    <span className="font-mono text-sm font-bold">
                      {formatDate(tournament.startDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {tournament.status === 'draft' &&
                tournamentParticipants.length >= 2 && (
                  <button
                    onClick={handleStart}
                    className="btn btn-primary w-full">
                    Start Tournament
                  </button>
                )}
              {tournament.status === 'draft' &&
                tournamentParticipants.length < 2 && (
                  <div className="text-base-content/50 text-center text-sm">
                    Add at least 2 participants to start
                  </div>
                )}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn btn-error btn-outline w-full">
                Delete Tournament
              </button>
            </div>

            {showDeleteConfirm && (
              <dialog className="modal modal-open">
                <div className="modal-box">
                  <h3 className="text-lg font-bold">Delete Tournament?</h3>
                  <p className="py-4">
                    This action cannot be undone. All data will be lost.
                  </p>
                  <div className="modal-action">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="btn btn-ghost">
                      Cancel
                    </button>
                    <button onClick={handleDelete} className="btn btn-error">
                      Delete
                    </button>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button onClick={() => setShowDeleteConfirm(false)}>
                    close
                  </button>
                </form>
              </dialog>
            )}
          </div>
        )}

        {activeTab === 'bracket' && (
          <BracketView
            matches={tournamentMatches}
            participants={tournamentParticipants}
            format={tournament.format}
          />
        )}

        {activeTab === 'standings' && (
          <StandingsView
            standings={standings}
            participants={tournamentParticipants}
          />
        )}

        {activeTab === 'matches' && (
          <MatchesView
            matches={tournamentMatches}
            participants={tournamentParticipants}
            tournamentId={tournament.id}
          />
        )}

        {activeTab === 'participants' && (
          <ParticipantsView
            tournament={tournament}
            participants={tournamentParticipants}
          />
        )}
      </main>
    </div>
  );
};

const BracketView = ({
  matches,
  participants,
  format,
}: {
  matches: ReturnType<typeof useData>['matches'];
  participants: ReturnType<typeof useData>['participants'];
  format: string;
}) => {
  const getParticipantName = (id: string | null) =>
    id ? (participants.find((p) => p.id === id)?.name ?? 'TBD') : 'BYE';

  if (format === 'round-robin' || format === 'swiss' || format === 'league') {
    const rounds = Array.from(new Set(matches.map((m) => m.round))).sort(
      (a, b) => a - b
    );
    return (
      <div className="flex flex-col gap-4">
        {rounds.map((round) => (
          <div key={round}>
            <h3 className="mb-2 text-sm font-medium">Round {round}</h3>
            <div className="flex flex-col gap-2">
              {matches
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
    );
  }

  const rounds = Array.from(new Set(matches.map((m) => m.round))).sort(
    (a, b) => a - b
  );
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {rounds.map((round) => (
        <div key={round} className="min-w-[200px] flex-shrink-0">
          <h3 className="mb-2 text-center text-sm font-medium">
            {round === rounds[rounds.length - 1] && rounds.length > 1
              ? 'Final'
              : `Round ${round}`}
          </h3>
          <div className="flex flex-col gap-3">
            {matches
              .filter((m) => m.round === round)
              .map((m) => (
                <div
                  key={m.id}
                  className="border-base-content/10 bg-base-200 rounded-xl border p-3">
                  <div
                    className={`flex items-center justify-between rounded px-2 py-1 ${
                      m.winnerId === m.participant1Id ? 'bg-primary/10' : ''
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
                  <div className="border-base-content/10 my-1 border-t" />
                  <div
                    className={`flex items-center justify-between rounded px-2 py-1 ${
                      m.winnerId === m.participant2Id ? 'bg-primary/10' : ''
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
      ))}
    </div>
  );
};

const StandingsView = ({
  standings,
  participants,
}: {
  standings: ReturnType<typeof useData> extends { matches: infer _ }
    ? ReturnType<typeof calculateStandings>
    : never;
  participants: ReturnType<typeof useData>['participants'];
}) => {
  const getParticipantName = (id: string) =>
    participants.find((p) => p.id === id)?.name ?? 'Unknown';

  const positionIcon = (pos: number) => {
    if (pos === 1) return '🥇';
    if (pos === 2) return '🥈';
    if (pos === 3) return '🥉';
    return `#${pos}`;
  };

  const positionColor = (pos: number) => {
    if (pos === 1) return 'bg-yellow-500/10 border-yellow-500/30';
    if (pos === 2) return 'bg-gray-400/10 border-gray-400/30';
    if (pos === 3) return 'bg-orange-500/10 border-orange-500/30';
    return '';
  };

  return (
    <div className="border-base-content/10 bg-base-200 overflow-x-auto rounded-2xl border">
      <table>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Participant</th>
            <th className="text-center">P</th>
            <th className="text-center">W</th>
            <th className="text-center">D</th>
            <th className="text-center">L</th>
            <th className="text-center">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s) => (
            <tr key={s.participantId} className={positionColor(s.position)}>
              <td className="text-center">{positionIcon(s.position)}</td>
              <td className="font-medium">
                {getParticipantName(s.participantId)}
              </td>
              <td className="text-center font-mono">{s.played}</td>
              <td className="text-center font-mono">{s.won}</td>
              <td className="text-center font-mono">{s.drawn}</td>
              <td className="text-center font-mono">{s.lost}</td>
              <td className="text-center font-mono font-bold">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MatchesView = ({
  matches,
  participants,
  tournamentId,
}: {
  matches: ReturnType<typeof useData>['matches'];
  participants: ReturnType<typeof useData>['participants'];
  tournamentId: string;
}) => {
  const getParticipantName = (id: string | null) =>
    id ? (participants.find((p) => p.id === id)?.name ?? 'TBD') : 'TBD';

  const statusBadge: Record<string, string> = {
    scheduled: 'badge-neutral',
    'in-progress': 'badge-warning',
    completed: 'badge-success',
    postponed: 'badge-info',
    walkover: 'badge-error',
  };

  const rounds = Array.from(new Set(matches.map((m) => m.round))).sort(
    (a, b) => a - b
  );

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/participants?tournamentId=${tournamentId}`}
        className="btn btn-primary btn-sm w-fit">
        Add Match
      </Link>
      {rounds.map((round) => (
        <div key={round}>
          <h3 className="mb-2 text-sm font-medium">Round {round}</h3>
          <div className="flex flex-col gap-2">
            {matches
              .filter((m) => m.round === round)
              .map((m) => (
                <Link
                  key={m.id}
                  href={`/match?id=${m.id}`}
                  className="border-base-content/10 bg-base-200 hover:bg-base-300 rounded-xl border p-3 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {getParticipantName(m.participant1Id)}
                    </span>
                    <span className="text-base-content/50 font-mono text-sm">
                      {m.participant1Score ?? '-'} :{' '}
                      {m.participant2Score ?? '-'}
                    </span>
                    <span className="text-sm font-medium">
                      {getParticipantName(m.participant2Id)}
                    </span>
                    <span className={`badge badge-sm ${statusBadge[m.status]}`}>
                      {m.status}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ParticipantsView = ({
  tournament,
  participants,
}: {
  tournament: ReturnType<typeof useData>['tournaments'][number];
  participants: ReturnType<typeof useData>['participants'];
}) => {
  const { createParticipant, createParticipants, deleteParticipant } =
    useData();

  const [newName, setNewName] = useState('');
  const [batchText, setBatchText] = useState('');
  const [showBatch, setShowBatch] = useState(false);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    await createParticipant({
      tournamentId: tournament.id,
      name: newName.trim(),
      seed: participants.length + 1,
    });
    setNewName('');
  };

  const handleBatchAdd = async () => {
    const names = batchText
      .split('\n')
      .map((n) => n.trim())
      .filter(Boolean);
    if (names.length === 0) return;
    await createParticipants(
      names.map((name, i) => ({
        tournamentId: tournament.id,
        name,
        seed: participants.length + i + 1,
      }))
    );
    setBatchText('');
    setShowBatch(false);
  };

  const handleRemove = async (id: string) => {
    await deleteParticipant(id);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-base-content/10 bg-base-200 flex gap-2 rounded-xl border p-3">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Participant name"
          className="input input-bordered input-sm flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="btn btn-primary btn-sm"
          disabled={!newName.trim()}>
          Add
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setShowBatch(!showBatch)}
          className="btn btn-ghost btn-sm">
          Batch Add
        </button>
        <button className="btn btn-ghost btn-sm" disabled>
          Import CSV
        </button>
      </div>

      {showBatch && (
        <div className="border-base-content/10 bg-base-200 rounded-xl border p-3">
          <textarea
            value={batchText}
            onChange={(e) => setBatchText(e.target.value)}
            placeholder="One name per line"
            className="textarea textarea-bordered w-full"
            rows={4}
          />
          <button
            onClick={handleBatchAdd}
            className="btn btn-primary btn-sm mt-2"
            disabled={!batchText.trim()}>
            Add All
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {participants.map((p) => (
          <div
            key={p.id}
            className="border-base-content/10 bg-base-200 flex items-center justify-between rounded-xl border p-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm">#{p.seed ?? '-'}</span>
              <span className="text-sm font-medium">{p.name}</span>
              {p.rating && (
                <span className="text-base-content/50 font-mono text-xs">
                  {p.rating}
                </span>
              )}
            </div>
            <button
              onClick={() => handleRemove(p.id)}
              className="btn btn-ghost btn-xs text-error">
              Remove
            </button>
          </div>
        ))}
      </div>

      {participants.length === 0 && (
        <div className="text-base-content/50 py-8 text-center text-sm">
          No participants yet. Add some to get started.
        </div>
      )}
    </div>
  );
};

const TournamentDetailPage = () => (
  <Suspense>
    <TournamentDetailPageContent />
  </Suspense>
);

export default TournamentDetailPage;

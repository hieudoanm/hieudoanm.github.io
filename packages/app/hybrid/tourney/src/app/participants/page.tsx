'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';

const ParticipantsPageContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const {
    tournaments,
    participants,
    createParticipant,
    createParticipants,
    deleteParticipant,
  } = useData();

  const tournament = useMemo(
    () => tournaments.find((t) => t.id === id),
    [tournaments, id]
  );

  const tournamentParticipants = useMemo(
    () => participants.filter((p) => p.tournamentId === id),
    [participants, id]
  );

  const [newName, setNewName] = useState('');
  const [batchText, setBatchText] = useState('');
  const [showBatch, setShowBatch] = useState(false);

  const handleAdd = async () => {
    if (!newName.trim() || !id) return;
    await createParticipant({
      tournamentId: id,
      name: newName.trim(),
      seed: tournamentParticipants.length + 1,
    });
    setNewName('');
  };

  const handleBatchAdd = async () => {
    if (!id) return;
    const names = batchText
      .split('\n')
      .map((n) => n.trim())
      .filter(Boolean);
    if (names.length === 0) return;
    await createParticipants(
      names.map((name, i) => ({
        tournamentId: id,
        name,
        seed: tournamentParticipants.length + i + 1,
      }))
    );
    setBatchText('');
    setShowBatch(false);
  };

  const handleRemove = async (participantId: string) => {
    await deleteParticipant(participantId);
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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg">{tournament.name}</h1>
            <p className="text-base-content/50 text-sm">
              Participants ({tournamentParticipants.length}/
              {tournament.maxParticipants})
            </p>
          </div>
          <Link href={`/tournament?id=${id}`} className="btn btn-ghost btn-sm">
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 p-6">
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
            disabled={
              !newName.trim() ||
              tournamentParticipants.length >= tournament.maxParticipants
            }>
            Add
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowBatch(!showBatch)}
            className="btn btn-ghost btn-sm">
            {showBatch ? 'Hide Batch' : 'Batch Add'}
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
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleBatchAdd}
                className="btn btn-primary btn-sm"
                disabled={!batchText.trim()}>
                Add All
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {tournamentParticipants.map((p) => (
            <div
              key={p.id}
              className="border-base-content/10 bg-base-200 flex items-center justify-between rounded-xl border p-3">
              <div className="flex items-center gap-3">
                <span className="text-base-content/50 font-mono text-sm">
                  #{p.seed ?? '-'}
                </span>
                <span className="text-sm font-medium">{p.name}</span>
                {p.rating !== undefined && (
                  <span className="badge badge-sm badge-outline">
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

        {tournamentParticipants.length === 0 && (
          <div className="text-base-content/50 py-8 text-center text-sm">
            No participants yet. Add some to get started.
          </div>
        )}
      </main>
    </div>
  );
};

const ParticipantsPage = () => (
  <Suspense>
    <ParticipantsPageContent />
  </Suspense>
);

export default ParticipantsPage;

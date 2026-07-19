'use client';

import type { FC } from 'react';
import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/providers/DataProvider';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';
import { Header } from '@/components/organisms/Header';
import { AddParticipantForm } from './AddParticipantForm';
import { BatchAddForm } from './BatchAddForm';
import { ParticipantList } from './ParticipantList';

const ParticipantsPageContent: FC = () => {
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
        subtitle={`Participants (${tournamentParticipants.length}/${tournament.maxParticipants})`}
        action={
          <Link href={`/tournament?id=${id}`} className="btn btn-ghost btn-sm">
            Back
          </Link>
        }
      />

      <main className="container mx-auto flex flex-1 flex-col gap-4 p-6">
        <AddParticipantForm
          value={newName}
          onChange={setNewName}
          onAdd={handleAdd}
          disabled={
            !newName.trim() ||
            tournamentParticipants.length >= tournament.maxParticipants
          }
        />

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
          <BatchAddForm
            value={batchText}
            onChange={setBatchText}
            onAdd={handleBatchAdd}
            onClose={() => setShowBatch(false)}
          />
        )}

        <ParticipantList
          participants={tournamentParticipants}
          onRemove={handleRemove}
        />

        {tournamentParticipants.length === 0 && (
          <div className="text-base-content/50 py-8 text-center text-sm">
            No participants yet. Add some to get started.
          </div>
        )}
      </main>

      <Navbar items={NAV_ITEMS} />
    </div>
  );
};

export const ParticipantsPage: FC = () => (
  <Suspense>
    <ParticipantsPageContent />
  </Suspense>
);

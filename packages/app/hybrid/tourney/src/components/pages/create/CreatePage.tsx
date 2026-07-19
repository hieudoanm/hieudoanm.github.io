'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/providers/DataProvider';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';
import { Header } from '@/components/organisms/Header';
import { FormatSelector } from './FormatSelector';
import type { TournamentFormat } from '@/types';

const maxParticipantOptions = [4, 8, 16, 32, 64];

export const CreatePage: FC = () => {
  const router = useRouter();
  const { createTournament } = useData();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState<TournamentFormat>('single-elimination');
  const [maxParticipants, setMaxParticipants] = useState(16);
  const [startDate, setStartDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await createTournament({
      name: name.trim(),
      description: description.trim(),
      format,
      status: 'draft',
      maxParticipants,
      startDate: startDate ? new Date(startDate).getTime() : undefined,
    });
    router.push('/');
  };

  return (
    <div className="flex min-h-dvh flex-col pb-20">
      <Header title="Create Tournament" />

      <main className="container mx-auto flex-1 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <fieldset className="border-base-content/20 rounded-xl border p-4">
            <legend className="px-2 text-sm font-medium">Basic Info</legend>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tournament name"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-base-content/20 rounded-xl border p-4">
            <legend className="px-2 text-sm font-medium">Format</legend>
            <FormatSelector value={format} onChange={setFormat} />
          </fieldset>

          <fieldset className="border-base-content/20 rounded-xl border p-4">
            <legend className="px-2 text-sm font-medium">Participants</legend>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Max Participants</label>
                <div className="mt-2 flex gap-2">
                  {maxParticipantOptions.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setMaxParticipants(n)}
                      className={`btn btn-sm rounded-full ${
                        maxParticipants === n ? 'btn-primary' : 'btn-ghost'
                      }`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </fieldset>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-ghost flex-1"
              disabled={submitting}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={submitting || !name.trim()}>
              {submitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Create'
              )}
            </button>
          </div>
        </form>
      </main>

      <Navbar items={NAV_ITEMS} />
    </div>
  );
};

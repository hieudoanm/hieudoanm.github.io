import type { FC } from 'react';
import Link from 'next/link';
import { TournamentCard } from '@/components/molecules/TournamentCard';
import { EmptyState } from '@/components/atoms/EmptyState';
import type { Tournament } from '@/types';

interface TournamentListProps {
  loading: boolean;
  tournaments: Tournament[];
  participantCounts: Record<string, number>;
}

export const TournamentList: FC<TournamentListProps> = ({
  loading,
  tournaments,
  participantCounts,
}) => {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <EmptyState
        icon="🏆"
        title="No tournaments yet"
        description="Create your first tournament to get started"
        action={
          <Link href="/create" className="btn btn-primary btn-sm">
            Create Tournament
          </Link>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tournaments.map((t) => (
        <TournamentCard
          key={t.id}
          tournament={t}
          participantCount={participantCounts[t.id] ?? 0}
        />
      ))}
    </div>
  );
};

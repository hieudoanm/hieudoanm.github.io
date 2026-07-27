import type { FC } from 'react';
import { formatDate } from '@/lib/utils';
import { useData } from '@/providers/DataProvider';
import { formatLabel } from './constants';

interface OverviewViewProps {
  tournament: ReturnType<typeof useData>['tournaments'][number];
  participants: ReturnType<typeof useData>['participants'];
  matches: ReturnType<typeof useData>['matches'];
  onStart: () => void;
  onDelete: () => void;
}

export const OverviewView: FC<OverviewViewProps> = ({
  tournament,
  participants,
  matches,
  onStart,
  onDelete,
}) => (
  <div className="flex flex-col gap-6">
    {tournament.description && (
      <div className="border-base-content/10 bg-base-200 rounded-2xl border p-4">
        <p className="text-base-content/50 text-sm">Description</p>
        <p className="mt-1">{tournament.description}</p>
      </div>
    )}

    <div className="border-base-content/10 bg-base-200 rounded-2xl border p-4">
      <div className="flex flex-col gap-3">
        <InfoRow label="Format" value={formatLabel[tournament.format]} />
        <InfoRow
          label="Participants"
          value={`${participants.length}/${tournament.maxParticipants}`}
        />
        <InfoRow label="Matches" value={String(matches.length)} />
        <InfoRow label="Created" value={formatDate(tournament.createdAt)} />
        {tournament.startDate && (
          <InfoRow
            label="Start Date"
            value={formatDate(tournament.startDate)}
          />
        )}
      </div>
    </div>

    <div className="flex flex-col gap-2">
      {tournament.status === 'draft' && participants.length >= 2 && (
        <button onClick={onStart} className="btn btn-primary w-full">
          Start Tournament
        </button>
      )}
      {tournament.status === 'draft' && participants.length < 2 && (
        <div className="text-base-content/50 text-center text-sm">
          Add at least 2 participants to start
        </div>
      )}
      <button onClick={onDelete} className="btn btn-error btn-outline w-full">
        Delete Tournament
      </button>
    </div>
  </div>
);

const InfoRow: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-base-content/50 text-sm">{label}</span>
    <span className="font-mono text-sm font-bold">{value}</span>
  </div>
);

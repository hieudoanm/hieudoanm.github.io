import type { FC } from 'react';
import type { Participant } from '@/types';

interface ParticipantListProps {
  participants: Participant[];
  onRemove: (id: string) => void;
}

export const ParticipantList: FC<ParticipantListProps> = ({
  participants,
  onRemove,
}) => (
  <div className="flex flex-col gap-2">
    {participants.map((p) => (
      <div
        key={p.id}
        className="border-base-content/10 bg-base-200 flex items-center justify-between rounded-xl border p-3">
        <div className="flex items-center gap-3">
          <span className="text-base-content/50 font-mono text-sm">
            #{p.seed ?? '-'}
          </span>
          <span className="text-sm font-medium">{p.name}</span>
          {p.rating !== undefined && (
            <span className="badge badge-sm badge-outline">{p.rating}</span>
          )}
        </div>
        <button
          onClick={() => onRemove(p.id)}
          className="btn btn-ghost btn-xs text-error">
          Remove
        </button>
      </div>
    ))}
  </div>
);

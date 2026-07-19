import type { FC } from 'react';
import { useData } from '@/providers/DataProvider';

interface BracketCardProps {
  match: {
    id: string;
    participant1Id: string | null;
    participant2Id: string | null;
    participant1Score: number | null;
    participant2Score: number | null;
    winnerId: string | null;
  };
  getName: (id: string | null) => string;
}

export const BracketCard: FC<BracketCardProps> = ({ match: m, getName }) => (
  <div className="border-base-content/10 bg-base-200 overflow-hidden rounded-xl border">
    <div
      className={`flex items-center justify-between px-3 py-2 ${
        m.winnerId === m.participant1Id ? 'bg-primary/10' : ''
      }`}>
      <span
        className={`text-sm ${
          m.winnerId === m.participant1Id ? 'text-primary font-bold' : ''
        }`}>
        {getName(m.participant1Id)}
      </span>
      <span className="font-mono text-sm">{m.participant1Score ?? '-'}</span>
    </div>
    <div className="border-base-content/10 border-t" />
    <div
      className={`flex items-center justify-between px-3 py-2 ${
        m.winnerId === m.participant2Id ? 'bg-primary/10' : ''
      }`}>
      <span
        className={`text-sm ${
          m.winnerId === m.participant2Id ? 'text-primary font-bold' : ''
        }`}>
        {getName(m.participant2Id)}
      </span>
      <span className="font-mono text-sm">{m.participant2Score ?? '-'}</span>
    </div>
  </div>
);

import { FC } from 'react';
import { Phase, Round } from '@/games/economics/prisoners-dilemma/types';
import { formatScore } from '@/games/economics/prisoners-dilemma/game';

interface RoundHistoryProps {
  history: Round[];
  phase: Phase;
}

export const RoundHistory: FC<RoundHistoryProps> = ({ history, phase }) => {
  if (history.length === 0 || phase === 'choose') return null;
  return (
    <div className="border-base-300 max-h-24 overflow-y-auto rounded-lg border">
      {history.map((r) => (
        <div
          key={r.round}
          className="border-base-200 flex items-center justify-between border-b px-3 py-1 text-[10px] last:border-0">
          <span className="opacity-40">#{r.round}</span>
          <span>
            You {r.player === 'cooperate' ? '🤝' : '🔪'} vs Bot{' '}
            {r.opponent === 'cooperate' ? '🤝' : '🔪'}
          </span>
          <span>
            {formatScore(r.pScore)} / {formatScore(r.oScore)}
          </span>
        </div>
      ))}
    </div>
  );
};
RoundHistory.displayName = 'RoundHistory';

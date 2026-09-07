import { FC } from 'react';
import { TOTAL_ROUNDS } from '@/games/prisoners-dilemma/constants';
import { Phase } from '@/games/prisoners-dilemma/types';
import { formatScore } from '@/games/prisoners-dilemma/game';

interface ScoreBarProps {
  phase: Phase;
  round: number;
  playerScore: number;
  opponentScore: number;
}

export const ScoreBar: FC<ScoreBarProps> = ({
  phase,
  round,
  playerScore,
  opponentScore,
}) => (
  <div className="flex items-center justify-between text-sm">
    <span>
      Round <strong>{phase === 'done' ? TOTAL_ROUNDS : round}</strong> /{' '}
      {TOTAL_ROUNDS}
    </span>
    <div className="flex gap-3">
      <span>
        You: <strong>{formatScore(playerScore)}</strong>
      </span>
      <span className="opacity-60">
        Bot: <strong>{formatScore(opponentScore)}</strong>
      </span>
    </div>
  </div>
);
ScoreBar.displayName = 'ScoreBar';

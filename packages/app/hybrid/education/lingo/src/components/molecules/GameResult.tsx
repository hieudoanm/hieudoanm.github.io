import { FC } from 'react';
import { STRATEGIES } from '@/games/economics/prisoners-dilemma/constants';
import { Strategy } from '@/games/economics/prisoners-dilemma/types';
import { formatScore } from '@/games/economics/prisoners-dilemma/game';

export type ResultKind = 'win' | 'lose' | 'draw';

interface GameResultProps {
  result: ResultKind;
  playerScore: number;
  opponentScore: number;
  strategy: Strategy;
  onReset: () => void;
}

export const GameResult: FC<GameResultProps> = ({
  result,
  playerScore,
  opponentScore,
  strategy,
  onReset,
}) => {
  const strategyInfo = STRATEGIES.find((s) => s.id === strategy);
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-4xl">
        {result === 'win' ? '🏆' : result === 'lose' ? '😞' : '🤝'}
      </div>
      <div
        className={`text-lg font-normal ${
          result === 'win'
            ? 'text-success'
            : result === 'lose'
              ? 'text-error'
              : ''
        }`}>
        {result === 'win'
          ? 'You won!'
          : result === 'lose'
            ? 'Bot won!'
            : 'Draw!'}
      </div>
      <div className="flex gap-6 text-sm">
        <span>
          You: <strong>{formatScore(playerScore)}</strong>
        </span>
        <span>
          Bot: <strong>{formatScore(opponentScore)}</strong>
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="opacity-60">Bot strategy:</span>
        <span>
          {strategyInfo?.emoji} {strategyInfo?.label}
        </span>
      </div>
      <button onClick={onReset} className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};
GameResult.displayName = 'GameResult';

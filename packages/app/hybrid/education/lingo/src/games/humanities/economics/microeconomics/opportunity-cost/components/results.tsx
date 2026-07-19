import type { FC } from 'react';

interface ResultsPanelProps {
  score: number;
  total: number;
  onReset: () => void;
}

export const ResultsPanel: FC<ResultsPanelProps> = ({
  score,
  total,
  onReset,
}) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">{score >= 4 ? '🏆' : '📊'}</div>
    <div className="text-lg">Challenge Complete!</div>
    <div className="text-sm" data-testid="score">
      Score: <strong>{score}</strong> / {total}
    </div>
    <button
      type="button"
      onClick={onReset}
      className="btn btn-primary btn-sm"
      data-testid="reset">
      Play Again
    </button>
  </div>
);
ResultsPanel.displayName = 'ResultsPanel';

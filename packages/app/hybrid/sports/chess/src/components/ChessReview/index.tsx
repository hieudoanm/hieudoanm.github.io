import { FC, useMemo, useState } from 'react';
import { Chessboard } from '../organisms/chess/ChessBoard';
import type { ReviewResult } from './types';
import { reviewPgn } from './utils/review';

const SAMPLE_PGN = `[Event "Casual Game"]
[White "Alice"]
[Black "Bob"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. Nbd2 Bb7 12. Bc2 Re8 13. Nf1 Bf8 14. Ng3 g6 15. Bg5 h6 16. Bd2 Bg7 17. a4 c5 18. d5 Nb6 19. axb5 axb5 20. Rxa8 Bxa8 1-0`;

const classBadge: Record<string, string> = {
  best: 'bg-success/20 text-success',
  good: 'bg-primary/10 text-primary',
  inaccuracy: 'bg-warning/20 text-warning',
  mistake: 'bg-orange-500/20 text-orange-500',
  blunder: 'bg-error/20 text-error',
};

const MoveRow: FC<{
  index: number;
  review: ReviewResult;
  selected: number | null;
  onSelect: (i: number) => void;
}> = ({ index, review, selected, onSelect }) => {
  const move = review.moves[index];
  const badge = classBadge[move.classification.code];
  return (
    <button
      onClick={() => onSelect(index)}
      className={`hover:bg-base-300 grid w-full grid-cols-[2rem_2rem_3rem_1fr_3rem_3rem_1.5rem] items-center gap-1 rounded px-2 py-1 text-left text-xs ${
        selected === index ? 'bg-base-300' : ''
      }`}>
      <span className="opacity-50">{move.moveNumber}.</span>
      <span className="opacity-50">{move.color === 'w' ? 'W' : 'B'}</span>
      <span className="font-semibold">{move.san}</span>
      <span className={`badge badge-xs ${badge}`}>
        {move.classification.label}
      </span>
      <span className="text-right tabular-nums opacity-70">
        {move.accuracy}
      </span>
      <span className="text-right tabular-nums opacity-70">
        {move.bestSan ?? '—'}
      </span>
      <span className="text-right">
        {move.missedMate ? '⚡' : move.hanging ? '!' : ''}
      </span>
    </button>
  );
};

const SummaryCard: FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="card bg-base-200 flex-1 p-3 text-center">
    <div className="text-2xl font-bold tabular-nums">{value}</div>
    <div className="text-xs opacity-60">{label}</div>
  </div>
);

export const ChessReview: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [pgn, setPgn] = useState(SAMPLE_PGN);
  const [depth, setDepth] = useState(8);
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyze = () => {
    setAnalyzing(true);
    setReview(null);
    setSelected(null);
    window.setTimeout(() => {
      const result = reviewPgn(pgn, { depth });
      setReview(result);
      setAnalyzing(false);
    }, 30);
  };

  const currentFen = useMemo(() => {
    if (!review) return undefined;
    if (selected === null) return review.moves.at(-1)?.fen;
    return review.moves[selected]?.fen;
  }, [review, selected]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4">
      <div className="card bg-base-200 p-3">
        <textarea
          value={pgn}
          onChange={(e) => setPgn(e.target.value)}
          rows={6}
          placeholder="Paste a PGN to review…"
          className="textarea textarea-bordered w-full font-mono text-xs"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-xs opacity-70">
            Depth
            <input
              type="range"
              min={4}
              max={12}
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              className="range range-xs w-32"
            />
            {depth}
          </label>
          <button onClick={analyze} className="btn btn-primary btn-sm">
            Analyze
          </button>
          {analyzing && <span className="loading loading-spinner loading-sm" />}
        </div>
      </div>

      {review && (
        <>
          <div className="flex flex-wrap gap-2">
            <SummaryCard
              label="White accuracy"
              value={`${review.white.accuracy}%`}
            />
            <SummaryCard
              label="Black accuracy"
              value={`${review.black.accuracy}%`}
            />
            <SummaryCard
              label="Missed mates"
              value={review.white.missedMate + review.black.missedMate}
            />
            <SummaryCard
              label="Hanging pieces"
              value={review.white.hanging + review.black.hanging}
            />
            <SummaryCard label="Best move" value={review.bestMove ?? '—'} />
            <SummaryCard label="Worst move" value={review.worstMove ?? '—'} />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <div className="card bg-base-200 max-h-[520px] overflow-y-auto p-3">
              {review.moves.map((_, i) => (
                <MoveRow
                  key={i}
                  index={i}
                  review={review}
                  selected={selected}
                  onSelect={setSelected}
                />
              ))}
            </div>
            <div className="card bg-base-200 p-3">
              <Chessboard position={currentFen ?? ''} />
              {selected !== null && review.moves[selected] && (
                <div className="mt-2 space-y-1 text-xs">
                  <p>
                    <span className="opacity-60">Played:</span>{' '}
                    {review.moves[selected].san}
                  </p>
                  <p>
                    <span className="opacity-60">Best:</span>{' '}
                    {review.moves[selected].bestSan ?? '—'}
                  </p>
                  <p>
                    <span className="opacity-60">Eval lost:</span>{' '}
                    {review.moves[selected].winPercentLost.toFixed(1)}%
                  </p>
                  {review.moves[selected].missedMate && (
                    <p className="text-error">Missed a forced mate!</p>
                  )}
                  {review.moves[selected].hanging && (
                    <p className="text-warning">
                      {review.moves[selected].hanging.color === 'w'
                        ? 'White'
                        : 'Black'}{' '}
                      left {review.moves[selected].hanging.piece} on{' '}
                      {review.moves[selected].hanging.square} hanging
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
ChessReview.displayName = 'ChessReview';

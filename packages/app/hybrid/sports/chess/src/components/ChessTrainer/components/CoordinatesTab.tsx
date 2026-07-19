import { FC, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Chessboard } from '../../organisms/chess/ChessBoard';
import type { CoordinatesRound } from '../utils/coordinates';
import {
  allSquares,
  bestScore,
  roundStats,
  saveBestScore,
  shuffle,
} from '../utils/coordinates';

type Mode = 'click' | 'name';

export const CoordinatesTab: FC = () => {
  const targets = useMemo(() => shuffle(allSquares()), []);
  const [mode, setMode] = useState<Mode>('click');
  const [pos, setPos] = useState(0);
  const [rounds, setRounds] = useState<CoordinatesRound[]>([]);
  const [typed, setTyped] = useState('');
  const [flash, setFlash] = useState<'ok' | 'bad' | null>(null);
  const [best, setBest] = useState(() => bestScore());

  const target = targets[pos % targets.length] ?? 'a1';
  const started = rounds.length > 0 || flash !== null;

  const record = (answered: string, timeMs: number, correct: boolean) => {
    const next = [...rounds, { target, answered, correct, timeMs }];
    setRounds(next);
    setFlash(correct ? 'ok' : 'bad');
    const stats = roundStats(next);
    if (stats.total === 20) {
      if (stats.correct > best.score) {
        const newBest = { score: stats.correct, avgMs: stats.avgMs };
        setBest(newBest);
        saveBestScore(newBest.score, newBest.avgMs);
      }
      setRounds([]);
      setPos(0);
      setFlash(null);
      return;
    }
    window.setTimeout(() => {
      setPos((p) => p + 1);
      setFlash(null);
    }, 350);
  };

  const handleSquareClick = (square: string) => {
    if (mode !== 'click' || flash) return;
    record(square, 400, square === target);
  };

  const handleSubmit = () => {
    if (mode !== 'name' || flash) return;
    record(
      typed.trim().toLowerCase(),
      400,
      typed.trim().toLowerCase() === target
    );
    setTyped('');
  };

  const highlight: Record<string, CSSProperties> =
    mode === 'name'
      ? { [target]: { backgroundColor: 'rgba(245, 158, 11, 0.7)' } }
      : {};

  const stats = roundStats(rounds);

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="card bg-base-200 p-4">
        <h3 className="font-semibold">Board Coordinates</h3>
        <div className="mt-3 flex gap-1">
          {(['click', 'name'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setRounds([]);
                setPos(0);
                setFlash(null);
              }}
              className={`btn btn-sm ${mode === m ? 'btn-primary' : 'btn-ghost'}`}>
              {m === 'click' ? 'Click the square' : 'Type the square'}
            </button>
          ))}
        </div>
        <div className="mt-3 space-y-1 text-sm">
          <p className="opacity-70">Round {stats.total + 1} / 20</p>
          <p className="opacity-70">
            Correct: <span className="font-semibold">{stats.correct}</span>
          </p>
          <p className="opacity-70">Best: {best.score} pts</p>
          <p className="opacity-60">{targets.length} squares shuffled</p>
        </div>
      </div>

      <div className="card bg-base-200 p-4">
        {mode === 'click' ? (
          <>
            <div className="mb-3 text-center">
              <span className="text-2xl font-bold tracking-widest">
                {target}
              </span>
              {!started && (
                <p className="mt-1 text-xs opacity-60">
                  Click the square with that name.
                </p>
              )}
            </div>
            <Chessboard
              position="8/8/8/8/8/8/8/8 w - - 0 1"
              allowDragging={false}
              squareStyles={highlight}
              onSquareClick={({ square }) => handleSquareClick(square)}
            />
          </>
        ) : (
          <>
            <div className="mb-3 text-center">
              <span className="text-xs opacity-60">
                Name the highlighted square:
              </span>
            </div>
            <Chessboard
              position="8/8/8/8/8/8/8/8 w - - 0 1"
              allowDragging={false}
              squareStyles={highlight}
            />
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder="e.g. e4"
                className="input input-bordered w-28 font-mono text-sm uppercase"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Submit
              </button>
            </form>
          </>
        )}
        {flash === 'ok' && (
          <p className="text-success mt-2 text-sm">Correct!</p>
        )}
        {flash === 'bad' && (
          <p className="text-error mt-2 text-sm">
            Not quite — it was {target}.
          </p>
        )}
      </div>
    </div>
  );
};
CoordinatesTab.displayName = 'CoordinatesTab';

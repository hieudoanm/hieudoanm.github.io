import {
  calculatePerformance,
  calculateRating,
  Score,
  TimeClass,
} from '@chess/elo';
import { FC, useState } from 'react';

type Formula = {
  ratingPlayer: number;
  ratingOpponent: number;
  ratingNew: number;
  score: Score;
  timeClass: TimeClass;
  lessThan30Games: boolean;
  overRating2400: boolean;
  overAge18: boolean;
};

type GameRow = {
  ratingOpponent: number;
  score: Score;
};

export const EloModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<'rating' | 'performance'>('rating');

  const [formula, setFormula] = useState<Formula>({
    ratingPlayer: 1000,
    ratingOpponent: 1000,
    ratingNew: 1000,
    score: Score.DRAW,
    timeClass: TimeClass.CLASSICAL,
    lessThan30Games: false,
    overRating2400: false,
    overAge18: true,
  });

  const [games, setGames] = useState<GameRow[]>([
    { ratingOpponent: 1800, score: Score.WIN },
  ]);

  const [performance, setPerformance] = useState<number>(0);

  const updateGame = (index: number, field: keyof GameRow, value: any) => {
    const copy = [...games];
    copy[index] = { ...copy[index], [field]: value };
    setGames(copy);
  };

  return (
    <dialog
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-box w-full max-w-sm p-4">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Elo Calculator</h3>

        <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
          <button
            role="tab"
            className={`tab w-[50%] ${tab === 'rating' ? 'tab-active' : ''}`}
            onClick={() => setTab('rating')}>
            Rating
          </button>
          <button
            role="tab"
            className={`tab w-[50%] ${tab === 'performance' ? 'tab-active' : ''}`}
            onClick={() => setTab('performance')}>
            Performance
          </button>
        </div>

        {tab === 'rating' && (
          <div className="space-y-3">
            <div className="form-control">
              <label className="label mb-1 p-0">
                <span className="label-text text-xs font-medium opacity-70">
                  Your Rating
                </span>
              </label>
              <input
                type="number"
                className="input input-sm input-bordered w-full text-right"
                value={formula.ratingPlayer}
                onChange={(e) =>
                  setFormula({
                    ...formula,
                    ratingPlayer: Number.parseInt(e.target.value, 10),
                  })
                }
              />
            </div>

            <div className="form-control">
              <label className="label mb-1 p-0">
                <span className="label-text text-xs font-medium opacity-70">
                  Opponent Rating
                </span>
              </label>
              <input
                type="number"
                className="input input-sm input-bordered w-full text-right"
                value={formula.ratingOpponent}
                onChange={(e) =>
                  setFormula({
                    ...formula,
                    ratingOpponent: Number.parseInt(e.target.value, 10),
                  })
                }
              />
            </div>

            <div className="form-control">
              <label className="label mb-1 p-0">
                <span className="label-text text-xs font-medium opacity-70">
                  Score
                </span>
              </label>
              <select
                className="select select-sm select-bordered w-full text-right"
                value={formula.score}
                onChange={(e) =>
                  setFormula({
                    ...formula,
                    score: Number.parseFloat(e.target.value) as Score,
                  })
                }>
                <option value={Score.WIN}>Win</option>
                <option value={Score.DRAW}>Draw</option>
                <option value={Score.LOSS}>Loss</option>
              </select>
            </div>

            <button
              className="btn btn-primary btn-sm w-full"
              onClick={() => {
                const ratingNew = calculateRating(formula);
                setFormula((p) => ({ ...p, ratingNew }));
              }}>
              Calculate Rating
            </button>

            <div className="form-control mt-4">
              <label className="label mb-1 p-0">
                <span className="label-text text-xs font-medium opacity-70">
                  New Rating
                </span>
              </label>
              <input
                type="number"
                className="input input-sm input-bordered w-full text-right font-bold"
                value={formula.ratingNew}
                readOnly
              />
            </div>
          </div>
        )}

        {tab === 'performance' && (
          <div className="space-y-3">
            <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
              {games.map((g, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-center">{index + 1}.</span>
                  <input
                    type="number"
                    className="input input-sm input-bordered flex-1"
                    value={g.ratingOpponent}
                    onChange={(e) =>
                      updateGame(
                        index,
                        'ratingOpponent',
                        Number.parseInt(e.target.value, 10)
                      )
                    }
                  />

                  <select
                    className="select select-sm select-bordered flex-1"
                    value={g.score}
                    onChange={(e) =>
                      updateGame(
                        index,
                        'score',
                        Number.parseFloat(e.target.value)
                      )
                    }>
                    <option value={Score.WIN}>Win</option>
                    <option value={Score.DRAW}>Draw</option>
                    <option value={Score.LOSS}>Loss</option>
                  </select>
                </div>
              ))}
            </div>

            <button
              className="btn btn-outline btn-sm border-base-content/20 bg-base-100/10 hover:bg-base-100/20 w-full backdrop-blur"
              onClick={() =>
                setGames([
                  ...games,
                  { ratingOpponent: 1800, score: Score.DRAW },
                ])
              }>
              Add Game
            </button>

            <button
              className="btn btn-primary btn-sm w-full"
              onClick={() => setPerformance(calculatePerformance({ games }))}>
              Calculate Performance
            </button>

            <div className="form-control mt-4">
              <label className="label mb-1 p-0">
                <span className="label-text text-xs font-medium opacity-70">
                  Performance
                </span>
              </label>
              <input
                type="number"
                className="input input-sm input-bordered w-full text-center font-bold"
                value={performance}
                readOnly
              />
            </div>
          </div>
        )}
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};

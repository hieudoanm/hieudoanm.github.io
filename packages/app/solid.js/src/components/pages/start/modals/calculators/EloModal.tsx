import { createSignal } from 'solid-js';
import {
  calculatePerformance,
  calculateRating,
  Score,
  TimeClass,
} from '@chess/elo';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

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

export const EloModal = (props: { onClose: () => void }) => {
  const [tab, setTab] = createSignal<'rating' | 'performance'>('rating');

  const [formula, setFormula] = createSignal<Formula>({
    ratingPlayer: 1000,
    ratingOpponent: 1000,
    ratingNew: 1000,
    score: Score.DRAW,
    timeClass: TimeClass.CLASSICAL,
    lessThan30Games: false,
    overRating2400: false,
    overAge18: true,
  });

  const [games, setGames] = createSignal<GameRow[]>([
    { ratingOpponent: 1800, score: Score.WIN },
  ]);

  const [performance, setPerformance] = createSignal<number>(0);

  const updateGame = (index: number, field: keyof GameRow, value: any) => {
    const copy = [...games()];
    copy[index] = { ...copy[index], [field]: value };
    setGames(copy);
  };

  return (
    <ModalWrapper onClose={props.onClose} title="Elo Calculator">
      <div role="tablist" class="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          class={`tab w-[50%] ${tab() === 'rating' ? 'tab-active' : ''}`}
          onClick={() => setTab('rating')}>
          Rating
        </button>
        <button
          role="tab"
          class={`tab w-[50%] ${tab() === 'performance' ? 'tab-active' : ''}`}
          onClick={() => setTab('performance')}>
          Performance
        </button>
      </div>

      {tab() === 'rating' && (
        <div class="space-y-3">
          <div class="form-control">
            <label class="label mb-1 p-0">
              <span class="label-text text-xs font-medium opacity-70">
                Your Rating
              </span>
            </label>
            <input
              type="number"
              class="input input-sm input-bordered w-full text-right"
              value={formula().ratingPlayer}
              onChange={(e: Event) =>
                setFormula({
                  ...formula(),
                  ratingPlayer: Number.parseInt(
                    (e.target as HTMLInputElement).value,
                    10
                  ),
                })
              }
            />
          </div>

          <div class="form-control">
            <label class="label mb-1 p-0">
              <span class="label-text text-xs font-medium opacity-70">
                Opponent Rating
              </span>
            </label>
            <input
              type="number"
              class="input input-sm input-bordered w-full text-right"
              value={formula().ratingOpponent}
              onChange={(e: Event) =>
                setFormula({
                  ...formula(),
                  ratingOpponent: Number.parseInt(
                    (e.target as HTMLInputElement).value,
                    10
                  ),
                })
              }
            />
          </div>

          <div class="form-control">
            <label class="label mb-1 p-0">
              <span class="label-text text-xs font-medium opacity-70">
                Score
              </span>
            </label>
            <select
              class="select select-sm select-bordered w-full text-right"
              value={formula().score}
              onChange={(e: Event) =>
                setFormula({
                  ...formula(),
                  score: (e.target as HTMLSelectElement).value as Score,
                })
              }>
              <option value={Score.WIN}>Win</option>
              <option value={Score.DRAW}>Draw</option>
              <option value={Score.LOSS}>Loss</option>
            </select>
          </div>

          <button
            class="btn btn-primary btn-sm w-full"
            onClick={() => {
              const ratingNew = calculateRating(formula());
              setFormula((p) => ({ ...p, ratingNew }));
            }}>
            Calculate Rating
          </button>

          <div class="form-control mt-4">
            <label class="label mb-1 p-0">
              <span class="label-text text-xs font-medium opacity-70">
                New Rating
              </span>
            </label>
            <input
              type="number"
              class="input input-sm input-bordered w-full text-right font-bold"
              value={formula().ratingNew}
              readOnly
            />
          </div>
        </div>
      )}

      {tab() === 'performance' && (
        <div class="space-y-3">
          <div class="max-h-48 space-y-2 overflow-y-auto pr-1">
            {games().map((g, index) => (
              <div key={index} class="flex items-center gap-2">
                <span class="text-center">{index + 1}.</span>
                <input
                  type="number"
                  class="input input-sm input-bordered flex-1"
                  value={g.ratingOpponent}
                  onChange={(e: Event) =>
                    updateGame(
                      index,
                      'ratingOpponent',
                      Number.parseInt((e.target as HTMLInputElement).value, 10)
                    )
                  }
                />

                <select
                  class="select select-sm select-bordered flex-1"
                  value={g.score}
                  onChange={(e: Event) =>
                    updateGame(
                      index,
                      'score',
                      (e.target as HTMLSelectElement).value
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
            class="btn btn-outline btn-sm border-base-content/20 bg-base-100/10 hover:bg-base-100/20 w-full backdrop-blur"
            onClick={() =>
              setGames([
                ...games(),
                { ratingOpponent: 1800, score: Score.DRAW },
              ])
            }>
            Add Game
          </button>

          <button
            class="btn btn-primary btn-sm w-full"
            onClick={() =>
              setPerformance(calculatePerformance({ games: games() }))
            }>
            Calculate Performance
          </button>

          <div class="form-control mt-4">
            <label class="label mb-1 p-0">
              <span class="label-text text-xs font-medium opacity-70">
                Performance
              </span>
            </label>
            <input
              type="number"
              class="input input-sm input-bordered w-full text-center font-bold"
              value={performance()}
              readOnly
            />
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};

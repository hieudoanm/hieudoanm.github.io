import { FC, useState } from 'react';
import { FRAMER_CATEGORIES, SCENARIOS, WIND_FALL_AMOUNT } from './constants';
import { allocationRows, scoreFor } from './game';
import type { ChoiceId } from './types';

export const FramerPanel: FC<{ onAllocate: (amounts: number[]) => void }> = ({
  onAllocate,
}) => {
  const [amounts, setAmounts] = useState<number[]>(() =>
    FRAMER_CATEGORIES.map(() => 0)
  );
  const total = amounts.reduce((sum, amount) => sum + amount, 0);
  const complete = total === WIND_FALL_AMOUNT;
  const update = (index: number, value: number) =>
    setAmounts((current) =>
      current.map((amount, i) => (i === index ? value : amount))
    );
  return (
    <div className="card border-base-content/10 flex flex-col gap-4 border p-5">
      <div>
        <h2 className="text-lg font-semibold">The Framer Round</h2>
        <p className="text-base-content/70 mt-1 text-sm leading-relaxed">
          A $1,000 windfall lands in your lap. Split it across four mental
          accounts — then watch the same money stop behaving fungibly.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {FRAMER_CATEGORIES.map((category, index) => (
          <label key={category.id} className="flex flex-col gap-1 text-sm">
            <span className="flex items-center justify-between">
              <span>
                {category.emoji} {category.label}
              </span>
              <strong>${amounts[index]}</strong>
            </span>
            <input
              type="number"
              min={0}
              max={WIND_FALL_AMOUNT}
              step={10}
              value={amounts[index]}
              onChange={(e) => update(index, Number(e.target.value))}
              data-testid={`alloc-${category.id}`}
              className="input input-sm input-bordered w-28"
              aria-label={`${category.label} allocation`}
            />
            <span className="text-base-content/50 text-xs">
              {category.hint}
            </span>
          </label>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>
          Total earmarked:{' '}
          <strong data-testid="alloc-total">
            {total} / {WIND_FALL_AMOUNT}
          </strong>
        </span>
      </div>
      <button
        type="button"
        onClick={() => onAllocate(amounts)}
        disabled={!complete}
        data-testid="frame-submit"
        className="btn btn-primary btn-sm self-end">
        Lock the accounts
      </button>
    </div>
  );
};

export const DonePanel: FC<{
  answers: ChoiceId[];
  allocations: Record<string, number>;
  onReset: () => void;
}> = ({ answers, allocations, onReset }) => (
  <div className="flex flex-col items-center gap-4 py-4">
    <div className="text-4xl">💰</div>
    <h2 className="text-lg font-semibold">Your mental ledger</h2>
    <div className="flex gap-6 text-sm">
      <span>
        Rational picks:{' '}
        <strong data-testid="score">
          {scoreFor(answers)} / {SCENARIOS.length}
        </strong>
      </span>
      <span>
        Windfall: <strong>${WIND_FALL_AMOUNT}</strong>
      </span>
    </div>
    <div className="border-base-300 w-full max-w-sm rounded-lg border p-3 text-sm">
      {allocationRows(allocations).map(({ category, amount }) => (
        <div
          key={category.id}
          className="border-base-200 flex items-center justify-between border-b py-1 last:border-0">
          <span>
            {category.emoji} {category.label}
          </span>
          <strong>${amount}</strong>
        </div>
      ))}
      <p className="text-base-content/60 mt-2 text-xs leading-relaxed">
        Each pot now has its own rule — a dollar in “Fun” is spent freely while
        the same dollar in “Savings” is guarded. The $1,000 is no longer one
        fungible pile.
      </p>
    </div>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);

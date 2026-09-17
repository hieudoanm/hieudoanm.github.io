import { FC, useCallback, useReducer, useState } from 'react';
import { MAX, MIN, TOTAL_ROUNDS } from './constants';
import { average } from './game';
import { createInitialState, gameReducer } from './reducer';

const SliderPrompt: FC<{
  itemLabel: string;
  prompt: string;
  value: number;
  onChange: (value: number) => void;
  onSubmit: () => void;
  submitLabel: string;
  testId: string;
}> = ({
  itemLabel,
  prompt,
  value,
  onChange,
  onSubmit,
  submitLabel,
  testId,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
    <div className="flex items-center gap-2 text-sm">
      <span className="text-2xl">{itemLabel}</span>
    </div>
    <p className="text-base-content/80 text-sm leading-relaxed">{prompt}</p>
    <input
      type="range"
      min={MIN}
      max={MAX}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      data-testid={testId}
      className="range range-primary"
    />
    <div className="text-base-content/60 flex items-center justify-between text-xs">
      <span>{MIN}</span>
      <span className="text-base-content text-lg font-bold">{value}</span>
      <span>{MAX}</span>
    </div>
    <button type="button" onClick={onSubmit} className="btn btn-primary btn-sm">
      {submitLabel}
    </button>
  </div>
);

export const EndowmentGame: FC = () => {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState
  );
  const [wta, setWta] = useState<number>(MIN);
  const [wtp, setWtp] = useState<number>(MIN);
  const { phase, round, item, result, results } = state;

  const submitWta = useCallback(() => {
    dispatch({ type: 'SUBMIT_WTA', value: wta });
  }, [wta]);
  const submitWtp = useCallback(() => {
    dispatch({ type: 'SUBMIT_WTP', value: wtp });
  }, [wtp]);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setWta(MIN);
    setWtp(MIN);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span className="flex items-center gap-1">
          {item.emoji} {item.name}
        </span>
      </div>

      {phase === 'wta' && (
        <SliderPrompt
          itemLabel={`${item.emoji} You own this ${item.name}.`}
          prompt="What is the minimum price you'd accept to sell it? (willingness to accept)"
          value={wta}
          onChange={setWta}
          onSubmit={submitWta}
          submitLabel="Submit WTA"
          testId="wta-slider"
        />
      )}

      {phase === 'wtp' && (
        <SliderPrompt
          itemLabel={`${item.emoji} Now imagine buying this ${item.name}.`}
          prompt="What is the maximum price you'd pay? (willingness to pay)"
          value={wtp}
          onChange={setWtp}
          onSubmit={submitWtp}
          submitLabel="Submit WTP"
          testId="wtp-slider"
        />
      )}

      {phase === 'reveal' && result && (
        <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4">
          <div className="text-3xl">{result.item.emoji}</div>
          <div className="flex gap-6 text-sm">
            <span>
              WTA: <strong>{result.wta}</strong>
            </span>
            <span>
              WTP: <strong>{result.wtp}</strong>
            </span>
            <span>
              Gap: <strong className="text-primary">{result.gap}</strong>
            </span>
          </div>
          <p className="text-base-content/80 max-w-sm text-center text-sm leading-relaxed">
            Owners demand more than buyers offer — the endowment effect. Once
            you own something, you value it more.
          </p>
          <button
            type="button"
            onClick={nextRound}
            className="btn btn-primary btn-sm">
            {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
          </button>
        </div>
      )}

      {phase === 'done' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-4xl">📊</div>
          <div className="text-lg">Endowment effect results</div>
          <div className="flex gap-6 text-sm">
            <span>
              Avg WTA:{' '}
              <strong>{average(results.map((r) => r.wta)).toFixed(1)}</strong>
            </span>
            <span>
              Avg WTP:{' '}
              <strong>{average(results.map((r) => r.wtp)).toFixed(1)}</strong>
            </span>
            <span>
              Avg gap:{' '}
              <strong>{average(results.map((r) => r.gap)).toFixed(1)}</strong>
            </span>
          </div>
          <p className="text-base-content/80 max-w-sm text-center text-sm leading-relaxed">
            The endowment effect violates the standard assumption that value is
            independent of ownership.
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn btn-primary btn-sm">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
EndowmentGame.displayName = 'EndowmentGame';

'use client';

import { FC, useCallback, useMemo, useReducer } from 'react';
import {
  ACCEPT_SCORE,
  MAX_INCOME,
  MAX_PRICE,
  MAX_QX,
  MIN_INCOME,
  MIN_PRICE,
  MIN_QX,
  QX_STEP,
} from './constants';
import { mrsAt, optimalBundle, priceRatio, score, utility } from './game';
import { createInitialState, gameReducer } from './reducer';
import {
  FeedbackPanel,
  HistoryPanel,
  PresetPicker,
  Slider,
  UtilityReadout,
} from './components';
import type { GoodType } from './types';

const qyFmt = (n: number): string =>
  Number.isInteger(n) ? String(n) : n.toFixed(2);

export const BudgetLineGame: FC = () => {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState
  );
  const { phase, income, px, py, goodType, qx, qy, result, attempts } = state;
  const disabled = phase === 'reveal';

  const params = useMemo(
    () => ({ income, px, py, alpha: state.alpha, goodType }),
    [income, px, py, state.alpha, goodType]
  );

  const derived = useMemo(() => {
    const opt = optimalBundle(params);
    const optU = utility(params, opt.x, opt.y);
    const curU = utility(params, qx, qy);
    const current = score(curU, optU);
    return { opt, optU, curU, current };
  }, [params, qx, qy]);

  const setPreset = useCallback(
    (next: GoodType) => dispatch({ type: 'SELECT_PRESET', goodType: next }),
    []
  );
  const setIncome = useCallback(
    (value: number) => dispatch({ type: 'SET_INCOME', value }),
    []
  );
  const setPx = useCallback(
    (value: number) => dispatch({ type: 'SET_PX', value }),
    []
  );
  const setPy = useCallback(
    (value: number) => dispatch({ type: 'SET_PY', value }),
    []
  );
  const setQx = useCallback(
    (value: number) => dispatch({ type: 'SET_QX', value }),
    []
  );
  const optimize = useCallback(() => dispatch({ type: 'OPTIMIZE' }), []);
  const tryAgain = useCallback(() => dispatch({ type: 'TRY_AGAIN' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const priceR = priceRatio(params);
  const mrs = mrsAt(params, qx, qy);
  const success = derived.current >= ACCEPT_SCORE;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <h2 className="text-primary text-sm font-bold">Budget constraint</h2>
          <PresetPicker
            value={goodType}
            disabled={disabled}
            onChange={setPreset}
          />
          <Slider
            testid="income"
            label="Income (I)"
            min={MIN_INCOME}
            max={MAX_INCOME}
            step={1}
            value={income}
            disabled={disabled}
            onChange={setIncome}
          />
          <Slider
            testid="px"
            label="Price of x (px)"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={1}
            value={px}
            disabled={disabled}
            onChange={setPx}
          />
          <Slider
            testid="py"
            label="Price of y (py)"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={1}
            value={py}
            disabled={disabled}
            onChange={setPy}
          />
          <p className="text-base-content/60 text-xs">
            Budget line: y = (I − px·x) / py
          </p>
        </div>

        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <h2 className="text-primary text-sm font-bold">Your bundle</h2>
          <Slider
            testid="qx"
            label="Quantity of x (qx)"
            min={MIN_QX}
            max={MAX_QX}
            step={QX_STEP}
            value={qx}
            disabled={disabled}
            onChange={setQx}
          />
          <label className="form-control">
            <span className="label-text mb-1">
              Quantity of y (qy, on budget)
            </span>
            <input
              data-testid="qy"
              type="number"
              value={qyFmt(qy)}
              readOnly
              className="input input-bordered input-sm"
            />
          </label>
          <UtilityReadout
            currentU={derived.curU}
            optU={derived.optU}
            mrs={mrs}
            priceRatio={priceR}
          />
          <button
            type="button"
            onClick={optimize}
            disabled={disabled}
            data-testid="optimize"
            className="btn btn-primary btn-sm">
            Optimize
          </button>
        </div>
      </div>

      {phase === 'reveal' && result && (
        <FeedbackPanel
          result={result}
          success={success}
          onTryAgain={tryAgain}
          onReset={reset}
        />
      )}

      <HistoryPanel attempts={attempts} />
    </div>
  );
};
BudgetLineGame.displayName = 'BudgetLineGame';

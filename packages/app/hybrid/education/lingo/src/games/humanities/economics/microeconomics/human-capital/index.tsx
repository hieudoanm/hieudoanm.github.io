'use client';

import { FC, useCallback, useMemo, useReducer } from 'react';
import {
  COST_MAX,
  COST_MIN,
  COST_STEP,
  R_MAX,
  R_MIN,
  TOTAL_CHALLENGES,
  W0_MAX,
  W0_MIN,
  W0_STEP,
  YEARS_MAX,
  YEARS_MIN,
} from './constants';
import { annualWage, optimalYears, pvCost, pvEarnings } from './game';
import { createInitialState, gameReducer } from './reducer';
import { ReadoutPanel, Slider, WageCurve } from './components';
import { DonePanel, RevealPanel } from './panels';

export const HumanCapitalGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, mode, round, r, costPerYear, w0, years, result, score } =
    state;
  const sandbox = mode === 'sandbox';
  const locked = phase !== 'choose';
  const paramsLocked = locked || !sandbox;

  const readout = useMemo(() => {
    const earnings = pvEarnings(years, w0, r);
    const cost = pvCost(years, costPerYear);
    return {
      annualWage: annualWage(years, w0),
      pvEarnings: earnings,
      pvCost: cost,
      npv: earnings - cost,
      optimalYears: optimalYears(w0, r, costPerYear),
    };
  }, [years, w0, r, costPerYear]);

  const setYears = useCallback(
    (value: number) => dispatch({ type: 'SET_YEARS', value }),
    []
  );
  const setR = useCallback(
    (value: number) => dispatch({ type: 'SET_R', value }),
    []
  );
  const setCost = useCallback(
    (value: number) => dispatch({ type: 'SET_COST', value }),
    []
  );
  const setW0 = useCallback(
    (value: number) => dispatch({ type: 'SET_W0', value }),
    []
  );
  const check = useCallback(() => dispatch({ type: 'CHECK' }), []);
  const back = useCallback(() => dispatch({ type: 'BACK_TO_CHOOSE' }), []);
  const start = useCallback(() => dispatch({ type: 'START_CHALLENGE' }), []);
  const advance = useCallback(() => dispatch({ type: 'NEXT_CHALLENGE' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          {sandbox ? 'Sandbox' : `Challenge ${round} / ${TOTAL_CHALLENGES}`}
        </span>
        <span>
          Score: <strong>{score}</strong>
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <h2 className="text-primary text-sm font-bold">Your choices</h2>
          <Slider
            testid="years"
            label="Years of schooling (S)"
            min={YEARS_MIN}
            max={YEARS_MAX}
            step={1}
            value={years}
            disabled={locked}
            onChange={setYears}
          />
          <Slider
            testid="discount-rate"
            label="Discount rate (r %)"
            min={R_MIN}
            max={R_MAX}
            step={1}
            value={r}
            disabled={paramsLocked}
            onChange={setR}
          />
          <Slider
            testid="school-cost"
            label="Cost per school year ($)"
            min={COST_MIN}
            max={COST_MAX}
            step={COST_STEP}
            value={costPerYear}
            disabled={paramsLocked}
            onChange={setCost}
          />
          <Slider
            testid="base-wage"
            label="Base wage without schooling (W0)"
            min={W0_MIN}
            max={W0_MAX}
            step={W0_STEP}
            value={w0}
            disabled={paramsLocked}
            onChange={setW0}
          />
          <p className="text-base-content/60 text-xs">
            Annual wage = W0 × (1.08)^S. A 40-year career starts after S years
            of schooling; earnings are discounted by (1 + r)^t and costs are
            paid up front as cost × S.
          </p>
        </div>

        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <h2 className="text-primary text-sm font-bold">Lifetime value</h2>
          <ReadoutPanel {...readout} />
          <WageCurve w0={w0} years={years} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={check}
          disabled={locked}
          data-testid="check"
          className="btn btn-primary btn-sm">
          Check
        </button>
        <button
          type="button"
          onClick={reset}
          data-testid="reset"
          className="btn btn-outline btn-sm">
          Reset
        </button>
      </div>

      {phase === 'reveal' && result && (
        <RevealPanel
          result={result}
          isLast={round === TOTAL_CHALLENGES}
          onBack={back}
          onStart={start}
          onNext={advance}
        />
      )}

      {phase === 'done' && <DonePanel score={score} onReset={reset} />}
    </div>
  );
};

HumanCapitalGame.displayName = 'HumanCapitalGame';

import { FC, useCallback, useReducer, useState } from 'react';
import {
  ACCEPT_RATIO,
  COST,
  COUNT,
  MAX_WAGE,
  MIN_WAGE,
  PRODUCTIVITY,
  TYPE_LABEL,
} from './constants';
import { createInitialState, gameReducer } from './reducer';
import { premiumFor, separatesPremium } from './game';
import type { Candidate, CandidateType } from './types';

const formatCurrency = (n: number): string => `$${n}`;
const formatSigned = (n: number): string =>
  n >= 0 ? `+$${n}` : `-$${Math.abs(n)}`;
const TYPE_EMOJI: Record<CandidateType, string> = {
  high: '🚀',
  low: '🐢',
};

const RevealPanel: FC<{
  w0: number;
  w1: number;
  candidates: Candidate[];
  onNext: () => void;
}> = ({ w0, w1, candidates, onNext }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-3xl">🧑‍💼</div>
    <div className="text-lg">Here&rsquo;s who applied</div>
    <p className="text-base-content/60 text-xs">
      Your offer: {formatCurrency(w0)} without education, {formatCurrency(w1)}{' '}
      with education.
    </p>
    <div className="text-base-content/50 flex w-full max-w-2xl justify-between gap-2 border-b pb-1 text-xs uppercase">
      <span>Candidate</span>
      <span>Education</span>
      <span>Wage</span>
      <span>Willingness</span>
      <span>Profit</span>
    </div>
    <ul className="w-full max-w-2xl">
      {candidates.map((c) => (
        <li
          key={c.id}
          data-testid={`candidate-row-${c.id}`}
          className="border-base-200 flex items-center justify-between gap-2 border-b py-2 text-sm last:border-0">
          <span>
            #{c.id + 1} {TYPE_EMOJI[c.type]} {TYPE_LABEL[c.type]}
          </span>
          <span className="text-base-content/60">
            {c.education === 1 ? '🎓 Educated' : '— Not educated'}
          </span>
          <span>{formatCurrency(c.wage)}</span>
          <span className={c.accepted ? 'text-success' : 'text-error'}>
            {c.accepted ? 'Hired' : 'Declined'}
          </span>
          <span className={c.profit >= 0 ? 'text-success' : 'text-error'}>
            {formatSigned(c.profit)}
          </span>
        </li>
      ))}
    </ul>
    <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
      See Results
    </button>
  </div>
);

const LESSON =
  'A costly signal separates good workers only if the wage premium exceeds the high type\u2019s cost but not the low type\u2019s. Set the premium wrong and you either pool or exclude.';

const ResultsScreen: FC<{
  premium: number;
  hiredCount: number;
  totalProfit: number;
  onReset: () => void;
}> = ({ premium, hiredCount, totalProfit, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">📊</div>
    <div className="text-lg">Job Market Results</div>
    <div className="flex gap-6 text-sm">
      <span>
        Signal premium: <strong>{formatCurrency(premium)}</strong>
      </span>
      <span>
        Hired:{' '}
        <strong>
          {hiredCount} / {COUNT}
        </strong>
      </span>
      <span>
        Firm profit: <strong>{formatSigned(totalProfit)}</strong>
      </span>
    </div>
    <div className="card border-base-content/10 max-w-md border p-4 text-center text-sm">
      {LESSON}
    </div>
    <button type="button" onClick={onReset} className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);

export const JobMarketGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [w0Input, setW0Input] = useState<number>(50);
  const [w1Input, setW1Input] = useState<number>(75);
  const { phase, w0, w1, candidates, totalProfit } = state;
  const hiredCount = candidates.filter((c) => c.accepted).length;

  const submitWages = useCallback(() => {
    dispatch({
      type: 'SUBMIT_WAGES',
      w0: Math.round(w0Input),
      w1: Math.round(w1Input),
    });
  }, [w0Input, w1Input]);
  const seeResults = useCallback(
    () => dispatch({ type: 'REVEAL_RESULTS' }),
    []
  );
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setW0Input(50);
    setW1Input(75);
  }, []);

  const premium = premiumFor(w0Input, w1Input);
  const separating = separatesPremium(premium);
  const slider = (
    label: string,
    testid: string,
    value: number,
    onChange: (v: number) => void
  ) => (
    <div className="flex items-center gap-2">
      <span className="w-44 shrink-0 text-sm">{label}</span>
      <input
        type="range"
        min={MIN_WAGE}
        max={MAX_WAGE}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        data-testid={testid}
        className="range range-primary flex-1"
      />
      <span className="text-primary w-12 text-right font-bold">
        {formatCurrency(value)}
      </span>
    </div>
  );
  const sliderRow1 = slider(
    'Wage, no education',
    'wage-slider-0',
    w0Input,
    setW0Input
  );
  const sliderRow2 = slider(
    'Wage, with education',
    'wage-slider-1',
    w1Input,
    setW1Input
  );

  return (
    <div className="flex flex-col gap-4">
      {phase === 'choose' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">
            You&rsquo;re a firm screening {COUNT} job candidates. Half produce{' '}
            {PRODUCTIVITY.high} (High) and half produce {PRODUCTIVITY.low}{' '}
            (Low), but you can&rsquo;t tell them apart before they signal.
          </p>
          <p className="text-base-content/60 text-xs">
            Candidates may earn education at a cost of{' '}
            {formatCurrency(COST.high)} (High) or {formatCurrency(COST.low)}{' '}
            (Low). They accept the job iff the wage is at least{' '}
            {Math.round(ACCEPT_RATIO * 100)}% of their productivity (willingness
            to work).
          </p>
          <div className="flex flex-col gap-2">
            {sliderRow1}
            {sliderRow2}
          </div>
          <p
            className={
              separating
                ? 'text-success text-xs'
                : 'text-base-content/60 text-xs'
            }>
            Signal premium: <strong>{formatCurrency(premium)}</strong>
            {separating
              ? ' — in the separating range; only High candidates get educated.'
              : ` — a separating premium sits between ${formatCurrency(COST.high)} and ${formatCurrency(COST.low)}.`}
          </p>
          <button
            type="button"
            onClick={submitWages}
            data-testid="submit-wages"
            className="btn btn-primary btn-sm self-start">
            Commit Wages
          </button>
        </div>
      )}

      {phase === 'reveal' && (
        <RevealPanel
          w0={w0}
          w1={w1}
          candidates={candidates}
          onNext={seeResults}
        />
      )}

      {phase === 'done' && (
        <ResultsScreen
          premium={premiumFor(w0, w1)}
          hiredCount={hiredCount}
          totalProfit={totalProfit}
          onReset={reset}
        />
      )}
    </div>
  );
};

JobMarketGame.displayName = 'JobMarketGame';

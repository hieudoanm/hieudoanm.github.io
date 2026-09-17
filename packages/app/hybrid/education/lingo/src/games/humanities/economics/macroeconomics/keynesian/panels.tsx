import type { FC } from 'react';
import { DELTA_G_MAX, MAX_SCORE } from './constants';
import { verdictFor } from './game';
import type { Verdict } from './game';
import { SliderField, StatBox, formatMpc, formatNum } from './primitives';
import type { RoundResult } from './types';

export const ChoosePanel: FC<{
  mpc: number;
  a: number;
  investment: number;
  government: number;
  gap: number;
  required: number;
  deltaG: number;
  onChangeDeltaG: (value: number) => void;
  onCheck: () => void;
}> = ({
  mpc,
  a,
  investment,
  government,
  gap,
  required,
  deltaG,
  onChangeDeltaG,
  onCheck,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <p className="text-sm">
      A recessionary gap of{' '}
      <strong className="text-error">{formatNum(gap)}</strong> holds output
      below target (MPC = {formatMpc(mpc)}, a = {a}, I = {investment}, G₀ ={' '}
      {government}). Raise government spending ΔG to close it.
    </p>
    <SliderField
      label="ΔG — government spending increase"
      testId="delta-g"
      value={deltaG}
      min={0}
      max={DELTA_G_MAX}
      step={1}
      onChange={onChangeDeltaG}
    />
    <p className="text-base-content/60 text-xs">
      Formula: ΔG = gap × (1 − MPC) = {formatNum(gap)} × {formatMpc(1 - mpc)} ={' '}
      <strong>{formatNum(required)}</strong>
    </p>
    <button
      type="button"
      onClick={onCheck}
      data-testid="check"
      className="btn btn-primary btn-sm self-start">
      Check
    </button>
  </div>
);

export const RevealStats: FC<{ result: RoundResult }> = ({ result }) => (
  <div className="grid w-full max-w-md grid-cols-2 gap-2 text-sm">
    <StatBox
      label="Required ΔG"
      value={formatNum(result.requiredDeltaG)}
      testId="required-delta-g"
    />
    <StatBox
      label="Your ΔG"
      value={formatNum(result.chosenDeltaG)}
      testId="chosen-delta-g"
    />
    <StatBox
      label="New equilibrium output"
      value={formatNum(result.newEquilibrium)}
      testId="equilibrium-output"
    />
    <StatBox
      label="Planned expenditure at target"
      value={formatNum(result.plannedExpenditure)}
      testId="planned-expenditure"
    />
    <StatBox
      label="Unplanned inventory change"
      value={formatNum(result.unplannedInventory)}
      testId="unplanned-inventory"
    />
    <StatBox
      label={`Score (max ${MAX_SCORE})`}
      value={formatNum(result.score)}
      testId="reveal-score"
    />
  </div>
);

const VERDICT_TEXT: Record<Verdict, { title: string; note: string }> = {
  closed: {
    title: 'Gap closed',
    note: 'Your ΔG lifts planned expenditure to exactly the target output — the economy rests on the 45° line.',
  },
  overshoot: {
    title: 'Overshoot',
    note: 'Too much government spending pushes planned expenditure above target, straining capacity and fueling inflation.',
  },
  under: {
    title: 'Under-delivery',
    note: 'Not enough stimulus — planned expenditure stays below target and the economy keeps operating with slack.',
  },
};

export const RevealPanel: FC<{
  result: RoundResult;
  isLast: boolean;
  onNext: () => void;
}> = ({ result, isLast, onNext }) => {
  const verdict = verdictFor(result.chosenDeltaG, result.requiredDeltaG);
  const meta = VERDICT_TEXT[verdict];
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-lg">{meta.title}</div>
      <RevealStats result={result} />
      <p className="text-base-content/60 max-w-sm text-center text-xs">
        {meta.note}
      </p>
      <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
        {isLast ? 'See Challenge Summary' : 'Next Round'}
      </button>
    </div>
  );
};

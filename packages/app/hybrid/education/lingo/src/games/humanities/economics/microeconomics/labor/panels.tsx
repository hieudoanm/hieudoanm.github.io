'use client';

import { FC, useState } from 'react';
import {
  fmt,
  currency,
  CurveSlider,
  DemandSupplyChart,
  MetricsCard,
  PresetButtons,
  Readout,
} from './components';
import { CURVE_RANGE, WAGE_STEP } from './constants';
import type {
  CurveKey,
  LaborCurve,
  LaborMetrics,
  QuizRoundResult,
  QuizScenario,
} from './types';

export const ExplorePanel: FC<{
  curve: LaborCurve;
  wMin: number;
  wageMax: number;
  metrics: LaborMetrics;
  onParam: (key: CurveKey, value: number) => void;
  onWage: (value: number) => void;
  onPreset: (id: string) => void;
}> = ({ curve, wMin, wageMax, metrics, onParam, onWage, onPreset }) => (
  <div className="grid gap-4 lg:grid-cols-2">
    <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
      <h2 className="text-base-content/80 text-sm font-semibold">
        Curves & wage floor
      </h2>
      <CurveSlider
        label={CURVE_RANGE.a.label}
        value={curve.a}
        min={CURVE_RANGE.a.min}
        max={CURVE_RANGE.a.max}
        step={CURVE_RANGE.a.step}
        testId="a-slider"
        onChange={(v) => onParam('a', v)}
      />
      <CurveSlider
        label={CURVE_RANGE.b.label}
        value={curve.b}
        min={CURVE_RANGE.b.min}
        max={CURVE_RANGE.b.max}
        step={CURVE_RANGE.b.step}
        testId="b-slider"
        onChange={(v) => onParam('b', v)}
      />
      <CurveSlider
        label={CURVE_RANGE.c.label}
        value={curve.c}
        min={CURVE_RANGE.c.min}
        max={CURVE_RANGE.c.max}
        step={CURVE_RANGE.c.step}
        testId="c-slider"
        onChange={(v) => onParam('c', v)}
      />
      <CurveSlider
        label={CURVE_RANGE.d.label}
        value={curve.d}
        min={CURVE_RANGE.d.min}
        max={CURVE_RANGE.d.max}
        step={CURVE_RANGE.d.step}
        testId="d-slider"
        onChange={(v) => onParam('d', v)}
      />
      <PresetButtons onPick={onPreset} />
      <div className="divider my-1 text-xs">Minimum wage</div>
      <CurveSlider
        label="Minimum wage (w_min)"
        value={wMin}
        min={0}
        max={wageMax}
        step={WAGE_STEP}
        testId="min-wage"
        onChange={onWage}
      />
    </div>
    <div className="flex flex-col gap-4">
      <MetricsCard metrics={metrics} />
      <DemandSupplyChart metrics={metrics} />
    </div>
  </div>
);

export const QuizPanel: FC<{
  round: number;
  total: number;
  scenario: QuizScenario;
  options: number[];
  onCheck: (index: number) => void;
}> = ({ round, total, scenario, options, onCheck }) => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Quiz round <strong>{round}</strong> / {total}
        </span>
        <span className="badge badge-primary badge-sm">{scenario.title}</span>
      </div>
      <p className="text-sm font-medium">{scenario.prompt}</p>
      <div className="text-base-content/70 border-base-200 rounded-lg border p-3 text-xs">
        Ld(w) = {scenario.a} − {scenario.b}·w &nbsp;•&nbsp; Ls(w) = {scenario.c}{' '}
        + {scenario.d}·w
      </div>
      <div className="grid gap-2 sm:grid-cols-4">
        {options.map((w, index) => (
          <button
            key={`${w}-${index}`}
            type="button"
            onClick={() => setSelected(index)}
            data-testid={`quiz-option-${index}`}
            className={
              selected === index ? 'btn btn-primary btn-sm' : 'btn btn-sm'
            }>
            ${fmt(w, 0)}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => selected !== null && onCheck(selected)}
          data-testid="check"
          disabled={selected === null}
          className="btn btn-primary btn-sm">
          Check
        </button>
      </div>
    </div>
  );
};

export const RevealPanel: FC<{
  result: QuizRoundResult;
  wStar: number;
  round: number;
  total: number;
  onNext: () => void;
}> = ({ result, wStar, round, total, onNext }) => {
  const last = round >= total;
  return (
    <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
      <div className="flex items-center gap-2 text-sm">
        <span className={result.correct ? 'text-success' : 'text-error'}>
          {result.correct ? '✓ Correct' : '✗ Not quite'}
        </span>
        <span className="text-base-content/60 text-xs">
          Equilibrium wage was ≈ {currency(wStar)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        <Readout
          label="Floor set"
          testId="selected-wage"
          value={`$${fmt(result.selected, 0)}`}
        />
        <Readout
          label="Right floor"
          testId="correct-wage"
          value={`$${fmt(result.correctWage, 0)}`}
        />
        <Readout
          label="Employment"
          testId="employment"
          value={fmt(result.employment, 0)}
        />
        <Readout
          label="Unemployment"
          testId="unemployment"
          value={fmt(result.unemployment, 0)}
        />
      </div>
      <p className="text-base-content/60 text-xs">
        {result.correct
          ? 'A floor at or below the market wage changes nothing; pushing it above equilibrium prices some workers out.'
          : 'Each dollar above equilibrium widens the gap: more workers want the higher wage, but firms hire fewer of them.'}
      </p>
      <button
        type="button"
        onClick={onNext}
        data-testid="next"
        className="btn btn-primary btn-sm">
        {last ? 'See Score' : 'Next Round'}
      </button>
    </div>
  );
};

export const SummaryPanel: FC<{
  results: QuizRoundResult[];
  score: number;
  total: number;
  onReset: () => void;
}> = ({ results, score, total, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">📊</div>
    <div className="text-lg">Quiz complete</div>
    <div className="flex flex-wrap justify-center gap-6 text-sm">
      <span>
        Score: <strong>{score}</strong> / {total}
      </span>
      <span>
        Binding floors:{' '}
        <strong>{results.filter((r) => r.unemployment > 0).length}</strong> /{' '}
        {results.length}
      </span>
    </div>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-primary btn-sm">
      Back to Lab
    </button>
  </div>
);

import type { FC } from 'react';
import { equilibrium } from './game';
import { SHIFTS } from './constants';
import { EquilibriumPlot } from './plot';
import type { Scenario, ScenarioResult, Shift } from './types';

const labelFor = (value: Shift): string =>
  value === 'left'
    ? 'Shift Left'
    : value === 'right'
      ? 'Shift Right'
      : 'No Change';

export const formatNumber = (n: number): string => n.toFixed(2);

export const ExplorerPanel: FC<{
  a: number;
  c: number;
  b: number;
  d: number;
  onAutonomous: (a: number) => void;
  onMoney: (c: number) => void;
  onStartQuiz: () => void;
}> = ({ a, c, b, d, onAutonomous, onMoney, onStartQuiz }) => {
  const eq = equilibrium(a, c, b, d);
  return (
    <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span>
            Autonomous spending <strong>a</strong> (fiscal: G↑ shifts IS right)
          </span>
          <input
            type="range"
            min={2}
            max={10}
            step={0.1}
            value={a}
            onChange={(e) => onAutonomous(Number(e.target.value))}
            data-testid="autonomous"
            className="range range-primary range-xs"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span>
            LM position <strong>c</strong> (money supply: M↑ shifts LM right)
          </span>
          <input
            type="range"
            min={0}
            max={2.5}
            step={0.05}
            value={c}
            onChange={(e) => onMoney(Number(e.target.value))}
            data-testid="money-supply"
            className="range range-primary range-xs"
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <span data-testid="equilibrium-output">
          Equilibrium output <strong>Y*</strong>: {formatNumber(eq.y)}
        </span>
        <span data-testid="equilibrium-rate">
          Equilibrium rate <strong>r*</strong>: {formatNumber(eq.r)}
        </span>
      </div>
      <EquilibriumPlot a={a} c={c} b={b} d={d} />
      <button
        type="button"
        data-testid="start-quiz"
        onClick={onStartQuiz}
        className="btn btn-primary btn-sm self-center">
        Start Policy Challenge
      </button>
    </div>
  );
};

export const QuizForm: FC<{
  scenario: Scenario;
  isShift: Shift | null;
  lmShift: Shift | null;
  onIs: (shift: Shift) => void;
  onLm: (shift: Shift) => void;
  onCheck: () => void;
}> = ({ scenario, isShift, lmShift, onIs, onLm, onCheck }) => {
  const ready = isShift !== null && lmShift !== null;
  return (
    <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
      <div data-testid="scenario" className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">{scenario.title}</h3>
        <p className="text-base-content/70 text-sm">{scenario.prompt}</p>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-semibold">Fiscal policy (shift IS)</p>
        <div className="grid grid-cols-3 gap-2">
          {SHIFTS.map((s) => (
            <button
              key={s}
              type="button"
              data-testid={`is-shift-${s}`}
              onClick={() => onIs(s)}
              className={`btn btn-sm ${isShift === s ? 'btn-primary' : ''}`}>
              {labelFor(s)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-semibold">Monetary policy (shift LM)</p>
        <div className="grid grid-cols-3 gap-2">
          {SHIFTS.map((s) => (
            <button
              key={s}
              type="button"
              data-testid={`lm-shift-${s}`}
              onClick={() => onLm(s)}
              className={`btn btn-sm ${lmShift === s ? 'btn-primary' : ''}`}>
              {labelFor(s)}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        data-testid="check"
        onClick={onCheck}
        disabled={!ready}
        className="btn btn-primary btn-sm self-center">
        Check Answer
      </button>
    </div>
  );
};

export const RevealPanel: FC<{
  result: ScenarioResult;
  totalRounds: number;
  onNext: () => void;
}> = ({ result, totalRounds, onNext }) => (
  <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4">
    <div className="text-3xl">{result.correct ? '🎯' : '📊'}</div>
    <p className="text-sm">
      Round {result.round}: {result.scenario.title}
    </p>
    <div className="text-sm">
      IS: {labelFor(result.isShift)}{' '}
      {result.isShift === result.expectedIs ? '✅' : '❌'} · LM:{' '}
      {labelFor(result.lmShift)}{' '}
      {result.lmShift === result.expectedLm ? '✅' : '❌'}
    </div>
    <p className="text-base-content/70 max-w-md text-center text-sm">
      {result.scenario.explanation}
    </p>
    <span data-testid="scenario-points" className="text-sm">
      You scored <strong>{result.points} / 2</strong>.
    </span>
    <button
      type="button"
      data-testid="next"
      onClick={onNext}
      className="btn btn-primary btn-sm">
      {result.round >= totalRounds ? 'See Summary' : 'Next Scenario'}
    </button>
  </div>
);

export const SummaryPanel: FC<{
  results: ScenarioResult[];
  score: number;
  totalRounds: number;
  onReset: () => void;
}> = ({ results, score, totalRounds, onReset }) => {
  const correct = results.filter((r) => r.correct).length;
  return (
    <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4">
      <div className="text-3xl">🏁</div>
      <p className="text-lg">Challenge complete</p>
      <div className="flex gap-6 text-sm">
        <span data-testid="summary-score">
          Score:{' '}
          <strong>
            {score} / {totalRounds * 2}
          </strong>
        </span>
        <span data-testid="summary-correct">
          Full marks:{' '}
          <strong>
            {correct} / {totalRounds}
          </strong>
        </span>
      </div>
      <p className="text-base-content/70 max-w-md text-center text-sm">
        Fiscal policy shifts IS along the money demand curve; monetary policy
        shifts LM along the goods market. Their interaction sets output and the
        interest rate.
      </p>
      <button
        type="button"
        data-testid="reset"
        onClick={onReset}
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};

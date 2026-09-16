import { FC } from 'react';
import { DemandChart } from './chart';
import {
  FIXED_COST,
  MC,
  MODES,
  MODE_ORDER,
  TOTAL_QUIZ_ROUNDS,
} from './constants';
import { quizDwlAtOptimum } from './game';
import type { Mode, QuizResult, QuizScenario } from './types';

const formatCurrency = (n: number): string => `$${n.toLocaleString('en-US')}`;

export const ModePicker: FC<{
  mode: Mode;
  onSelect: (mode: Mode) => void;
}> = ({ mode, onSelect }) => (
  <div data-testid="mode" className="flex flex-col gap-2">
    <span className="text-base-content/60 text-xs">Market structure</span>
    <div className="grid gap-2 sm:grid-cols-3">
      {MODE_ORDER.map((id) => {
        const meta = MODES[id];
        const active = mode === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            data-testid={`mode-${id}`}
            className={`card border p-3 text-left transition-colors ${
              active ? 'border-primary' : 'border-base-content/10'
            }`}>
            <span
              className={`block text-sm font-bold ${
                active ? 'text-primary' : ''
              }`}>
              {meta.emoji} {meta.label}
            </span>
            <span className="text-base-content/60 block text-xs">
              {meta.description}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

const QuizOptions: FC<{
  options: number[];
  selected: number | null;
  disabled: boolean;
  onSelect: (q: number) => void;
}> = ({ options, selected, disabled, onSelect }) => (
  <div className="flex flex-wrap gap-2" data-testid="quiz-options">
    {options.map((q) => (
      <button
        key={q}
        type="button"
        onClick={() => onSelect(q)}
        disabled={disabled}
        data-testid={`quiz-option-${q}`}
        className={`btn btn-sm ${selected === q ? 'btn-primary' : ''}`}>
        Q = {q}
      </button>
    ))}
  </div>
);

const QuizFeedback: FC<{
  result: QuizResult;
  scenario: QuizScenario;
  onNext: () => void;
}> = ({ result, scenario, onNext }) => {
  const last = result.round >= TOTAL_QUIZ_ROUNDS;
  return (
    <div data-testid="quiz-feedback" className="flex flex-col gap-2">
      <p
        className={`text-sm ${result.correctChoice ? 'text-success' : 'text-error'}`}>
        {result.correctChoice
          ? 'Correct — profit maximized.'
          : 'Not quite — profit is lower here.'}{' '}
        The best output is{' '}
        <span data-testid="best-q" className="font-bold">
          {result.correct}
        </span>{' '}
        units, where MR = MC.
      </p>
      <p className="text-base-content/70 text-sm">
        Profit at Q = {result.chosen}: {formatCurrency(result.profitAtChoice)}.
        Profit at Q = {result.correct}: {formatCurrency(result.profitAtCorrect)}
        .
      </p>
      <DemandChart
        a={scenario.a}
        b={scenario.b}
        mc={MC}
        q={result.correct}
        bestQ={result.correct}
      />
      <p className="text-base-content/60 text-xs">
        Deadweight-loss triangle at the optimum:{' '}
        {formatCurrency(quizDwlAtOptimum(scenario.a, scenario.b))}
      </p>
      <button
        type="button"
        onClick={onNext}
        className="btn btn-primary btn-sm self-end">
        {last ? 'See Results' : 'Next Question'}
      </button>
    </div>
  );
};

export const QuizPanel: FC<{
  round: number;
  scenario: QuizScenario;
  selected: number | null;
  answered: boolean;
  result: QuizResult | null;
  onSelect: (q: number) => void;
  onCheck: () => void;
  onNext: () => void;
}> = ({
  round,
  scenario,
  selected,
  answered,
  result,
  onSelect,
  onCheck,
  onNext,
}) => (
  <div
    className="card border-base-content/10 flex flex-col gap-3 border p-4"
    data-testid="quiz-panel">
    <div className="flex items-center justify-between text-sm">
      <span>
        Quiz round <strong>{round}</strong> / {TOTAL_QUIZ_ROUNDS}
      </span>
      <span className="text-base-content/60 text-xs">
        Pick the Q that maximizes profit (MR = MC)
      </span>
    </div>
    <p className="text-base-content/80 text-sm">
      Demand:{' '}
      <strong>
        P = {scenario.a} − {scenario.b}Q
      </strong>
      . MC = {MC}, ATC = {MC} + {FIXED_COST}/Q.
    </p>
    <QuizOptions
      options={scenario.options}
      selected={selected}
      disabled={answered}
      onSelect={onSelect}
    />
    {answered && result ? (
      <QuizFeedback result={result} scenario={scenario} onNext={onNext} />
    ) : (
      <button
        type="button"
        onClick={onCheck}
        disabled={selected === null}
        data-testid="check"
        className="btn btn-primary btn-sm self-end">
        Check Answer
      </button>
    )}
  </div>
);

export const SummaryPanel: FC<{
  score: number;
  total: number;
  bestProfit: number;
  onReset: () => void;
}> = ({ score, total, bestProfit, onReset }) => (
  <div
    data-testid="summary"
    className="card border-base-content/10 flex flex-col items-center gap-3 border p-6">
    <div className="text-4xl">🏁</div>
    <div className="text-lg font-bold">Quiz complete</div>
    <p className="text-sm">
      You answered <strong>{score}</strong> / {total} rounds correctly.
    </p>
    <p className="text-sm">
      Best lab profit you found:{' '}
      <strong className="text-primary">{formatCurrency(bestProfit)}</strong>
    </p>
    <p className="text-base-content/70 max-w-md text-center text-sm">
      Takeaway: differentiation gives a monopolistically competitive firm
      short-run pricing power (P &gt; MC), but free entry erodes it to zero
      long-run profit while a deadweight-loss triangle remains.
    </p>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);

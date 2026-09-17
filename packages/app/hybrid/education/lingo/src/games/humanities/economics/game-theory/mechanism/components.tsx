import type { FC } from 'react';
import { RULE_DESCRIPTIONS, RULE_LABELS, SHARE } from './constants';
import type { RoundResult, Rule } from './types';

const formatSigned = (n: number): string => (n >= 0 ? `+${n}` : `${n}`);

export const verdictFor = (
  rule: Rule,
  built: boolean,
  pivotal: boolean,
  reportedTruth: boolean
): string => {
  if (!built) {
    if (rule === 'equal' && !reportedTruth)
      return 'Under Equal Share you under-reported and the project was lost — everyone, including you, misses out.';
    return 'The project was not built. Your report helped decide that outcome.';
  }
  if (rule === 'equal') {
    if (!pivotal)
      return 'Under Equal Share you could free-ride by reporting 0 while still enjoying the built project.';
    return 'Under Equal Share your report helped build the project, but your flat payment was unaffected by what you reported.';
  }
  if (pivotal)
    return 'Your report was pivotal — the pivot (Clarke) tax charged exactly the externality you imposed on the others.';
  if (!reportedTruth)
    return 'Your report still allowed the project to build, but under the pivot rule honesty is your best move.';
  return 'Under the pivot rule, your truthful report was optimal and you paid no pivot tax.';
};

export const RevealPanel: FC<{
  result: RoundResult;
  onNext: () => void;
}> = ({ result, onNext }) => {
  const names = ['You', 'AI 1', 'AI 2'];
  const verdict = verdictFor(
    result.rule,
    result.built,
    result.pivotal,
    result.reportedTruth
  );
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="text-5xl">{result.built ? '🏗️' : '🚫'}</div>
      <div className="text-lg font-bold">
        {result.built ? 'Project built! 🎉' : 'Project not built'}
      </div>
      <div className="text-base-content/60 text-sm">
        Cost {SHARE * 3}, equal share {SHARE} each. Builds when sum of reports{' '}
        {result.built ? '≥' : '<'} 150.
      </div>
      <div className="border-base-300 w-full max-w-md rounded-lg border p-3 text-sm">
        <div className="border-base-200 grid grid-cols-3 border-b py-1 font-bold">
          <span>Agent</span>
          <span className="text-center">Report</span>
          <span className="text-center">Payment</span>
        </div>
        {result.reports.map((report, i) => (
          <div
            key={i}
            className="border-base-200 grid grid-cols-3 items-center border-b py-1 last:border-0">
            <span>{names[i]}</span>
            <span className="text-center">{report}</span>
            <span className="text-center">
              {result.built ? `${result.payments[i]}` : '0'}
              {result.pivotTaxes[i] > 0 && (
                <span className="text-warning ml-1">
                  (+{result.pivotTaxes[i]} tax)
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="text-sm">
        Your true value: <strong>{result.value}</strong> · Your report:{' '}
        <strong>{result.playerReport}</strong>
      </div>
      <div className="text-base-content/60 text-xs">
        Your net payoff:{' '}
        <strong
          className={result.playerPayoff >= 0 ? 'text-success' : 'text-error'}>
          {formatSigned(result.playerPayoff)}
        </strong>
      </div>
      <div className="alert alert-info w-full max-w-md text-sm">
        <span>{verdict}</span>
      </div>
      <button
        type="button"
        onClick={onNext}
        data-testid="next-round"
        className="btn btn-primary btn-sm">
        {result.round >= 5 ? 'See Results' : 'Next Round'}
      </button>
    </div>
  );
};

export const DonePanel: FC<{
  netTotal: number;
  onRestart: () => void;
}> = ({ netTotal, onRestart }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-5xl">📊</div>
    <div className="text-lg font-bold">Results</div>
    <div className="text-sm">
      Your net total across 5 rounds:{' '}
      <strong className="text-primary">{formatSigned(netTotal)}</strong>
    </div>
    <button
      type="button"
      onClick={onRestart}
      data-testid="play-again"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);

export const RuleCard: FC<{
  rule: Rule;
  selected: boolean;
  onClick: () => void;
}> = ({ rule, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={`rule-${rule}`}
    className={`card border p-3 text-left transition-colors ${
      selected
        ? 'border-primary ring-primary/30 ring-2'
        : 'border-base-content/10'
    }`}>
    <span className="text-lg">{RULE_LABELS[rule]}</span>
    <span className="text-base-content/60 block text-xs">
      {RULE_DESCRIPTIONS[rule]}
    </span>
  </button>
);

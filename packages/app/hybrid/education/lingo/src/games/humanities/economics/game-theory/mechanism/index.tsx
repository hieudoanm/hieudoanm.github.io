import { FC, useCallback, useReducer, useState } from 'react';
import { DonePanel, RevealPanel, RuleCard } from './components';
import { TOTAL_ROUNDS } from './constants';
import { clampReport } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { Rule } from './types';

const formatSigned = (n: number): string => (n >= 0 ? `+${n}` : `${n}`);

export const RevelationGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [report, setReport] = useState<string>('');
  const { phase, round, rule, value, result, netTotal } = state;

  const pickRule = useCallback(
    (next: Rule) => dispatch({ type: 'START_ROUND', rule: next }),
    []
  );
  const submit = useCallback(() => {
    const parsed = Number(report);
    if (!Number.isFinite(parsed)) return;
    dispatch({ type: 'SUBMIT_REPORT', report: clampReport(parsed) });
  }, [report]);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setReport('');
  }, []);

  const quick = (value: number, fraction: number): number =>
    clampReport(Math.round(value * fraction));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Your total: <strong>{formatSigned(netTotal)}</strong>
        </span>
      </div>

      {phase === 'choose' && !rule && (
        <div>
          <p className="text-base-content/60 mb-2 text-sm">
            A project costing 150 is built when the three of you together report
            at least 150. Each pays a 50 share when built. Choose the rule:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <RuleCard
              rule="equal"
              selected={false}
              onClick={() => pickRule('equal')}
            />
            <RuleCard
              rule="pivot"
              selected={false}
              onClick={() => pickRule('pivot')}
            />
          </div>
        </div>
      )}

      {phase === 'choose' && rule && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">
            Your private value of the project:{' '}
            <strong className="text-primary">{value}</strong>
          </p>
          <p className="text-base-content/60 text-xs">
            Report an integer 0–100. The AI agents report their true values.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setReport(String(value))}
              data-testid="quick-truth"
              className="btn btn-sm">
              Truth ({value})
            </button>
            <button
              type="button"
              onClick={() => setReport(String(quick(value, 0.5)))}
              data-testid="quick-half"
              className="btn btn-sm">
              Half
            </button>
            <button
              type="button"
              onClick={() => setReport('100')}
              data-testid="quick-max"
              className="btn btn-sm">
              Max (100)
            </button>
            <input
              type="number"
              min={0}
              max={100}
              value={report}
              onChange={(e) => setReport(e.target.value)}
              data-testid="report-input"
              placeholder="Report 0–100"
              className="input input-sm input-bordered w-28"
            />
            <button
              type="button"
              onClick={submit}
              data-testid="submit-report"
              className="btn btn-primary btn-sm">
              Submit Report
            </button>
          </div>
        </div>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel result={result} onNext={nextRound} />
      )}

      {phase === 'done' && <DonePanel netTotal={netTotal} onRestart={reset} />}
    </div>
  );
};
RevelationGame.displayName = 'RevelationGame';

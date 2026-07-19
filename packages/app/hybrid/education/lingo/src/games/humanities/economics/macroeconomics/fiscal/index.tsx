import { FC, useCallback, useReducer, useState } from 'react';
import {
  ChoosePanel,
  RevealPanel,
  ResultsTable,
  formatNum,
} from './components';
import { MAX_LEVER, ROUNDS } from './constants';
import { closingY, spendingMultiplier, taxCutMultiplier } from './game';
import { createInitialState, gameReducer } from './reducer';

export const FiscalGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [gInput, setGInput] = useState('0');
  const [tauInput, setTauInput] = useState('0');
  const { phase, round, gap, mpc, result, results, totalScore } = state;

  const g = Number(gInput);
  const tau = Number(tauInput);
  const canSubmit =
    Number.isInteger(g) &&
    Number.isInteger(tau) &&
    g >= 0 &&
    g <= MAX_LEVER &&
    tau >= 0 &&
    tau <= MAX_LEVER;

  const previewY = canSubmit ? closingY(g, tau, mpc) : null;
  const previewResidual = previewY === null ? null : previewY - gap;

  const submit = useCallback(() => {
    if (!canSubmit) return;
    dispatch({ type: 'SUBMIT', g, tau });
  }, [canSubmit, g, tau]);

  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setGInput('0');
    setTauInput('0');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {ROUNDS.length}
        </span>
        <span data-testid="gap-amount">
          Recessionary gap: <strong className="text-error">{gap}</strong>
        </span>
        <span data-testid="mpc-value">
          MPC: <strong>{mpc}</strong>
        </span>
        <span>
          Total score:{' '}
          <strong className="text-primary">{formatNum(totalScore)}</strong>
        </span>
      </div>

      {phase === 'choose' && (
        <ChoosePanel
          gap={gap}
          mpc={mpc}
          g={gInput}
          tau={tauInput}
          onGChange={setGInput}
          onTauChange={setTauInput}
          onSubmit={submit}
          canSubmit={canSubmit}
          spendingK={spendingMultiplier(mpc)}
          taxK={taxCutMultiplier(mpc)}
          previewY={previewY === null ? null : formatNum(previewY)}
          previewResidual={
            previewResidual === null ? null : formatNum(previewResidual)
          }
        />
      )}

      {phase === 'reveal' && result && (
        <RevealPanel
          result={result}
          isLast={round >= ROUNDS.length}
          onNext={nextRound}
        />
      )}

      {phase === 'done' && (
        <ResultsTable
          results={results}
          totalScore={totalScore}
          onReset={reset}
        />
      )}
    </div>
  );
};
FiscalGame.displayName = 'FiscalGame';

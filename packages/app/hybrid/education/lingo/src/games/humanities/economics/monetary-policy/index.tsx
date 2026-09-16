import { FC, useCallback, useReducer, useState } from 'react';
import {
  Header,
  ResultsPanel,
  RevealPanel,
  SettingPanel,
  TradeoffPanel,
} from './components';
import { SCENARIOS, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';

export const MonetaryPolicyGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [rate, setRate] = useState<string>('');
  const { phase, round, result, score, tradeoff } = state;

  const onCheck = useCallback(() => {
    if (rate.trim() === '') return;
    const value = Number(rate);
    if (!Number.isFinite(value)) return;
    dispatch({ type: 'CHECK_RATE', rate: value });
  }, [rate]);

  const onNext = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const onAdjust = useCallback(
    (delta: number) => dispatch({ type: 'ADJUST_RATE', delta }),
    []
  );
  const onReset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setRate('');
  }, []);

  const scenario = SCENARIOS[round - 1];

  return (
    <div className="flex flex-col gap-4">
      <Header
        round={round}
        total={TOTAL_ROUNDS}
        score={score}
        showStats={phase !== 'done'}
        onReset={onReset}
      />
      {phase === 'setting' && scenario && (
        <SettingPanel
          scenario={scenario}
          round={round}
          total={TOTAL_ROUNDS}
          rate={rate}
          onRate={setRate}
          onCheck={onCheck}
        />
      )}
      {phase === 'reveal' && result && (
        <RevealPanel
          result={result}
          lastRound={round >= TOTAL_ROUNDS}
          onNext={onNext}
        />
      )}
      {phase === 'tradeoff' && (
        <TradeoffPanel state={tradeoff} onAdjust={onAdjust} onFinish={onNext} />
      )}
      {phase === 'done' && <ResultsPanel score={score} onReset={onReset} />}
    </div>
  );
};

MonetaryPolicyGame.displayName = 'MonetaryPolicyGame';

import { FC, useCallback, useReducer, useState } from 'react';
import {
  BetaPanel,
  BetaResult,
  PortfolioPanel,
  PortfolioResult,
  Summary,
} from './components';
import {
  BETA_ROUNDS,
  MARKET_RETURN,
  MAX_WEIGHT,
  MIN_WEIGHT,
  PORTFOLIO_ROUNDS,
  RISK_FREE,
  TARGET_SIGMAS,
  TOTAL_ROUNDS,
} from './constants';
import { capmExpectedReturn, portfolioStats, roundType } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { PortfolioStats } from './types';

const DEFAULT_WEIGHT = 0.5;

export const CapmGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [weightText, setWeightText] = useState('0.50');
  const [betaText, setBetaText] = useState('');
  const { phase, round, result, totalScore } = state;

  const isPortfolioRound = roundType(round) === 'portfolio';
  const parsedWeight = Number(weightText);
  const weight = Number.isFinite(parsedWeight) ? parsedWeight : DEFAULT_WEIGHT;
  const live: PortfolioStats = portfolioStats(
    Math.min(MAX_WEIGHT, Math.max(MIN_WEIGHT, weight))
  );
  const target = isPortfolioRound ? TARGET_SIGMAS[round - 1] : 0;
  const beta = isPortfolioRound ? 0 : BETA_ROUNDS[round - PORTFOLIO_ROUNDS - 1];

  const handleWeightChange = useCallback((w: number) => {
    setWeightText(w.toFixed(2));
  }, []);
  const setWeightTextRaw = useCallback((t: string) => setWeightText(t), []);
  const setBetaTextRaw = useCallback((t: string) => setBetaText(t), []);
  const submitWeight = useCallback(() => {
    const w = Number(weightText);
    if (!Number.isFinite(w) || w < MIN_WEIGHT || w > MAX_WEIGHT) return;
    dispatch({ type: 'SUBMIT_PORTFOLIO', w });
  }, [weightText]);
  const submitBeta = useCallback(() => {
    const input = Number(betaText);
    if (!Number.isFinite(input)) return;
    dispatch({ type: 'SUBMIT_BETA', input });
  }, [betaText]);
  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setWeightText('0.50');
    setBetaText('');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Score: <strong>{totalScore.toFixed(2)}</strong>
        </span>
      </div>
      <p className="text-base-content/60 text-sm">
        {isPortfolioRound
          ? 'Bend the two-asset portfolio to reach the target risk, then price a stock with its beta.'
          : 'CAPM round — find the expected return the model implies for this beta.'}
      </p>

      {phase === 'choose' && isPortfolioRound && (
        <PortfolioPanel
          target={target}
          weight={weight}
          weightText={weightText}
          live={live}
          onWeightChange={handleWeightChange}
          onWeightTextChange={setWeightTextRaw}
          onSubmit={submitWeight}
        />
      )}

      {phase === 'choose' && !isPortfolioRound && (
        <BetaPanel
          beta={beta}
          inputText={betaText}
          onInputChange={setBetaTextRaw}
          onSubmit={submitBeta}
        />
      )}

      {phase === 'reveal' && result?.type === 'portfolio' && (
        <PortfolioResult
          result={result}
          round={round}
          totalRounds={TOTAL_ROUNDS}
          onNext={next}
        />
      )}

      {phase === 'reveal' && result?.type === 'beta' && (
        <BetaResult
          result={result}
          round={round}
          totalRounds={TOTAL_ROUNDS}
          onNext={next}
        />
      )}

      {phase === 'done' && <Summary totalScore={totalScore} onReset={reset} />}
    </div>
  );
};

CapmGame.displayName = 'CapmGame';

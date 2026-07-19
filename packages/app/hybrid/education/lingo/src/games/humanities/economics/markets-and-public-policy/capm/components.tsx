import { FC } from 'react';
import { MAX_WEIGHT, MIN_WEIGHT, WEIGHT_STEP } from './constants';
import type { PortfolioStats, RoundResult } from './types';

const pct = (n: number): string => `${(n * 100).toFixed(2)}%`;

const num = (n: number): string => n.toFixed(4);

const Readout: FC<{ label: string; value: string; testId?: string }> = ({
  label,
  value,
  testId,
}) => (
  <div
    data-testid={testId}
    className="flex items-center justify-between px-3 py-1.5">
    <span className="text-base-content/60">{label}</span>
    <strong>{value}</strong>
  </div>
);

const NextButton: FC<{
  round: number;
  totalRounds: number;
  onNext: () => void;
}> = ({ round, totalRounds, onNext }) => (
  <button
    type="button"
    onClick={onNext}
    data-testid="next-round"
    className="btn btn-primary btn-sm">
    {round >= totalRounds ? 'See Results' : 'Next Round'}
  </button>
);

export const PortfolioPanel: FC<{
  target: number;
  weight: number;
  weightText: string;
  live: PortfolioStats;
  onWeightChange: (w: number) => void;
  onWeightTextChange: (t: string) => void;
  onSubmit: () => void;
}> = ({
  target,
  weight,
  weightText,
  live,
  onWeightChange,
  onWeightTextChange,
  onSubmit,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <p className="text-sm">
      Target risk σ: <strong className="text-primary">{pct(target)}</strong>.{' '}
      Allocate wealth between the stock and the bond, then submit to score.
    </p>
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm">w = {weight.toFixed(2)}</span>
      <input
        type="range"
        data-testid="weight-slider"
        min={MIN_WEIGHT}
        max={MAX_WEIGHT}
        step={WEIGHT_STEP}
        value={weight}
        onChange={(e) => onWeightChange(Number(e.target.value))}
        className="range range-primary range-sm flex-1"
      />
      <input
        type="number"
        data-testid="weight-input"
        min={MIN_WEIGHT}
        max={MAX_WEIGHT}
        step={WEIGHT_STEP}
        value={weightText}
        onChange={(e) => onWeightTextChange(e.target.value)}
        className="input input-bordered input-sm w-24"
      />
      <button
        type="button"
        data-testid="submit-weight"
        onClick={onSubmit}
        className="btn btn-primary btn-sm">
        Submit
      </button>
    </div>
    <div className="border-base-200 divide-base-200 flex w-full max-w-xs flex-col divide-y rounded-lg border text-xs">
      <Readout label="E[r_p]" value={pct(live.eR)} testId="live-er" />
      <Readout label="σ_p" value={pct(live.sigma)} testId="live-sigma" />
      <Readout label="Sharpe" value={num(live.sharpe)} testId="live-sharpe" />
    </div>
  </div>
);

export const BetaPanel: FC<{
  beta: number;
  inputText: string;
  onInputChange: (t: string) => void;
  onSubmit: () => void;
}> = ({ beta, inputText, onInputChange, onSubmit }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <p className="text-sm">
      This stock has beta{' '}
      <strong className="text-primary">{beta.toFixed(1)}</strong>. CAPM says
      E[r_i] = r_f + β × (r_m − r_f). Enter the implied expected return as a
      decimal (e.g. 0.065).
    </p>
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="number"
        data-testid="beta-input"
        step={0.005}
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="0.065"
        className="input input-bordered input-sm w-28"
      />
      <button
        type="button"
        data-testid="submit-beta"
        onClick={onSubmit}
        className="btn btn-primary btn-sm">
        Submit
      </button>
    </div>
  </div>
);

export const PortfolioResult: FC<{
  result: RoundResult;
  round: number;
  totalRounds: number;
  onNext: () => void;
}> = ({ result, round, totalRounds, onNext }) => (
  <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 text-center">
    <div className="text-3xl">{result.onTarget ? '🎯' : '🥲'}</div>
    <p className="text-sm">
      {result.onTarget
        ? 'On target — this mix sits on the efficient frontier.'
        : 'Off target — adjust w to reach the target risk.'}
    </p>
    <div className="border-base-200 divide-base-200 flex w-full max-w-xs flex-col divide-y rounded-lg border text-xs">
      <Readout label="Your weight w" value={result.w?.toFixed(2) ?? '—'} />
      <Readout
        label="E[r_p]"
        value={pct(result.stats?.eR ?? 0)}
        testId="result-er"
      />
      <Readout
        label="σ_p"
        value={pct(result.stats?.sigma ?? 0)}
        testId="result-sigma"
      />
      <Readout label="Target σ" value={pct(result.target ?? 0)} />
      <Readout
        label="Sharpe"
        value={num(result.stats?.sharpe ?? 0)}
        testId="result-sharpe"
      />
      <Readout
        label="Round score"
        value={`${result.score.toFixed(2)}`}
        testId="result-score"
      />
    </div>
    <NextButton round={round} totalRounds={totalRounds} onNext={onNext} />
  </div>
);

export const BetaResult: FC<{
  result: RoundResult;
  round: number;
  totalRounds: number;
  onNext: () => void;
}> = ({ result, round, totalRounds, onNext }) => (
  <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 text-center">
    <div className="text-3xl">{result.score >= 5 ? '🎯' : '🧭'}</div>
    <p className="text-sm">
      {result.score >= 5
        ? 'Spot on — CAPM prices that beta exactly.'
        : 'Not quite — the model pins the fair expected return.'}
    </p>
    <div className="border-base-200 divide-base-200 flex w-full max-w-xs flex-col divide-y rounded-lg border text-xs">
      <Readout label="Beta β" value={result.beta?.toFixed(1) ?? '—'} />
      <Readout
        label="Your guess"
        value={pct(result.input ?? 0)}
        testId="result-input"
      />
      <Readout
        label="CAPM model"
        value={pct(result.model ?? 0)}
        testId="result-model"
      />
      <Readout
        label="Round score"
        value={`${result.score.toFixed(2)}`}
        testId="result-score"
      />
    </div>
    <NextButton round={round} totalRounds={totalRounds} onNext={onNext} />
  </div>
);

export const Summary: FC<{
  totalScore: number;
  onReset: () => void;
}> = ({ totalScore, onReset }) => (
  <div className="flex flex-col items-center gap-4 text-center">
    <div className="text-4xl">📈</div>
    <p className="text-lg">
      Final score: <strong>{totalScore.toFixed(2)}</strong>
    </p>
    <div className="card border-base-content/10 flex max-w-xl flex-col gap-2 border p-5 text-left text-sm">
      <p>
        <strong>Efficient frontier:</strong> the set of portfolios offering the
        best expected return for each level of risk — traced here by mixing the
        stock and the bond.
      </p>
      <p>
        <strong>Capital market line:</strong> combining a frontier portfolio
        with the risk-free asset turns the curved frontier into a straight line,
        the best risk-return trade-off available.
      </p>
      <p>
        <strong>Only systematic risk is priced:</strong> CAPM rewards beta, the
        market-wide risk that diversification cannot remove, not specific risk.
      </p>
      <p>
        <strong>Diversification:</strong> because the stock and bond are
        imperfectly correlated, a blend has a σ_p below the average of its parts
        — the free lunch of diversification.
      </p>
    </div>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);

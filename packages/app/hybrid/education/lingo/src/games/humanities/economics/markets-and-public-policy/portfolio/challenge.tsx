import { FC } from 'react';
import { TOTAL_ROUNDS } from './constants';
import { challengeSigma } from './game';
import type { ChallengeConfig, ChallengeResult } from './types';

const pct = (n: number): string => `${(n * 100).toFixed(2)}%`;

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
  onNext: () => void;
}> = ({ round, onNext }) => (
  <button
    type="button"
    data-testid="next-round"
    onClick={onNext}
    className="btn btn-primary btn-sm">
    {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
  </button>
);

const ChallengeGoal: FC<{ config: ChallengeConfig; weight: number }> = ({
  config,
  weight,
}) => (
  <div className="border-base-200 divide-base-200 flex w-full max-w-xs flex-col divide-y rounded-lg border text-xs">
    {config.mode === 'target-return' ? (
      <Readout
        label="Target return"
        value={pct(config.targetReturn ?? 0)}
        testId="target-return"
      />
    ) : (
      <Readout label="Goal" value="Minimum variance" testId="target-return" />
    )}
    <Readout
      label="σ_p of your mix"
      value={pct(challengeSigma(config, weight))}
      testId="challenge-sigma"
    />
  </div>
);

const ChallengeIntro: FC<{ config: ChallengeConfig }> = ({ config }) => (
  <p className="text-sm">
    Separate two assets — A (μ {pct(config.mu1)}, σ {pct(config.sigma1)}) and B
    (μ {pct(config.mu2)}, σ {pct(config.sigma2)}) with ρ = {config.rho}. Pick
    the weight pair closest to the{' '}
    {config.mode === 'min-variance'
      ? 'minimum-variance portfolio.'
      : 'portfolio hitting the target return.'}
  </p>
);

const ChallengeWeight: FC<{
  weight: number;
  onWeight: (w: number) => void;
}> = ({ weight, onWeight }) => (
  <label className="flex flex-col gap-1 text-xs">
    <span className="text-base-content/70">
      Weight on asset A: {weight.toFixed(2)}
    </span>
    <input
      type="range"
      data-testid="challenge-weight"
      min={0}
      max={1}
      step={0.05}
      value={weight}
      onChange={(e) => onWeight(Number(e.target.value))}
      className="range range-primary range-sm max-w-xs"
    />
  </label>
);

export const ChallengePanel: FC<{
  config: ChallengeConfig;
  weight: number;
  onWeight: (w: number) => void;
  onCheck: () => void;
}> = ({ config, weight, onWeight, onCheck }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <ChallengeIntro config={config} />
    <ChallengeGoal config={config} weight={weight} />
    <ChallengeWeight weight={weight} onWeight={onWeight} />
    <div className="flex gap-2">
      <button
        type="button"
        data-testid="check"
        onClick={onCheck}
        className="btn btn-primary btn-sm">
        Check
      </button>
    </div>
  </div>
);

const ChallengeStats: FC<{ result: ChallengeResult }> = ({ result }) => (
  <div className="border-base-200 divide-base-200 flex w-full max-w-xs flex-col divide-y rounded-lg border text-xs">
    <Readout label="Your weight" value={result.playerW.toFixed(2)} />
    <Readout
      label="Ideal weight"
      value={result.idealW.toFixed(2)}
      testId="ideal-weight"
    />
    <Readout label="σ_p of your mix" value={pct(result.sigma)} />
    <Readout
      label="Round score"
      value={result.score.toFixed(2)}
      testId="result-score"
    />
  </div>
);

export const ChallengeResultView: FC<{
  result: ChallengeResult;
  round: number;
  onNext: () => void;
}> = ({ result, round, onNext }) => (
  <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 text-center">
    <div className="text-3xl">{result.score >= 5 ? '🎯' : '🧮'}</div>
    <p className="text-sm">
      {result.score >= 5
        ? 'Dead on — that weight is the optimal portfolio.'
        : 'Close — the ideal weight is on the frontier.'}
    </p>
    <ChallengeStats result={result} />
    <NextButton round={round} onNext={onNext} />
  </div>
);

const SummaryPoints: FC = () => (
  <div className="card border-base-content/10 flex max-w-xl flex-col gap-2 border p-5 text-left text-sm">
    <p>
      <strong>1/√N rule:</strong> splitting wealth across N uncorrelated assets
      of equal risk σ drives portfolio risk to σ/√N — idiosyncratic risk shrinks
      away.
    </p>
    <p>
      <strong>Systematic floor:</strong> risk that is common to every asset
      cannot be diversified; σ_p flattens at the systematic floor however far N
      grows.
    </p>
    <p>
      <strong>Correlation is the lever:</strong> the lower the average
      correlation, the larger the diversification benefit and the deeper the
      efficient frontier’s bend.
    </p>
  </div>
);

export const SummaryView: FC<{
  totalScore: number;
  onReset: () => void;
}> = ({ totalScore, onReset }) => (
  <div className="flex flex-col items-center gap-4 text-center">
    <div className="text-4xl">📉</div>
    <p className="text-lg">
      Final score: <strong>{totalScore.toFixed(2)}</strong> /{' '}
      {(TOTAL_ROUNDS * 5).toFixed(0)}
    </p>
    <SummaryPoints />
    <button
      type="button"
      data-testid="reset"
      onClick={onReset}
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);

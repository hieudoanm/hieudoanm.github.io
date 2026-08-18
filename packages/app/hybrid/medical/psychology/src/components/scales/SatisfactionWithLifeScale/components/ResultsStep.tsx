import { FC } from 'react';

import { interpretSwlsScore, SWLS_ITEMS } from '../utils';

interface ResultsStepProps {
  responses: number[];
  onReset: () => void;
}

export const ResultsStep: FC<ResultsStepProps> = ({ responses, onReset }) => {
  const score = responses.reduce((total, value) => total + value, 0);
  const interpretation = interpretSwlsScore(score);
  const max = SWLS_ITEMS.length * 7;

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="bg-base-200 border-base-300 rounded-box border p-4 text-center">
        <p className="text-base-content/40 text-[10px] tracking-widest uppercase">
          Life Satisfaction Score
        </p>
        <p className="mt-1 font-mono text-xl font-normal">
          {score} / {max}
        </p>
      </div>
      <div className="bg-base-200 border-base-300 rounded-box border p-4 text-center">
        <p className="text-base-content/40 text-[10px] tracking-widest uppercase">
          Interpretation
        </p>
        <p className="mt-1 text-sm font-medium">
          {interpretation.label} ({interpretation.range})
        </p>
      </div>
      <progress
        className="progress progress-primary w-full"
        value={score}
        max={max}
      />
      <div className="alert text-xs">
        The Satisfaction With Life Scale is a self-report measure of global
        cognitive judgment of life satisfaction and is not a clinical
        diagnostic.
      </div>
      <button className="btn btn-outline w-full" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
};

ResultsStep.displayName = 'ResultsStep';

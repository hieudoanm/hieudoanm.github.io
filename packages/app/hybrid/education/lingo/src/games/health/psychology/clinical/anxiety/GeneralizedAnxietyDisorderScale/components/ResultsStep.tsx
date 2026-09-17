import { FC } from 'react';

import { computeGadScore, interpretGadScore, GAD_MAX } from '../utils';

interface ResultsStepProps {
  responses: number[];
  onReset: () => void;
}

export const ResultsStep: FC<ResultsStepProps> = ({ responses, onReset }) => {
  const score = computeGadScore(responses);
  const interpretation = interpretGadScore(score);

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="bg-base-200 border-base-300 rounded-box border p-4 text-center">
        <p className="text-base-content/40 text-[10px] tracking-widest uppercase">
          Anxiety Severity Score
        </p>
        <p className="mt-1 font-mono text-xl font-normal">
          {score} / {GAD_MAX}
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
        max={GAD_MAX}
      />
      <div className="alert text-xs">
        A score of 10 or higher is the standard threshold for clinically
        significant anxiety. The GAD-7 is a screening tool for self-reflection
        and is not a diagnostic.
      </div>
      <button className="btn btn-outline w-full" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
};

ResultsStep.displayName = 'ResultsStep';

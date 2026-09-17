import { FC } from 'react';

import {
  computePhqScore,
  hasPhqSelfHarmThoughts,
  interpretPhqScore,
  PHQ_MAX,
} from '../utils';

interface ResultsStepProps {
  responses: number[];
  onReset: () => void;
}

export const ResultsStep: FC<ResultsStepProps> = ({ responses, onReset }) => {
  const score = computePhqScore(responses);
  const interpretation = interpretPhqScore(score);
  const selfHarm = hasPhqSelfHarmThoughts(responses);

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="bg-base-200 border-base-300 rounded-box border p-4 text-center">
        <p className="text-base-content/40 text-[10px] tracking-widest uppercase">
          Depression Severity Score
        </p>
        <p className="mt-1 font-mono text-xl font-normal">
          {score} / {PHQ_MAX}
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
        max={PHQ_MAX}
      />
      {selfHarm && (
        <div className="alert alert-warning text-xs">
          You indicated thoughts that you would be better off dead or of hurting
          yourself. Please reach out to a qualified mental health professional
          or a crisis line (e.g., 988) for support.
        </div>
      )}
      <div className="alert text-xs">
        The PHQ-9 is a public-domain screening tool for depression severity over
        the past two weeks. It is for self-reflection and is not a clinical
        diagnostic.
      </div>
      <button className="btn btn-outline w-full" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
};

ResultsStep.displayName = 'ResultsStep';

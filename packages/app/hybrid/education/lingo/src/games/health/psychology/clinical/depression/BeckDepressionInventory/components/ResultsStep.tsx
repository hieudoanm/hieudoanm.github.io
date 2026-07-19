import { FC } from 'react';

import {
  computeBdiScore,
  hasBdiSuicidalThoughts,
  interpretBdiScore,
} from '../utils';

interface ResultsStepProps {
  selected: number[];
  onReset: () => void;
}

export const ResultsStep: FC<ResultsStepProps> = ({ selected, onReset }) => {
  const score = computeBdiScore(selected);
  const interpretation = interpretBdiScore(score);
  const suicidal = hasBdiSuicidalThoughts(selected);

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="bg-base-200 border-base-300 rounded-box border p-4 text-center">
        <p className="text-base-content/40 text-[10px] tracking-widest uppercase">
          Depression Severity Score
        </p>
        <p className="mt-1 font-mono text-xl font-normal">{score} / 63</p>
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
        max={63}
      />
      {suicidal && (
        <div className="alert alert-warning text-xs">
          You indicated some level of suicidal thoughts or wishes. Please reach
          out to a qualified mental health professional or a crisis line (e.g.,
          988) for support.
        </div>
      )}
      <div className="alert text-xs">
        The Beck Depression Inventory–II is a self-report measure of depression
        severity over the past two weeks. It is not a diagnostic tool; only a
        qualified professional can diagnose depression.
      </div>
      <button className="btn btn-outline w-full" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
};

ResultsStep.displayName = 'ResultsStep';

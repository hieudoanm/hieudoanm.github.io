import { FC } from 'react';

import {
  DAS_SUBSCALE_MAX,
  DAS_TOTAL_MAX,
  computeDasScores,
  interpretDasTotal,
  type DasScores,
  type DasSubscale,
} from '../utils';

interface ResultsStepProps {
  responses: number[];
  onReset: () => void;
}

const SUBSCALES: Array<{ key: DasSubscale; label: string }> = [
  { key: 'consensus', label: 'Consensus' },
  { key: 'satisfaction', label: 'Satisfaction' },
  { key: 'cohesion', label: 'Cohesion' },
  { key: 'affectional', label: 'Affectional Expression' },
];

export const ResultsStep: FC<ResultsStepProps> = ({ responses, onReset }) => {
  const scores: DasScores = computeDasScores(responses);

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="bg-base-200 border-base-300 rounded-box border p-4 text-center">
        <p className="text-base-content/40 text-[10px] tracking-widest uppercase">
          Dyadic Adjustment Score
        </p>
        <p className="mt-1 font-mono text-xl font-normal">
          {scores.total} / {DAS_TOTAL_MAX}
        </p>
        <p className="mt-1 text-xs">{interpretDasTotal(scores.total)}</p>
      </div>
      <div className="space-y-3">
        {SUBSCALES.map(({ key, label }) => (
          <div key={key}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span>{label}</span>
              <span className="font-mono">
                {scores[key]} / {DAS_SUBSCALE_MAX[key]}
              </span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={scores[key]}
              max={DAS_SUBSCALE_MAX[key]}
            />
          </div>
        ))}
      </div>
      <div className="alert text-xs">
        Scores range from 0 to 151; 101 or lower indicates relational distress
        (Prouty et al., 2000). This scale is for self-reflection and is not a
        clinical diagnostic.
      </div>
      <button className="btn btn-outline w-full" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
};

ResultsStep.displayName = 'ResultsStep';

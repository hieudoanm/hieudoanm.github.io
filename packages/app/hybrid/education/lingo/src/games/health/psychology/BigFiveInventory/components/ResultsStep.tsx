import { FC } from 'react';

import {
  computeBigFiveScores,
  FACTOR_INFO,
  factorLevel,
  LEVEL_INFO,
  type BigFiveFactor,
  type BigFiveScores,
} from '../utils';

interface ResultsStepProps {
  responses: number[];
  onReset: () => void;
}

const FACTOR_KEYS: BigFiveFactor[] = [
  'extraversion',
  'agreeableness',
  'conscientiousness',
  'neuroticism',
  'openness',
];

export const ResultsStep: FC<ResultsStepProps> = ({ responses, onReset }) => {
  const scores: BigFiveScores = computeBigFiveScores(responses);

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="space-y-3">
        {FACTOR_KEYS.map((key) => {
          const level = factorLevel(scores[key]);
          return (
            <div key={key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>
                  {FACTOR_INFO[key].label}{' '}
                  <span className="badge badge-ghost badge-xs font-mono normal-case">
                    {level}
                  </span>
                </span>
                <span className="font-mono">{scores[key].toFixed(2)} / 5</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value={scores[key]}
                max={5}
              />
              <p className="text-base-content/50 mt-1 text-[10px]">
                {FACTOR_INFO[key].description} {LEVEL_INFO[level]}
              </p>
            </div>
          );
        })}
      </div>
      <div className="alert text-xs">
        Each score is the average of its factor&apos;s items on a 1–5 scale,
        with reverse-keyed items scored in reverse. Levels are relative to the
        midpoint of 3; this tool is for self-reflection and not a clinical
        diagnostic.
      </div>
      <button className="btn btn-outline w-full" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
};

ResultsStep.displayName = 'ResultsStep';

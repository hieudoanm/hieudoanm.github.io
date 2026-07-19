import { FC } from 'react';

import {
  ATTACHMENT_STYLE_INFO,
  attachmentStyle,
  computeEcrScores,
  type EcrScores,
} from '../utils';

interface ResultsStepProps {
  responses: number[];
  onReset: () => void;
}

const STAT_LABELS: Array<{ key: 'anxiety' | 'avoidance'; label: string }> = [
  { key: 'anxiety', label: 'Attachment Anxiety' },
  { key: 'avoidance', label: 'Attachment Avoidance' },
];

export const ResultsStep: FC<ResultsStepProps> = ({ responses, onReset }) => {
  const scores: EcrScores = computeEcrScores(responses);
  const style = attachmentStyle(scores.anxiety, scores.avoidance);

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="space-y-3">
        {STAT_LABELS.map(({ key, label }) => (
          <div key={key}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span>{label}</span>
              <span className="font-mono">{scores[key].toFixed(2)} / 7</span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={scores[key]}
              max={7}
            />
          </div>
        ))}
      </div>
      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-xs font-semibold tracking-widest uppercase">
          {style} style
        </p>
        <p className="mt-1 text-xs">{ATTACHMENT_STYLE_INFO[style]}</p>
      </div>
      <div className="alert text-xs">
        Scores are dimensional means on a 1–7 scale; the 4-point midpoint is
        used only to label the style. This tool is for self-reflection and is
        not a clinical diagnostic.
      </div>
      <button className="btn btn-outline w-full" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
};

ResultsStep.displayName = 'ResultsStep';

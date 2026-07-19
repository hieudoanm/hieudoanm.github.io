import { FC, useState } from 'react';

import { OptionsStep } from './components/OptionsStep';
import { ResultsStep } from './components/ResultsStep';
import { DAS_ITEMS } from './utils';

const STEP_TITLES = [
  'Agreement · 1–15',
  'Interaction · 16–24',
  'Frequency · 25–30',
  'Happiness · 31–32',
];
const STEP_BOUNDS: Array<[number, number]> = [
  [0, 15],
  [15, 24],
  [24, 30],
  [30, 32],
];

export const DyadicAdjustmentScale: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<number[]>(() =>
    DAS_ITEMS.map(() => -1)
  );

  const isResults = step === STEP_TITLES.length;
  const [start, end] = STEP_BOUNDS[step] ?? [0, 0];
  const stepValues = responses.slice(start, end);
  const stepComplete = stepValues.every((value) => value >= 0);
  const progress = isResults ? 100 : (step / STEP_TITLES.length) * 100;

  const setValue = (index: number, value: number) =>
    setResponses((prev) =>
      prev.map((val, i) => (i === start + index ? value : val))
    );

  const reset = () => {
    setStep(0);
    setResponses(DAS_ITEMS.map(() => -1));
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col gap-4">
      <div className="space-y-1">
        <progress
          className="progress progress-primary w-full"
          value={progress}
          max={100}
        />
        <div className="flex items-center justify-between text-xs opacity-60">
          <span>
            {isResults
              ? 'Results'
              : `${STEP_TITLES[step]} · Step ${step + 1} of ${STEP_TITLES.length}`}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {!isResults && (
        <OptionsStep
          items={DAS_ITEMS.slice(start, end)}
          values={stepValues}
          onChange={setValue}
        />
      )}
      {isResults && <ResultsStep responses={responses} onReset={reset} />}

      <div className="mt-auto flex items-center justify-between pt-4">
        {step > 0 && !isResults ? (
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setStep((s) => s - 1)}>
            ← Back
          </button>
        ) : (
          <span />
        )}
        {!isResults && (
          <button
            className="btn btn-primary btn-sm ml-auto"
            disabled={!stepComplete}
            onClick={() => setStep((s) => s + 1)}>
            {step === STEP_TITLES.length - 1 ? 'See Results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
};

DyadicAdjustmentScale.displayName = 'DyadicAdjustmentScale';

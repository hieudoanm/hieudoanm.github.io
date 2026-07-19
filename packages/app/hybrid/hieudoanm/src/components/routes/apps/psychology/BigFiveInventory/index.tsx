import { FC, useState } from 'react';

import { AgreeStep } from './components/AgreeStep';
import { ResultsStep } from './components/ResultsStep';
import { BFI_ITEMS } from './utils';

const STEP_TITLES = ['Items 1–16', 'Items 17–32', 'Items 33–44'];
const STEP_SIZE = 16;

export const BigFiveInventory: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<number[]>(() =>
    BFI_ITEMS.map(() => 0)
  );

  const isResults = step === STEP_TITLES.length;
  const start = step * STEP_SIZE;
  const stepItems = BFI_ITEMS.slice(start, start + STEP_SIZE);
  const stepValues = responses.slice(start, start + STEP_SIZE);
  const stepComplete = stepValues.every((value) => value > 0);
  const progress = isResults ? 100 : (step / STEP_TITLES.length) * 100;

  const setValue = (index: number, value: number) =>
    setResponses((prev) =>
      prev.map((val, i) => (i === start + index ? value : val))
    );

  const reset = () => {
    setStep(0);
    setResponses(BFI_ITEMS.map(() => 0));
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
        <AgreeStep items={stepItems} values={stepValues} onChange={setValue} />
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

BigFiveInventory.displayName = 'BigFiveInventory';

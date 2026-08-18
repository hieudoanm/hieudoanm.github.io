import { FC, useState } from 'react';

import { OptionsStep } from './components/OptionsStep';
import { ResultsStep } from './components/ResultsStep';
import { BDI_ITEMS } from './utils';

const STEP_TITLES = ['Items 1–7', 'Items 8–14', 'Items 15–21'];
const STEP_SIZE = 7;

export const BeckDepressionInventory: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number[]>(() =>
    BDI_ITEMS.map(() => -1)
  );

  const isResults = step === STEP_TITLES.length;
  const start = step * STEP_SIZE;
  const stepItems = BDI_ITEMS.slice(start, start + STEP_SIZE);
  const stepSelected = selected.slice(start, start + STEP_SIZE);
  const stepComplete = stepSelected.every((optionIndex) => optionIndex >= 0);
  const progress = isResults ? 100 : (step / STEP_TITLES.length) * 100;

  const setOption = (index: number, optionIndex: number) =>
    setSelected((prev) =>
      prev.map((val, i) => (i === start + index ? optionIndex : val))
    );

  const reset = () => {
    setStep(0);
    setSelected(BDI_ITEMS.map(() => -1));
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
          items={stepItems}
          selected={stepSelected}
          onChange={setOption}
        />
      )}
      {isResults && <ResultsStep selected={selected} onReset={reset} />}

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

BeckDepressionInventory.displayName = 'BeckDepressionInventory';

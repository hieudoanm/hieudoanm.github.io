import { FC, useState } from 'react';

import { ResultsStep } from './components/ResultsStep';
import { ScaleStep } from './components/ScaleStep';
import { SWLS_ITEMS } from './utils';

export const SatisfactionWithLifeScale: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [responses, setResponses] = useState<number[]>(() =>
    SWLS_ITEMS.map(() => 0)
  );
  const [showResults, setShowResults] = useState(false);
  const complete = responses.every((value) => value > 0);

  const setValue = (index: number, value: number) =>
    setResponses((prev) => prev.map((val, i) => (i === index ? value : val)));

  const reset = () => {
    setResponses(SWLS_ITEMS.map(() => 0));
    setShowResults(false);
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col gap-4">
      {showResults ? (
        <ResultsStep responses={responses} onReset={reset} />
      ) : (
        <ScaleStep
          items={SWLS_ITEMS.map((text, i) => ({ id: i + 1, text }))}
          values={responses}
          hint="1 = strongly disagree · 7 = strongly agree"
          onChange={setValue}
        />
      )}
      <div className="mt-auto flex items-center justify-between pt-4">
        <span />
        {showResults ? (
          <button
            className="btn btn-primary btn-sm ml-auto"
            onClick={() => setShowResults(false)}>
            ← Edit Answers
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm ml-auto"
            disabled={!complete}
            onClick={() => setShowResults(true)}>
            See Results →
          </button>
        )}
      </div>
    </div>
  );
};

SatisfactionWithLifeScale.displayName = 'SatisfactionWithLifeScale';

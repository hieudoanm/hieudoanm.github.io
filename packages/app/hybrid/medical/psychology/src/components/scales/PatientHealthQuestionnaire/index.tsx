import { FC, useState } from 'react';

import { FrequencyStep } from './components/FrequencyStep';
import { ResultsStep } from './components/ResultsStep';
import { PHQ_ITEMS } from './utils';

export const PatientHealthQuestionnaire: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [responses, setResponses] = useState<number[]>(() =>
    PHQ_ITEMS.map(() => -1)
  );
  const [showResults, setShowResults] = useState(false);
  const complete = responses.every((value) => value >= 0);

  const setValue = (index: number, value: number) =>
    setResponses((prev) => prev.map((val, i) => (i === index ? value : val)));

  const reset = () => {
    setResponses(PHQ_ITEMS.map(() => -1));
    setShowResults(false);
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col gap-4">
      {showResults ? (
        <ResultsStep responses={responses} onReset={reset} />
      ) : (
        <FrequencyStep
          items={PHQ_ITEMS}
          values={responses}
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

PatientHealthQuestionnaire.displayName = 'PatientHealthQuestionnaire';

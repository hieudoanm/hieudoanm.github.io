import { FC, useState } from 'react';

import { ActivitiesStep } from './components/ActivitiesStep';
import { ResultsStep } from './components/ResultsStep';
import { ScaleStep } from './components/ScaleStep';
import { TimeStep } from './components/TimeStep';
import {
  ACTIVITIES,
  INFLUENCE_ITEMS,
  PLAN_ITEMS,
  TIME_SLOTS,
  computeScores,
  type TimeEntry,
} from './utils';

const STEP_TITLES = [
  'Time Together',
  'Activities',
  'Influence · Part 1',
  'Influence · Part 2',
  'Future Plans',
];

export const RelationshipClosenessInventory: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [step, setStep] = useState(0);
  const [time, setTime] = useState<TimeEntry[]>(() =>
    TIME_SLOTS.map(() => ({ hours: 0, minutes: 0 }))
  );
  const [activities, setActivities] = useState<boolean[]>(() =>
    ACTIVITIES.map(() => false)
  );
  const [influence, setInfluence] = useState<number[]>(() =>
    INFLUENCE_ITEMS.map(() => 0)
  );
  const [plans, setPlans] = useState<number[]>(() => PLAN_ITEMS.map(() => 0));

  const isResults = step === STEP_TITLES.length;
  const scores = computeScores(time, activities, influence, plans);
  const progress = isResults ? 100 : (step / STEP_TITLES.length) * 100;

  const updateTime = (i: number, field: 'hours' | 'minutes', value: number) =>
    setTime((prev) =>
      prev.map((entry, idx) =>
        idx === i ? { ...entry, [field]: value } : entry
      )
    );

  const toggleActivity = (i: number) =>
    setActivities((prev) =>
      prev.map((value, idx) => (idx === i ? !value : value))
    );

  const setInfluenceValue = (i: number, value: number) =>
    setInfluence((prev) => prev.map((val, idx) => (idx === i ? value : val)));

  const setPlanValue = (i: number, value: number) =>
    setPlans((prev) => prev.map((val, idx) => (idx === i ? value : val)));

  const reset = () => {
    setStep(0);
    setTime(TIME_SLOTS.map(() => ({ hours: 0, minutes: 0 })));
    setActivities(ACTIVITIES.map(() => false));
    setInfluence(INFLUENCE_ITEMS.map(() => 0));
    setPlans(PLAN_ITEMS.map(() => 0));
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

      {step === 0 && <TimeStep values={time} onChange={updateTime} />}
      {step === 1 && (
        <ActivitiesStep values={activities} onChange={toggleActivity} />
      )}
      {step === 2 && (
        <ScaleStep
          items={INFLUENCE_ITEMS.slice(0, 14)}
          values={influence.slice(0, 14)}
          hint="1 = strongly disagree · 7 = strongly agree"
          onChange={setInfluenceValue}
        />
      )}
      {step === 3 && (
        <ScaleStep
          items={INFLUENCE_ITEMS.slice(14)}
          values={influence.slice(14)}
          hint="1 = strongly disagree · 7 = strongly agree"
          onChange={setInfluenceValue}
        />
      )}
      {step === 4 && (
        <ScaleStep
          items={PLAN_ITEMS.map((text, i) => ({
            id: i + 1,
            text,
            reverse: false,
          }))}
          values={plans}
          hint="1 = not at all · 7 = to a great extent"
          onChange={setPlanValue}
        />
      )}
      {isResults && <ResultsStep scores={scores} onReset={reset} />}

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
            onClick={() => setStep((s) => s + 1)}>
            {step === STEP_TITLES.length - 1 ? 'See Results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
};

RelationshipClosenessInventory.displayName = 'RelationshipClosenessInventory';

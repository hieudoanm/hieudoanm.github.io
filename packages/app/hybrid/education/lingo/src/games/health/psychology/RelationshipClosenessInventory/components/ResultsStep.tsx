import { FC } from 'react';

import {
  ACTIVITIES,
  INFLUENCE_ITEMS,
  PLAN_ITEMS,
  type RelationshipClosenessInventoryScores,
} from '../utils';

interface ResultsStepProps {
  scores: RelationshipClosenessInventoryScores;
  onReset: () => void;
}

export const ResultsStep: FC<ResultsStepProps> = ({ scores, onReset }) => {
  const hours = Math.floor(scores.timeMinutes / 60);
  const minutes = scores.timeMinutes % 60;
  const stats: Array<{ label: string; value: string }> = [
    { label: 'Time Together', value: `${hours}h ${minutes}m / day` },
    {
      label: 'Shared Activities',
      value: `${scores.activitiesCount} / ${ACTIVITIES.length}`,
    },
    {
      label: 'Influence',
      value: `${scores.influenceTotal} / ${INFLUENCE_ITEMS.length * 7}`,
    },
    {
      label: 'Future Plans',
      value: `${scores.plansTotal} / ${PLAN_ITEMS.length * 7}`,
    },
  ];
  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-base-200 border-base-300 rounded-box border p-4 text-center">
            <p className="text-base-content/40 text-[10px] tracking-widest uppercase">
              {stat.label}
            </p>
            <p className="mt-1 font-mono text-xl font-normal">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="alert text-xs">
        Higher scores indicate greater partner influence and shared closeness.
        This inventory is a self-assessment tool and is not a clinical
        diagnostic.
      </div>
      <button className="btn btn-outline w-full" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
};

ResultsStep.displayName = 'ResultsStep';

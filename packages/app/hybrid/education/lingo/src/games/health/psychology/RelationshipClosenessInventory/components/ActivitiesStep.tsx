import { FC } from 'react';

import { ACTIVITIES } from '../utils';

interface ActivitiesStepProps {
  values: boolean[];
  onChange: (index: number) => void;
}

export const ActivitiesStep: FC<ActivitiesStepProps> = ({
  values,
  onChange,
}) => (
  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
    {ACTIVITIES.map((activity, i) => (
      <label
        key={activity}
        className="bg-base-200 border-base-300 rounded-box flex items-center gap-2 border p-2 text-xs">
        <input
          type="checkbox"
          checked={values[i]}
          onChange={() => onChange(i)}
          className="checkbox checkbox-primary checkbox-xs"
        />
        {activity}
      </label>
    ))}
  </div>
);

ActivitiesStep.displayName = 'ActivitiesStep';

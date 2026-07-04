import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const WorkoutRoutine: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const exercises =
    (data.exercises as { name: string; sets: string; reps: string }[]) ?? [];
  const duration = (data.duration as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-base-content text-lg font-bold">{title}</h1>
        {duration && (
          <span className="rounded-box bg-accent/10 text-accent px-3 py-1 text-xs font-bold">
            {duration}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {exercises.map((ex, i) => (
          <div
            key={i}
            className="rounded-box border-base-300 flex items-center justify-between border px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-accent flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                {i + 1}
              </span>
              <p className="text-base-content text-sm font-medium">{ex.name}</p>
            </div>
            <span className="text-neutral text-xs">
              {ex.sets}×{ex.reps}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

WorkoutRoutine.displayName = 'WorkoutRoutine';

import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const WorkoutCard: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const exercise = (data.exercise as string) ?? '';
  const reps = (data.reps as string) ?? '';
  const sets = (data.sets as string) ?? '';
  const rest = (data.rest as string) ?? '';
  const note = (data.note as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-12 text-center">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        {title}
      </span>
      <h1 className="text-base-content mt-4 text-3xl leading-tight font-bold">
        {exercise}
      </h1>
      <div className="mt-6 flex gap-6">
        <div className="text-center">
          <span className="text-accent text-3xl font-bold">{sets}</span>
          <p className="text-neutral text-xs">Sets</p>
        </div>
        <div className="text-center">
          <span className="text-accent text-3xl font-bold">{reps}</span>
          <p className="text-neutral text-xs">Reps</p>
        </div>
      </div>
      {rest && (
        <span className="rounded-box bg-base-300 text-neutral mt-4 px-3 py-1 text-xs">
          Rest: {rest}
        </span>
      )}
      {note && <p className="text-neutral mt-4 text-xs">{note}</p>}
    </div>
  );
};

WorkoutCard.displayName = 'WorkoutCard';

import { FC } from 'react';

export const WidgetFitnessRun: FC = () => {
  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-8">
        <div className="grid h-full grid-rows-5">
          <div className="row-span-1">
            <div className="flex h-full items-center">
              <p className="text-2xl font-bold">Run</p>
            </div>
          </div>
          <div className="row-span-2">
            <div className="flex h-full items-center justify-between">
              <p className="text-4xl font-black text-red-500">10</p>
              <div className="flex h-full items-end">
                <p className="text-sm">distance (km)</p>
              </div>
            </div>
          </div>
          <div className="row-span-2">
            <div className="flex h-full items-center justify-between">
              <p className="text-4xl font-black text-red-500">5</p>
              <div className="flex h-full items-end">
                <p className="text-sm">pace (minutes/km)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

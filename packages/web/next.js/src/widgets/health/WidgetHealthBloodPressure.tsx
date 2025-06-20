import { FC } from 'react';

export const WidgetHealthBloodPressure: FC = () => {
  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-8">
        <div className="grid h-full grid-rows-10">
          <div className="row-span-1">
            <div className="flex h-full items-center justify-between">
              <p className="text-xl font-black">Health</p>
              <p className="truncate text-sm">Blood Pressure</p>
            </div>
          </div>
          <div className="row-span-3">
            <div className="flex h-full items-end justify-between">
              <p className="text-4xl font-black text-red-500">120</p>
              <p className="truncate text-sm">SYS (mmHg)</p>
            </div>
          </div>
          <div className="row-span-3">
            <div className="flex h-full items-end justify-between">
              <p className="text-4xl font-black text-red-500">80</p>
              <p className="text-sm">DIA (mmHg)</p>
            </div>
          </div>
          <div className="row-span-3">
            <div className="flex h-full items-end justify-between">
              <p className="text-4xl font-black text-red-500">80</p>

              <p className="text-sm">BPM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

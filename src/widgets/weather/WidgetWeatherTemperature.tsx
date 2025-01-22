import { FC } from 'react';

export const WidgetWeatherTemperature: FC = () => {
  const temperature = 30;

  return (
    <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-full bg-black text-white">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-6xl text-red-500">{temperature}°C</p>
          <p className="text-xl font-bold">Sunny</p>
        </div>
      </div>
    </div>
  );
};

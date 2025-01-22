import { FC } from 'react';

export const WidgetWeatherTemperature: FC = () => {
  const temperature = 30;

  return (
    <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-full bg-black text-white">
      <div className="flex h-full w-full items-center justify-center text-7xl">
        {temperature}°C
      </div>
    </div>
  );
};

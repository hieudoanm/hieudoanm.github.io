import { convertTemperature, TemperatureUnit } from '@web/utils/temperature';
import { FC, useState } from 'react';

export const WidgetWeatherTemperature: FC = () => {
  const units: TemperatureUnit[] = ['c', 'f', 'k'];
  const [unitIndex, setUnitIndex] = useState<number>(0);
  const degree: number = 30;
  const unit: TemperatureUnit = units[unitIndex];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-gray-900 text-gray-100">
      <button
        type="button"
        className="flex h-full w-full items-center justify-center"
        onClick={() => {
          setUnitIndex((previous: number) => {
            if (previous === 2) return 0;
            return previous + 1;
          });
        }}>
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-5xl text-red-500">
            {Math.round(
              convertTemperature({
                from: 'c',
                to: unit,
                degree,
              })
            )}
            °{unit.toUpperCase()}
          </p>
          <p className="text-xl font-bold">Sunny</p>
        </div>
      </button>
    </div>
  );
};

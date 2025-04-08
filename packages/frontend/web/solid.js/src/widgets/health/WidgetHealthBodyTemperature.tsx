import { convertTemperature, TemperatureUnit } from '~/utils/temperature';
import { createSignal } from 'solid-js';

export const WidgetHealthBodyTemperature = () => {
  const units: TemperatureUnit[] = ['c', 'f', 'k'];
  const [unitIndex, setUnitIndex] = createSignal<number>(0);
  const degree = 37;
  const unit: TemperatureUnit = units[unitIndex()];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-gray-900 text-gray-100">
      <button
        type="button"
        class="flex h-full w-full items-center justify-center"
        onClick={() => {
          setUnitIndex((previous: number) => {
            if (previous === 2) return 0;
            return previous + 1;
          });
        }}>
        <div class="flex flex-col items-center gap-y-2">
          <p class="text-sm">Body Temperature</p>
          <p class="text-6xl text-red-500">
            {Math.round(
              convertTemperature({
                from: 'c',
                to: unit,
                degree,
              })
            )}
            °{unit.toUpperCase()}
          </p>
          <p class="text-lg font-bold">Healthy</p>
        </div>
      </button>
    </div>
  );
};

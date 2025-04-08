import { createSignal } from 'solid-js';
import { FaSolidArrowRightArrowLeft } from 'solid-icons/fa';

type Weight = 'ton' | 'pound' | 'ounce' | 'kg' | 'g' | 'mg';

const weightRates: Record<Weight, number> = {
  ton: 1,
  pound: 2_000,
  ounce: 32_000,
  kg: 907.18474,
  g: 907184.74,
  mg: 907184740,
};

const convertRates =
  (forexRates: Record<string, number> = {}) =>
  (
    {
      fromAmount,
      fromUnit,
      toUnit,
    }: {
      fromAmount: number;
      fromUnit: string;
      toUnit: string;
    } = {
      fromAmount: 1,
      fromUnit: 'pound',
      toUnit: 'kg',
    }
  ): number => {
    return parseFloat(
      ((fromAmount * forexRates[toUnit]) / forexRates[fromUnit]).toFixed(2)
    );
  };

export const WidgetCalculatorConvertWeight = () => {
  const [{ fromAmount, fromUnit, toAmount, toUnit }, setConvert] = createSignal(
    {
      fromAmount: 1,
      fromUnit: 'pound',
      toAmount: 0.45,
      toUnit: 'kg',
    }
  );
  const convert = convertRates(weightRates);

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-6">
        <div class="flex h-full flex-col">
          <div class="flex h-full w-full items-center gap-x-1">
            <div class="grow text-2xl">
              <select
                name="fromUnit"
                class="appearance-none"
                value={fromUnit}
                onChange={(event) =>
                  setConvert((previous) => ({
                    ...previous,
                    fromUnit: event.target.value,
                    toAmount: convert({
                      fromAmount: previous.fromAmount,
                      fromUnit: event.target.value,
                      toUnit: previous.toUnit,
                    }),
                  }))
                }>
                <option value="ton">ton</option>
                <option value="pound">pound</option>
                <option value="ounce">ounce</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="mg">mg</option>
              </select>
            </div>
            <button
              type="button"
              class="w-full"
              onClick={() => {
                setConvert((previous) => ({
                  ...previous,
                  fromAmount: previous.toAmount,
                  fromUnit: previous.toUnit,
                  toAmount: previous.fromAmount,
                  toUnit: previous.fromUnit,
                }));
              }}>
              <FaSolidArrowRightArrowLeft class="mx-auto" />
            </button>
            <div class="grow text-2xl">
              <select
                name="toUnit"
                class="w-full appearance-none"
                style={{ textAlignLast: 'right' }}
                value={toUnit}
                onChange={(event) =>
                  setConvert((previous) => ({
                    ...previous,
                    toUnit: event.target.value,
                    toAmount: convert({
                      fromAmount: previous.fromAmount,
                      fromUnit: previous.fromUnit,
                      toUnit: event.target.value,
                    }),
                  }))
                }>
                <option value="ton">ton</option>
                <option value="pound">pound</option>
                <option value="ounce">ounce</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="mg">mg</option>
              </select>
            </div>
          </div>
          <div class="h-1 bg-gray-900" />
          <div class="flex h-full items-center gap-x-1">
            <div class="grow text-left text-3xl text-red-500">
              <input
                type="number"
                name="fromAmount"
                class="w-full"
                value={fromAmount}
                onChange={(event) =>
                  setConvert((previous) => ({
                    ...previous,
                    fromAmount: parseFloat(event.target.value),
                    toAmount: convert({
                      fromAmount: parseFloat(event.target.value),
                      fromUnit: previous.fromUnit,
                      toUnit: previous.toUnit,
                    }),
                  }))
                }
              />
            </div>
            <div class="text-xl">{fromUnit}</div>
          </div>
          <div class="h-1 bg-gray-900" />
          <div class="flex h-full items-center gap-x-1">
            <div class="grow truncate text-left text-3xl text-red-500">
              <input
                type="text"
                name="toAmount"
                class="w-full"
                value={toAmount.toLocaleString()}
                onChange={(event) =>
                  setConvert((previous) => ({
                    ...previous,
                    toAmount: parseFloat(event.target.value),
                  }))
                }
                readOnly
              />
            </div>
            <div class="text-xl">{toUnit}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

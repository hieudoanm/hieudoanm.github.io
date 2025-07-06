import { FC, useState } from 'react';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

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

export const WidgetCalculatorConvertWeight: FC = () => {
  const [{ fromAmount, fromUnit, toAmount, toUnit }, setConvert] = useState({
    fromAmount: 1,
    fromUnit: 'pound',
    toAmount: 0.45,
    toUnit: 'kg',
  });
  const convert = convertRates(weightRates);

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-6">
        <div className="flex h-full flex-col">
          <div className="flex h-full w-full items-center gap-x-1">
            <div className="grow text-2xl">
              <select
                name="fromUnit"
                className="appearance-none"
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
              className="w-full"
              onClick={() => {
                setConvert((previous) => ({
                  ...previous,
                  fromAmount: previous.toAmount,
                  fromUnit: previous.toUnit,
                  toAmount: previous.fromAmount,
                  toUnit: previous.fromUnit,
                }));
              }}>
              <FaArrowRightArrowLeft className="mx-auto" />
            </button>
            <div className="grow text-2xl">
              <select
                name="toUnit"
                className="w-full appearance-none"
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
          <div className="h-1 bg-neutral-900" />
          <div className="flex h-full items-center gap-x-1">
            <div className="grow text-left text-3xl text-red-500">
              <input
                type="number"
                name="fromAmount"
                className="w-full"
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
            <div className="text-xl">{fromUnit}</div>
          </div>
          <div className="h-1 bg-neutral-900" />
          <div className="flex h-full items-center gap-x-1">
            <div className="grow truncate text-left text-3xl text-red-500">
              <input
                type="text"
                name="toAmount"
                className="w-full"
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
            <div className="text-xl">{toUnit}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

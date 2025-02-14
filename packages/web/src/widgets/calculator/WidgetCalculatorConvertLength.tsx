import { FC, useState } from 'react';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

type Length = 'yard' | 'foot' | 'inch' | 'cm' | 'm' | 'km';

const lengthRates: Record<Length, number> = {
  yard: 1,
  foot: 3,
  inch: 36,
  cm: 91.44,
  m: 0.9144,
  km: 0.0009144,
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
      fromUnit: 'inch',
      toUnit: 'cm',
    }
  ): number => {
    return parseFloat(
      ((fromAmount * forexRates[toUnit]) / forexRates[fromUnit]).toFixed(2)
    );
  };

export const WidgetCalculatorConvertLength: FC = () => {
  const [{ fromAmount, fromUnit, toAmount, toUnit }, setConvert] = useState({
    fromAmount: 1,
    fromUnit: 'inch',
    toAmount: 2.54,
    toUnit: 'cm',
  });
  const convert = convertRates(lengthRates);

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div className="h-full w-full p-6">
        <div className="flex h-full flex-col">
          <div className="flex h-full w-full items-center justify-evenly gap-x-1">
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
                <option value="yard">yard</option>
                <option value="foot">foot</option>
                <option value="inch">inch</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="km">km</option>
              </select>
            </div>
            <button
              type="button"
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
                <option value="yard">yard</option>
                <option value="foot">foot</option>
                <option value="inch">inch</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="km">km</option>
              </select>
            </div>
          </div>
          <div className="h-1 bg-gray-900" />
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
          <div className="h-1 bg-gray-900" />
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

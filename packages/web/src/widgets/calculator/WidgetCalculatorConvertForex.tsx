import { FC, useState } from 'react';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

const forexRates = {
  EUR: 1.0,
  AUD: 1.6594,
  BGN: 1.9558,
  BRL: 6.1921,
  CAD: 1.4984,
  CHF: 0.9442,
  CNY: 7.5829,
  CZK: 25.14,
  DKK: 7.4606,
  GBP: 0.84468,
  HKD: 8.1045,
  HUF: 409.7,
  IDR: 16896,
  ILS: 3.7117,
  INR: 89.93,
  ISK: 145.9,
  JPY: 162.58,
  KRW: 1494.9,
  MXN: 21.296,
  MYR: 4.6235,
  NOK: 11.7305,
  NZD: 1.8377,
  PHP: 61.063,
  PLN: 4.211,
  RON: 4.9763,
  SEK: 11.4685,
  SGD: 1.4114,
  THB: 35.4,
  TRY: 37.099,
  USD: 1.0404,
  ZAR: 19.3143,
  VND: 26320.6,
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
      fromUnit: 'EUR',
      toUnit: 'USD',
    }
  ): number => {
    return parseFloat(
      ((fromAmount * forexRates[toUnit]) / forexRates[fromUnit]).toFixed(2)
    );
  };

export const WidgetCalculatorConvertForex: FC = () => {
  const [{ fromAmount, fromUnit, toAmount, toUnit }, setConvert] = useState({
    fromAmount: 1,
    fromUnit: 'EUR',
    toAmount: 26000,
    toUnit: 'VND',
  });
  const convert = convertRates(forexRates);

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-black text-white">
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
                <option value="AUD">AUD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
                <option value="VND">VND</option>
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
                <option value="AUD">AUD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
                <option value="VND">VND</option>
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

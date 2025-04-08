import { createSignal } from 'solid-js';
import { FaSolidArrowRightArrowLeft } from 'solid-icons/fa';

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

export const WidgetCalculatorConvertForex = () => {
  const [{ fromAmount, fromUnit, toAmount, toUnit }, setConvert] = createSignal(
    {
      fromAmount: 1,
      fromUnit: 'EUR',
      toAmount: 26000,
      toUnit: 'VND',
    }
  );
  const convert = convertRates(forexRates);

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-6">
        <div class="flex h-full flex-col">
          <div class="flex h-full w-full items-center justify-evenly gap-x-1">
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
              <FaSolidArrowRightArrowLeft class="mx-auto" />
            </button>
            <div class="grow text-2xl">
              <select
                name="toUnit"
                class="w-full appearance-none"
                style={{ 'text-align-last': 'right' }}
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

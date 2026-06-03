import { FC, useState } from 'react';

type DataUnit = 'bit' | 'kilobyte' | 'megabyte' | 'gigabyte' | 'terabyte';

// Rates are relative to a bit (1 byte = 8 bits, 1 KB = 1024 bytes, etc.)
const dataRates: Record<DataUnit, number> = {
  bit: 1,
  kilobyte: 8 * 1024, // 1 KB = 1024 bytes * 8 bits/byte
  megabyte: 8 * 1024 * 1024, // 1 MB = 1024 KB * 1024 bytes/KB * 8 bits/byte
  gigabyte: 8 * 1024 * 1024 * 1024, // 1 GB = 1024 MB * 1024 KB/MB * 1024 bytes/KB * 8 bits/byte
  terabyte: 8 * 1024 * 1024 * 1024 * 1024, // 1 TB = 1024 GB * ...
};

const convertDataRates =
  (rates: Record<string, number> = {}) =>
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
      fromUnit: 'bit',
      toUnit: 'megabyte',
    }
  ): number => {
    // Convert from 'fromUnit' to 'bit' as an intermediate
    const amountInBits = fromAmount * rates[fromUnit];
    // Convert from 'bit' to 'toUnit'
    return parseFloat((amountInBits / rates[toUnit]).toFixed(6)); // Increased precision for data
  };

export const Data: FC = () => {
  const [{ bit, kilobyte, megabyte, gigabyte, terabyte }, setState] = useState<{
    bit: number;
    kilobyte: number;
    megabyte: number;
    gigabyte: number;
    terabyte: number;
  }>({
    bit: 0,
    kilobyte: 0,
    megabyte: 0,
    gigabyte: 0,
    terabyte: 0,
  });

  return (
    <div className="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'bit' as DataUnit, value: bit },
        { type: 'kilobyte' as DataUnit, value: kilobyte },
        { type: 'megabyte' as DataUnit, value: megabyte },
        { type: 'gigabyte' as DataUnit, value: gigabyte },
        { type: 'terabyte' as DataUnit, value: terabyte },
      ].map(({ type, value }) => {
        return (
          <div
            key={type}
            className="flex items-center justify-center gap-x-2 px-4 py-2">
            <span className="capitalize">{type}</span>
            <input
              type="text" // Use type="number" for numerical inputs
              id={type}
              placeholder={type}
              value={value}
              onChange={(event) => {
                const newValue: string = event.target.value;
                const newAmount: number = parseFloat(newValue);

                // If the input is empty or not a valid number, set all to 0
                if (isNaN(newAmount)) {
                  setState({
                    bit: 0,
                    kilobyte: 0,
                    megabyte: 0,
                    gigabyte: 0,
                    terabyte: 0,
                  });
                  return;
                }

                setState((previous) => ({
                  ...previous,
                  bit: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'bit',
                  }),
                  kilobyte: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'kilobyte',
                  }),
                  megabyte: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'megabyte',
                  }),
                  gigabyte: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'gigabyte',
                  }),
                  terabyte: convertDataRates(dataRates)({
                    fromAmount: newAmount,
                    fromUnit: type,
                    toUnit: 'terabyte',
                  }),
                }));
              }}
              className="grow text-right focus:outline-none"
            />
          </div>
        );
      })}
    </div>
  );
};

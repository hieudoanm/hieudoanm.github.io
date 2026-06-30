import { createSignal } from 'solid-js';

type DataUnit = 'bit' | 'kilobyte' | 'megabyte' | 'gigabyte' | 'terabyte';

const dataRates: Record<DataUnit, number> = {
  bit: 1,
  kilobyte: 8 * 1024,
  megabyte: 8 * 1024 * 1024,
  gigabyte: 8 * 1024 * 1024 * 1024,
  terabyte: 8 * 1024 * 1024 * 1024 * 1024,
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
    } = { fromAmount: 1, fromUnit: 'bit', toUnit: 'megabyte' }
  ): number => {
    const amountInBits = fromAmount * rates[fromUnit];
    return parseFloat((amountInBits / rates[toUnit]).toFixed(6));
  };

export const Data = () => {
  const [bit, setBit] = createSignal(0);
  const [kilobyte, setKilobyte] = createSignal(0);
  const [megabyte, setMegabyte] = createSignal(0);
  const [gigabyte, setGigabyte] = createSignal(0);
  const [terabyte, setTerabyte] = createSignal(0);

  const handleChange = (value: string, type: DataUnit) => {
    const newAmount = parseFloat(value);
    if (isNaN(newAmount)) {
      setBit(0);
      setKilobyte(0);
      setMegabyte(0);
      setGigabyte(0);
      setTerabyte(0);
      return;
    }
    setBit(
      convertDataRates(dataRates)({
        fromAmount: newAmount,
        fromUnit: type,
        toUnit: 'bit',
      })
    );
    setKilobyte(
      convertDataRates(dataRates)({
        fromAmount: newAmount,
        fromUnit: type,
        toUnit: 'kilobyte',
      })
    );
    setMegabyte(
      convertDataRates(dataRates)({
        fromAmount: newAmount,
        fromUnit: type,
        toUnit: 'megabyte',
      })
    );
    setGigabyte(
      convertDataRates(dataRates)({
        fromAmount: newAmount,
        fromUnit: type,
        toUnit: 'gigabyte',
      })
    );
    setTerabyte(
      convertDataRates(dataRates)({
        fromAmount: newAmount,
        fromUnit: type,
        toUnit: 'terabyte',
      })
    );
  };

  return (
    <div class="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
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
            class="flex items-center justify-center gap-x-2 px-4 py-2">
            <span class="capitalize">{type}</span>
            <input
              type="text"
              id={type}
              placeholder={type}
              value={value()}
              onChange={(event: Event) =>
                handleChange((event.target as HTMLInputElement).value, type)
              }
              class="grow text-right focus:outline-none"
            />
          </div>
        );
      })}
    </div>
  );
};

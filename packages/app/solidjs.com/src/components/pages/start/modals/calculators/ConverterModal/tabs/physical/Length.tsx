import { createSignal } from 'solid-js';

type Length = 'yard' | 'foot' | 'inch' | 'centimeter' | 'meter' | 'kilometer';

const lengthRates: Record<Length, number> = {
  yard: 1,
  foot: 3,
  inch: 36,
  centimeter: 91.44,
  meter: 0.9144,
  kilometer: 0.0009144,
};

const convertRates =
  (lengthRates: Record<string, number> = {}) =>
  (
    {
      fromAmount,
      fromUnit,
      toUnit,
    }: {
      fromAmount: number;
      fromUnit: string;
      toUnit: string;
    } = { fromAmount: 1, fromUnit: 'inch', toUnit: 'cm' }
  ): number => {
    return parseFloat(
      ((fromAmount * lengthRates[toUnit]) / lengthRates[fromUnit]).toFixed(2)
    );
  };

export const Length = () => {
  const [yard, setYard] = createSignal(lengthRates.yard);
  const [foot, setFoot] = createSignal(lengthRates.foot);
  const [inch, setInch] = createSignal(lengthRates.inch);
  const [centimeter, setCentimeter] = createSignal(lengthRates.centimeter);
  const [meter, setMeter] = createSignal(lengthRates.meter);
  const [kilometer, setKilometer] = createSignal(lengthRates.kilometer);

  const handleChange = (value: string, type: string) => {
    const newAmount = parseFloat(value) || 0;
    setYard(
      type === 'yard'
        ? newAmount
        : convertRates(lengthRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'yard',
          })
    );
    setFoot(
      type === 'foot'
        ? newAmount
        : convertRates(lengthRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'foot',
          })
    );
    setInch(
      type === 'inch'
        ? newAmount
        : convertRates(lengthRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'inch',
          })
    );
    setKilometer(
      type === 'kilometer'
        ? newAmount
        : convertRates(lengthRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'kilometer',
          })
    );
    setMeter(
      type === 'meter'
        ? newAmount
        : convertRates(lengthRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'meter',
          })
    );
    setCentimeter(
      type === 'centimeter'
        ? newAmount
        : convertRates(lengthRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'centimeter',
          })
    );
  };

  return (
    <div class="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'yard', value: yard },
        { type: 'foot', value: foot },
        { type: 'inch', value: inch },
        { type: 'centimeter', value: centimeter },
        { type: 'meter', value: meter },
        { type: 'kilometer', value: kilometer },
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

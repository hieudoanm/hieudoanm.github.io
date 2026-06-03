import { createSignal } from 'solid-js';

type Weight = 'ton' | 'pound' | 'ounce' | 'kilogram' | 'gram' | 'milligram';

const weightRates: Record<Weight, number> = {
  ton: 1,
  pound: 2_000,
  ounce: 32_000,
  kilogram: 907.18474,
  gram: 907184.74,
  milligram: 907184740,
};

const convertRates =
  (weightRates: Record<string, number> = {}) =>
  (
    {
      fromAmount,
      fromUnit,
      toUnit,
    }: {
      fromAmount: number;
      fromUnit: string;
      toUnit: string;
    } = { fromAmount: 1, fromUnit: 'ounce', toUnit: 'cm' }
  ): number => {
    return parseFloat(
      ((fromAmount * weightRates[toUnit]) / weightRates[fromUnit]).toFixed(2)
    );
  };

export const Weight = () => {
  const [ton, setTon] = createSignal(weightRates.ton);
  const [pound, setPound] = createSignal(weightRates.pound);
  const [ounce, setOunce] = createSignal(weightRates.ounce);
  const [kilogram, setKilogram] = createSignal(weightRates.kilogram);
  const [gram, setGram] = createSignal(weightRates.gram);
  const [milligram, setMilligram] = createSignal(weightRates.milligram);

  const handleChange = (value: string, type: string) => {
    const newAmount = parseFloat(value) || 0;
    setTon(
      type === 'ton'
        ? newAmount
        : convertRates(weightRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'ton',
          })
    );
    setPound(
      type === 'pound'
        ? newAmount
        : convertRates(weightRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'pound',
          })
    );
    setOunce(
      type === 'ounce'
        ? newAmount
        : convertRates(weightRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'ounce',
          })
    );
    setMilligram(
      type === 'milligram'
        ? newAmount
        : convertRates(weightRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'milligram',
          })
    );
    setGram(
      type === 'gram'
        ? newAmount
        : convertRates(weightRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'gram',
          })
    );
    setKilogram(
      type === 'kilogram'
        ? newAmount
        : convertRates(weightRates)({
            fromAmount: newAmount,
            fromUnit: type,
            toUnit: 'kilogram',
          })
    );
  };

  return (
    <div class="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'ton', value: ton },
        { type: 'pound', value: pound },
        { type: 'ounce', value: ounce },
        { type: 'kilogram', value: kilogram },
        { type: 'gram', value: gram },
        { type: 'milligram', value: milligram },
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

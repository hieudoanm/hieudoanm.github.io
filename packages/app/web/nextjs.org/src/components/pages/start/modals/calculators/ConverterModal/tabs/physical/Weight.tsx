import { FC, useState } from 'react';

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
    } = {
      fromAmount: 1,
      fromUnit: 'ounce',
      toUnit: 'cm',
    }
  ): number => {
    return parseFloat(
      ((fromAmount * weightRates[toUnit]) / weightRates[fromUnit]).toFixed(2)
    );
  };

export const Weight: FC = () => {
  const [
    {
      ton = weightRates.ton,
      pound = weightRates.pound,
      ounce = weightRates.ounce,
      kilogram = weightRates.kilogram,
      gram = weightRates.gram,
      milligram = weightRates.milligram,
    },
    setState,
  ] = useState<{
    ton: number;
    pound: number;
    ounce: number;
    kilogram: number;
    gram: number;
    milligram: number;
  }>({
    ton: weightRates.ton,
    pound: weightRates.pound,
    ounce: weightRates.ounce,
    kilogram: weightRates.kilogram,
    gram: weightRates.gram,
    milligram: weightRates.milligram,
  });

  return (
    <div className="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
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
            className="flex items-center justify-center gap-x-2 px-4 py-2">
            <span className="capitalize">{type}</span>
            <input
              type="text"
              id={type}
              placeholder={type}
              value={value}
              className="grow text-right focus:outline-none"
              onChange={(event) => {
                const newValue: string = event.target.value;
                const newAmount: number = parseFloat(newValue) ?? 0;

                setState((previous) => ({
                  ...previous,
                  ton:
                    type === 'ton'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'ton',
                        }),
                  pound:
                    type === 'pound'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'pound',
                        }),
                  ounce:
                    type === 'ounce'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'ounce',
                        }),
                  milligram:
                    type === 'milligram'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'milligram',
                        }),
                  gram:
                    type === 'gram'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'gram',
                        }),
                  kilogram:
                    type === 'kilogram'
                      ? newAmount
                      : convertRates(weightRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'kilogram',
                        }),
                }));
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

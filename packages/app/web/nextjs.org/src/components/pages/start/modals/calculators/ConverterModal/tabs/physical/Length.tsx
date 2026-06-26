import { FC, useState } from 'react';

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
    } = {
      fromAmount: 1,
      fromUnit: 'inch',
      toUnit: 'cm',
    }
  ): number => {
    return parseFloat(
      ((fromAmount * lengthRates[toUnit]) / lengthRates[fromUnit]).toFixed(2)
    );
  };

export const Length: FC = () => {
  const [
    {
      yard = lengthRates.yard,
      foot = lengthRates.foot,
      inch = lengthRates.inch,
      centimeter = lengthRates.centimeter,
      meter = lengthRates.meter,
      kilometer = lengthRates.kilometer,
    },
    setState,
  ] = useState<{
    yard: number;
    foot: number;
    inch: number;
    centimeter: number;
    meter: number;
    kilometer: number;
  }>({
    yard: lengthRates.yard,
    foot: lengthRates.foot,
    inch: lengthRates.inch,
    centimeter: lengthRates.centimeter,
    meter: lengthRates.meter,
    kilometer: lengthRates.kilometer,
  });

  return (
    <div className="card flex w-full max-w-md flex-col gap-y-2 divide-y divide-white/10">
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
            className="flex items-center justify-center gap-x-2 px-4 py-2">
            <span className="capitalize">{type}</span>
            <input
              type="text"
              id={type}
              placeholder={type}
              value={value}
              onChange={(event) => {
                const newValue: string = event.target.value;
                const newAmount: number = parseFloat(newValue) ?? 0;

                setState((previous) => ({
                  ...previous,
                  yard:
                    type === 'yard'
                      ? newAmount
                      : convertRates(lengthRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'yard',
                        }),
                  foot:
                    type === 'foot'
                      ? newAmount
                      : convertRates(lengthRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'foot',
                        }),
                  inch:
                    type === 'inch'
                      ? newAmount
                      : convertRates(lengthRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'inch',
                        }),
                  kilometer:
                    type === 'kilometer'
                      ? newAmount
                      : convertRates(lengthRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'kilometer',
                        }),
                  meter:
                    type === 'meter'
                      ? newAmount
                      : convertRates(lengthRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'meter',
                        }),
                  centimeter:
                    type === 'centimeter'
                      ? newAmount
                      : convertRates(lengthRates)({
                          fromAmount: newAmount,
                          fromUnit: type,
                          toUnit: 'centimeter',
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
Length.displayName = 'Length';

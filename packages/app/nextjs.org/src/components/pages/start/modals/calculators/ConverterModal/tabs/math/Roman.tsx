import { arabic2roman, roman2arabic } from '@lodashx/ts';
import { FC, useState } from 'react';

const INITIAL_NUMBER: number = 10;

export const Roman: FC = () => {
  const [
    {
      arabicNumber = INITIAL_NUMBER.toString(),
      romanNumber = arabic2roman(INITIAL_NUMBER),
    },
    setState,
  ] = useState<{
    arabicNumber: string;
    romanNumber: string;
  }>({
    arabicNumber: INITIAL_NUMBER.toString(),
    romanNumber: arabic2roman(INITIAL_NUMBER),
  });

  return (
    <div className="card flex w-full max-w-sm flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'arabic', value: arabicNumber },
        { type: 'roman', value: romanNumber },
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
                const newValue = event.target.value;
                const newArabicNumber: string =
                  type === 'arabic' ? newValue : roman2arabic(newValue);
                const newRomanNumber: string =
                  type === 'roman'
                    ? newValue
                    : arabic2roman(parseInt(newValue, 10));
                setState((previous) => ({
                  ...previous,
                  arabicNumber: newArabicNumber,
                  romanNumber: newRomanNumber,
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

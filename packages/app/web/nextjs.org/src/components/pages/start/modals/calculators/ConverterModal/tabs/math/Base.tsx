import { convertBase } from '@lodashx/ts';
import { FC, useState } from 'react';

const INITIAL_NUMBER: number = 10;

export const Base: FC = () => {
  const [
    {
      base2 = convertBase(INITIAL_NUMBER).from(10).to(2),
      base8 = convertBase(INITIAL_NUMBER).from(10).to(8),
      base10 = INITIAL_NUMBER.toString(),
      base16 = convertBase(INITIAL_NUMBER).from(10).to(16),
    },
    setState,
  ] = useState<{
    base2: string;
    base8: string;
    base10: string;
    base16: string;
  }>({
    base2: convertBase(INITIAL_NUMBER).from(10).to(2),
    base8: convertBase(INITIAL_NUMBER).from(10).to(8),
    base10: INITIAL_NUMBER.toString(),
    base16: convertBase(INITIAL_NUMBER).from(10).to(16),
  });

  return (
    <div className="card flex w-full max-w-sm flex-col gap-y-2 divide-y divide-white/10">
      {[
        { fromBase: 2, value: base2 },
        { fromBase: 8, value: base8 },
        { fromBase: 10, value: base10 },
        { fromBase: 16, value: base16 },
      ].map(({ fromBase, value }) => {
        return (
          <div
            key={fromBase}
            className="flex items-center justify-center gap-x-2 px-4 py-2">
            <span className="whitespace-nowrap">Base {fromBase}</span>
            <input
              type="text"
              id={`base${fromBase}`}
              placeholder={`Base ${fromBase}`}
              value={value}
              className="grow text-right focus:outline-none"
              onChange={(event) => {
                const newValue = event.target.value;
                const newNumber: number = parseInt(newValue);
                setState((previous) => ({
                  ...previous,
                  base2: convertBase(newNumber).from(fromBase).to(2),
                  base8: convertBase(newNumber).from(fromBase).to(8),
                  base10: convertBase(newNumber).from(fromBase).to(10),
                  base16: convertBase(newNumber).from(fromBase).to(16),
                }));
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
Base.displayName = 'Base';

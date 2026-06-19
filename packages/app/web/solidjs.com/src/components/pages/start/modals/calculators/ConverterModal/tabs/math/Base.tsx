import { convertBase } from '@lodashx/ts';
import { createSignal } from 'solid-js';

const INITIAL_NUMBER = 10;

export const Base = () => {
  const [base2, setBase2] = createSignal(
    convertBase(INITIAL_NUMBER).from(10).to(2)
  );
  const [base8, setBase8] = createSignal(
    convertBase(INITIAL_NUMBER).from(10).to(8)
  );
  const [base10, setBase10] = createSignal(INITIAL_NUMBER.toString());
  const [base16, setBase16] = createSignal(
    convertBase(INITIAL_NUMBER).from(10).to(16)
  );

  const handleChange = (value: string, fromBase: number) => {
    const newNumber = parseInt(value, 10);
    setBase2(convertBase(newNumber).from(fromBase).to(2));
    setBase8(convertBase(newNumber).from(fromBase).to(8));
    setBase10(convertBase(newNumber).from(fromBase).to(10));
    setBase16(convertBase(newNumber).from(fromBase).to(16));
  };

  return (
    <div class="card flex w-full max-w-sm flex-col gap-y-2 divide-y divide-white/10">
      {[
        { fromBase: 2, value: base2 },
        { fromBase: 8, value: base8 },
        { fromBase: 10, value: base10 },
        { fromBase: 16, value: base16 },
      ].map(({ fromBase, value }) => {
        return (
          <div
            key={fromBase}
            class="flex items-center justify-center gap-x-2 px-4 py-2">
            <span class="whitespace-nowrap">Base {fromBase}</span>
            <input
              type="text"
              id={`base${fromBase}`}
              placeholder={`Base ${fromBase}`}
              value={value()}
              class="grow text-right focus:outline-none"
              onChange={(event: Event) =>
                handleChange((event.target as HTMLInputElement).value, fromBase)
              }
            />
          </div>
        );
      })}
    </div>
  );
};

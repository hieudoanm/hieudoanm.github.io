import { createSignal } from 'solid-js';
import { arabic2roman, roman2arabic } from '@hieudoanm/number';

const INITIAL_NUMBER = 10;

export const Roman = () => {
  const [arabicNumber, setArabicNumber] = createSignal(
    INITIAL_NUMBER.toString()
  );
  const [romanNumber, setRomanNumber] = createSignal(
    arabic2roman(INITIAL_NUMBER)
  );

  const handleChange = (value: string, type: string) => {
    const newArabicNumber = type === 'arabic' ? value : roman2arabic(value);
    const newRomanNumber =
      type === 'roman' ? value : arabic2roman(parseInt(value, 10));
    setArabicNumber(newArabicNumber);
    setRomanNumber(newRomanNumber);
  };

  return (
    <div class="card flex w-full max-w-sm flex-col gap-y-2 divide-y divide-white/10">
      {[
        { type: 'arabic', value: arabicNumber },
        { type: 'roman', value: romanNumber },
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

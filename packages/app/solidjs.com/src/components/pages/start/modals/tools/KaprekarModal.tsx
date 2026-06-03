import { createSignal, createEffect, onCleanup } from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const KAPREKAR_CONSTANT_3 = 495;
const KAPREKAR_CONSTANT_4 = 6174;
const IGNORE_NUMBERS_3 = new Set([111, 222, 333, 444, 555, 666, 777, 888, 999]);
const IGNORE_NUMBERS_4 = new Set([
  1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999,
]);

type Routine = { descending: number; ascending: number; result: number };

const kaprekarRoutine = (
  number: number,
  numbers: Routine[] = [],
  { count = 0, length = 4 }: { count: number; length: number } = {
    count: 0,
    length: 4,
  }
): Routine[] => {
  if (
    IGNORE_NUMBERS_3.has(number) ||
    IGNORE_NUMBERS_4.has(number) ||
    number === KAPREKAR_CONSTANT_3 ||
    number === KAPREKAR_CONSTANT_4 ||
    count >= 8
  )
    return numbers;

  const digits = number.toString().split('').map(Number);
  digits.sort((a, b) => a - b);
  const ascending = digits.join('');
  const reverse = digits.toReversed();
  const descending =
    digits.length < length ? `${reverse.join('')}0` : reverse.join('');
  const result = Number(descending) - Number(ascending);

  return kaprekarRoutine(
    result,
    [
      ...numbers,
      { descending: Number(descending), ascending: Number(ascending), result },
    ],
    { count: count + 1, length }
  );
};

export const KaprekarModal = (props: { onClose: () => void }) => {
  const [number, setNumber] = createSignal(KAPREKAR_CONSTANT_4);

  const routines = () =>
    kaprekarRoutine(number(), [], {
      count: 0,
      length: number().toString().length,
    });
  const isIgnored = () =>
    IGNORE_NUMBERS_3.has(number()) || IGNORE_NUMBERS_4.has(number());
  const isOutOfRange = () => number() < 100 || number() > 9999;
  const isConstant3 = () => number() === KAPREKAR_CONSTANT_3;
  const isConstant4 = () => number() === KAPREKAR_CONSTANT_4;
  const showRoutine = () =>
    !isIgnored() && !isOutOfRange() && !isConstant3() && !isConstant4();

  createEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight')
        setNumber((p) => Math.min(p + 1, 9999));
      else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft')
        setNumber((p) => Math.max(p - 1, 100));
      else if (e.key === ' ') {
        e.preventDefault();
        setNumber(KAPREKAR_CONSTANT_4);
      }
    };
    globalThis.window.addEventListener('keydown', handleKeyDown);
    onCleanup(() =>
      globalThis.window.removeEventListener('keydown', handleKeyDown)
    );
  });

  return (
    <ModalWrapper
      onClose={props.onClose}
      title="Kaprekar's Routine"
      subtitle="Constant · 495 · 6174"
      footerNote="Click outside to close · Every number converges to the constant"
      size="max-w-md">
      <div class="-mt-2 mb-1 flex justify-end">
        <button
          onClick={() => setNumber(KAPREKAR_CONSTANT_4)}
          class="btn btn-outline btn-xs font-mono tracking-widest">
          Reset
        </button>
      </div>

      <div class="flex flex-col gap-1.5">
        <p class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
          Number · 100 – 9999
        </p>
        <div class="join w-full">
          <button
            onClick={() => setNumber((p) => Math.max(p - 1, 100))}
            class="btn btn-outline join-item btn-sm w-10 font-mono text-base">
            −
          </button>
          <input
            type="number"
            min={100}
            max={9999}
            value={number()}
            onChange={(e: Event) =>
              setNumber(Number((e.target as HTMLInputElement).value))
            }
            class="input input-bordered input-sm join-item flex-1 text-center font-mono text-lg font-bold tracking-tight tabular-nums"
          />
          <button
            onClick={() => setNumber((p) => Math.min(p + 1, 9999))}
            class="btn btn-outline join-item btn-sm w-10 font-mono text-base">
            +
          </button>
        </div>
        <p class="text-base-content/20 font-mono text-[10px] tracking-widest uppercase">
          Arrow keys · Space to reset
        </p>
      </div>

      <div class="bg-base-200 border-base-300 min-h-[10rem] rounded-xl border p-4">
        {isOutOfRange() && (
          <p class="text-base-content/40 text-center text-xs">
            Enter a number between 100 and 9999
          </p>
        )}
        {isIgnored() && (
          <p class="text-base-content/40 text-center text-xs">
            Number must have at least two different digits
          </p>
        )}
        {(isConstant3() || isConstant4()) && (
          <div class="flex flex-col items-center gap-1 text-center">
            <p class="text-primary font-mono text-3xl font-black tracking-tight">
              {number()}
            </p>
            <p class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
              Kaprekar's Constant · {isConstant3() ? '3' : '4'} digits
            </p>
          </div>
        )}
        {showRoutine() && (
          <div class="flex flex-col gap-2">
            {routines().map(({ descending, ascending, result }, i) => {
              const isKC =
                result === KAPREKAR_CONSTANT_3 ||
                result === KAPREKAR_CONSTANT_4;
              return (
                <div
                  key={`${descending}-${ascending}-${result}`}
                  class="flex items-center justify-between font-mono text-sm tabular-nums">
                  <span class="text-base-content/30 w-5 text-right text-xs">
                    {i + 1}.
                  </span>
                  <span class="text-base-content/60 w-12 text-right">
                    {descending}
                  </span>
                  <span class="text-base-content/30 px-1">−</span>
                  <span class="text-base-content/60 w-12 text-right">
                    {ascending}
                  </span>
                  <span class="text-base-content/30 px-1">=</span>
                  <span
                    class={`w-12 text-right font-bold ${isKC ? 'text-primary' : ''}`}>
                    {result}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

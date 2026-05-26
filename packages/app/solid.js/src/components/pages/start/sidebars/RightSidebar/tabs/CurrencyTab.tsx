import {
  convert,
  CURRENCIES,
  CURRENCY_NAMES,
  QUICK_PAIRS,
} from '@hieudoanm/data/currencies';
import { createMemo, createSignal } from 'solid-js';

export const CurrencyTab = () => {
  const [from, setFrom] = createSignal('USD');
  const [to, setTo] = createSignal('SGD');
  const [amount, setAmount] = createSignal<string>('1');

  const converted = createMemo(() => {
    const n = Number.parseFloat(amount());
    if (Number.isNaN(n) || n < 0) return null;
    return convert(n, from(), to());
  });

  const currentFrom = from();
  const currentTo = to();
  const currentAmount = amount();

  return (
    <div class="flex flex-col gap-3 p-3">
      <div class="form-control">
        <label class="label py-1">
          <span class="label-text text-base-content/50 text-[10px] tracking-widest uppercase">
            Amount
          </span>
        </label>
        <input
          type="number"
          min="0"
          step="any"
          value={currentAmount}
          onChange={(e) => setAmount(e.currentTarget.value)}
          class="input input-bordered input-sm w-full font-mono text-lg font-bold tracking-tight"
          placeholder="1.00"
        />
      </div>

      <div class="form-control">
        <label class="label py-1">
          <span class="label-text text-base-content/50 text-[10px] tracking-widest uppercase">
            From
          </span>
        </label>
        <select
          class="select select-bordered select-sm text-sm font-bold"
          value={currentFrom}
          onChange={(e) => setFrom(e.currentTarget.value)}>
          {CURRENCIES.map((c) => (
            <option value={c}>
              {c} — {CURRENCY_NAMES[c]}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => {
          setFrom(currentTo);
          setTo(currentFrom);
        }}
        class="btn btn-outline btn-sm w-full font-mono tracking-widest">
        ⇅ Swap
      </button>

      <div class="form-control">
        <label class="label py-1">
          <span class="label-text text-base-content/50 text-[10px] tracking-widest uppercase">
            To
          </span>
        </label>
        <select
          class="select select-bordered select-sm text-sm font-bold"
          value={currentTo}
          onChange={(e) => setTo(e.currentTarget.value)}>
          {CURRENCIES.map((c) => (
            <option value={c}>
              {c} — {CURRENCY_NAMES[c]}
            </option>
          ))}
        </select>
      </div>

      <div class="bg-base-100 rounded-box border-base-300 border p-3 text-center">
        {converted() !== null ? (
          <>
            <p class="text-base-content/40 mb-1 font-mono text-[10px] tracking-widest uppercase">
              {parseFloat(currentAmount).toLocaleString()} {currentFrom} =
            </p>
            <p class="text-primary font-mono text-2xl font-bold tracking-tight">
              {converted()!.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
              <span class="text-base-content/50 ml-1.5 text-base">
                {currentTo}
              </span>
            </p>
            <p class="text-base-content/30 mt-1 font-mono text-[10px]">
              1 {currentFrom} ={' '}
              {convert(1, currentFrom, currentTo).toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 6,
              })}{' '}
              {currentTo}
            </p>
          </>
        ) : (
          <p class="text-base-content/30 text-xs">Enter a valid amount</p>
        )}
      </div>

      <hr class="border-base-300 my-1" />

      <div>
        <p class="text-base-content/30 mb-2 font-mono text-[10px] tracking-widest uppercase">
          1 {currentFrom} vs majors
        </p>
        <div class="flex flex-col gap-1">
          {QUICK_PAIRS.filter((c) => c !== currentFrom).map((currency) => {
            const rate = convert(1, currentFrom, currency);
            const isTarget = currency === currentTo;
            return (
              <div
                onClick={() => setTo(currency)}
                class={`flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ${
                  isTarget
                    ? 'bg-primary/10 ring-primary/30 ring-1'
                    : 'hover:bg-base-300'
                }`}>
                <div class="flex items-center gap-2">
                  <span
                    class={`font-mono text-xs font-bold tracking-wider ${isTarget ? 'text-primary' : 'opacity-70'}`}>
                    {currency}
                  </span>
                  <span class="text-base-content/30 text-[10px] tracking-wide">
                    {CURRENCY_NAMES[currency]?.split(' ')[0]}
                  </span>
                </div>
                <span
                  class={`font-mono text-xs tabular-nums ${isTarget ? 'text-primary font-bold' : 'opacity-60'}`}>
                  {rate.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p class="text-base-content/20 pt-1 text-center font-mono text-[10px] tracking-widest uppercase">
        Rates via ECB · 20 Mar 2026
      </p>
    </div>
  );
};

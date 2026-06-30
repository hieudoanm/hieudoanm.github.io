import {
  convert,
  CURRENCIES,
  CURRENCY_NAMES,
  QUICK_PAIRS,
} from '@hieudoanm.github.io/data/currencies';
import { FC, useMemo, useState } from 'react';

export const CurrencyTab: FC = () => {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('SGD');
  const [amount, setAmount] = useState<string>('1');

  const converted = useMemo(() => {
    const n = Number.parseFloat(amount);
    if (Number.isNaN(n) || n < 0) return null;
    return convert(n, from, to);
  }, [amount, from, to]);

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="form-control">
        <label className="label py-1">
          <span className="label-text text-base-content/50 text-[10px] tracking-widest uppercase">
            Amount
          </span>
        </label>
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered input-sm w-full font-mono text-lg font-bold tracking-tight"
          placeholder="1.00"
        />
      </div>

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text text-base-content/50 text-[10px] tracking-widest uppercase">
            From
          </span>
        </label>
        <select
          className="select select-bordered select-sm text-sm font-bold"
          value={from}
          onChange={(e) => setFrom(e.target.value)}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c} — {CURRENCY_NAMES[c]}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => {
          setFrom(to);
          setTo(from);
        }}
        className="btn btn-outline btn-sm w-full font-mono tracking-widest">
        ⇅ Swap
      </button>

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text text-base-content/50 text-[10px] tracking-widest uppercase">
            To
          </span>
        </label>
        <select
          className="select select-bordered select-sm text-sm font-bold"
          value={to}
          onChange={(e) => setTo(e.target.value)}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c} — {CURRENCY_NAMES[c]}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-base-100 rounded-box border-base-300 border p-3 text-center">
        {converted !== null ? (
          <>
            <p className="text-base-content/40 mb-1 font-mono text-[10px] tracking-widest uppercase">
              {parseFloat(amount).toLocaleString()} {from} =
            </p>
            <p className="text-primary font-mono text-2xl font-bold tracking-tight">
              {converted.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
              <span className="text-base-content/50 ml-1.5 text-base">
                {to}
              </span>
            </p>
            <p className="text-base-content/30 mt-1 font-mono text-[10px]">
              1 {from} ={' '}
              {convert(1, from, to).toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 6,
              })}{' '}
              {to}
            </p>
          </>
        ) : (
          <p className="text-base-content/30 text-xs">Enter a valid amount</p>
        )}
      </div>

      <hr className="border-base-300 my-1" />

      <div>
        <p className="text-base-content/30 mb-2 font-mono text-[10px] tracking-widest uppercase">
          1 {from} vs majors
        </p>
        <div className="flex flex-col gap-1">
          {QUICK_PAIRS.filter((c) => c !== from).map((currency) => {
            const rate = convert(1, from, currency);
            const isTarget = currency === to;
            return (
              <div
                key={currency}
                onClick={() => setTo(currency)}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ${
                  isTarget
                    ? 'bg-primary/10 ring-primary/30 ring-1'
                    : 'hover:bg-base-300'
                }`}>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold tracking-wider ${isTarget ? 'text-primary' : 'opacity-70'}`}>
                    {currency}
                  </span>
                  <span className="text-base-content/30 text-[10px] tracking-wide">
                    {CURRENCY_NAMES[currency]?.split(' ')[0]}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs tabular-nums ${isTarget ? 'text-primary font-bold' : 'opacity-60'}`}>
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

      <p className="text-base-content/20 pt-1 text-center font-mono text-[10px] tracking-widest uppercase">
        Rates via ECB · 20 Mar 2026
      </p>
    </div>
  );
};
CurrencyTab.displayName = 'CurrencyTab';

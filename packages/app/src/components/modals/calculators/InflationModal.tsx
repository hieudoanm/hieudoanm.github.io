import countriesCurrencies from '@hieudoanm/json/inflation/countries_currencies.json';
import currencies from '@hieudoanm/json/inflation/currencies.json';
import history from '@hieudoanm/json/inflation/history.json';
import { FC, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type Country = {
  countryName: string;
  countryCode: string;
  indicatorName: string;
  indicatorCode: string;
  data: Record<string, number | null>;
};

type InflationResult = {
  adjustedAmount: number;
  cumulativeRate: number;
  averageRate: number;
  health: 'deflation' | 'low' | 'moderate' | 'high';
};

type Tab = 'result' | 'options';

/* ------------------------------------------------------------------ */
/* Engine                                                               */
/* ------------------------------------------------------------------ */

const calculateInflation = (
  data: Record<string, number | null>,
  startYear: number,
  endYear: number,
  amount: number
): InflationResult | null => {
  if (startYear >= endYear) return null;
  let adjusted = amount;
  let cumulativeRate = 0;
  let yearsCount = 0;
  for (let y = startYear; y < endYear; y++) {
    const value = data[y.toString()];
    if (value == null) return null;
    adjusted *= 1 + value / 100;
    cumulativeRate += value;
    yearsCount++;
  }
  const averageRate = cumulativeRate / yearsCount;
  let health: InflationResult['health'] = 'moderate';
  if (averageRate < 0) health = 'deflation';
  else if (averageRate < 3) health = 'low';
  else if (averageRate < 6) health = 'moderate';
  else health = 'high';
  return {
    adjustedAmount: Number(adjusted.toFixed(2)),
    cumulativeRate: Number(cumulativeRate.toFixed(2)),
    averageRate: Number(averageRate.toFixed(2)),
    health,
  };
};

const currencyLocaleMap: Record<string, string> = {
  USD: 'en-US',
  VND: 'vi-VN',
  JPY: 'ja-JP',
  EUR: 'de-DE',
  GBP: 'en-GB',
  AUD: 'en-AU',
  CAD: 'en-CA',
  CHF: 'de-CH',
  CNY: 'zh-CN',
  SEK: 'sv-SE',
  NOK: 'nb-NO',
  DKK: 'da-DK',
  INR: 'en-IN',
  RUB: 'ru-RU',
  BRL: 'pt-BR',
  MXN: 'es-MX',
  ZAR: 'en-ZA',
  SGD: 'en-SG',
  HKD: 'zh-HK',
  NZD: 'en-NZ',
  KRW: 'ko-KR',
  TRY: 'tr-TR',
  ARS: 'es-AR',
  PLN: 'pl-PL',
  PHP: 'en-PH',
  IDR: 'id-ID',
  MYR: 'ms-MY',
  THB: 'th-TH',
  ILS: 'he-IL',
  CLP: 'es-CL',
  COP: 'es-CO',
  SAR: 'ar-SA',
  AED: 'ar-AE',
  EGP: 'ar-EG',
  NGN: 'en-NG',
  PKR: 'en-PK',
  BD: 'bn-BD',
  KES: 'en-KE',
  CZK: 'cs-CZ',
  HUF: 'hu-HU',
  RON: 'ro-RO',
  BGN: 'bg-BG',
  HRK: 'hr-HR',
  VEF: 'es-VE',
  UAH: 'uk-UA',
  LKR: 'si-LK',
};

const healthConfig = {
  deflation: {
    border: 'border-success',
    bg: 'bg-success',
    text: 'text-success-content',
    emoji: '🟢',
  },
  low: {
    border: 'border-warning',
    bg: 'bg-warning',
    text: 'text-warning-content',
    emoji: '🟡',
  },
  moderate: {
    border: 'border-orange-500',
    bg: 'bg-orange-400',
    text: 'text-white',
    emoji: '🟠',
  },
  high: {
    border: 'border-error',
    bg: 'bg-error',
    text: 'text-error-content',
    emoji: '🔴',
  },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const countries = Object.values(history) as Country[];

const initState = () => {
  const defaultCountry =
    countries.find((c) => c.countryName.toLowerCase() === 'viet nam') ?? null;
  const defaultCurrency =
    (countriesCurrencies as Record<string, string[]>)[
      defaultCountry?.countryCode ?? ''
    ]?.at(0) ?? 'VND';
  const years = Object.keys(defaultCountry?.data ?? {}).filter(
    (y) => defaultCountry?.data[y] !== null
  );
  const selectedYear = years[0] ?? '';
  const targetYear = years[years.length - 1] ?? '';
  const amount = 1_000_000;
  const result = calculateInflation(
    defaultCountry?.data ?? {},
    Number(selectedYear),
    Number(targetYear),
    amount
  );
  return {
    selectedCountry: defaultCountry,
    currency: defaultCurrency,
    selectedYear,
    targetYear,
    amount,
    result,
  };
};

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const InflationModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('options');
  const [
    { selectedCountry, currency, selectedYear, targetYear, amount, result },
    setState,
  ] = useState(initState);

  const locale = currencyLocaleMap[currency] ?? 'en-US';

  const recalc = (
    country: Country | null,
    cur: string,
    sy: string,
    ty: string,
    amt: number
  ) => {
    const r = calculateInflation(
      country?.data ?? {},
      Number(sy),
      Number(ty),
      amt
    );
    setState({
      selectedCountry: country,
      currency: cur,
      selectedYear: sy,
      targetYear: ty,
      amount: amt,
      result: r,
    });
  };

  const onCountryChange = (name: string) => {
    const country = countries.find((c) => c.countryName === name) ?? null;
    const cur =
      (countriesCurrencies as Record<string, string[]>)[
        country?.countryCode ?? ''
      ]?.at(0) ?? 'USD';
    const yrs = Object.keys(country?.data ?? {}).filter(
      (y) => country?.data[y] !== null
    );
    const sy = yrs[0] ?? '';
    const ty = yrs[yrs.length - 1] ?? '';
    recalc(country, cur, sy, ty, amount);
  };

  const availableYears = Object.keys(selectedCountry?.data ?? {}).filter(
    (y) => selectedCountry?.data[y] !== null
  );

  const hc = result ? healthConfig[result.health] : null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">
          💸 Inflation Calculator
        </h3>

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-boxed mb-4">
          <a
            role="tab"
            className={`tab flex-1 ${tab === 'options' ? 'tab-active' : ''}`}
            onClick={() => setTab('options')}>
            ⚙️ Options
          </a>
          <a
            role="tab"
            className={`tab flex-1 ${tab === 'result' ? 'tab-active' : ''}`}
            onClick={() => setTab('result')}>
            📊 Result
          </a>
        </div>

        {/* ── Options tab ── */}
        {tab === 'options' && (
          <div className="space-y-4">
            {/* Country */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold">🌍 Country</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedCountry?.countryName ?? ''}
                onChange={(e) => onCountryChange(e.target.value)}>
                <option value="" disabled>
                  Select a country
                </option>
                {countries
                  .sort((a, b) => a.countryName.localeCompare(b.countryName))
                  .map((c) => (
                    <option key={c.countryCode} value={c.countryName}>
                      {c.countryName}
                    </option>
                  ))}
              </select>
            </div>

            {/* Currency */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold">💰 Currency</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={currency}
                onChange={(e) =>
                  recalc(
                    selectedCountry,
                    e.target.value,
                    selectedYear,
                    targetYear,
                    amount
                  )
                }>
                {(currencies as string[]).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Years */}
            <div className="grid grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold">📅 From</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedYear}
                  onChange={(e) =>
                    recalc(
                      selectedCountry,
                      currency,
                      e.target.value,
                      targetYear,
                      amount
                    )
                  }>
                  <option value="" disabled>
                    Year
                  </option>
                  {availableYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold">📅 To</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={targetYear}
                  onChange={(e) =>
                    recalc(
                      selectedCountry,
                      currency,
                      selectedYear,
                      e.target.value,
                      amount
                    )
                  }>
                  <option value="" disabled>
                    Year
                  </option>
                  {availableYears
                    .sort((a, b) => Number(b) - Number(a))
                    .map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Amount */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold">💵 Amount</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={amount}
                min={0}
                onChange={(e) => {
                  const amt = Number(e.target.value);
                  if (amt < 0) return;
                  recalc(
                    selectedCountry,
                    currency,
                    selectedYear,
                    targetYear,
                    amt
                  );
                }}
              />
            </div>

            <button
              className="btn btn-primary w-full"
              onClick={() => setTab('result')}>
              Calculate →
            </button>
          </div>
        )}

        {/* ── Result tab ── */}
        {tab === 'result' && (
          <div>
            {result && hc ? (
              <div
                className={`rounded-xl border-2 p-4 ${hc.border} ${hc.bg} ${hc.text}`}>
                <h2 className="mb-3 flex items-center gap-2 font-bold">
                  {hc.emoji} {selectedCountry?.countryName} · {selectedYear}–
                  {targetYear}
                </h2>
                <table className="w-full table-auto text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 font-semibold">💵 Original</td>
                      <td className="py-1 text-right">
                        {amount.toLocaleString(locale, {
                          style: 'currency',
                          currency,
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">➡️ Adjusted</td>
                      <td className="py-1 text-right">
                        {result.adjustedAmount.toLocaleString(locale, {
                          style: 'currency',
                          currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">📊 Cumulative</td>
                      <td className="py-1 text-right">
                        {result.cumulativeRate.toLocaleString(locale, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">📈 Average/yr</td>
                      <td className="py-1 text-right">
                        {result.averageRate.toLocaleString(locale, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">🩺 Health</td>
                      <td className="py-1 text-right font-bold capitalize">
                        {result.health}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-sm opacity-50">
                ⚠️ No data available for <em>{selectedCountry?.countryName}</em>{' '}
                in the selected year range.
                <br />
                <button
                  className="btn btn-ghost btn-sm mt-4"
                  onClick={() => setTab('options')}>
                  ← Back to options
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};

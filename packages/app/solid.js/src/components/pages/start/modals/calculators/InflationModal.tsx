import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import countriesCurrencies from '@hieudoanm.github.io/json/inflation/countries_currencies.json';
import currencies from '@hieudoanm.github.io/json/inflation/currencies.json';
import history from '@hieudoanm.github.io/json/inflation/history.json';
import { createSignal } from 'solid-js';

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

const healthConfig: Record<
  string,
  { border: string; bg: string; text: string; emoji: string }
> = {
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

export const InflationModal = (props: { onClose: () => void }) => {
  const [tab, setTab] = createSignal<Tab>('options');
  const [selectedCountry, setSelectedCountry] = createSignal<Country | null>(
    initState().selectedCountry
  );
  const [currency, setCurrency] = createSignal(initState().currency);
  const [selectedYear, setSelectedYear] = createSignal(
    initState().selectedYear
  );
  const [targetYear, setTargetYear] = createSignal(initState().targetYear);
  const [amount, setAmount] = createSignal(initState().amount);
  const [result, setResult] = createSignal<InflationResult | null>(
    initState().result
  );

  const locale = () => currencyLocaleMap[currency()] ?? 'en-US';

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
    setSelectedCountry(country);
    setCurrency(cur);
    setSelectedYear(sy);
    setTargetYear(ty);
    setAmount(amt);
    setResult(r);
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
    recalc(country, cur, sy, ty, amount());
  };

  const availableYears = () =>
    Object.keys(selectedCountry()?.data ?? {}).filter(
      (y) => selectedCountry()?.data[y] !== null
    );

  const hc = () => (result() ? healthConfig[result()!.health] : null);

  return (
    <ModalWrapper
      onClose={props.onClose}
      title="💸 Inflation Calculator"
      size="max-w-md">
      <div role="tablist" class="tabs tabs-boxed mb-4">
        <a
          role="tab"
          class={`tab flex-1 ${tab() === 'options' ? 'tab-active' : ''}`}
          onClick={() => setTab('options')}>
          ⚙️ Options
        </a>
        <a
          role="tab"
          class={`tab flex-1 ${tab() === 'result' ? 'tab-active' : ''}`}
          onClick={() => setTab('result')}>
          📊 Result
        </a>
      </div>

      {tab() === 'options' && (
        <div class="space-y-4">
          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-semibold">🌍 Country</span>
            </label>
            <select
              class="select select-bordered w-full"
              value={selectedCountry()?.countryName ?? ''}
              onChange={(e: Event) =>
                onCountryChange((e.target as HTMLSelectElement).value)
              }>
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
          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-semibold">💰 Currency</span>
            </label>
            <select
              class="select select-bordered w-full"
              value={currency()}
              onChange={(e: Event) =>
                recalc(
                  selectedCountry(),
                  (e.target as HTMLSelectElement).value,
                  selectedYear(),
                  targetYear(),
                  amount()
                )
              }>
              {(currencies as string[]).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="form-control">
              <label class="label pb-1">
                <span class="label-text font-semibold">📅 From</span>
              </label>
              <select
                class="select select-bordered w-full"
                value={selectedYear()}
                onChange={(e: Event) =>
                  recalc(
                    selectedCountry(),
                    currency(),
                    (e.target as HTMLSelectElement).value,
                    targetYear(),
                    amount()
                  )
                }>
                {availableYears().map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-control">
              <label class="label pb-1">
                <span class="label-text font-semibold">📅 To</span>
              </label>
              <select
                class="select select-bordered w-full"
                value={targetYear()}
                onChange={(e: Event) =>
                  recalc(
                    selectedCountry(),
                    currency(),
                    selectedYear(),
                    (e.target as HTMLSelectElement).value,
                    amount()
                  )
                }>
                {availableYears()
                  .sort((a, b) => Number(b) - Number(a))
                  .map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-semibold">💵 Amount</span>
            </label>
            <input
              type="number"
              class="input input-bordered w-full"
              value={amount()}
              min={0}
              onChange={(e: Event) => {
                const amt = Number((e.target as HTMLInputElement).value);
                if (amt < 0) return;
                recalc(
                  selectedCountry(),
                  currency(),
                  selectedYear(),
                  targetYear(),
                  amt
                );
              }}
            />
          </div>
          <button
            class="btn btn-primary w-full"
            onClick={() => setTab('result')}>
            Calculate →
          </button>
        </div>
      )}

      {tab() === 'result' && (
        <div>
          {result() && hc() ? (
            <div
              class={`rounded-xl border-2 p-4 ${hc()!.border} ${hc()!.bg} ${hc()!.text}`}>
              <h2 class="mb-3 flex items-center gap-2 font-bold">
                {hc()!.emoji} {selectedCountry()?.countryName} ·{' '}
                {selectedYear()}–{targetYear()}
              </h2>
              <table class="w-full table-auto text-sm">
                <tbody>
                  <tr>
                    <td class="py-1 font-semibold">💵 Original</td>
                    <td class="py-1 text-right">
                      {amount().toLocaleString(locale(), {
                        style: 'currency',
                        currency: currency(),
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td class="py-1 font-semibold">➡️ Adjusted</td>
                    <td class="py-1 text-right">
                      {result()!.adjustedAmount.toLocaleString(locale(), {
                        style: 'currency',
                        currency: currency(),
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td class="py-1 font-semibold">📊 Cumulative</td>
                    <td class="py-1 text-right">
                      {result()!.cumulativeRate.toLocaleString(locale(), {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td class="py-1 font-semibold">📈 Average/yr</td>
                    <td class="py-1 text-right">
                      {result()!.averageRate.toLocaleString(locale(), {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td class="py-1 font-semibold">🩺 Health</td>
                    <td class="py-1 text-right font-bold capitalize">
                      {result()!.health}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div class="py-8 text-center text-sm opacity-50">
              ⚠️ No data available for <em>{selectedCountry()?.countryName}</em>{' '}
              in the selected year range.
              <br />
              <button
                class="btn btn-ghost btn-sm mt-4"
                onClick={() => setTab('options')}>
                ← Back to options
              </button>
            </div>
          )}
        </div>
      )}
    </ModalWrapper>
  );
};

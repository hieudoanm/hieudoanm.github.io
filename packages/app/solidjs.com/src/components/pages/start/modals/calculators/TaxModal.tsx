import { createMemo, createSignal } from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Period = 'monthly' | 'annual';
type SalaryMode = 'gross' | 'net';

type TaxBracket = {
  limit: number;
  rate: number;
};

type TaxBreakdownItem = {
  rate: number;
  taxable: number;
  tax: number;
};

const PERSONAL_DEDUCTION = 11_000_000;
const DEPENDENT_DEDUCTION = 4_400_000;
const INSURANCE_CAP = 36_000_000;

const EMPLOYEE_INSURANCE = {
  BHXH: 0.08,
  BHYT: 0.015,
  BHTN: 0.01,
};

const EMPLOYER_INSURANCE = {
  BHXH: 0.175,
  BHYT: 0.03,
  BHTN: 0.01,
};

const TAX_BRACKETS: readonly TaxBracket[] = [
  { limit: 5_000_000, rate: 0.05 },
  { limit: 5_000_000, rate: 0.1 },
  { limit: 8_000_000, rate: 0.15 },
  { limit: 14_000_000, rate: 0.2 },
  { limit: 20_000_000, rate: 0.25 },
  { limit: 28_000_000, rate: 0.3 },
  { limit: Infinity, rate: 0.35 },
];

const toMonthly = (value: number, period: Period): number =>
  period === 'annual' ? value / 12 : value;

const sumRates = (rates: Record<string, number>): number =>
  Object.values(rates).reduce((a, b) => a + b, 0);

const clampInsuranceBase = (gross: number, enabled: boolean): number =>
  enabled ? Math.min(gross, INSURANCE_CAP) : 0;

const calculateTaxBreakdown = (
  taxableIncome: number
): { breakdown: TaxBreakdownItem[]; totalTax: number } => {
  let remaining = taxableIncome;
  let totalTax = 0;
  const breakdown: TaxBreakdownItem[] = [];

  for (const bracket of TAX_BRACKETS) {
    if (remaining <= 0) break;
    const applied = Math.min(bracket.limit, remaining);
    const tax = applied * bracket.rate;
    breakdown.push({ rate: bracket.rate, taxable: applied, tax });
    totalTax += tax;
    remaining -= applied;
  }

  return { breakdown, totalTax };
};

const solveGrossFromNet = (
  targetNet: number,
  dependents: number,
  insuranceEnabled: boolean
): number => {
  let gross = targetNet;
  for (let i = 0; i < 20; i++) {
    const insuranceBase = clampInsuranceBase(gross, insuranceEnabled);
    const insurance = insuranceBase * sumRates(EMPLOYEE_INSURANCE);
    const deductions =
      PERSONAL_DEDUCTION + dependents * DEPENDENT_DEDUCTION + insurance;
    const taxable = Math.max(0, gross - deductions);
    const { totalTax } = calculateTaxBreakdown(taxable);
    const net = gross - insurance - totalTax;
    gross += targetNet - net;
  }
  return Math.max(0, gross);
};

export const TaxModal = (props: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = createSignal<'input' | 'results'>('input');
  const [income, setIncome] = createSignal(20_000_000);
  const [dependents, setDependents] = createSignal(0);
  const [period, setPeriod] = createSignal<Period>('monthly');
  const [salaryMode, setSalaryMode] = createSignal<SalaryMode>('gross');
  const [insuranceEnabled, setInsuranceEnabled] = createSignal(true);

  const data = createMemo(() => {
    const grossBase =
      salaryMode() === 'gross'
        ? income()
        : solveGrossFromNet(income(), dependents(), insuranceEnabled());

    const grossMonthly = toMonthly(grossBase, period());
    const insuranceBase = clampInsuranceBase(grossMonthly, insuranceEnabled());
    const employeeInsurance = insuranceBase * sumRates(EMPLOYEE_INSURANCE);
    const employerInsurance = insuranceBase * sumRates(EMPLOYER_INSURANCE);
    const personalDeduction = PERSONAL_DEDUCTION;
    const dependentDeduction = dependents() * DEPENDENT_DEDUCTION;
    const totalDeductions =
      personalDeduction + dependentDeduction + employeeInsurance;
    const taxableIncome = Math.max(0, grossMonthly - totalDeductions);
    const { breakdown, totalTax } = calculateTaxBreakdown(taxableIncome);
    const netMonthly = grossMonthly - employeeInsurance - totalTax;

    return {
      grossMonthly,
      insuranceBase,
      employeeInsurance,
      employerInsurance,
      personalDeduction,
      dependentDeduction,
      totalDeductions,
      taxableIncome,
      breakdown,
      totalTax,
      netMonthly,
      effectiveTaxRate: grossMonthly ? totalTax / grossMonthly : 0,
      totalLaborCost: grossMonthly + employerInsurance,
    };
  });

  return (
    <ModalWrapper onClose={props.onClose} title="Tính Thuế TNCN">
      <div role="tablist" class="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          class={`tab w-[50%] ${activeTab() === 'input' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('input')}>
          Input
        </button>
        <button
          role="tab"
          class={`tab w-[50%] ${activeTab() === 'results' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('results')}>
          Results
        </button>
      </div>

      {activeTab() === 'input' && (
        <div class="space-y-3">
          <div class="form-control">
            <label class="label mb-1 p-0">
              <span class="label-text text-xs font-medium opacity-70">
                Kỳ tính thuế
              </span>
            </label>
            <select
              class="select select-bordered select-sm w-full"
              value={period()}
              onChange={(e: Event) =>
                setPeriod((e.target as HTMLSelectElement).value as Period)
              }>
              <option value="monthly">📅 Tháng</option>
              <option value="annual">🗓️ Năm</option>
            </select>
          </div>

          <div class="flex justify-center">
            <button
              class="btn btn-primary btn-sm flex w-full items-center gap-2"
              onClick={() =>
                setSalaryMode((m) => (m === 'gross' ? 'net' : 'gross'))
              }>
              {salaryMode() === 'gross' ? (
                <span>Gross → Net</span>
              ) : (
                <span>Net → Gross</span>
              )}
            </button>
          </div>

          <div class="form-control">
            <label class="label mb-1 p-0">
              <span class="label-text text-xs font-medium opacity-70">
                {salaryMode() === 'gross'
                  ? '💼 Thu nhập gộp (Gross)'
                  : '💰 Thu nhập thực lĩnh (Net)'}
              </span>
            </label>
            <input
              type="number"
              class="input input-sm input-bordered w-full"
              value={income()}
              onChange={(e: Event) =>
                setIncome(+(e.target as HTMLInputElement).value)
              }
            />
          </div>

          <div class="form-control">
            <label class="label mb-1 p-0">
              <span class="label-text text-xs font-medium opacity-70">
                👨‍👩‍👧 Người phụ thuộc
              </span>
            </label>
            <input
              type="number"
              class="input input-sm input-bordered w-full"
              value={dependents()}
              onChange={(e: Event) =>
                setDependents(+(e.target as HTMLInputElement).value)
              }
            />
          </div>

          <div class="form-control">
            <label class="label cursor-pointer p-0">
              <span class="label-text text-xs font-medium opacity-70">
                🛡️ Tính bảo hiểm
              </span>
              <input
                type="checkbox"
                class="toggle toggle-primary toggle-sm"
                checked={insuranceEnabled()}
                onChange={() => setInsuranceEnabled((v) => !v)}
              />
            </label>
          </div>
        </div>
      )}

      {activeTab() === 'results' && (
        <div class="space-y-4">
          <div class="bg-base-200 rounded-xl p-3 text-sm">
            <h4 class="mb-2 font-semibold">🧾 Khấu trừ</h4>
            <div class="space-y-1 text-xs">
              <div class="flex justify-between">
                <span class="opacity-70">👤 Cá nhân:</span>
                <span>{data().personalDeduction.toLocaleString()} VND</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-70">👨‍👩‍👧 Phụ thuộc:</span>
                <span>{data().dependentDeduction.toLocaleString()} VND</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-70">💼 Bảo hiểm NLĐ:</span>
                <span>{data().employeeInsurance.toLocaleString()} VND</span>
              </div>
              <div class="divider my-1 h-1" />
              <div class="flex justify-between font-bold">
                <span>Tổng:</span>
                <span>{data().totalDeductions.toLocaleString()} VND</span>
              </div>
            </div>
            {insuranceEnabled() &&
              data().insuranceBase < data().grossMonthly && (
                <p class="text-warning mt-2 text-xs">⚠ Áp dụng trần bảo hiểm</p>
              )}
          </div>

          <div class="bg-base-200 rounded-xl p-3 text-sm">
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="opacity-70">🧾 Thu nhập chịu thuế:</span>
                <span>{data().taxableIncome.toLocaleString()} VND</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="opacity-70">📉 Thuế hiệu dụng:</span>
                <span>{(data().effectiveTaxRate * 100).toFixed(2)}%</span>
              </div>
              <div class="divider my-1 h-1" />
              <div class="text-primary flex justify-between font-bold">
                <span>💰 Thực lĩnh:</span>
                <span>{data().netMonthly.toLocaleString()} VND</span>
              </div>
              <div class="flex justify-between text-[10px] opacity-70">
                <span>Tổng chi phí DN:</span>
                <span>{data().totalLaborCost.toLocaleString()} VND</span>
              </div>
            </div>
          </div>

          {data().breakdown.length > 0 && (
            <div class="bg-base-200 rounded-xl p-3">
              <h4 class="mb-2 text-xs font-semibold">🧮 Chi tiết thuế</h4>
              <table class="table-sm table w-full text-[10px]">
                <thead>
                  <tr>
                    <th class="px-0">Thuế suất</th>
                    <th class="px-0 text-right">Chịu thuế</th>
                    <th class="px-0 text-right">Thuế</th>
                  </tr>
                </thead>
                <tbody>
                  {data().breakdown.map((b, i) => (
                    <tr key={i}>
                      <td class="px-0">{b.rate * 100}%</td>
                      <td class="px-0 text-right">
                        {b.taxable.toLocaleString()}
                      </td>
                      <td class="px-0 text-right">{b.tax.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </ModalWrapper>
  );
};

import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useMemo, useState } from 'react';

import { Period, SalaryMode } from './types';
import {
  calculateTaxBreakdown,
  clampInsuranceBase,
  solveGrossFromNet,
  sumRates,
  toMonthly,
} from './utils/tax';
import {
  EMPLOYEE_INSURANCE,
  EMPLOYER_INSURANCE,
  PERSONAL_DEDUCTION,
  DEPENDENT_DEDUCTION,
} from './constants';

export const TaxModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');
  const [income, setIncome] = useState(20_000_000);
  const [dependents, setDependents] = useState(0);
  const [period, setPeriod] = useState<Period>('monthly');
  const [salaryMode, setSalaryMode] = useState<SalaryMode>('gross');
  const [insuranceEnabled, setInsuranceEnabled] = useState(true);

  const data = useMemo(() => {
    const grossBase =
      salaryMode === 'gross'
        ? income
        : solveGrossFromNet(income, dependents, insuranceEnabled);
    const grossMonthly = toMonthly(grossBase, period);
    const insuranceBase = clampInsuranceBase(grossMonthly, insuranceEnabled);
    const employeeInsurance = insuranceBase * sumRates(EMPLOYEE_INSURANCE);
    const employerInsurance = insuranceBase * sumRates(EMPLOYER_INSURANCE);
    const totalDeductions =
      PERSONAL_DEDUCTION + dependents * DEPENDENT_DEDUCTION + employeeInsurance;
    const taxableIncome = Math.max(0, grossMonthly - totalDeductions);
    const { breakdown, totalTax } = calculateTaxBreakdown(taxableIncome);
    const netMonthly = grossMonthly - employeeInsurance - totalTax;

    return {
      grossMonthly,
      insuranceBase,
      employeeInsurance,
      employerInsurance,
      personalDeduction: PERSONAL_DEDUCTION,
      dependentDeduction: dependents * DEPENDENT_DEDUCTION,
      totalDeductions,
      taxableIncome,
      breakdown,
      totalTax,
      netMonthly,
      effectiveTaxRate: grossMonthly ? totalTax / grossMonthly : 0,
      totalLaborCost: grossMonthly + employerInsurance,
    };
  }, [income, dependents, period, insuranceEnabled, salaryMode]);

  return (
    <ModalWrapper onClose={onClose} title="Tính Thuế TNCN">
      <div className="border-base-300 mb-4 flex w-full border-b">
        <button
          className={`w-1/2 border-b-2 px-3 py-2 text-sm transition-colors ${
            activeTab === 'input'
              ? 'border-primary text-primary'
              : 'text-base-content/40 border-transparent'
          }`}
          onClick={() => setActiveTab('input')}>
          Input
        </button>
        <button
          className={`w-1/2 border-b-2 px-3 py-2 text-sm transition-colors ${
            activeTab === 'results'
              ? 'border-primary text-primary'
              : 'text-base-content/40 border-transparent'
          }`}
          onClick={() => setActiveTab('results')}>
          Results
        </button>
      </div>

      {activeTab === 'input' && (
        <div className="space-y-3">
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs font-normal opacity-70">
                Kỳ tính thuế
              </span>
            </label>
            <select
              className="select select-bordered select-sm w-full"
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}>
              <option value="monthly">📅 Tháng</option>
              <option value="annual">🗓️ Năm</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              className="btn btn-primary btn-sm flex w-full items-center gap-2"
              onClick={() =>
                setSalaryMode((m) => (m === 'gross' ? 'net' : 'gross'))
              }>
              {salaryMode === 'gross' ? (
                <span>Gross → Net</span>
              ) : (
                <span>Net → Gross</span>
              )}
            </button>
          </div>
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs font-normal opacity-70">
                {salaryMode === 'gross'
                  ? '💼 Thu nhập gộp (Gross)'
                  : '💰 Thu nhập thực lĩnh (Net)'}
              </span>
            </label>
            <input
              type="number"
              className="input input-sm input-bordered w-full"
              value={income}
              onChange={(e) => setIncome(+e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs font-normal opacity-70">
                👨‍👩‍👧 Người phụ thuộc
              </span>
            </label>
            <input
              type="number"
              className="input input-sm input-bordered w-full"
              value={dependents}
              onChange={(e) => setDependents(+e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer p-0">
              <span className="label-text text-xs font-normal opacity-70">
                🛡️ Tính bảo hiểm
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={insuranceEnabled}
                onChange={() => setInsuranceEnabled((v) => !v)}
              />
            </label>
          </div>
        </div>
      )}

      {activeTab === 'results' && (
        <div className="space-y-4">
          <div className="bg-base-200 rounded-xl p-3 text-sm">
            <h4 className="mb-2 font-normal">🧾 Khấu trừ</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="opacity-70">👤 Cá nhân:</span>
                <span>{data.personalDeduction.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">👨‍👩‍👧 Phụ thuộc:</span>
                <span>{data.dependentDeduction.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">💼 Bảo hiểm NLĐ:</span>
                <span>{data.employeeInsurance.toLocaleString()} VND</span>
              </div>
              <div className="divider my-1 h-1" />
              <div className="flex justify-between font-normal">
                <span>Tổng:</span>
                <span>{data.totalDeductions.toLocaleString()} VND</span>
              </div>
            </div>
            {insuranceEnabled && data.insuranceBase < data.grossMonthly && (
              <p className="text-base-content/60 mt-2 text-xs">
                ⚠ Áp dụng trần bảo hiểm
              </p>
            )}
          </div>

          <div className="bg-base-200 rounded-xl p-3 text-sm">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="opacity-70">🧾 Thu nhập chịu thuế:</span>
                <span>{data.taxableIncome.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="opacity-70">📉 Thuế hiệu dụng:</span>
                <span>{(data.effectiveTaxRate * 100).toFixed(2)}%</span>
              </div>
              <div className="divider my-1 h-1" />
              <div className="text-primary flex justify-between font-normal">
                <span>💰 Thực lĩnh:</span>
                <span>{data.netMonthly.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-[10px] opacity-70">
                <span>Tổng chi phí DN:</span>
                <span>{data.totalLaborCost.toLocaleString()} VND</span>
              </div>
            </div>
          </div>

          {data.breakdown.length > 0 && (
            <div className="bg-base-200 rounded-xl p-3">
              <h4 className="mb-2 text-xs font-normal">🧮 Chi tiết thuế</h4>
              <table className="table-sm table w-full text-[10px]">
                <thead>
                  <tr>
                    <th className="px-0">Thuế suất</th>
                    <th className="px-0 text-right">Chịu thuế</th>
                    <th className="px-0 text-right">Thuế</th>
                  </tr>
                </thead>
                <tbody>
                  {data.breakdown.map((b, i) => (
                    <tr key={i}>
                      <td className="px-0">{b.rate * 100}%</td>
                      <td className="px-0 text-right">
                        {b.taxable.toLocaleString()}
                      </td>
                      <td className="px-0 text-right">
                        {b.tax.toLocaleString()}
                      </td>
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
TaxModal.displayName = 'TaxModal';

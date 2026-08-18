'use client';

import { type FC, useMemo, useState } from 'react';
import type { Period, SalaryMode, CalculatorResult } from '@/types';
import { calculateResult } from '@/lib/tax/calculator';
import { CalculatorResults } from './CalculatorResults';

interface CalculatorFormProps {
  onSave?: (
    result: CalculatorResult & {
      income: number;
      dependents: number;
      period: Period;
      salaryMode: SalaryMode;
      insuranceEnabled: boolean;
    }
  ) => void;
}

export const CalculatorForm: FC<CalculatorFormProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');
  const [income, setIncome] = useState(20_000_000);
  const [dependents, setDependents] = useState(0);
  const [period, setPeriod] = useState<Period>('monthly');
  const [salaryMode, setSalaryMode] = useState<SalaryMode>('gross');
  const [insuranceEnabled, setInsuranceEnabled] = useState(true);

  const data = useMemo(
    () =>
      calculateResult(income, dependents, period, salaryMode, insuranceEnabled),
    [income, dependents, period, insuranceEnabled, salaryMode]
  );

  return (
    <div className="rounded-box border-base-300 bg-base-200 border p-4">
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
                Ky tinh thue
              </span>
            </label>
            <select
              className="select select-bordered select-sm w-full"
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}>
              <option value="monthly">Thang</option>
              <option value="annual">Nam</option>
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
                  ? 'Thu nhap gop (Gross)'
                  : 'Thu nhap thuc linh (Net)'}
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
                Nguoi phu thuoc
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
                Tinh bao hiem
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={insuranceEnabled}
                onChange={() => setInsuranceEnabled((v) => !v)}
              />
            </label>
          </div>
          {onSave && (
            <button
              className="btn btn-outline btn-sm w-full"
              onClick={() =>
                onSave({
                  ...data,
                  income,
                  dependents,
                  period,
                  salaryMode,
                  insuranceEnabled,
                })
              }>
              Luu ket qua
            </button>
          )}
        </div>
      )}

      {activeTab === 'results' && (
        <CalculatorResults data={data} insuranceEnabled={insuranceEnabled} />
      )}
    </div>
  );
};

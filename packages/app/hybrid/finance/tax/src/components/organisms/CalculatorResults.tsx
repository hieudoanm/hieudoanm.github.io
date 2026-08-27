'use client';

import { type FC } from 'react';
import type { CalculatorResult } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/format';

interface CalculatorResultsProps {
  data: CalculatorResult;
  insuranceEnabled: boolean;
}

export const CalculatorResults: FC<CalculatorResultsProps> = ({
  data,
  insuranceEnabled,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-base-200 rounded-xl p-3 text-sm">
        <h4 className="mb-2 font-normal">Khau tru</h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="opacity-70">Ca nhan:</span>
            <span>{formatCurrency(data.personalDeduction)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Phu thuoc:</span>
            <span>{formatCurrency(data.dependentDeduction)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Bao hiem NLĐ:</span>
            <span>{formatCurrency(data.employeeInsurance)}</span>
          </div>
          <div className="divider my-1 h-1" />
          <div className="flex justify-between font-normal">
            <span>Tong:</span>
            <span>{formatCurrency(data.totalDeductions)}</span>
          </div>
        </div>
        {insuranceEnabled && data.insuranceBase < data.grossMonthly && (
          <p className="text-base-content/60 mt-2 text-xs">
            Ap dung truong bao hiem
          </p>
        )}
      </div>

      <div className="bg-base-200 rounded-xl p-3 text-sm">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="opacity-70">Thu nhap chiu thue:</span>
            <span>{formatCurrency(data.taxableIncome)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="opacity-70">Thue hieu dung:</span>
            <span>{formatPercent(data.effectiveTaxRate)}</span>
          </div>
          <div className="divider my-1 h-1" />
          <div className="text-primary flex justify-between font-normal">
            <span>Thuc linh:</span>
            <span>{formatCurrency(data.netMonthly)}</span>
          </div>
          <div className="flex justify-between text-[10px] opacity-70">
            <span>Tong chi phi DN:</span>
            <span>{formatCurrency(data.totalLaborCost)}</span>
          </div>
        </div>
      </div>

      {data.breakdown.length > 0 && (
        <div className="bg-base-200 rounded-xl p-3">
          <h4 className="mb-2 text-xs font-normal">Chi tiet thue</h4>
          <table className="table-sm table w-full text-[10px]">
            <thead>
              <tr>
                <th className="px-0">Thue suat</th>
                <th className="px-0 text-right">Chiu thue</th>
                <th className="px-0 text-right">Thue</th>
              </tr>
            </thead>
            <tbody>
              {data.breakdown.map((b, i) => (
                <tr key={i}>
                  <td className="px-0">{b.rate * 100}%</td>
                  <td className="px-0 text-right">
                    {formatCurrency(b.taxable)}
                  </td>
                  <td className="px-0 text-right">{formatCurrency(b.tax)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

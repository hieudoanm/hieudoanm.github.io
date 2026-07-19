'use client';

import { type FC } from 'react';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { CalculatorForm } from '@/components/organisms/CalculatorForm';
import { useToast } from '@/providers/ToastProvider';

const CalculatorPage: FC = () => {
  const { showToast } = useToast();

  const handleSave = () => {
    showToast('Da luu ket qua tinh thue', 'success');
  };

  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <div>
          <h1>Tinh Thue Ca Nhan</h1>
          <p className="text-base-content/50 text-sm">
            Tinh thue thu nhap ca nhan Viet Nam (PIT)
          </p>
        </div>
        <CalculatorForm onSave={handleSave} />
      </div>
    </DashboardTemplate>
  );
};

export default CalculatorPage;

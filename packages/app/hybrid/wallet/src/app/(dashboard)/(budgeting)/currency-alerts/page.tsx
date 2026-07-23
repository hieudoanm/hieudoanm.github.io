'use client';

import { DashboardTemplate } from '@/components/templates';
import { CurrencyAlerts } from '@/components/molecules';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import type { CurrencyAlert } from '@/types';

const CurrencyAlertsPage = () => {
  const {
    currencyAlerts,
    currencyRates,
    addCurrencyAlert,
    updateCurrencyAlert,
    deleteCurrencyAlert,
    loading,
  } = useData();
  const { showToast } = useToast();

  console.log('[CurrencyAlertsPage] render', {
    loading,
    count: currencyAlerts.length,
  });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  const handleAdd = (alert: CurrencyAlert) => {
    addCurrencyAlert(alert);
    showToast('Currency alert created!', 'success');
  };

  const handleUpdate = (alert: CurrencyAlert) => {
    updateCurrencyAlert(alert);
    showToast(alert.active ? 'Alert activated' : 'Alert paused', 'success');
  };

  const handleDelete = (id: string) => {
    deleteCurrencyAlert(id);
    showToast('Alert deleted', 'success');
  };

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Currency Alerts</h1>
          <p className="text-base-content/60">
            Get notified when exchange rates hit your targets
          </p>
        </div>

        <CurrencyAlerts
          alerts={currencyAlerts}
          rates={currencyRates}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </DashboardTemplate>
  );
};

export default CurrencyAlertsPage;

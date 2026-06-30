import { ComponentType } from 'react';

const loadInflation = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/financial/InflationModal').then(
    (m) => ({ default: m.InflationModal })
  );

const loadSplitBill = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/financial/SplitBillModal').then(
    (m) => ({ default: m.SplitBillModal })
  );

const loadTax = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/financial/TaxModal').then(
    (m) => ({ default: m.TaxModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  inflation: loadInflation,
  'split-bill': loadSplitBill,
  tax: loadTax,
};

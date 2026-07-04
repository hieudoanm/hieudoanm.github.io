import { ComponentType } from 'react';

const loadInflation = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-finance/InflationModal').then(
    (m) => ({ default: m.InflationModal })
  );

const loadSplitBill = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-finance/SplitBillModal').then(
    (m) => ({ default: m.SplitBillModal })
  );

const loadTax = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-finance/TaxModal').then(
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

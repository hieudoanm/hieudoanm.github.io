import { ComponentType, lazy } from 'react';

const loadsplit_bill = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/financial/SplitBillModal').then(
    (m) => ({ default: m.SplitBillModal })
  );

const loaddays_count = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/financial/DaysCountModal').then(
    (m) => ({ default: m.DaysCountModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'split-bill': loadsplit_bill,
  'days-count': loaddays_count,
};

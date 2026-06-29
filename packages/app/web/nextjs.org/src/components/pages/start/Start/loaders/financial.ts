import { ComponentType, lazy } from 'react';

const loaddays_count = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/financial/DaysCountModal').then(
    (m) => ({ default: m.DaysCountModal })
  );
const loadsplit_bill = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/financial/SplitBillModal').then(
    (m) => ({ default: m.SplitBillModal })
  );
const loadsplit_csv = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/csv/SplitCsvModal').then(
    (m) => ({ default: m.SplitCsvModal })
  );
const loadsplit_excel = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/excel/SplitExcelModal').then(
    (m) => ({ default: m.SplitExcelModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'days-count': loaddays_count,
  'split-bill': loadsplit_bill,
  'split-csv': loadsplit_csv,
  'split-excel': loadsplit_excel,
};

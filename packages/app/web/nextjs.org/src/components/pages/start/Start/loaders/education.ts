import { ComponentType, lazy } from 'react';

const loadperiodic_table = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/education/chemistry/PeriodicTableModal').then(
    (m) => ({ default: m.PeriodicTableModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'periodic-table': loadperiodic_table,
};

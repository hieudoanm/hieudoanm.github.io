import { ComponentType, lazy } from 'react';

const loaddays_count = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/clocks/DaysCountModal').then(
    (m) => ({ default: m.DaysCountModal })
  );

const loadepoch_convert = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/clocks/EpochConvertModal').then(
    (m) => ({ default: m.EpochConvertModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'days-count': loaddays_count,
  'epoch-convert': loadepoch_convert,
};

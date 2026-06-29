import { ComponentType, lazy } from 'react';

const loadepoch_convert = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/utility/EpochConvertModal').then(
    (m) => ({ default: m.EpochConvertModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'epoch-convert': loadepoch_convert,
};

import { ComponentType, lazy } from 'react';

const loadcreate_zip = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/utility/CreateZipModal').then(
    (m) => ({ default: m.CreateZipModal })
  );

const loadepoch_convert = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/utility/EpochConvertModal').then(
    (m) => ({ default: m.EpochConvertModal })
  );

const loadword_counter = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/utility/WordCounterModal').then(
    (m) => ({ default: m.WordCounterModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'create-zip': loadcreate_zip,
  'epoch-convert': loadepoch_convert,
  'word-counter': loadword_counter,
};

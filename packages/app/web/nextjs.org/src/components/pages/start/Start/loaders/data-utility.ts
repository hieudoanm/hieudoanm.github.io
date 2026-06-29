import { ComponentType, lazy } from 'react';

const loadcreate_zip = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-utility/CreateZipModal').then(
    (m) => ({ default: m.CreateZipModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'create-zip': loadcreate_zip,
};

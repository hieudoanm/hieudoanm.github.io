import { ComponentType, lazy } from 'react';

const loadlorem_ipsum = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/format/LoremIpsumModal').then(
    (m) => ({ default: m.LoremIpsumModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'lorem-ipsum': loadlorem_ipsum,
};

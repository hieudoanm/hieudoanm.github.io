import { ComponentType } from 'react';

const loadLoremIpsum = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/format/LoremIpsumModal').then(
    (m) => ({ default: m.LoremIpsumModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'lorem-ipsum': loadLoremIpsum,
};

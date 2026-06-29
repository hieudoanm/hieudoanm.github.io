import { ComponentType, lazy } from 'react';

const loadshopify_detect = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/developer/ShopifyDetectModal').then(
    (m) => ({ default: m.ShopifyDetectModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'shopify-detect': loadshopify_detect,
};

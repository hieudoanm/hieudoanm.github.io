import { ComponentType, lazy } from 'react';

const loadshopify_detect = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/developer/ShopifyDetectModal').then(
    (m) => ({ default: m.ShopifyDetectModal })
  );

const loadtext_diff = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/developer/TextDiffModal').then(
    (m) => ({ default: m.TextDiffModal })
  );

const loadtext_case = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/developer/TextCaseModal').then(
    (m) => ({ default: m.TextCaseModal })
  );

const loadtext_url_tracer = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/developer/TextUrlTracerModal').then(
    (m) => ({ default: m.TextUrlTracerModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'shopify-detect': loadshopify_detect,
  'text-diff': loadtext_diff,
  'text-case': loadtext_case,
  'text-url-tracer': loadtext_url_tracer,
};

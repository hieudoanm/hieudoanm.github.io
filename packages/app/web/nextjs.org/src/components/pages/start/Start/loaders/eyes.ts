import { ComponentType, lazy } from 'react';

const loadtumbling_e = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/eyes/TumblingEChartModal').then(
    (m) => ({ default: m.TumblingEChartModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'tumbling-e': loadtumbling_e,
};

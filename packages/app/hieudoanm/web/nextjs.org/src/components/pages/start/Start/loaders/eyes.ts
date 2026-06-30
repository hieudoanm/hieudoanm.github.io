import { ComponentType } from 'react';

const loadLogMARChart = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/eyes/LogMARChartModal').then(
    (m) => ({ default: m.LogMARChartModal })
  );

const loadSnellenChart = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/eyes/SnellenChartModal').then(
    (m) => ({ default: m.SnellenChartModal })
  );

const loadTumblingEChart = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/eyes/TumblingEChartModal').then(
    (m) => ({ default: m.TumblingEChartModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  logmar: loadLogMARChart,
  snellen: loadSnellenChart,
  'tumbling-e': loadTumblingEChart,
};

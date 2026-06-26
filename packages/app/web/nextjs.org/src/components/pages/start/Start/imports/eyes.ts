import dynamic from 'next/dynamic';

export const LogMARChartModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/LogMARChartModal').then(
      (m) => m.LogMARChartModal
    ),
  { ssr: false }
);
export const SnellenChartModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/SnellenChartModal').then(
      (m) => m.SnellenChartModal
    ),
  { ssr: false }
);
export const TumblingEChartModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/eyes/TumblingEChartModal').then(
      (m) => m.TumblingEChartModal
    ),
  { ssr: false }
);

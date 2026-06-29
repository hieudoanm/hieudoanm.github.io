import { ComponentType, lazy } from 'react';

const loadchart_maker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/image-create/ChartMakerModal').then(
    (m) => ({ default: m.ChartMakerModal })
  );
const loadresume_timeline = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/visualization/ResumeTimelineModal').then(
    (m) => ({ default: m.ResumeTimelineModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'chart-maker': loadchart_maker,
  'resume-timeline': loadresume_timeline,
};

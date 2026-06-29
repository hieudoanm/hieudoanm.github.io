import { ComponentType } from 'react';

const loadCalendarTracker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker').then(
    (m) => ({ default: m.CalendarTrackerModal })
  );

const loadGraph = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/visualization/GraphModal').then(
    (m) => ({ default: m.GraphModal })
  );

const loadLegislation = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/visualization/LegislationModal').then(
    (m) => ({ default: m.LegislationModal })
  );

const loadResumeTimeline = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/visualization/ResumeTimelineModal').then(
    (m) => ({ default: m.ResumeTimelineModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'calendar-tracker': loadCalendarTracker,
  graph: loadGraph,
  legislation: loadLegislation,
  'resume-timeline': loadResumeTimeline,
};

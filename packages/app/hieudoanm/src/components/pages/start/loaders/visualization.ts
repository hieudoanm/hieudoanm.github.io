import { ComponentType } from 'react';

const loadCalendarTracker = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/visualization/CalendarTracker').then(
    (m) => ({ default: m.CalendarTrackerModal })
  );

const loadGraph = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/visualization/GraphModal').then(
    (m) => ({ default: m.GraphModal })
  );

const loadLegislation = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/visualization/LegislationModal').then(
    (m) => ({ default: m.LegislationModal })
  );

const loadAttractors = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/visualization/AttractorsModal').then(
    (m) => ({ default: m.AttractorsModal })
  );

const loadResumeTimeline = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/visualization/ResumeTimelineModal').then(
    (m) => ({ default: m.ResumeTimelineModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  attractors: loadAttractors,
  'calendar-tracker': loadCalendarTracker,
  graph: loadGraph,
  legislation: loadLegislation,
  'resume-timeline': loadResumeTimeline,
};

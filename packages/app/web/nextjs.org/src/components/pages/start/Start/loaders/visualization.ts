import { ComponentType, lazy } from 'react';

const loadcalendar_tracker = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker').then(
    (m) => ({ default: m.CalendarTrackerModal })
  );

const loadresume_timeline = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/visualization/ResumeTimelineModal').then(
    (m) => ({ default: m.ResumeTimelineModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'calendar-tracker': loadcalendar_tracker,
  'resume-timeline': loadresume_timeline,
};

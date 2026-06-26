import dynamic from 'next/dynamic';

export const CalendarTrackerModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/CalendarTracker').then(
      (m) => m.CalendarTrackerModal
    ),
  { ssr: false }
);
export const LegislationModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/LegislationModal').then(
      (m) => m.LegislationModal
    ),
  { ssr: false }
);
export const GraphModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/GraphModal').then(
      (m) => m.GraphModal
    ),
  { ssr: false }
);
export const ResumeTimelineModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/visualization/ResumeTimelineModal').then(
      (m) => m.ResumeTimelineModal
    ),
  { ssr: false }
);

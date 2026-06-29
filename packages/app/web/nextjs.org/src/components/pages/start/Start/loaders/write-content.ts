import { ComponentType } from 'react';

const loadWriteContentBrief = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WriteContentBriefModal').then(
    (m) => ({ default: m.WriteContentBriefModal })
  );

const loadWriteContentPlanner = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WriteContentPlannerModal').then(
    (m) => ({ default: m.WriteContentPlannerModal })
  );

const loadWriteFaq = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WriteFaqModal').then(
    (m) => ({ default: m.WriteFaqModal })
  );

const loadWritePoll = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WritePollModal').then(
    (m) => ({ default: m.WritePollModal })
  );

const loadWriteTrivia = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WriteTriviaModal').then(
    (m) => ({ default: m.WriteTriviaModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-content-brief': loadWriteContentBrief,
  'write-content-planner': loadWriteContentPlanner,
  'write-faq': loadWriteFaq,
  'write-poll': loadWritePoll,
  'write-trivia': loadWriteTrivia,
};

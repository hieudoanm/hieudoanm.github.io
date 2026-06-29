import { ComponentType, lazy } from 'react';

const loadwrite_content_brief = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WriteContentBriefModal').then(
    (m) => ({ default: m.WriteContentBriefModal })
  );

const loadwrite_content_planner = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WriteContentPlannerModal').then(
    (m) => ({ default: m.WriteContentPlannerModal })
  );

const loadwrite_faq = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WriteFaqModal').then(
    (m) => ({ default: m.WriteFaqModal })
  );

const loadwrite_poll = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WritePollModal').then(
    (m) => ({ default: m.WritePollModal })
  );

const loadwrite_trivia = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-content/WriteTriviaModal').then(
    (m) => ({ default: m.WriteTriviaModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-content-brief': loadwrite_content_brief,
  'write-content-planner': loadwrite_content_planner,
  'write-faq': loadwrite_faq,
  'write-poll': loadwrite_poll,
  'write-trivia': loadwrite_trivia,
};

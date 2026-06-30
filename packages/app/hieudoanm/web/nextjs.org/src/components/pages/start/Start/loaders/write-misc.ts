import { ComponentType } from 'react';

const loadWriteAiDetector = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-misc/WriteAiDetectorModal').then(
    (m) => ({ default: m.WriteAiDetectorModal })
  );

const loadWriteExplain = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-misc/WriteExplainModal').then(
    (m) => ({ default: m.WriteExplainModal })
  );

const loadWriteSummarizePodcast = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-misc/WriteSummarizePodcastModal').then(
    (m) => ({ default: m.WriteSummarizePodcastModal })
  );

const loadWriteSummarizeYoutube = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-misc/WriteSummarizeYoutubeModal').then(
    (m) => ({ default: m.WriteSummarizeYoutubeModal })
  );

const loadWriteTitle = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-misc/WriteTitleModal').then(
    (m) => ({ default: m.WriteTitleModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-ai-detector': loadWriteAiDetector,
  'write-explain': loadWriteExplain,
  'write-summarize-podcast': loadWriteSummarizePodcast,
  'write-summarize-youtube': loadWriteSummarizeYoutube,
  'write-title': loadWriteTitle,
};

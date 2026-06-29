import { ComponentType, lazy } from 'react';

const loadwrite_ai_detector = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteAiDetectorModal').then(
    (m) => ({ default: m.WriteAiDetectorModal })
  );

const loadwrite_explain = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteExplainModal').then(
    (m) => ({ default: m.WriteExplainModal })
  );

const loadwrite_summarize_podcast = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteSummarizePodcastModal').then(
    (m) => ({ default: m.WriteSummarizePodcastModal })
  );

const loadwrite_summarize_youtube = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteSummarizeYoutubeModal').then(
    (m) => ({ default: m.WriteSummarizeYoutubeModal })
  );

const loadwrite_title = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteTitleModal').then(
    (m) => ({ default: m.WriteTitleModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-ai-detector': loadwrite_ai_detector,
  'write-explain': loadwrite_explain,
  'write-summarize-podcast': loadwrite_summarize_podcast,
  'write-summarize-youtube': loadwrite_summarize_youtube,
  'write-title': loadwrite_title,
};

import { ComponentType } from 'react';

const loadWriteCaption = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-social/WriteCaptionModal').then(
    (m) => ({ default: m.WriteCaptionModal })
  );

const loadWriteHeadline = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-social/WriteHeadlineModal').then(
    (m) => ({ default: m.WriteHeadlineModal })
  );

const loadWriteLinkedInPost = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-social/WriteLinkedInPostModal').then(
    (m) => ({ default: m.WriteLinkedInPostModal })
  );

const loadWriteMetaDescription = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-social/WriteMetaDescriptionModal').then(
    (m) => ({ default: m.WriteMetaDescriptionModal })
  );

const loadWriteTikTokScript = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-social/WriteTikTokScriptModal').then(
    (m) => ({ default: m.WriteTikTokScriptModal })
  );

const loadWriteTwitterGenerator = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-social/WriteTwitterGeneratorModal').then(
    (m) => ({ default: m.WriteTwitterGeneratorModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-caption': loadWriteCaption,
  'write-headline': loadWriteHeadline,
  'write-linkedin-post': loadWriteLinkedInPost,
  'write-meta-description': loadWriteMetaDescription,
  'write-tiktok-script': loadWriteTikTokScript,
  'write-twitter-generator': loadWriteTwitterGenerator,
};

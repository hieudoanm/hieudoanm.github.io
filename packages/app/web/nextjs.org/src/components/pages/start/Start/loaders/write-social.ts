import { ComponentType, lazy } from 'react';

const loadwrite_caption = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteCaptionModal').then(
    (m) => ({ default: m.WriteCaptionModal })
  );

const loadwrite_headline = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteHeadlineModal').then(
    (m) => ({ default: m.WriteHeadlineModal })
  );

const loadwrite_linkedin_post = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteLinkedInPostModal').then(
    (m) => ({ default: m.WriteLinkedInPostModal })
  );

const loadwrite_meta_description = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteMetaDescriptionModal').then(
    (m) => ({ default: m.WriteMetaDescriptionModal })
  );

const loadwrite_tiktok_script = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteTikTokScriptModal').then(
    (m) => ({ default: m.WriteTikTokScriptModal })
  );

const loadwrite_twitter_generator = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteTwitterGeneratorModal').then(
    (m) => ({ default: m.WriteTwitterGeneratorModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-caption': loadwrite_caption,
  'write-headline': loadwrite_headline,
  'write-linkedin-post': loadwrite_linkedin_post,
  'write-meta-description': loadwrite_meta_description,
  'write-tiktok-script': loadwrite_tiktok_script,
  'write-twitter-generator': loadwrite_twitter_generator,
};

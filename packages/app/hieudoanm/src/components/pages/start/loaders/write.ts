import { ComponentType } from 'react';

const loadWrite = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write').then(
    (m) => ({ default: m.WriteModal })
  );

const ALL_WRITE_IDS = [
  'write',
  'write-article',
  'write-article-rewriter',
  'write-blog-ideas',
  'write-blog-outline',
  'write-blog-post',
  'write-essay',
  'write-listicle',
  'write-paragraph',
  'write-story',
  'write-story-ideas',
  'write-youtube-script',
  'write-bill-of-sale',
  'write-business-name',
  'write-business-plan',
  'write-business-slogan',
  'write-cold-email',
  'write-landing-page',
  'write-nda',
  'write-podcast-script',
  'write-press-release',
  'write-privacy-policy',
  'write-purchase-agreement',
  'write-content-brief',
  'write-content-planner',
  'write-faq',
  'write-poll',
  'write-trivia',
  'write-complete',
  'write-grammar',
  'write-humanizer',
  'write-improve-text',
  'write-paraphrase',
  'write-rewrite',
  'write-shorten',
  'write-summarize',
  'write-tone',
  'write-translate',
  'write-ai-detector',
  'write-explain',
  'write-summarize-podcast',
  'write-summarize-youtube',
  'write-title',
  'write-real-estate-bio',
  'write-real-estate-description',
  'write-real-estate-listing',
  'write-caption',
  'write-headline',
  'write-linkedin-post',
  'write-meta-description',
  'write-tiktok-script',
  'write-twitter-generator',
];

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = Object.fromEntries(ALL_WRITE_IDS.map((id) => [id, loadWrite]));

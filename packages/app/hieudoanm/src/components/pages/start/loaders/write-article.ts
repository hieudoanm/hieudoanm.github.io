import { ComponentType } from 'react';

const loadWriteArticle = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteArticleModal').then(
    (m) => ({ default: m.WriteArticleModal })
  );

const loadWriteArticleRewriter = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteArticleRewriterModal').then(
    (m) => ({ default: m.WriteArticleRewriterModal })
  );

const loadWriteBlogIdeas = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteBlogIdeasModal').then(
    (m) => ({ default: m.WriteBlogIdeasModal })
  );

const loadWriteBlogOutline = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteBlogOutlineModal').then(
    (m) => ({ default: m.WriteBlogOutlineModal })
  );

const loadWriteBlogPost = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteBlogPostModal').then(
    (m) => ({ default: m.WriteBlogPostModal })
  );

const loadWriteEssay = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteEssayModal').then(
    (m) => ({ default: m.WriteEssayModal })
  );

const loadWriteListicle = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteListicleModal').then(
    (m) => ({ default: m.WriteListicleModal })
  );

const loadWriteParagraph = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteParagraphModal').then(
    (m) => ({ default: m.WriteParagraphModal })
  );

const loadWriteStoryIdeas = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteStoryIdeasModal').then(
    (m) => ({ default: m.WriteStoryIdeasModal })
  );

const loadWriteStory = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteStoryModal').then(
    (m) => ({ default: m.WriteStoryModal })
  );

const loadWriteYoutubeScript = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-article/WriteYoutubeScriptModal').then(
    (m) => ({ default: m.WriteYoutubeScriptModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-article': loadWriteArticle,
  'write-article-rewriter': loadWriteArticleRewriter,
  'write-blog-ideas': loadWriteBlogIdeas,
  'write-blog-outline': loadWriteBlogOutline,
  'write-blog-post': loadWriteBlogPost,
  'write-essay': loadWriteEssay,
  'write-listicle': loadWriteListicle,
  'write-paragraph': loadWriteParagraph,
  'write-story-ideas': loadWriteStoryIdeas,
  'write-story': loadWriteStory,
  'write-youtube-script': loadWriteYoutubeScript,
};

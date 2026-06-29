import { ComponentType, lazy } from 'react';

const loadwrite_article = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteArticleModal').then(
    (m) => ({ default: m.WriteArticleModal })
  );

const loadwrite_article_rewriter = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteArticleRewriterModal').then(
    (m) => ({ default: m.WriteArticleRewriterModal })
  );

const loadwrite_blog_ideas = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteBlogIdeasModal').then(
    (m) => ({ default: m.WriteBlogIdeasModal })
  );

const loadwrite_blog_outline = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteBlogOutlineModal').then(
    (m) => ({ default: m.WriteBlogOutlineModal })
  );

const loadwrite_blog_post = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteBlogPostModal').then(
    (m) => ({ default: m.WriteBlogPostModal })
  );

const loadwrite_essay = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteEssayModal').then(
    (m) => ({ default: m.WriteEssayModal })
  );

const loadwrite_listicle = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteListicleModal').then(
    (m) => ({ default: m.WriteListicleModal })
  );

const loadwrite_paragraph = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteParagraphModal').then(
    (m) => ({ default: m.WriteParagraphModal })
  );

const loadwrite_story = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteStoryModal').then(
    (m) => ({ default: m.WriteStoryModal })
  );

const loadwrite_story_ideas = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteStoryIdeasModal').then(
    (m) => ({ default: m.WriteStoryIdeasModal })
  );

const loadwrite_youtube_script = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-article/WriteYoutubeScriptModal').then(
    (m) => ({ default: m.WriteYoutubeScriptModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-article': loadwrite_article,
  'write-article-rewriter': loadwrite_article_rewriter,
  'write-blog-ideas': loadwrite_blog_ideas,
  'write-blog-outline': loadwrite_blog_outline,
  'write-blog-post': loadwrite_blog_post,
  'write-essay': loadwrite_essay,
  'write-listicle': loadwrite_listicle,
  'write-paragraph': loadwrite_paragraph,
  'write-story': loadwrite_story,
  'write-story-ideas': loadwrite_story_ideas,
  'write-youtube-script': loadwrite_youtube_script,
};

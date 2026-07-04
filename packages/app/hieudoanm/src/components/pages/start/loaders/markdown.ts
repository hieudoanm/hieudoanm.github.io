import { ComponentType } from 'react';

const loadMarkdownToDocx = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/markdown/MarkdownToDocxModal').then(
    (m) => ({ default: m.MarkdownToDocxModal })
  );

const loadMarkdownToHtml = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/markdown/MarkdownToHtmlModal').then(
    (m) => ({ default: m.MarkdownToHtmlModal })
  );

const loadMarkdownToImage = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/markdown/MarkdownToImageModal').then(
    (m) => ({ default: m.MarkdownToImageModal })
  );

const loadMarkdownToPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/markdown/MarkdownToPdfModal').then(
    (m) => ({ default: m.MarkdownToPdfModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'markdown-to-docx': loadMarkdownToDocx,
  'markdown-to-html': loadMarkdownToHtml,
  'markdown-to-image': loadMarkdownToImage,
  'markdown-to-pdf': loadMarkdownToPdf,
};

import { ComponentType } from 'react';

const ALL_MARKDOWN_IDS = [
  'markdown',
  'markdown-editor',
  'markdown-to-docx',
  'markdown-to-html',
  'markdown-to-image',
  'markdown-to-pdf',
];

const loadMarkdown = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/markdown').then(
    (m) => ({ default: m.MarkdownModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = Object.fromEntries(ALL_MARKDOWN_IDS.map((id) => [id, loadMarkdown]));

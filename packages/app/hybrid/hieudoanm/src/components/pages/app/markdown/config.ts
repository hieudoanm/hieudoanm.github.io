export interface MarkdownToolConfig {
  id: string;
  title: string;
  emoji: string;
  description: string;
  category: 'editor' | 'convert';
}

export const CATEGORIES: { key: string; label: string; emoji: string }[] = [
  { key: 'editor', label: 'Editor', emoji: '✏️' },
  { key: 'convert', label: 'Convert', emoji: '🔄' },
];

export const TOOLS: MarkdownToolConfig[] = [
  {
    id: 'markdown-editor',
    title: 'Markdown Editor',
    emoji: '📝',
    description: 'Full-featured markdown editor with live preview',
    category: 'editor',
  },
  {
    id: 'markdown-to-docx',
    title: 'MD to Word',
    emoji: '📄',
    description: 'Convert Markdown to Word document',
    category: 'convert',
  },
  {
    id: 'markdown-to-html',
    title: 'MD to HTML',
    emoji: '🌐',
    description: 'Convert Markdown to HTML',
    category: 'convert',
  },
  {
    id: 'markdown-to-image',
    title: 'MD to Image',
    emoji: '🖼️',
    description: 'Convert Markdown to PNG image',
    category: 'convert',
  },
  {
    id: 'markdown-to-pdf',
    title: 'MD to PDF',
    emoji: '📕',
    description: 'Convert Markdown to PDF via browser print',
    category: 'convert',
  },
];

export const CATEGORY_TOOLS: Record<string, string[]> = {};
for (const t of TOOLS) {
  (CATEGORY_TOOLS[t.category] ??= []).push(t.id);
}

let preselectedToolId: string | null = null;

export const preselectMarkdownTool = (id: string | null) => {
  preselectedToolId = id;
};

export const popPreselectedMarkdownTool = (): string | null => {
  const id = preselectedToolId;
  preselectedToolId = null;
  return id;
};

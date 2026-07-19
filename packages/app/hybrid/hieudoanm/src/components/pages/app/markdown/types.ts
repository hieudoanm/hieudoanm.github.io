export type ViewMode = 'split' | 'editor' | 'preview';

export interface MarkdownState {
  html: string;
  loading: boolean;
  markdown: string;
  ocrLoading: boolean;
  fontId: string;
  viewMode: ViewMode;
  showToc: boolean;
  restored: boolean;
  fileName: string;
  showLineNumbers: boolean;
}

import { ViewMode } from './types';

export const FONT_NAME_TIMES = 'Times-New-Roman';
export const A4_MARGIN: [number, number, number, number] = [72, 72, 72, 72];
export const ZERO_MARGIN: [number, number, number, number] = [0, 0, 0, 0];
export const STORAGE_KEY = '@hieudoanm/markdown-draft';

export interface TocItem {
  level: number;
  text: string;
  line: number;
}

export interface DraftData {
  markdown: string;
  fontId: string;
  viewMode: ViewMode;
  fileName: string;
  showLineNumbers: boolean;
}

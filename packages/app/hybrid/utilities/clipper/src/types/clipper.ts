export interface ClipboardItem {
  id: number;
  content: string;
  contentType: 'text' | 'image' | 'file';
  pinned: boolean;
  createdAt: string;
  copiedCount: number;
}

export interface ClipboardStats {
  totalEntries: number;
  pinnedEntries: number;
  textEntries: number;
  imageEntries: number;
}

export type ViewMode = 'list' | 'grid';
export type SortOrder = 'newest' | 'oldest' | 'most-copied';

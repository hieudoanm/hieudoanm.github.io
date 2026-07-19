export interface PhotoImage {
  id: string;
  name: string;
  type: string;
  width: number;
  height: number;
  size: number;
  color: string;
  tags: string[];
  favorite: boolean;
  albumId: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface Album {
  id: string;
  name: string;
  coverId: string | null;
  imageIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Adjustment {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  temperature: number;
  exposure: number;
  highlights: number;
  shadows: number;
  clarity: number;
  vibrance: number;
  sharpness: number;
  noiseReduction: number;
  vignette: number;
}

export interface Filter {
  id: string;
  name: string;
  category: string;
  adjustments: Partial<Adjustment>;
}

export interface EditHistoryEntry {
  id: string;
  imageId: string;
  label: string;
  adjustments: Adjustment;
  filterId: string | null;
  timestamp: number;
}

export interface Layer {
  id: string;
  name: string;
  type: 'image' | 'text' | 'shape';
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
}

export interface PhotoSettings {
  theme: string;
  defaultExportFormat: string;
  canvasBackground: string;
  defaultQuality: number;
}

export type SortField = 'name' | 'date' | 'size' | 'dimensions';
export type SortDirection = 'asc' | 'desc';
export type ViewMode = 'grid' | 'list';
export type Tool =
  | 'move'
  | 'crop'
  | 'brush'
  | 'text'
  | 'shape'
  | 'heal'
  | 'clone'
  | 'blur'
  | 'sharpen'
  | 'dodge'
  | 'burn'
  | 'eraser';

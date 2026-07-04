export type BgMode = 'grid' | 'white' | 'black' | 'transparent';
export type Tab = 'editor' | 'icons';
export interface GeneratedIcon {
  size: number;
  dataUrl: string;
  canvas: HTMLCanvasElement;
}

export interface SVGPoint {
  x: number;
  y: number;
}

export interface SVGGradientStop {
  color: string;
  offset: number;
  opacity: number;
}

export interface SVGGradient {
  id: string;
  type: 'linear' | 'radial';
  stops: SVGGradientStop[];
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  cx?: number;
  cy?: number;
  r?: number;
}

export interface SVGStroke {
  color: string;
  width: number;
  dashArray: string;
  cap: 'butt' | 'round' | 'square';
  join: 'miter' | 'round' | 'bevel';
}

export interface SVGFill {
  type: 'solid' | 'gradient' | 'none';
  color: string;
  gradientId?: string;
  opacity: number;
}

export interface SVGShape {
  id: string;
  type: 'rect' | 'ellipse' | 'line' | 'path' | 'text' | 'polygon' | 'star';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: SVGFill;
  stroke: SVGStroke;
  opacity: number;
  locked: boolean;
  visible: boolean;
  groupId?: string;
  symbolId?: string;
  points?: SVGPoint[];
  pathData?: string;
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  rx?: number;
  ry?: number;
  sides?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export interface SVGLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  shapeIds: string[];
  blending: string;
}

export interface SVGSymbol {
  id: string;
  name: string;
  shapes: SVGShape[];
  width: number;
  height: number;
  createdAt: number;
}

export interface SVGDocument {
  id: string;
  title: string;
  width: number;
  height: number;
  shapes: SVGShape[];
  layers: SVGLayer[];
  symbols: SVGSymbol[];
  gradients: SVGGradient[];
  createdAt: number;
  updatedAt: number;
  thumbnail?: string;
}

export interface SVGTemplate {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  shapes: SVGShape[];
  layers: SVGLayer[];
}

export interface SVGSettings {
  theme: string;
  gridSize: number;
  snapToGrid: boolean;
  showGrid: boolean;
  showRulers: boolean;
  exportFormat: 'svg' | 'png' | 'jpeg';
  exportScale: number;
}

export interface HistoryEntry {
  id: string;
  documentId: string;
  shapes: SVGShape[];
  layers: SVGLayer[];
  timestamp: number;
  label: string;
}

export type Tool =
  | 'select'
  | 'rect'
  | 'ellipse'
  | 'line'
  | 'path'
  | 'pencil'
  | 'text'
  | 'eyedropper';

export interface Guide {
  id: string;
  orientation: 'horizontal' | 'vertical';
  position: number;
}

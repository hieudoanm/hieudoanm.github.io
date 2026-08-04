export interface Point {
  x: number;
  y: number;
}

export type ShapeKind = 'polygon' | 'freehand';

export interface Annotation {
  id: string;
  kind: ShapeKind;
  points: Point[];
}

export interface AnnotationLayer {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  annotations: Annotation[];
}

export type ViewTool = 'pan' | 'polygon' | 'freehand';

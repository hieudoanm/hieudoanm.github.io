export type NodeShape = 'rect' | 'round' | 'ellipse' | 'diamond' | 'cylinder';

export type IconName =
  | 'auth'
  | 'browser'
  | 'cache'
  | 'cloud'
  | 'compute'
  | 'database'
  | 'file'
  | 'mail'
  | 'message'
  | 'queue'
  | 'search'
  | 'server'
  | 'shield'
  | 'sync'
  | 'users'
  | 'worker';

export interface DiagramNode {
  id: string;
  label: string;
  shape: NodeShape;
  icon?: IconName;
  line: number;
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  line: number;
}

export interface Diagram {
  title: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface ParseError {
  line: number;
  message: string;
}

export interface ParseResult {
  diagram: Diagram;
  errors: ParseError[];
}

export interface PositionedNode extends DiagramNode {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EdgePath {
  edge: DiagramEdge;
  path: string;
  labelX: number;
  labelY: number;
}

export interface Layout {
  nodes: PositionedNode[];
  edges: EdgePath[];
  width: number;
  height: number;
}

export type ExportFormat = 'diagram' | 'svg';

export type NodeShape =
  | 'rect'
  | 'round'
  | 'ellipse'
  | 'diamond'
  | 'cylinder'
  | 'hexagon'
  | 'parallelogram'
  | 'cloud'
  | 'note'
  | 'actor';

export type IconName =
  | 'alert'
  | 'archive'
  | 'auth'
  | 'bell'
  | 'box'
  | 'browser'
  | 'cache'
  | 'camera'
  | 'chart'
  | 'check'
  | 'clock'
  | 'cloud'
  | 'code'
  | 'compute'
  | 'credit-card'
  | 'database'
  | 'eye'
  | 'file'
  | 'globe'
  | 'heart'
  | 'key'
  | 'link'
  | 'mail'
  | 'map'
  | 'message'
  | 'monitor'
  | 'music'
  | 'phone'
  | 'queue'
  | 'search'
  | 'server'
  | 'settings'
  | 'shield'
  | 'star'
  | 'sync'
  | 'users'
  | 'video'
  | 'worker';

export type DiagramKind = 'flow' | 'sequence';
export type LayoutKind = DiagramKind;
export type LayoutDirection = 'horizontal' | 'vertical';

export interface DiagramNode {
  id: string;
  label: string;
  shape: NodeShape;
  icon?: IconName | 'glyph';
  glyph?: string;
  line: number;
  rank?: number;
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  line: number;
  directed: boolean;
}

export interface Diagram {
  title: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  kind: DiagramKind;
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

export interface Lifeline {
  x: number;
  top: number;
  bottom: number;
}

export interface Layout {
  kind: LayoutKind;
  direction: LayoutDirection;
  nodes: PositionedNode[];
  edges: EdgePath[];
  width: number;
  height: number;
  lifelines?: Lifeline[];
}

export type ExportFormat = 'diagram' | 'svg' | 'png';

export type SnippetFormat = 'markdown' | 'plantuml' | 'mermaid';

export type PageSize = 'a4-portrait' | 'a4-landscape';

export interface SvgOptions {
  print?: boolean;
  page?: PageSize;
  pad?: number;
}

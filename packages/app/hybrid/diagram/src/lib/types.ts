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

export type DiagramKind = 'flow' | 'sequence' | 'timeline' | 'venn';
export type LayoutKind = DiagramKind;
export type LayoutMode = 'layered' | 'force';
export type LayoutDirection = 'horizontal' | 'vertical';
export type SequenceFragmentType = 'alt' | 'opt' | 'loop' | 'par';

export type ColorName =
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'gray';

export interface EdgeStyle {
  dashed?: boolean;
  dotted?: boolean;
  color?: ColorName;
  width?: number;
  arrow?: boolean;
}

export interface DiagramNode {
  id: string;
  label: string;
  shape: NodeShape;
  icon?: IconName | 'glyph';
  glyph?: string;
  line: number;
  rank?: number;
  color?: ColorName;
  group?: string;
  start?: string;
  end?: string;
}

export interface SequenceFragment {
  id: string;
  type: SequenceFragmentType;
  label: string;
  line: number;
  edgeStart: number;
  edgeEnd: number;
  parent?: string;
}

export interface SequenceDivider {
  id: string;
  fragmentId: string;
  edgeIndex: number;
  label: string;
}

export interface SequenceActivation {
  participant: string;
  edgeStart: number;
  edgeEnd: number;
}

export interface SequenceNote {
  id: string;
  text: string;
  line: number;
  over?: string;
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  line: number;
  directed: boolean;
  style?: EdgeStyle;
}

export interface DiagramSubgraph {
  id: string;
  label: string;
  line: number;
  parent?: string;
  color?: ColorName;
}

export interface Diagram {
  title: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  kind: DiagramKind;
  subgraphs: DiagramSubgraph[];
  layoutMode?: LayoutMode;
  fragments?: SequenceFragment[];
  dividers?: SequenceDivider[];
  activations?: SequenceActivation[];
  notes?: SequenceNote[];
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

export interface PositionedSubgraph {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: ColorName;
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

export interface PositionedSequenceFragment {
  id: string;
  type: SequenceFragmentType;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  dividers: { y: number; label: string }[];
}

export interface PositionedActivation {
  participant: string;
  x: number;
  top: number;
  bottom: number;
}

export interface PositionedNote {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TimelineColumn {
  label: string;
  x: number;
}

export interface TimelineLayout {
  columns: TimelineColumn[];
  columnWidth: number;
  barHeight: number;
  rowGap: number;
  headerHeight: number;
  labelWidth: number;
  startX: number;
  startY: number;
}

export interface Layout {
  kind: LayoutKind;
  direction: LayoutDirection;
  nodes: PositionedNode[];
  edges: EdgePath[];
  width: number;
  height: number;
  mode?: LayoutMode;
  lifelines?: Lifeline[];
  subgraphs?: PositionedSubgraph[];
  subgraphDefs?: DiagramSubgraph[];
  fragments?: PositionedSequenceFragment[];
  activations?: PositionedActivation[];
  notes?: PositionedNote[];
  timeline?: TimelineLayout;
}

export type ExportFormat = 'diagram' | 'svg' | 'png';

export type SnippetFormat = 'markdown' | 'plantuml' | 'mermaid';

export type PageSize = 'a4-portrait' | 'a4-landscape';

export interface SvgOptions {
  print?: boolean;
  page?: PageSize;
  pad?: number;
}

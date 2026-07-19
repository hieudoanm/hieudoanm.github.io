export interface GraphNode {
  id: string;
  label: string;
  path?: string;
  group?: number;
  size?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  weight?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface SimNode {
  id: string;
  label: string;
  path: string;
  group: number;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
}

export interface SimLink {
  source: SimNode;
  target: SimNode;
  weight: number;
}

export interface TeamInfo {
  id: string;
  name: string;
  iso: string;
  flag: string;
}

export interface BracketLeaf {
  kind: 'leaf';
  team: string | null;
  angle: number;
  angleIndex: number;
}

export interface BracketMatch {
  kind: 'match';
  id: string;
  level: number;
  kids: [BracketNode, BracketNode];
  winner: string | null;
  angle: number;
}

export type BracketNode = BracketLeaf | BracketMatch;

export type BracketRaw = string | [BracketRaw, BracketRaw];

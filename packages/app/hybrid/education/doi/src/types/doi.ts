export interface Work {
  doi: string;
  title: string;
  author: string;
  year: string;
  abstract: string;
  type: string;
}

export interface OverviewStats {
  totalWorks: number;
  titledWorks: number;
  stubWorks: number;
  referenceEdges: number;
  distinctAuthors: number;
  avgRefsPerTitled: number;
  earliestYear: string;
  latestYear: string;
  yearSpan: number;
}

export interface YearCount {
  year: string;
  count: number;
}

export interface RankedWork {
  doi: string;
  title: string;
  year: string;
  count: number;
}

export interface AuthorCount {
  author: string;
  count: number;
}

export interface GraphNode {
  id: string;
  doi: string;
  title: string;
  year: string;
  author: string;
  inDegree: number;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface DoiReport {
  overview: OverviewStats;
  yearDistribution: YearCount[];
  mostCited: RankedWork[];
  mostCiting: RankedWork[];
  topAuthors: AuthorCount[];
}

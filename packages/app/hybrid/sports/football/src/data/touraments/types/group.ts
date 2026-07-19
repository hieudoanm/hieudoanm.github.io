export interface TeamStanding {
  teamId: string;
  pld: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
}

export interface GroupData {
  name: string;
  label: string;
  teams: string[];
  standings?: Record<string, TeamStanding>;
}

import type { GroupData } from '../../types/group';
import type { BracketRaw, TeamInfo } from '../../types/bracket';

export interface WorldCupTeams {
  [teamId: string]: { id: string; name: string; iso: string };
}

export interface WorldCupYearData {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
  teams: WorldCupTeams;
  groups: GroupData[];
}

export interface KnockoutYearData {
  teams: Record<string, TeamInfo>;
  predetermined: Record<string, string>;
  bracket: BracketRaw;
}

export { s, t, group, toKnockoutTeams } from '../../shared';

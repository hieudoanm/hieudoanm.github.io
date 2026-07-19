import type { GroupData } from '../../types/group';
import type { BracketRaw, TeamInfo } from '../../types/bracket';

export interface ConcacafTeams {
  [teamId: string]: { id: string; name: string; iso: string };
}

export interface ConcacafYearData {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
  teams: ConcacafTeams;
  groups: GroupData[];
}

export interface ConcacafKnockoutYearData {
  teams: Record<string, TeamInfo>;
  predetermined: Record<string, string>;
  bracket: BracketRaw;
}

export { s, t, group, toKnockoutTeams } from '../../shared';

import type { GroupData } from '../../../pages/group-stage/types';
import type { BracketRaw, TeamInfo } from '../../../pages/knock-out/types';

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

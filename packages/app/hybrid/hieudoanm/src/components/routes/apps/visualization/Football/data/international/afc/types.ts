import type { GroupData } from '../../../pages/group-stage/types';
import type { BracketRaw, TeamInfo } from '../../../pages/knock-out/types';

export interface AfcTeams {
  [teamId: string]: { id: string; name: string; iso: string };
}

export interface AfcYearData {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
  teams: AfcTeams;
  groups: GroupData[];
}

export interface KnockoutYearData {
  teams: Record<string, TeamInfo>;
  predetermined: Record<string, string>;
  bracket: BracketRaw;
}

export { s, t, group, toKnockoutTeams } from '../../shared';

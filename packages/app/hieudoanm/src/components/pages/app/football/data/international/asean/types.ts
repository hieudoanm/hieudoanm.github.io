import type { GroupData } from '../../../pages/group-stage/types';
import type { BracketRaw, TeamInfo } from '../../../pages/knock-out/types';

export interface AseanTeams {
  [teamId: string]: { id: string; name: string; iso: string };
}

export interface AseanYearData {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
  teams: AseanTeams;
  groups: GroupData[];
}

export interface AseanKnockoutYearData {
  teams: Record<string, TeamInfo>;
  predetermined: Record<string, string>;
  bracket: BracketRaw;
}

export type AseanKnockoutDataMap = Record<number, AseanKnockoutYearData | null>;

export { s, t, group, toKnockoutTeams } from '../../shared';

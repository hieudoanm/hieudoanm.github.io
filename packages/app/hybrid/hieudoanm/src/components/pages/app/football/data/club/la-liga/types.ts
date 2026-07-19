import type { GroupData } from '../../../pages/group-stage/types';
import type { BracketRaw, TeamInfo } from '../../../pages/knock-out/types';

export interface LaLigaTeams {
  [teamId: string]: { id: string; name: string; iso: string };
}

export interface LaLigaYearData {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
  teams: LaLigaTeams;
  groups: GroupData[];
}

export interface LaLigaKnockoutYearData {
  teams: Record<string, TeamInfo>;
  predetermined: Record<string, string>;
  bracket: BracketRaw;
}

export type LaLigaKnockoutDataMap = Record<
  number,
  LaLigaKnockoutYearData | null
>;

export { s, t, group, toKnockoutTeams } from '../../shared';

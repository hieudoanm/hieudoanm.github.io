import type { GroupData } from '../../../pages/group-stage/types';
import type { BracketRaw, TeamInfo } from '../../../pages/knock-out/types';

export interface BundesligaTeams {
  [teamId: string]: { id: string; name: string; iso: string };
}

export interface BundesligaYearData {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
  teams: BundesligaTeams;
  groups: GroupData[];
}

export interface BundesligaKnockoutYearData {
  teams: Record<string, TeamInfo>;
  predetermined: Record<string, string>;
  bracket: BracketRaw;
}

export type BundesligaKnockoutDataMap = Record<
  number,
  BundesligaKnockoutYearData | null
>;

export { group, s, t, toKnockoutTeams } from '../../shared';

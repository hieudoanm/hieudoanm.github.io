import type { GroupData } from '../../../pages/group-stage/types';
import type { BracketRaw, TeamInfo } from '../../../pages/knock-out/types';

export interface PremierLeagueTeams {
  [teamId: string]: { id: string; name: string; iso: string };
}

export interface PremierLeagueYearData {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
  teams: PremierLeagueTeams;
  groups: GroupData[];
}

export interface PremierLeagueKnockoutYearData {
  teams: Record<string, TeamInfo>;
  predetermined: Record<string, string>;
  bracket: BracketRaw;
}

export type PremierLeagueKnockoutDataMap = Record<
  number,
  PremierLeagueKnockoutYearData | null
>;

export { s, t, group, toKnockoutTeams } from '../../shared';

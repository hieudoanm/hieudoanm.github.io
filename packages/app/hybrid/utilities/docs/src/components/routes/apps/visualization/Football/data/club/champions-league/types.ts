import type { GroupData } from '../../../pages/group-stage/types';
import type { BracketRaw, TeamInfo } from '../../../pages/knock-out/types';

export interface ChampionsLeagueTeams {
  [teamId: string]: { id: string; name: string; iso: string };
}

export interface ChampionsLeagueYearData {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
  teams: ChampionsLeagueTeams;
  groups: GroupData[];
}

export interface ChampionsLeagueKnockoutYearData {
  teams: Record<string, TeamInfo>;
  predetermined: Record<string, string>;
  bracket: BracketRaw;
}

export type ChampionsLeagueKnockoutDataMap = Record<
  number,
  ChampionsLeagueKnockoutYearData | null
>;

export { s, t, group, toKnockoutTeams } from '../../shared';

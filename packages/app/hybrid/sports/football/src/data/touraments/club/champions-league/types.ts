import type { GroupData } from '../../types/group';
import type { BracketRaw, TeamInfo } from '../../types/bracket';

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

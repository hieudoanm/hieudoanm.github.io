import type { GroupData, TeamStanding } from '../../pages/group-stage/types';
import type { BracketRaw, TeamInfo } from '../../pages/knock-out/types';

export interface CopaTeams {
  [teamId: string]: { id: string; name: string; iso: string };
}

export interface CopaYearData {
  year: number;
  host: string;
  champion: string | null;
  runnerUp: string | null;
  available: boolean;
  teams: CopaTeams;
  groups: GroupData[];
}

export interface KnockoutYearData {
  teams: Record<string, TeamInfo>;
  predetermined: Record<string, string>;
  bracket: BracketRaw;
}

export const s = (
  teamId: string,
  pld: number,
  w: number,
  d: number,
  l: number,
  gf: number,
  ga: number
): TeamStanding => ({
  teamId,
  pld,
  w,
  d,
  l,
  gf,
  ga,
  gd: gf - ga,
  pts: w * 3 + d,
});

export const t = (id: string, name: string, iso: string) => ({ id, name, iso });

export const group = (
  name: string,
  teams: string[],
  standings?: Record<string, TeamStanding>
): GroupData => ({
  name,
  label: `Group ${name}`,
  teams,
  standings: standings ?? {},
});

const SUBDIVISION_FLAG: Record<string, string> = {
  'gb-eng': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'gb-sct': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'gb-wls': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'gb-nir': '🇬🇧',
};

const isoToFlag = (iso: string): string => {
  const mapped = SUBDIVISION_FLAG[iso];
  if (mapped) return mapped;
  if (iso.length === 2) {
    return String.fromCodePoint(
      ...iso.split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 97)
    );
  }
  return '🏳';
};

export const toKnockoutTeams = (copa: CopaTeams): Record<string, TeamInfo> => {
  const result: Record<string, TeamInfo> = {};
  for (const [id, team] of Object.entries(copa)) {
    result[id] = { ...team, flag: isoToFlag(team.iso) };
  }
  return result;
};

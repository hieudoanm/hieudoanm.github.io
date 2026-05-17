import type { GroupData, TeamStanding } from '../../pages/group-stage/types';
import type { BracketRaw, TeamInfo } from '../../pages/knock-out/types';

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
  'gb-eng': '\u{1f3f4}\u{e0067}\u{e0062}\u{e0065}\u{e006e}\u{e0067}\u{e007f}',
  'gb-sct': '\u{1f3f4}\u{e0067}\u{e0062}\u{e0073}\u{e0063}\u{e0074}\u{e007f}',
  'gb-wls': '\u{1f3f4}\u{e0067}\u{e0062}\u{e0077}\u{e006c}\u{e0073}\u{e007f}',
  'gb-nir': '\u{1f1ec}\u{1f1e7}',
};

const isoToFlag = (iso: string): string => {
  const mapped = SUBDIVISION_FLAG[iso];
  if (mapped) return mapped;
  if (iso.length === 2) {
    return String.fromCodePoint(
      ...iso.split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 97)
    );
  }
  return '\u{1f3f3}';
};

export const toKnockoutTeams = (
  asean: AseanTeams
): Record<string, TeamInfo> => {
  const result: Record<string, TeamInfo> = {};
  for (const [id, team] of Object.entries(asean)) {
    result[id] = { ...team, flag: isoToFlag(team.iso) };
  }
  return result;
};

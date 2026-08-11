import type { Match, MatchResult, PairingMode, Player, Round, StandingsRow } from '../types';

const BYE = '__bye__';

export const uid = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const makeMatch = (
  round: number,
  white: string,
  black: string
): Match => ({
  id: uid(),
  round,
  white,
  black,
  result: null,
});

export const scoreOf = (match: Match, playerId: string): number => {
  if (match.result === null) return 0;
  if (match.result === '½-½') return 0.5;
  const whiteWin = match.result === '1-0';
  const playerIsWhite = match.white === playerId;
  return whiteWin === playerIsWhite ? 1 : 0;
};

export const setResult = (
  matches: Match[],
  id: string,
  result: MatchResult
): Match[] => matches.map((m) => (m.id === id ? { ...m, result } : m));

export const pairRoundRobin = (players: Player[]): Round[] => {
  if (players.length < 2) return [];
  const list = players.length % 2 === 1 ? [BYE, ...players.map((p) => p.id)] : players.map((p) => p.id);
  const size = list.length;
  const rounds: Round[] = [];
  for (let r = 0; r < size - 1; r += 1) {
    const matches: Match[] = [];
    const byes: string[] = [];
    for (let i = 0; i < size / 2; i += 1) {
      const a = list[i];
      const b = list[size - 1 - i];
      if (a === BYE || b === BYE) {
        byes.push(a === BYE ? b : a);
        continue;
      }
      const flip = r % 2 === 1;
      matches.push(flip ? makeMatch(r + 1, b, a) : makeMatch(r + 1, a, b));
    }
    rounds.push({ number: r + 1, matches, byes });
    list.splice(1, 0, list.pop()!);
  }
  return rounds;
};

const playedKey = (a: string, b: string): string => `${a}|${b}`;

export const pairSwiss = (players: Player[], matches: Match[], round: number): Round => {
  if (players.length < 2) return { number: round, matches: [], byes: [] };
  const played = new Set<string>();
  for (const m of matches) {
    played.add(playedKey(m.white, m.black));
    played.add(playedKey(m.black, m.white));
  }
  const ordered = [...computeStandings(players, matches)]
    .sort((a, b) => b.points - a.points || b.player.rating - a.player.rating)
    .map((row) => row.player);
  const used = new Set<string>();
  const out: Match[] = [];
  const byes: string[] = [];
  for (let i = 0; i < ordered.length; i += 1) {
    const a = ordered[i];
    if (used.has(a.id)) continue;
    let partner: Player | null = null;
    for (let j = i + 1; j < ordered.length; j += 1) {
      const b = ordered[j];
      if (used.has(b.id)) continue;
      if (played.has(playedKey(a.id, b.id))) continue;
      partner = b;
      break;
    }
    if (!partner) {
      byes.push(a.id);
      used.add(a.id);
      continue;
    }
    used.add(a.id);
    used.add(partner.id);
    const white = i % 2 === 0 ? a : partner;
    const black = white === a ? partner : a;
    out.push(makeMatch(round, white.id, black.id));
  }
  return { number: round, matches: out, byes };
};

export const computeStandings = (players: Player[], matches: Match[]): StandingsRow[] => {
  const scores: Record<string, number> = {};
  const opponents: Record<string, string[]> = {};
  for (const p of players) {
    scores[p.id] = 0;
    opponents[p.id] = [];
  }
  for (const m of matches) {
    if (m.white === BYE || m.black === BYE) continue;
    scores[m.white] = (scores[m.white] ?? 0) + scoreOf(m, m.white);
    scores[m.black] = (scores[m.black] ?? 0) + scoreOf(m, m.black);
    opponents[m.white]?.push(m.black);
    opponents[m.black]?.push(m.white);
  }
  return players.map((p) => {
    let wins = 0;
    let draws = 0;
    for (const opp of opponents[p.id]) {
      const played = matches.filter(
        (m) =>
          (m.white === p.id && m.black === opp) || (m.black === p.id && m.white === opp)
      );
      for (const m of played) {
        const s = scoreOf(m, p.id);
        if (s === 1) wins += 1;
        else if (s === 0.5) draws += 1;
      }
    }
    const points = scores[p.id] ?? 0;
    const played = opponents[p.id].length;
    const buchholz = opponents[p.id].reduce((sum, opp) => sum + (scores[opp] ?? 0), 0);
    const sb = opponents[p.id].reduce((sum, opp) => {
      const played = matches.filter(
        (m) =>
          (m.white === p.id && m.black === opp) || (m.black === p.id && m.white === opp)
      );
      let partial = 0;
      for (const m of played) {
        const s = scoreOf(m, p.id);
        if (s === 1) partial += scores[opp] ?? 0;
        else if (s === 0.5) partial += (scores[opp] ?? 0) / 2;
      }
      return sum + partial;
    }, 0);
    return {
      player: p,
      played,
      wins,
      draws,
      losses: played - wins - draws,
      points,
      buchholz,
      sb,
    };
  });
};

export const sortStandings = (
  rows: StandingsRow[],
  mode: PairingMode
): StandingsRow[] =>
  [...rows].sort(
    (a, b) =>
      b.points - a.points ||
      (mode === 'rr' ? b.sb - a.sb : b.buchholz - a.buchholz) ||
      (mode === 'rr' ? b.buchholz - a.buchholz : b.sb - a.sb) ||
      b.player.rating - a.player.rating
  );

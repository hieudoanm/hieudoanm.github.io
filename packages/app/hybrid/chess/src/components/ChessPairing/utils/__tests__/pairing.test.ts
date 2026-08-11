import {
  computeStandings,
  makeMatch,
  pairRoundRobin,
  pairSwiss,
  scoreOf,
  setResult,
  sortStandings,
} from '../pairing';
import type { Match, Player } from '../../types';

const alice: Player = { id: 'a', name: 'Alice', rating: 2200 };
const bob: Player = { id: 'b', name: 'Bob', rating: 2100 };
const carol: Player = { id: 'c', name: 'Carol', rating: 2000 };
const dave: Player = { id: 'd', name: 'Dave', rating: 1900 };

const match = (round: number, white: string, black: string, result: Match['result']): Match =>
  ({ ...makeMatch(round, white, black), result });

describe('pairRoundRobin', () => {
  it('pairs an even field so everyone meets everyone once', () => {
    const rounds = pairRoundRobin([alice, bob, carol, dave]);
    expect(rounds).toHaveLength(3);
    const pairs = rounds.flatMap((r) => r.matches.map((m) => `${m.white}-${m.black}`));
    expect(new Set(pairs).size).toBe(6);
    const allPairs = new Set(['a-b', 'a-c', 'a-d', 'b-c', 'b-d', 'c-d']);
    for (const p of pairs) {
      const [w, b] = p.split('-');
      expect(allPairs.has(p) || allPairs.has(`${b}-${w}`)).toBe(true);
    }
  });

  it('gives an odd field a bye each round', () => {
    const rounds = pairRoundRobin([alice, bob, carol]);
    expect(rounds).toHaveLength(3);
    expect(rounds.every((r) => r.byes.length === 1)).toBe(true);
    const byes = rounds.flatMap((r) => r.byes);
    expect(byes).toHaveLength(3);
  });

  it('returns no rounds for fewer than two players', () => {
    expect(pairRoundRobin([alice])).toEqual([]);
  });
});

describe('scoreOf', () => {
  const m = match(1, 'a', 'b', '1-0');
  it('awards win/draw/loss to the correct side', () => {
    expect(scoreOf(m, 'a')).toBe(1);
    expect(scoreOf(m, 'b')).toBe(0);
    expect(scoreOf({ ...m, result: '0-1' }, 'b')).toBe(1);
    expect(scoreOf({ ...m, result: '½-½' }, 'a')).toBe(0.5);
    expect(scoreOf({ ...m, result: null }, 'a')).toBe(0);
  });
});

describe('computeStandings + tiebreaks', () => {
  const results = [
    match(1, 'a', 'b', '1-0'),
    match(1, 'c', 'd', '½-½'),
    match(2, 'a', 'c', '1-0'),
    match(2, 'b', 'd', '0-1'),
  ];

  it('computes points, buchholz and sonneborn-berger', () => {
    const rows = computeStandings([alice, bob, carol, dave], results);
    const a = rows.find((r) => r.player.id === 'a')!;
    expect(a.points).toBe(2);
    expect(a.wins).toBe(2);
    expect(a.buchholz).toBeCloseTo(0.5, 5); // opponents c (0.5) + b (0)
    expect(a.sb).toBeCloseTo(0.5, 5); // beat c (0.5) + beat b (0)
  });

  it('sorts by points then tiebreaks', () => {
    const rows = computeStandings([alice, bob, carol, dave], results);
    const sorted = sortStandings(rows, 'rr');
    expect(sorted[0].player.id).toBe('a');
    expect(sorted[1].player.id).toBe('d');
  });
});

describe('pairSwiss', () => {
  it('pairs highest scores together without rematches', () => {
    const played = [match(1, 'a', 'b', '1-0'), match(1, 'c', 'd', '1-0')];
    const round = pairSwiss([alice, bob, carol, dave], played, 2);
    expect(round.matches).toHaveLength(2);
    const pair = round.matches.map((m) => `${m.white}-${m.black}`).join(' ');
    expect(pair).not.toContain('a-b');
    expect(pair).not.toContain('c-d');
    expect(pair).toContain('a');
    expect(pair).toContain('d');
  });

  it('awards a bye when a player cannot be paired', () => {
    const played = [match(1, 'a', 'b', null), match(1, 'c', 'd', null)];
    const round = pairSwiss([alice, bob, carol, dave], played, 2);
    expect(round.byes).toHaveLength(0);
  });
});

describe('setResult', () => {
  it('updates the result of one match', () => {
    const ms = [match(1, 'a', 'b', null)];
    const next = setResult(ms, ms[0].id, '0-1');
    expect(next[0].result).toBe('0-1');
  });
});

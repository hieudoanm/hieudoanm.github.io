import {
  roundRobinSchedule,
  swissPair,
  calculateBuchholz,
  calculateSonnebornBerger,
  calculateStandings,
} from '../pairing';
import type { PairingPlayer } from '../pairing';

describe('roundRobinSchedule', () => {
  test('pairs every player exactly once per round', () => {
    const players = ['A', 'B', 'C', 'D'];
    const schedule = roundRobinSchedule(players);
    expect(schedule).toHaveLength(3);
    for (const round of schedule) {
      expect(round.pairings).toHaveLength(2);
      const seen = new Set<string>();
      for (const [a, b] of round.pairings) {
        seen.add(a);
        seen.add(b);
      }
      expect(seen.size).toBe(4);
    }
  });

  test('each pair plays exactly once across all rounds', () => {
    const players = ['A', 'B', 'C', 'D', 'E', 'F'];
    const schedule = roundRobinSchedule(players);
    const pairs = new Set<string>();
    for (const round of schedule) {
      for (const [a, b] of round.pairings) {
        pairs.add([a, b].sort().join('|'));
      }
    }
    expect(pairs.size).toBe(15);
  });

  test('odd player count adds a BYE', () => {
    const schedule = roundRobinSchedule(['A', 'B', 'C']);
    const all = schedule.flatMap((r) => r.pairings).flat();
    expect(all).toContain('BYE');
  });
});

describe('swissPair', () => {
  const players: PairingPlayer[] = [
    { name: 'A', points: 3, opponents: ['B'] },
    { name: 'B', points: 3, opponents: ['A'] },
    { name: 'C', points: 1, opponents: [] },
    { name: 'D', points: 0, opponents: [] },
  ];

  test('avoids rematches', () => {
    const pairings = swissPair(players);
    expect(pairings).not.toContainEqual(['A', 'B']);
    expect(pairings).not.toContainEqual(['B', 'A']);
    expect(pairings).toHaveLength(2);
  });

  test('pairs by descending points when possible', () => {
    const fresh: PairingPlayer[] = [
      { name: 'X', points: 2, opponents: [] },
      { name: 'Y', points: 1, opponents: [] },
      { name: 'Z', points: 0, opponents: [] },
      { name: 'W', points: 2, opponents: [] },
    ];
    const pairings = swissPair(fresh);
    expect(pairings).toContainEqual(['X', 'W']);
  });
});

describe('tiebreaks', () => {
  const players: PairingPlayer[] = [
    { name: 'A', points: 2.5, opponents: ['B', 'C'] },
    { name: 'B', points: 2, opponents: ['A', 'C'] },
    { name: 'C', points: 0.5, opponents: ['A', 'B'] },
  ];
  const results: Record<string, Record<string, number>> = {
    A: { B: 1, C: 0.5 },
    B: { A: 0, C: 1 },
    C: { A: 0.5, B: 0 },
  };

  test('buchholz sums opponent points', () => {
    const buchholz = calculateBuchholz(players);
    expect(buchholz['A']).toBe(2.5);
    expect(buchholz['B']).toBe(3);
  });

  test('sonneborn-berger weights scores by opponent points', () => {
    const sb = calculateSonnebornBerger(players, results);
    expect(sb['A']).toBe(1 * 2 + 0.5 * 0.5);
    expect(sb['B']).toBe(0 * 2.5 + 1 * 0.5);
  });

  test('standings sort by points then buchholz', () => {
    const standings = calculateStandings(players, results);
    expect(standings[0]?.name).toBe('A');
    expect(standings[1]?.name).toBe('B');
    expect(standings[2]?.name).toBe('C');
  });
});

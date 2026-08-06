import {
  generateSingleEliminationBracket,
  generateDoubleEliminationBracket,
  generateRoundRobinSchedule,
  generateSwissRounds,
  generateGroupStageKnockout,
  generateLeagueSchedule,
  generateBracket,
} from '@/lib/formats';
import type { TournamentFormat } from '@/types';

describe('generateSingleEliminationBracket', () => {
  it('creates a bracket with n-1 matches for a power of two', () => {
    const matches = generateSingleEliminationBracket('t1', [
      'a',
      'b',
      'c',
      'd',
    ]);
    expect(matches).toHaveLength(3);
    expect(matches.map((m) => m.round)).toEqual([1, 1, 2]);
    expect(matches.every((m) => m.status === 'scheduled')).toBe(true);
    expect(matches.every((m) => m.winnerId === null)).toBe(true);
  });

  it('pads non-power-of-two participant counts', () => {
    const matches = generateSingleEliminationBracket('t1', ['a', 'b', 'c']);
    expect(matches).toHaveLength(3);
    const round1 = matches.filter((m) => m.round === 1);
    expect(round1).toHaveLength(2);
    expect(round1.map((m) => m.participant1Id)).toEqual(['a', 'c']);
    expect(round1.map((m) => m.participant2Id)).toEqual(['b', null]);
  });

  it('wires match ids into the next round', () => {
    const matches = generateSingleEliminationBracket('t1', [
      'a',
      'b',
      'c',
      'd',
    ]);
    const final = matches.find((m) => m.round === 2);
    const round1 = matches.filter((m) => m.round === 1);
    expect(round1.map((m) => m.id)).toContain(final!.participant1Id);
    expect(round1.map((m) => m.id)).toContain(final!.participant2Id);
  });

  it('returns no matches for empty or single participant lists', () => {
    expect(generateSingleEliminationBracket('t1', [])).toHaveLength(0);
    expect(generateSingleEliminationBracket('t1', ['a'])).toHaveLength(0);
  });
});

describe('generateDoubleEliminationBracket', () => {
  it('creates a winners, losers, and final bracket', () => {
    const matches = generateDoubleEliminationBracket('t1', [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
    ]);
    expect(matches).toHaveLength(13);
    const winners = matches.filter((m) => m.bracket === 'winners');
    const losers = matches.filter((m) => m.bracket === 'losers');
    const final = matches.filter((m) => m.bracket === 'final');
    expect(winners).toHaveLength(7);
    expect(losers).toHaveLength(5);
    expect(final).toHaveLength(1);
    expect(final[0].round).toBe(8);
  });

  it('handles two participants with a single match', () => {
    const matches = generateDoubleEliminationBracket('t1', ['a', 'b']);
    expect(matches).toHaveLength(1);
    expect(matches[0].bracket).toBe('winners');
  });

  it('creates a final for four participants', () => {
    const matches = generateDoubleEliminationBracket('t1', [
      'a',
      'b',
      'c',
      'd',
    ]);
    expect(matches).toHaveLength(5);
    expect(matches.some((m) => m.bracket === 'final')).toBe(true);
  });
});

describe('generateRoundRobinSchedule', () => {
  it('creates every pairing once for an even count', () => {
    const matches = generateRoundRobinSchedule('t1', ['a', 'b', 'c', 'd']);
    expect(matches).toHaveLength(6);
    expect(matches.map((m) => m.round)).toEqual([1, 1, 2, 2, 3, 3]);
  });

  it('handles an odd count with a bye', () => {
    const matches = generateRoundRobinSchedule('t1', ['a', 'b', 'c', 'd', 'e']);
    expect(matches).toHaveLength(10);
    expect(
      matches.every((m) => !['a', 'b', 'c', 'd', 'e'].includes('BYE'))
    ).toBe(true);
  });
});

describe('generateSwissRounds', () => {
  it('defaults round count to ceil(log2(participants))', () => {
    const matches = generateSwissRounds('t1', [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
    ]);
    expect(matches).toHaveLength(12);
    expect(new Set(matches.map((m) => m.round)).size).toBe(3);
  });

  it('respects an explicit round count', () => {
    const matches = generateSwissRounds('t1', ['a', 'b', 'c', 'd'], 2);
    expect(matches).toHaveLength(4);
  });

  it('skips bye slots for an odd count', () => {
    const matches = generateSwissRounds('t1', ['a', 'b', 'c', 'd', 'e'], 2);
    expect(matches).toHaveLength(4);
  });
});

describe('generateGroupStageKnockout', () => {
  it('creates group round robins plus a knockout bracket', () => {
    const ids = [
      'p1',
      'p2',
      'p3',
      'p4',
      'p5',
      'p6',
      'p7',
      'p8',
      'p9',
      'p10',
      'p11',
      'p12',
    ];
    const matches = generateGroupStageKnockout('t1', ids);
    expect(matches).toHaveLength(19);
    const knockout = matches.filter((m) => m.bracket === 'final');
    expect(knockout).toHaveLength(7);
  });

  it('returns no matches when groups cannot form', () => {
    expect(generateGroupStageKnockout('t1', ['a', 'b'])).toHaveLength(0);
  });
});

describe('generateLeagueSchedule', () => {
  it('creates home and away legs', () => {
    const matches = generateLeagueSchedule('t1', ['a', 'b', 'c', 'd']);
    expect(matches).toHaveLength(12);
    const firstLeg = matches.slice(0, 6);
    const returnLeg = matches.slice(6);
    expect(returnLeg[0].participant1Id).toBe(firstLeg[0].participant2Id);
    expect(returnLeg[0].participant2Id).toBe(firstLeg[0].participant1Id);
    expect(returnLeg[0].round).toBe(firstLeg[0].round + 1000);
  });
});

describe('generateBracket', () => {
  it.each<TournamentFormat>([
    'single-elimination',
    'double-elimination',
    'round-robin',
    'swiss',
    'league',
  ])('dispatches the %s format', (format) => {
    const matches = generateBracket(format, 't1', ['a', 'b', 'c', 'd']);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('dispatches the group-stage format with enough participants', () => {
    const matches = generateBracket('group-stage', 't1', [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
    ]);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('returns an empty array for an unknown format', () => {
    expect(
      generateBracket('unknown' as TournamentFormat, 't1', ['a', 'b'])
    ).toEqual([]);
  });
});

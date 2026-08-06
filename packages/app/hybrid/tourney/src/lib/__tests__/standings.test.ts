import {
  getGoalDifference,
  getHeadToHead,
  calculateStandings,
} from '@/lib/standings';
import type { Match } from '@/types';

const completed = (
  p1: string,
  p2: string,
  s1: number,
  s2: number,
  winner: string | null
): Match => ({
  id: `${p1}-${p2}`,
  tournamentId: 't1',
  round: 1,
  participant1Id: p1,
  participant2Id: p2,
  participant1Score: s1,
  participant2Score: s2,
  winnerId: winner,
  status: 'completed',
});

describe('getGoalDifference', () => {
  it('sums signed score differences for completed matches', () => {
    const matches = [
      completed('a', 'b', 3, 1, 'a'),
      completed('a', 'c', 1, 2, 'c'),
    ];
    expect(getGoalDifference(matches, 'a')).toBe(1);
    expect(getGoalDifference(matches, 'b')).toBe(-2);
    expect(getGoalDifference(matches, 'c')).toBe(1);
  });

  it('ignores non-completed matches and null scores', () => {
    const matches: Match[] = [
      completed('a', 'b', 2, 0, 'a'),
      { ...completed('a', 'c', 2, 0, 'a'), status: 'scheduled' },
      {
        ...completed('b', 'c', 2, 0, 'b'),
        participant1Score: null,
        participant2Score: null,
      },
    ];
    expect(getGoalDifference(matches, 'a')).toBe(2);
    expect(getGoalDifference(matches, 'b')).toBe(-2);
    expect(getGoalDifference(matches, 'c')).toBe(0);
  });

  it('ignores matches the participant is not in', () => {
    const matches = [completed('x', 'y', 5, 0, 'x')];
    expect(getGoalDifference(matches, 'a')).toBe(0);
  });
});

describe('getHeadToHead', () => {
  it('counts wins, losses, and draws between two participants', () => {
    const matches = [
      completed('a', 'b', 2, 1, 'a'),
      completed('a', 'b', 0, 3, 'b'),
      completed('a', 'b', 1, 1, null),
    ];
    expect(getHeadToHead(matches, 'a', 'b')).toEqual({
      p1Wins: 1,
      p2Wins: 1,
      draws: 1,
    });
  });

  it('ignores matches not involving both participants', () => {
    const matches = [completed('a', 'c', 2, 1, 'a')];
    expect(getHeadToHead(matches, 'a', 'b')).toEqual({
      p1Wins: 0,
      p2Wins: 0,
      draws: 0,
    });
  });

  it('ignores non-completed matches', () => {
    const matches: Match[] = [
      { ...completed('a', 'b', 2, 1, 'a'), status: 'scheduled' },
    ];
    expect(getHeadToHead(matches, 'a', 'b').draws).toBe(0);
  });
});

describe('calculateStandings', () => {
  it('initializes every participant with zeroed stats', () => {
    const standings = calculateStandings([], ['a', 'b'], 't1');
    expect(standings).toHaveLength(2);
    expect(standings[0]).toMatchObject({
      participantId: 'a',
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      points: 0,
    });
  });

  it('awards three points for a win and one each for a draw', () => {
    const matches = [
      completed('a', 'b', 2, 1, 'a'),
      completed('b', 'c', 1, 1, null),
    ];
    const standings = calculateStandings(matches, ['a', 'b', 'c'], 't1');
    const a = standings.find((s) => s.participantId === 'a')!;
    const b = standings.find((s) => s.participantId === 'b')!;
    expect(a).toMatchObject({ played: 1, won: 1, lost: 0, points: 3 });
    expect(b).toMatchObject({ played: 2, drawn: 1, points: 1 });
  });

  it('ignores non-completed matches, null scores, and unknown participants', () => {
    const matches: Match[] = [
      { ...completed('a', 'b', 2, 1, 'a'), status: 'scheduled' },
      {
        ...completed('a', 'c', 2, 1, 'a'),
        participant1Score: null,
        participant2Score: null,
      },
      completed('x', 'y', 1, 0, 'x'),
    ];
    const standings = calculateStandings(matches, ['a', 'b', 'c'], 't1');
    expect(standings.every((s) => s.played === 0)).toBe(true);
  });

  it('sorts by points then wins then goal difference', () => {
    const matches = [
      completed('a', 'b', 5, 0, 'a'),
      completed('c', 'd', 1, 0, 'c'),
    ];
    const standings = calculateStandings(matches, ['a', 'b', 'c', 'd'], 't1');
    expect(standings.map((s) => s.participantId)).toEqual(['a', 'c', 'd', 'b']);
    expect(standings.map((s) => s.position)).toEqual([1, 2, 3, 4]);
  });

  it('breaks equal points via head-to-head', () => {
    const matches = [completed('a', 'b', 1, 0, 'a')];
    const standings = calculateStandings(matches, ['a', 'b'], 't1');
    expect(standings[0].participantId).toBe('a');
    expect(standings[1].participantId).toBe('b');
  });
});

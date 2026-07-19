import { playMatch, runTournament } from '../tournament';
import { STRATEGIES } from '../constants';

describe('playMatch', () => {
  it('scores a mutual-cooperation match evenly', () => {
    const { aScore, bScore } = playMatch(
      'always-cooperate',
      'always-cooperate',
      3
    );
    expect(aScore).toBe(9);
    expect(bScore).toBe(9);
  });

  it('lets an exploiter beat a pure cooperator', () => {
    const { aScore, bScore } = playMatch(
      'always-defect',
      'always-cooperate',
      3
    );
    expect(aScore).toBe(15);
    expect(bScore).toBe(-15);
  });

  it('scores a symmetric alternator duel round by round', () => {
    const { aScore, bScore } = playMatch('alternator', 'alternator', 4);
    expect(aScore).toBe(2);
    expect(bScore).toBe(2);
  });

  it('clamps invalid round counts', () => {
    expect(playMatch('always-cooperate', 'always-cooperate', 0).aScore).toBe(3);
    expect(
      playMatch('always-cooperate', 'always-cooperate', 1_000_000_000).aScore
    ).toBe(30000);
  });
});

describe('runTournament', () => {
  it('ranks every bot exactly once against every other', () => {
    const { standings } = runTournament(10);
    expect(standings).toHaveLength(STRATEGIES.length);
    expect(new Set(standings.map((s) => s.strategyId)).size).toBe(
      STRATEGIES.length
    );
    standings.forEach((s) => expect(s.played).toBe(STRATEGIES.length - 1));
  });

  it('sorts standings by score descending', () => {
    const { standings } = runTournament(10);
    const scores = standings.map((s) => s.score);
    const sorted = [...scores].sort((a, b) => b - a);
    expect(scores).toEqual(sorted);
  });

  it('returns all matchups', () => {
    const { matchups } = runTournament(10);
    const totalPairs = (STRATEGIES.length * (STRATEGIES.length - 1)) / 2;
    expect(matchups).toHaveLength(totalPairs);
  });
});

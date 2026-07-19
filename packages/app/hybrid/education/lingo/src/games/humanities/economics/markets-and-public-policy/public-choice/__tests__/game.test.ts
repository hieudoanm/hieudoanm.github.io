import {
  cycleRankings,
  drawWin,
  expectedPayoff,
  medianOf,
  pairwiseWinner,
  rentProbability,
  runTournament,
  simulateElection,
  votersFrom,
} from '../game';
import type { ParadoxOption, Voter } from '../types';

const options: ParadoxOption[] = [
  { id: 'A', name: 'Roads', emoji: '🛣️' },
  { id: 'B', name: 'Bridge', emoji: '🌉' },
  { id: 'C', name: 'Tunnel', emoji: '🚇' },
];

describe('medianOf', () => {
  it('returns the middle ideal point of a distribution', () => {
    expect(medianOf([5, 15, 50, 55, 95])).toBe(50);
    expect(medianOf([10, 20, 45, 60, 95])).toBe(45);
  });
});

describe('votersFrom', () => {
  it('labels voters with sequential ids', () => {
    const voters: Voter[] = votersFrom([10, 40, 80]);
    expect(voters.map((v) => v.id)).toEqual(['v1', 'v2', 'v3']);
    expect(voters.map((v) => v.ideal)).toEqual([10, 40, 80]);
  });
});

describe('simulateElection', () => {
  const voters = votersFrom([5, 15, 50, 55, 95]);

  it('gives a majority to the candidate closest to the median', () => {
    const result = simulateElection(voters, 50, 70);
    expect(result.winner).toBe('player');
    expect(result.votesForPlayer).toBe(4);
    expect(result.votesForBot).toBe(1);
  });

  it('loses when drifting away from the median', () => {
    const result = simulateElection(voters, 20, 70);
    expect(result.winner).toBe('bot');
  });

  it('ends in a tie when both platforms coincide', () => {
    const result = simulateElection(voters, 70, 70);
    expect(result.winner).toBe('tie');
  });
});

describe('cycleRankings', () => {
  it('produces the classic majority cycle', () => {
    expect(cycleRankings(options)).toEqual([
      ['A', 'B', 'C'],
      ['B', 'C', 'A'],
      ['C', 'A', 'B'],
    ]);
  });
});

describe('pairwiseWinner', () => {
  const rankings = cycleRankings(options);

  it('finds a 2–1 winner in every head-to-head', () => {
    expect(pairwiseWinner(rankings, 'A', 'B')).toBe('A');
    expect(pairwiseWinner(rankings, 'B', 'C')).toBe('B');
    expect(pairwiseWinner(rankings, 'A', 'C')).toBe('C');
  });
});

describe('runTournament', () => {
  const rankings = cycleRankings(options);

  it('hands victory to the option left out of the first pair', () => {
    expect(runTournament(options, rankings, ['A', 'B']).finalWinner).toBe('C');
    expect(runTournament(options, rankings, ['B', 'C']).finalWinner).toBe('A');
    expect(runTournament(options, rankings, ['A', 'C']).finalWinner).toBe('B');
  });

  it('records both pairwise steps', () => {
    const { steps } = runTournament(options, rankings, ['A', 'B']);
    expect(steps).toHaveLength(2);
    expect(steps[0]).toEqual({ a: 'A', b: 'B', winner: 'A' });
    expect(steps[1]).toEqual({ a: 'A', b: 'C', winner: 'C' });
  });
});

describe('rentProbability', () => {
  it('follows the Tullock ratio', () => {
    expect(rentProbability(0, 0)).toBe(0.5);
    expect(rentProbability(20000, 20000)).toBe(0.5);
    expect(rentProbability(30000, 10000)).toBe(0.75);
  });
});

describe('expectedPayoff', () => {
  it('returns p × V − own spending', () => {
    expect(expectedPayoff(20000, 20000, 100000)).toBe(30000);
    expect(expectedPayoff(50000, 50000, 100000)).toBe(0);
    expect(expectedPayoff(0, 20000, 100000)).toBe(0);
  });
});

describe('drawWin', () => {
  it('resolves draws using the win probability', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4);
    expect(drawWin(0.5)).toBe(true);
    jest.spyOn(Math, 'random').mockReturnValue(0.9);
    expect(drawWin(0.5)).toBe(false);
    jest.restoreAllMocks();
  });
});

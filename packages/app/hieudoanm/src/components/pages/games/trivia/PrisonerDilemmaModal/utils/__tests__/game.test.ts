import { chooseOpponent, formatScore, pickStrategy } from '../game';
import { Move, Round, Strategy } from '../../types';

describe('pickStrategy', () => {
  it('returns a valid strategy', () => {
    const strategies: Strategy[] = [
      'alwayscooperate',
      'alwaysdefect',
      'titfortat',
      'grimtrigger',
      'random',
    ];
    for (let i = 0; i < 20; i++) {
      expect(strategies).toContain(pickStrategy());
    }
  });
});

describe('chooseOpponent', () => {
  it('always cooperate returns cooperate', () => {
    expect(chooseOpponent('alwayscooperate', [], [])).toBe('cooperate');
  });

  it('always defect returns defect', () => {
    expect(chooseOpponent('alwaysdefect', [], [])).toBe('defect');
  });

  it('titfortat cooperates on first round', () => {
    expect(chooseOpponent('titfortat', [], [])).toBe('cooperate');
  });

  it('titfortat mirrors last player move', () => {
    const history: Round[] = [
      {
        round: 1,
        player: 'cooperate',
        opponent: 'cooperate',
        pScore: 1,
        oScore: 1,
      },
    ];
    const playerHistory: Move[] = ['cooperate'];
    expect(chooseOpponent('titfortat', history, playerHistory)).toBe(
      'cooperate'
    );

    const playerHistory2: Move[] = ['defect'];
    expect(chooseOpponent('titfortat', history, playerHistory2)).toBe('defect');
  });

  it('grimtrigger defects if player ever defected', () => {
    const playerHistory: Move[] = ['cooperate', 'defect'];
    expect(chooseOpponent('grimtrigger', [], playerHistory)).toBe('defect');
  });

  it('grimtrigger cooperates if player never defected', () => {
    const playerHistory: Move[] = ['cooperate', 'cooperate'];
    expect(chooseOpponent('grimtrigger', [], playerHistory)).toBe('cooperate');
  });

  it('random returns cooperate or defect', () => {
    const results = new Set<Move>();
    for (let i = 0; i < 20; i++) {
      results.add(chooseOpponent('random', [], []));
    }
    expect(results.has('cooperate')).toBe(true);
    expect(results.has('defect')).toBe(true);
  });
});

describe('formatScore', () => {
  it('appends yr suffix', () => {
    expect(formatScore(0)).toBe('0yr');
    expect(formatScore(5)).toBe('5yr');
    expect(formatScore(100)).toBe('100yr');
  });
});

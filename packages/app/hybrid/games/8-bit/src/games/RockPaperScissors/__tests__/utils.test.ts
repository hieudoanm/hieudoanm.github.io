import { play, randomChoice, BEATS, CHOICES } from '../utils';

describe('RockPaperScissors utils', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns draw when choices are equal', () => {
    expect(play('rock', 'rock')).toBe('draw');
    expect(play('paper', 'paper')).toBe('draw');
    expect(play('scissors', 'scissors')).toBe('draw');
  });

  it('returns win when player beats computer', () => {
    expect(play('rock', 'scissors')).toBe('win');
    expect(play('paper', 'rock')).toBe('win');
    expect(play('scissors', 'paper')).toBe('win');
  });

  it('returns lose when computer beats player', () => {
    expect(play('rock', 'paper')).toBe('lose');
    expect(play('paper', 'scissors')).toBe('lose');
    expect(play('scissors', 'rock')).toBe('lose');
  });

  it('BEATS mapping is correct', () => {
    expect(BEATS.rock).toBe('scissors');
    expect(BEATS.paper).toBe('rock');
    expect(BEATS.scissors).toBe('paper');
  });

  it('CHOICES has 3 entries', () => {
    expect(CHOICES).toHaveLength(3);
  });

  it('randomChoice returns a valid choice', () => {
    const choice = randomChoice();
    expect(CHOICES.map((c) => c.value)).toContain(choice);
  });
});

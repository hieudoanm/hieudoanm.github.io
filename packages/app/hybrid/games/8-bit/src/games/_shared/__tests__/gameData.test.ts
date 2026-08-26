import { GAME_DATA } from '../gameData';

describe('GAME_DATA', () => {
  it('contains entries for all four games', () => {
    expect(GAME_DATA).toHaveProperty('maze');
    expect(GAME_DATA).toHaveProperty('snake');
    expect(GAME_DATA).toHaveProperty('dino-run');
    expect(GAME_DATA).toHaveProperty('rock-paper-scissors');
  });

  it('each game has title, subtitle, instructions, and visualization', () => {
    for (const [, data] of Object.entries(GAME_DATA)) {
      expect(typeof data.title).toBe('string');
      expect(data.title.length).toBeGreaterThan(0);
      expect(typeof data.subtitle).toBe('string');
      expect(data.subtitle.length).toBeGreaterThan(0);
      expect(Array.isArray(data.instructions)).toBe(true);
      expect(data.instructions.length).toBeGreaterThan(0);
      expect(data.visualization).toBeDefined();
    }
  });

  it('maze instructions contain key gameplay terms', () => {
    const instructions = GAME_DATA.maze.instructions.join(' ');
    expect(instructions).toContain('MAZE');
    expect(instructions).toContain('SOLVE');
  });

  it('snake instructions contain key gameplay terms', () => {
    const instructions = GAME_DATA.snake.instructions.join(' ');
    expect(instructions).toContain('ARROW');
    expect(instructions).toContain('FOOD');
  });

  it('dino-run instructions contain key gameplay terms', () => {
    const instructions = GAME_DATA['dino-run'].instructions.join(' ');
    expect(instructions).toContain('JUMP');
    expect(instructions).toContain('OBSTACLE');
  });

  it('rock-paper-scissors instructions contain key gameplay terms', () => {
    const instructions =
      GAME_DATA['rock-paper-scissors'].instructions.join(' ');
    expect(instructions).toContain('ROCK');
    expect(instructions).toContain('PAPER');
  });
});

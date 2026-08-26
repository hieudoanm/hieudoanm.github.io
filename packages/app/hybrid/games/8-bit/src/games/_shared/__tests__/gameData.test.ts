import { GAME_DATA } from '../gameData';

describe('GAME_DATA', () => {
  it('contains entries for all three games', () => {
    expect(GAME_DATA).toHaveProperty('maze');
    expect(GAME_DATA).toHaveProperty('snake');
    expect(GAME_DATA).toHaveProperty('dino-run');
  });

  it('each game has title, subtitle, instructions, and visualization', () => {
    for (const [slug, data] of Object.entries(GAME_DATA)) {
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
    expect(instructions).toContain('maze');
    expect(instructions).toContain('Solve');
  });

  it('snake instructions contain key gameplay terms', () => {
    const instructions = GAME_DATA.snake.instructions.join(' ');
    expect(instructions).toContain('arrow');
    expect(instructions).toContain('food');
  });

  it('dino-run instructions contain key gameplay terms', () => {
    const instructions = GAME_DATA['dino-run'].instructions.join(' ');
    expect(instructions).toContain('jump');
    expect(instructions).toContain('obstacle');
  });
});

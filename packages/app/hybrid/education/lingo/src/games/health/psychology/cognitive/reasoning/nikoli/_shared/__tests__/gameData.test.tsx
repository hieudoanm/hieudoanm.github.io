import { render, screen } from '@testing-library/react';
import { GAME_DATA } from '../gameData';

describe('gameData', () => {
  it('has entries for all 7 games', () => {
    expect(Object.keys(GAME_DATA)).toHaveLength(7);
  });

  it('has nurikabe data', () => {
    expect(GAME_DATA.nurikabe).toBeDefined();
    expect(GAME_DATA.nurikabe.title).toBeDefined();
    expect(GAME_DATA.nurikabe.instructions.length).toBeGreaterThan(0);
  });

  it('has fillomino data', () => {
    expect(GAME_DATA.fillomino).toBeDefined();
    expect(GAME_DATA.fillomino.instructions.length).toBeGreaterThan(0);
  });

  it('has heyawake data', () => {
    expect(GAME_DATA.heyawake).toBeDefined();
    expect(GAME_DATA.heyawake.instructions.length).toBeGreaterThan(0);
  });

  it('has masyu data', () => {
    expect(GAME_DATA.masyu).toBeDefined();
    expect(GAME_DATA.masyu.instructions.length).toBeGreaterThan(0);
  });

  it('has norinori data', () => {
    expect(GAME_DATA.norinori).toBeDefined();
    expect(GAME_DATA.norinori.instructions.length).toBeGreaterThan(0);
  });

  it('has shikaku data', () => {
    expect(GAME_DATA.shikaku).toBeDefined();
    expect(GAME_DATA.shikaku.instructions.length).toBeGreaterThan(0);
  });

  it('has sudoku data', () => {
    expect(GAME_DATA.sudoku).toBeDefined();
    expect(GAME_DATA.sudoku.instructions.length).toBeGreaterThan(0);
  });

  it('renders nurikabe visualization', () => {
    const { container } = render(<>{GAME_DATA.nurikabe.visualization}</>);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders fillomino visualization', () => {
    const { container } = render(<>{GAME_DATA.fillomino.visualization}</>);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders heyawake visualization', () => {
    const { container } = render(<>{GAME_DATA.heyawake.visualization}</>);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders masyu visualization', () => {
    const { container } = render(<>{GAME_DATA.masyu.visualization}</>);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders norinori visualization', () => {
    const { container } = render(<>{GAME_DATA.norinori.visualization}</>);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders shikaku visualization', () => {
    const { container } = render(<>{GAME_DATA.shikaku.visualization}</>);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders sudoku visualization', () => {
    const { container } = render(<>{GAME_DATA.sudoku.visualization}</>);
    expect(container.firstChild).toBeTruthy();
  });

  it('each game has a subtitle', () => {
    for (const key of Object.keys(GAME_DATA)) {
      expect(GAME_DATA[key].subtitle).toBeDefined();
    }
  });

  it('each game has visualization', () => {
    for (const key of Object.keys(GAME_DATA)) {
      expect(GAME_DATA[key].visualization).toBeTruthy();
    }
  });
});

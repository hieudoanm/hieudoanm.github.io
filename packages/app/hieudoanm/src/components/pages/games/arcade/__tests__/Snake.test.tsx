jest.mock('../Snake/utils/snake', () => ({
  randomFood: () => ({ r: 5, c: 5 }),
  initSnake: () => [
    { r: 6, c: 6 },
    { r: 6, c: 5 },
    { r: 6, c: 4 },
  ],
  OPPOSITE: { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' },
  NEXT: {
    UP: (p: any) => ({ r: p.r - 1, c: p.c }),
    DOWN: (p: any) => ({ r: p.r + 1, c: p.c }),
    LEFT: (p: any) => ({ r: p.r, c: p.c - 1 }),
    RIGHT: (p: any) => ({ r: p.r, c: p.c + 1 }),
  },
}));

jest.mock('../Snake/constants', () => ({
  GRID: 12,
  TICK_BASE: 180,
  MIN_TICK: 60,
  TICK_DECAY: 3,
}));

import { act, fireEvent, render, screen } from '@testing-library/react';
import { Snake } from '../Snake';

const getContainer = () =>
  screen.getByText(/Score/).closest('[tabindex]') as HTMLElement;
const getScore = () =>
  parseInt(screen.getByText(/Score:/).textContent?.match(/\d+/)![0] || '0');
const tick = (n = 1) => {
  act(() => {
    jest.advanceTimersByTime(180 * n);
  });
};

describe('Snake', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    const { container } = render(<Snake onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('renders game info', () => {
    render(<Snake onClose={jest.fn()} />);
    expect(screen.getByText(/Score/)).toBeInTheDocument();
  });

  it('Escape key closes', () => {
    const onClose = jest.fn();
    render(<Snake onClose={onClose} />);
    fireEvent.keyDown(getContainer(), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('arrow keys change direction', () => {
    render(<Snake onClose={jest.fn()} />);
    ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'].forEach((key) => {
      fireEvent.keyDown(getContainer(), { key });
    });
  });

  it('p key toggles pause', () => {
    render(<Snake onClose={jest.fn()} />);
    fireEvent.keyDown(getContainer(), { key: 'p' });
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('space key toggles pause', () => {
    render(<Snake onClose={jest.fn()} />);
    fireEvent.keyDown(getContainer(), { key: ' ' });
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('resume button unpauses', () => {
    render(<Snake onClose={jest.fn()} />);
    fireEvent.keyDown(getContainer(), { key: 'p' });
    expect(screen.getByText('Paused')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Resume'));
    expect(screen.queryByText('Paused')).not.toBeInTheDocument();
  });

  it('pause button shows when not paused', () => {
    render(<Snake onClose={jest.fn()} />);
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });

  it('eats food and increases score', () => {
    render(<Snake onClose={jest.fn()} />);
    const c = getContainer();
    fireEvent.keyDown(c, { key: 'ArrowUp' });
    tick(1);
    fireEvent.keyDown(c, { key: 'ArrowLeft' });
    tick(1);
    expect(getScore()).toBe(1);
  });

  it('wall collision triggers game over', () => {
    render(<Snake onClose={jest.fn()} />);
    fireEvent.keyDown(getContainer(), { key: 'ArrowUp' });
    tick(8);
    expect(screen.getByText(/Game Over/)).toBeInTheDocument();
  });

  it('New Game button resets game', () => {
    render(<Snake onClose={jest.fn()} />);
    fireEvent.keyDown(getContainer(), { key: 'ArrowUp' });
    tick(8);
    expect(screen.getByText(/Game Over/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('New Game'));
    expect(screen.queryByText(/Game Over/)).not.toBeInTheDocument();
    expect(getScore()).toBe(0);
  });

  it('speed slider changes speed', () => {
    render(<Snake onClose={jest.fn()} />);
    const slider = document.querySelector('input[type="range"]')!;
    fireEvent.change(slider, { target: { value: '3' } });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('keyboard disabled during game over', () => {
    render(<Snake onClose={jest.fn()} />);
    const c = document.querySelector('[tabindex]') as HTMLElement;
    fireEvent.keyDown(c, { key: 'ArrowUp' });
    tick(8);
    expect(screen.getByText(/Game Over/)).toBeInTheDocument();
    fireEvent.keyDown(c, { key: 'ArrowLeft' });
    expect(screen.getByText(/Game Over/)).toBeInTheDocument();
  });

  it('pause during game does not pause when already game over', () => {
    render(<Snake onClose={jest.fn()} />);
    fireEvent.keyDown(getContainer(), { key: 'ArrowUp' });
    tick(8);
    expect(screen.getByText(/Game Over/)).toBeInTheDocument();
    expect(screen.queryByText('Paused')).not.toBeInTheDocument();
  });
});

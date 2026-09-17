import { fireEvent, render, screen } from '@testing-library/react';

import { DinoRun } from '..';
import { useDinoRun } from '../useDinoRun';

jest.mock('../useDinoRun');

const mockedHook = jest.mocked(useDinoRun);

const buildState = (overrides = {}) => ({
  canvasRef: { current: document.createElement('canvas') },
  phase: 'idle' as 'idle' | 'running' | 'over',
  score: 0,
  best: 0,
  tier: 1,
  load: 'Calm',
  hop: jest.fn(),
  start: jest.fn(),
  onKeyDown: jest.fn(),
  ...overrides,
});

let state = buildState();

const mockState = (overrides = {}) => {
  state = buildState(overrides);
  mockedHook.mockImplementation(() => state as ReturnType<typeof useDinoRun>);
};

beforeEach(() => {
  jest.clearAllMocks();
  mockState();
});

describe('DinoRun', () => {
  it('shows the scoreboard and the idle prompt', () => {
    render(<DinoRun />);

    expect(screen.getByText('Score:')).toBeInTheDocument();
    expect(screen.getByText('Best:')).toBeInTheDocument();
    expect(
      screen.getByText(/Press space or tap the field/i)
    ).toBeInTheDocument();
  });

  it('reports the current attention load', () => {
    mockState({ tier: 4, load: 'Busy' });

    render(<DinoRun />);

    expect(screen.getByText('Busy')).toBeInTheDocument();
  });

  it('shows the running score', () => {
    mockState({ phase: 'running', score: 12, best: 30 });

    render(<DinoRun />);

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('explains vigilance decay when the run ends', () => {
    mockState({ phase: 'over', score: 8 });

    render(<DinoRun />);

    expect(screen.getByText(/Crashed at 8/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Run again/i })
    ).toBeInTheDocument();
  });

  it('hops on the action button while running', () => {
    mockState({ phase: 'running' });

    render(<DinoRun />);

    fireEvent.click(screen.getByRole('button', { name: 'Jump' }));

    expect(state.hop).toHaveBeenCalled();
  });

  it('restarts from the action button once over', () => {
    mockState({ phase: 'over' });

    render(<DinoRun />);

    fireEvent.click(screen.getByRole('button', { name: /Run again/i }));

    expect(state.start).toHaveBeenCalled();
  });

  it('jumps when the canvas is clicked', () => {
    render(<DinoRun />);

    fireEvent.click(document.querySelector('canvas') as HTMLCanvasElement);

    expect(state.hop).toHaveBeenCalled();
  });

  it('forwards key presses to the hook', () => {
    render(<DinoRun />);

    fireEvent.keyDown(document.querySelector('canvas') as HTMLElement, {
      key: ' ',
    });

    expect(state.onKeyDown).toHaveBeenCalled();
  });

  it('focuses the play area on mount so keys work immediately', () => {
    render(<DinoRun />);

    expect(document.activeElement).not.toBe(document.body);
  });
});

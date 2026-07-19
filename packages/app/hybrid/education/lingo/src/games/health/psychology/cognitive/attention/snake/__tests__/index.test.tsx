import { fireEvent, render, screen } from '@testing-library/react';

import { GRID } from '../constants';
import { Snake } from '..';
import { buildBoard, createState } from '../snake';
import { useSnake } from '../useSnake';

jest.mock('../useSnake');

const mockedHook = jest.mocked(useSnake);

const buildState = (overrides = {}) => {
  const base = createState();

  return {
    containerRef: { current: document.createElement('div') },
    board: buildBoard(base),
    snake: base.snake,
    score: 0,
    best: 0,
    status: 'running' as 'running' | 'over' | 'won',
    paused: true,
    running: false,
    speed: 2,
    label: 'EASY',
    start: jest.fn(),
    togglePause: jest.fn(),
    handleSpeed: jest.fn(),
    handleDir: jest.fn(),
    onKeyDown: jest.fn(),
    speeds: [1, 2, 3, 4, 5],
    ...overrides,
  };
};

let state = buildState();

const mockState = (overrides = {}) => {
  state = buildState(overrides);
  mockedHook.mockImplementation(() => state as ReturnType<typeof useSnake>);
};

beforeEach(() => {
  jest.clearAllMocks();
  mockState();
});

describe('Snake', () => {
  it('renders a full grid of cells', () => {
    render(<Snake />);

    expect(screen.getAllByRole('gridcell')).toHaveLength(GRID * GRID);
    expect(screen.getByRole('grid')).toHaveAttribute(
      'aria-label',
      'Snake board'
    );
  });

  it('shows the scoreboard and the load label', () => {
    render(<Snake />);

    expect(screen.getByText('Score:')).toBeInTheDocument();
    expect(screen.getByText('Best:')).toBeInTheDocument();
    expect(screen.getByText('EASY')).toBeInTheDocument();
    expect(screen.getByText(`3/${GRID * GRID} filled`)).toBeInTheDocument();
  });

  it('invites the player to start while paused', () => {
    render(<Snake />);

    expect(screen.getByText(/Ready\. Start and hold/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });

  it('reports a crash', () => {
    mockState({ status: 'over', score: 7, paused: false });

    render(<Snake />);

    expect(
      screen.getByText(/Hit the wall or yourself at 7/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeDisabled();
  });

  it('reports a won board', () => {
    mockState({ status: 'won', score: 41 });

    render(<Snake />);

    expect(screen.getByText(/Board filled at 41/i)).toBeInTheDocument();
  });

  it('toggles pause from the button', () => {
    mockState({ paused: false });

    render(<Snake />);

    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));

    expect(state.togglePause).toHaveBeenCalled();
  });

  it('starts a new game', () => {
    render(<Snake />);

    fireEvent.click(screen.getByRole('button', { name: 'New game' }));

    expect(state.start).toHaveBeenCalled();
  });

  it('changes speed from the slider', () => {
    render(<Snake />);

    fireEvent.change(screen.getByLabelText('Speed'), {
      target: { value: '4' },
    });

    expect(state.handleSpeed).toHaveBeenCalledWith(4);
  });

  it('changes speed from the level buttons', () => {
    render(<Snake />);

    fireEvent.click(screen.getByRole('button', { name: '5' }));

    expect(state.handleSpeed).toHaveBeenCalledWith(5);
  });

  it('marks the active speed level', () => {
    render(<Snake />);

    expect(screen.getByRole('button', { name: '2' }).className).toContain(
      'btn-primary'
    );
  });

  it('forwards key presses to the hook', () => {
    render(<Snake />);

    fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowUp' });

    expect(state.onKeyDown).toHaveBeenCalled();
  });
});

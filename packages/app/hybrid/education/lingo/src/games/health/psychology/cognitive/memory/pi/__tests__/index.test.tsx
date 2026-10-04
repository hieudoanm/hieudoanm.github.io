import { fireEvent, render, screen, within } from '@testing-library/react';

import { Pi } from '..';
import { KEYPAD } from '../constants';
import { usePiGame } from '../usePiGame';

jest.mock('../usePiGame');

const mockedHook = jest.mocked(usePiGame);

const DIGITS = ['3', '.', '1', '4', '5', '9', '2', '6'];

const buildState = (overrides = {}) => ({
  digits: DIGITS,
  containerRef: { current: null },
  index: 2,
  mode: 'practice' as 'practice' | 'game',
  setMode: jest.fn(),
  locked: false,
  lastResult: null as 'correct' | 'wrong' | null,
  revealedIndex: null as number | null,
  highScore: 0,
  retry: jest.fn(),
  switchToGame: jest.fn(),
  handleKey: jest.fn(),
  onKeyDown: jest.fn(),
  ...overrides,
});

let state = buildState();

beforeEach(() => {
  state = buildState();
  mockedHook.mockImplementation(() => state);
});

describe('Pi practice mode', () => {
  it('offers practice and game tabs with practice active', () => {
    render(<Pi />);

    expect(screen.getByRole('tab', { name: 'Practice' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', { name: 'Game' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('reveals every digit while practicing', () => {
    render(<Pi />);

    const strip = within(screen.getByTestId('digit-strip'));

    for (const digit of DIGITS) {
      expect(strip.getByText(digit)).toBeInTheDocument();
    }

    expect(strip.queryByText('•')).not.toBeInTheDocument();
  });

  it('shows the current index and the arrow-key hint', () => {
    render(<Pi />);

    expect(screen.getByText('Index: 2')).toBeInTheDocument();
    expect(screen.getByText('Use ← → arrow keys')).toBeInTheDocument();
  });

  it('hides the keypad', () => {
    render(<Pi />);

    expect(screen.queryByRole('button', { name: '5' })).not.toBeInTheDocument();
  });

  it('hides the scoreboard', () => {
    render(<Pi />);

    expect(screen.queryByText('Score:')).not.toBeInTheDocument();
  });
});

describe('Pi game mode', () => {
  beforeEach(() => {
    state = buildState({ mode: 'game' });
  });

  it('shows the score and the best run', () => {
    state = buildState({ mode: 'game', index: 2, highScore: 7 });

    render(<Pi />);

    const scoreboard = within(
      screen.getByText('Score:').parentElement as HTMLElement
    );

    expect(scoreboard.getByText('2')).toBeInTheDocument();
    expect(scoreboard.getByText('7')).toBeInTheDocument();
  });

  it('masks digits from the current index onward', () => {
    state = buildState({
      mode: 'game',
      index: 1,
      digits: ['3', '.', '1', '4'],
    });

    render(<Pi />);

    const strip = within(screen.getByTestId('digit-strip'));

    expect(strip.getByText('3')).toBeInTheDocument();
    expect(strip.getAllByText('•')).toHaveLength(3);
  });

  it('reveals the offending digit after a mistake', () => {
    state = buildState({
      mode: 'game',
      locked: true,
      lastResult: 'wrong',
      revealedIndex: 1,
    });

    render(<Pi />);

    expect(screen.getByText('Mistake!')).toBeInTheDocument();
    expect(screen.getByText('You reached digit 2')).toBeInTheDocument();
  });

  it('offers Retry instead of the keypad once locked', () => {
    state = buildState({ mode: 'game', locked: true });

    render(<Pi />);

    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '7' })).not.toBeInTheDocument();
  });

  it('restarts from the Retry button', () => {
    state = buildState({ mode: 'game', locked: true });

    render(<Pi />);

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(state.retry).toHaveBeenCalledTimes(1);
  });

  it('renders every keypad key', () => {
    render(<Pi />);

    for (const key of KEYPAD) {
      expect(screen.getByRole('button', { name: key })).toBeInTheDocument();
    }
  });

  it('sends a keypad press to the hook', () => {
    render(<Pi />);

    fireEvent.click(screen.getByRole('button', { name: '7' }));

    expect(state.handleKey).toHaveBeenCalledWith('7');
  });
});

describe('Pi mode switching', () => {
  it('starts the game through the Game tab', () => {
    render(<Pi />);

    fireEvent.click(screen.getByRole('tab', { name: 'Game' }));

    expect(state.switchToGame).toHaveBeenCalledTimes(1);
  });

  it('returns to practice through the Practice tab', () => {
    state = buildState({ mode: 'game' });

    render(<Pi />);

    fireEvent.click(screen.getByRole('tab', { name: 'Practice' }));

    expect(state.setMode).toHaveBeenCalledWith('practice');
  });

  it('forwards key presses from the focusable container', () => {
    const { container } = render(<Pi />);

    fireEvent.keyDown(container.firstChild as HTMLElement, { key: '1' });

    expect(state.onKeyDown).toHaveBeenCalled();
  });
});

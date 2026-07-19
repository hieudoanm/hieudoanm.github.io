import { fireEvent, render, screen } from '@testing-library/react';

import { MemoryMatch } from '..';
import { useMemoryMatch } from '../useMemoryMatch';

jest.mock('../useMemoryMatch');

const mockedHook = jest.mocked(useMemoryMatch);

const buildState = (overrides = {}) => ({
  cards: [
    { id: 0, emoji: '🐶', flipped: true, matched: false },
    { id: 1, emoji: '🐱', flipped: false, matched: false },
    { id: 2, emoji: '🐶', flipped: true, matched: false },
    { id: 3, emoji: '🐱', flipped: false, matched: false },
  ],
  rows: 4,
  cols: 4,
  movesCount: 1,
  matchedPairs: 0,
  totalPairs: 8,
  timer: 5,
  won: false,
  category: 'animals',
  handleCardClick: jest.fn(),
  handleRowChange: jest.fn(),
  handleColChange: jest.fn(),
  handleCategoryChange: jest.fn(),
  newGame: jest.fn(),
  ...overrides,
});

let state = buildState();

beforeEach(() => {
  state = buildState();
  mockedHook.mockImplementation(() => state);
});

describe('MemoryMatch', () => {
  it('shows the running moves, timer and pair count', () => {
    render(<MemoryMatch />);

    expect(screen.getByText('0:05')).toBeInTheDocument();
    expect(screen.getByText('0/8')).toBeInTheDocument();
  });

  it('offers every emoji category and marks the active one', () => {
    render(<MemoryMatch />);

    expect(screen.getByRole('button', { name: 'food' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'animals' })).toHaveClass(
      'btn-primary'
    );
  });

  it('reveals an emoji only while its card is face up or matched', () => {
    render(<MemoryMatch />);

    expect(screen.getAllByText('🐶')).toHaveLength(2);
    expect(screen.queryByText('🐱')).not.toBeInTheDocument();
  });

  it('hands the clicked card id to the hook', () => {
    render(<MemoryMatch />);

    fireEvent.click(screen.getAllByRole('button', { name: '🐶' })[0]);

    expect(state.handleCardClick).toHaveBeenCalledWith(0);
  });

  it('restarts the deal from the New button', () => {
    render(<MemoryMatch />);

    fireEvent.click(screen.getByRole('button', { name: 'New' }));

    expect(state.newGame).toHaveBeenCalledTimes(1);
  });

  it('selects a new emoji category', () => {
    render(<MemoryMatch />);

    fireEvent.click(screen.getByRole('button', { name: 'nature' }));

    expect(state.handleCategoryChange).toHaveBeenCalledWith('nature');
  });

  it('reports the chosen row count', () => {
    render(<MemoryMatch />);

    fireEvent.change(screen.getByRole('combobox', { name: 'Rows' }), {
      target: { value: '6' },
    });

    expect(state.handleRowChange).toHaveBeenCalledWith(6);
  });

  it('reports the chosen column count', () => {
    render(<MemoryMatch />);

    fireEvent.change(screen.getByRole('combobox', { name: 'Cols' }), {
      target: { value: '6' },
    });

    expect(state.handleColChange).toHaveBeenCalledWith(6);
  });

  it('announces the win once every pair is matched', () => {
    state = buildState({ won: true, matchedPairs: 8, movesCount: 20 });

    render(<MemoryMatch />);

    expect(screen.getByText('Solved in 20 moves (0:05)!')).toBeInTheDocument();
  });
});

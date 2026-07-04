import { render, screen } from '@testing-library/react';
import { MemoryMatchModal } from '..';

jest.mock('../useMemoryMatch', () => ({
  useMemoryMatch: () => ({
    cards: [
      { id: 0, emoji: '🐶', flipped: true, matched: false },
      { id: 1, emoji: '🐱', flipped: false, matched: false },
      { id: 2, emoji: '🐶', flipped: true, matched: false },
      { id: 3, emoji: '🐱', flipped: false, matched: false },
    ],
    rows: 2,
    cols: 2,
    movesCount: 1,
    matchedPairs: 0,
    totalPairs: 2,
    timer: 5,
    won: false,
    category: 'animals',
    handleCardClick: jest.fn(),
    handleRowChange: jest.fn(),
    handleColChange: jest.fn(),
    handleCategoryChange: jest.fn(),
    newGame: jest.fn(),
  }),
}));

describe('MemoryMatchModal', () => {
  it('renders title and New button', () => {
    render(<MemoryMatchModal onClose={jest.fn()} />);
    expect(screen.getByText('Memory Match')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('shows moves and timer', () => {
    render(<MemoryMatchModal onClose={jest.fn()} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('0:05')).toBeInTheDocument();
  });

  it('shows category buttons', () => {
    render(<MemoryMatchModal onClose={jest.fn()} />);
    expect(screen.getByText('animals')).toBeInTheDocument();
  });

  it('renders card grid', () => {
    render(<MemoryMatchModal onClose={jest.fn()} />);
    const cards = screen.getAllByText('🐶');
    expect(cards).toHaveLength(2);
  });
});

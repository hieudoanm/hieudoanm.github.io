import { fireEvent, render, screen } from '@testing-library/react';
import { GameOverScreen } from '../../components/screens/GameOverScreen';
import { useGameStore } from '../../store';

describe('GameOverScreen', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
    useGameStore.setState({
      mode: 'classic',
      deckId: 'world',
      stats: {
        totalEvents: 8,
        correctCount: 6,
        currentStreak: 0,
        bestStreak: 4,
        score: 730,
        hintsUsed: 1,
      },
    });
  });
  afterEach(() => {
    useGameStore.getState().reset();
  });

  it('renders final stats with accuracy', () => {
    render(<GameOverScreen />);
    expect(screen.getByText('Game Over')).toBeInTheDocument();
    expect(screen.getByText('730')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('6/8')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('handles a zero-event game', () => {
    useGameStore.setState({
      stats: {
        totalEvents: 0,
        correctCount: 0,
        currentStreak: 0,
        bestStreak: 0,
        score: 0,
        hintsUsed: 0,
      },
    });
    render(<GameOverScreen />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('restarts the same game and returns to menu', () => {
    render(<GameOverScreen />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(useGameStore.getState().phase).toBe('playing');

    useGameStore.setState({ phase: 'gameover' });
    fireEvent.click(screen.getByRole('button', { name: 'Change Mode' }));
    expect(useGameStore.getState().phase).toBe('menu');
  });
});

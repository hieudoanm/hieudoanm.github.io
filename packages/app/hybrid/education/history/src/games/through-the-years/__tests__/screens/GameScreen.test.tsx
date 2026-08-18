import { fireEvent, render, screen } from '@testing-library/react';
import { GameScreen } from '../../components/screens/GameScreen';
import { useGameStore } from '../../store';
import { EVENT_A, EVENT_B } from '../../testing/fixtures';

const startPlaying = (): void => {
  useGameStore.setState({
    mode: 'classic',
    deckId: 'world',
    phase: 'playing',
    timeline: [EVENT_A],
    currentCard: EVENT_B,
    stats: {
      totalEvents: 2,
      correctCount: 2,
      currentStreak: 3,
      bestStreak: 3,
      score: 250,
      hintsUsed: 0,
    },
    hintsUsedThisRound: 0,
    lastResult: null,
    totalRounds: 3,
    maxRounds: 20,
    roundStartTime: Date.now(),
  });
};

describe('GameScreen', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });
  afterEach(() => {
    useGameStore.getState().reset();
  });

  it('renders the round header and placement slots while playing', () => {
    startPlaying();
    render(<GameScreen />);
    expect(screen.getByText('Round 3/20')).toBeInTheDocument();
    expect(screen.getByText('Score: 250')).toBeInTheDocument();
    expect(screen.getByText('3x streak')).toBeInTheDocument();
    expect(screen.getByText('1900')).toBeInTheDocument();
    const slots = screen.getAllByRole('button', { name: 'Place here' });
    expect(slots).toHaveLength(2);
  });

  it('places a card and shows the reveal banner', () => {
    startPlaying();
    render(<GameScreen />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Place here' })[1]);
    expect(useGameStore.getState().phase).toBe('reveal');
    expect(screen.getByText('Correct!')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('shows where the card should have gone after a mistake', () => {
    startPlaying();
    render(<GameScreen />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Place here' })[0]);
    expect(screen.getByText('Incorrect')).toBeInTheDocument();
    expect(screen.getByText('Would go at position 2')).toBeInTheDocument();
  });

  it('returns to the menu from Change mode', () => {
    startPlaying();
    render(<GameScreen />);
    fireEvent.click(screen.getByRole('button', { name: 'Change mode' }));
    expect(useGameStore.getState().phase).toBe('menu');
  });

  it('offers See Results on the final classic round', () => {
    startPlaying();
    useGameStore.setState({ phase: 'reveal', totalRounds: 20, maxRounds: 20 });
    render(<GameScreen />);
    expect(screen.getByText('See Results')).toBeInTheDocument();
  });
});

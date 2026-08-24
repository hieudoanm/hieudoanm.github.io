import { render, screen } from '@testing-library/react';
import { ThroughTheYears } from '../index';
import { useGameStore } from '../store';
import { EVENT_A, EVENT_B } from '../testing/fixtures';

describe('ThroughTheYears', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });
  afterEach(() => {
    useGameStore.getState().reset();
  });

  it('renders the setup screen from the menu phase', () => {
    render(<ThroughTheYears />);
    expect(screen.getByText('Through the Years')).toBeInTheDocument();
  });

  it('renders the game screen while playing', () => {
    useGameStore.setState({
      phase: 'playing',
      timeline: [EVENT_A],
      currentCard: EVENT_B,
    });
    render(<ThroughTheYears />);
    expect(screen.getAllByRole('button', { name: 'Place here' })).toHaveLength(
      2
    );
  });

  it('renders the game over screen', () => {
    useGameStore.setState({ phase: 'gameover' });
    render(<ThroughTheYears />);
    expect(screen.getByText('Game Over')).toBeInTheDocument();
  });
});

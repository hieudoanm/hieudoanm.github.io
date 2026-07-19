import { fireEvent, render, screen } from '@testing-library/react';
import { SetupScreen } from '../../components/screens/SetupScreen';
import { useGameStore } from '../../store';

describe('SetupScreen', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });
  afterEach(() => {
    useGameStore.getState().reset();
  });

  it('renders deck and mode choices', () => {
    render(<SetupScreen />);
    expect(screen.getByText('Through the Years')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'World' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Egypt' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Classic' })).toBeInTheDocument();
    expect(screen.getByText('20 events, highest score')).toBeInTheDocument();
  });

  it('starts the game with the chosen deck and mode', () => {
    render(<SetupScreen />);
    fireEvent.click(screen.getByRole('button', { name: 'Endless' }));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    const state = useGameStore.getState();
    expect(state.mode).toBe('endless');
    expect(state.deckId).toBe('world');
    expect(state.phase).toBe('playing');
  });

  it('opens the browse screen for the selected deck', () => {
    render(<SetupScreen />);
    fireEvent.click(screen.getByRole('button', { name: 'Egypt' }));
    fireEvent.click(screen.getByRole('button', { name: 'Browse timeline' }));
    const state = useGameStore.getState();
    expect(state.phase).toBe('browse');
    expect(state.deckId).toBe('egypt');
  });
});

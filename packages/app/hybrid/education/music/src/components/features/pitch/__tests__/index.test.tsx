import { act, fireEvent, render, screen } from '@testing-library/react';
import { Pitch } from '../index';

jest.mock('../useAudio', () => ({
  useAudio: () => {
    let ripple = false;
    return {
      audioRef: { current: null },
      get ripple() {
        return ripple;
      },
      playTone: () => {
        ripple = true;
      },
    };
  },
}));

jest.mock('../useGame', () => {
  const actual = jest.requireActual('../useGame');
  return actual;
});

describe('Pitch', () => {
  beforeEach(() => {
    localStorage.removeItem('pitch-high-score');
    jest.spyOn(Math, 'random').mockReturnValue(0);
  });
  afterEach(() => {
    (Math.random as jest.Mock).mockRestore();
  });

  it('renders level, score and piano keys before starting', () => {
    render(<Pitch />);
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'C' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'C#' })).toBeInTheDocument();
  });

  it('plays a tone from an idle key press without starting the game', () => {
    render(<Pitch />);
    fireEvent.click(screen.getByRole('button', { name: 'E' }));
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
  });

  it('starts the game and accepts guesses on the keyboard', () => {
    render(<Pitch />);
    fireEvent.click(screen.getByRole('button', { name: /Start/i }));
    expect(screen.getByText('Guess the note!')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'C' }));
    expect(screen.getByText('Score: 1')).toBeInTheDocument();
  });

  it('runs practice and twinkle sequences with fake timers', async () => {
    jest.useFakeTimers();
    render(<Pitch />);
    fireEvent.click(screen.getByRole('button', { name: /Practice/i }));
    await act(async () => {
      await jest.advanceTimersByTimeAsync(800);
    });
    expect(screen.getByRole('button', { name: /Twinkle/i })).toBeDisabled();
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    expect(screen.getByRole('button', { name: /Twinkle/i })).not.toBeDisabled();
    jest.useRealTimers();
  });
});

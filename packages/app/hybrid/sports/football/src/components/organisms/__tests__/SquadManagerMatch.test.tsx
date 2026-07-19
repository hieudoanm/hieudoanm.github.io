import { act, fireEvent, render, screen } from '@testing-library/react';
import { SquadManager } from '@/components/organisms/SquadManager';

describe('SquadManager matchday flow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('whistles at half time, pauses the clock, and mirrors the pitch', () => {
    render(<SquadManager />);
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));
    act(() => {
      jest.advanceTimersByTime(45 * 60 * 1000);
    });

    expect(screen.getByLabelText('Match time')).toHaveTextContent('45:00');
    expect(
      screen.getByRole('button', { name: 'Start match clock' })
    ).toBeInTheDocument();
    expect(screen.getByText('Half-time whistle')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Mirror the pitch' })
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('keeps the pitch mirrored when the second half kicks off', () => {
    render(<SquadManager />);
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));
    act(() => {
      jest.advanceTimersByTime(45 * 60 * 1000);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));

    expect(
      screen.getByRole('button', { name: 'Pause match clock' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Mirror the pitch' })
    ).toHaveAttribute('aria-pressed', 'true');
  });
});

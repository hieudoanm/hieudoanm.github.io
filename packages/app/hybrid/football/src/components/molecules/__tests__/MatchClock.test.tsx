import { fireEvent, render, screen } from '@testing-library/react';
import { MatchClock } from '@/components/molecules/MatchClock';
import { fullMatchSeconds } from '@/lib/clock';

describe('MatchClock', () => {
  it('shows the elapsed time and phase', () => {
    render(
      <MatchClock
        running={false}
        elapsed={120}
        onToggleStart={jest.fn()}
        onReset={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Match time')).toHaveTextContent('02:00');
    expect(screen.getByText('1st half')).toBeInTheDocument();
  });

  it('labels the toggle by running state', () => {
    const { rerender } = render(
      <MatchClock
        running={false}
        elapsed={0}
        onToggleStart={jest.fn()}
        onReset={jest.fn()}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Start match clock' })
    ).toBeInTheDocument();
    rerender(
      <MatchClock
        running={true}
        elapsed={0}
        onToggleStart={jest.fn()}
        onReset={jest.fn()}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Pause match clock' })
    ).toBeInTheDocument();
  });

  it('calls onToggleStart and onReset', () => {
    const onToggleStart = jest.fn();
    const onReset = jest.fn();
    render(
      <MatchClock
        running={false}
        elapsed={0}
        onToggleStart={onToggleStart}
        onReset={onReset}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));
    fireEvent.click(screen.getByRole('button', { name: 'Reset match clock' }));
    expect(onToggleStart).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('shows full time once the match length is reached', () => {
    render(
      <MatchClock
        running={false}
        elapsed={fullMatchSeconds()}
        onToggleStart={jest.fn()}
        onReset={jest.fn()}
      />
    );
    expect(screen.getByText('Full time')).toBeInTheDocument();
  });
});

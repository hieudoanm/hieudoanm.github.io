import { fireEvent, render, screen } from '@testing-library/react';
import { PlayerSection } from '../PlayerSection';

describe('PlayerSection', () => {
  it('renders track title, artist and formatted times', () => {
    render(
      <PlayerSection title="Night Drive" artist="Mono Wave" duration={240} />
    );
    expect(screen.getByTestId('track-title')).toHaveTextContent('Night Drive');
    expect(screen.getByText('Mono Wave')).toBeInTheDocument();
    expect(screen.getByTestId('elapsed')).toHaveTextContent('0:00');
    expect(screen.getByText('4:00')).toBeInTheDocument();
  });

  it('starts paused and toggles to playing on click', () => {
    render(<PlayerSection title="Night Drive" artist="Mono Wave" />);
    expect(screen.getByTestId('player-state')).toHaveTextContent('Paused');
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('play-toggle'));
    expect(screen.getByTestId('player-state')).toHaveTextContent('Playing');
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });

  it('reflects progress on the progress bar', () => {
    render(
      <PlayerSection
        title="Night Drive"
        artist="Mono Wave"
        progress={90}
        duration={180}
      />
    );
    expect(screen.getByTestId('elapsed')).toHaveTextContent('1:30');
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '90');
    expect(screen.getByRole('progressbar')).toHaveAttribute('max', '180');
  });

  it('fires onToggle with the new playing state', () => {
    const onToggle = jest.fn();
    render(
      <PlayerSection
        title="Night Drive"
        artist="Mono Wave"
        onToggle={onToggle}
      />
    );
    fireEvent.click(screen.getByTestId('play-toggle'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

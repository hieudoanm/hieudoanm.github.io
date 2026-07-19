import { fireEvent, render, screen } from '@testing-library/react';
import { NowPlayingBar } from '../NowPlayingBar';

describe('NowPlayingBar', () => {
  it('renders title, artist and progress', () => {
    render(<NowPlayingBar title="Song" artist="Artist" progress={40} />);
    expect(screen.getByText('Song')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '40');
  });

  it('toggles to playing when play button clicked', () => {
    const onToggle = jest.fn();
    render(<NowPlayingBar title="Song" artist="Artist" onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('toggles to paused when playing initially', () => {
    const onToggle = jest.fn();
    render(
      <NowPlayingBar title="Song" artist="Artist" playing onToggle={onToggle} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('calls onNext and onPrev', () => {
    const onNext = jest.fn();
    const onPrev = jest.fn();
    render(
      <NowPlayingBar
        title="Song"
        artist="Artist"
        onNext={onNext}
        onPrev={onPrev}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});

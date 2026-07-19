import { fireEvent, render, screen } from '@testing-library/react';
import { RadioStation } from '../RadioStation';

describe('RadioStation', () => {
  it('renders name and metadata', () => {
    render(
      <RadioStation
        name="Jazz FM"
        genre="Jazz"
        frequency="91.5"
        listeners={1200}
      />
    );
    expect(screen.getByText('Jazz FM')).toBeInTheDocument();
    expect(
      screen.getByText('Jazz · 91.5 · 1,200 listeners')
    ).toBeInTheDocument();
  });

  it('shows a live badge when live', () => {
    render(<RadioStation name="Jazz FM" live />);
    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });

  it('omits the live badge when not live', () => {
    render(<RadioStation name="Jazz FM" />);
    expect(screen.queryByText('LIVE')).not.toBeInTheDocument();
  });

  it('calls onTune when play clicked', () => {
    const onTune = jest.fn();
    render(<RadioStation name="Jazz FM" onTune={onTune} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tune to Jazz FM' }));
    expect(onTune).toHaveBeenCalledTimes(1);
  });
});

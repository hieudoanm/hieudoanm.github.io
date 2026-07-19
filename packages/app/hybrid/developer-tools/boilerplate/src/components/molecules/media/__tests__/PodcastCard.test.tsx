import { fireEvent, render, screen } from '@testing-library/react';
import { PodcastCard } from '../PodcastCard';

describe('PodcastCard', () => {
  it('renders title, host and episode count', () => {
    render(<PodcastCard title="Tech Talk" host="Sam" episodes={42} />);
    expect(screen.getByText('Tech Talk')).toBeInTheDocument();
    expect(screen.getByText('Sam · 42 episodes')).toBeInTheDocument();
  });

  it('omits metadata when missing', () => {
    render(<PodcastCard title="Tech Talk" />);
    expect(screen.getByText('Tech Talk')).toBeInTheDocument();
  });

  it('calls onOpen when clicked', () => {
    const onOpen = jest.fn();
    render(<PodcastCard title="Tech Talk" onOpen={onOpen} />);
    fireEvent.click(screen.getByTestId('podcast-card'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});

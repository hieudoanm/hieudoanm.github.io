import { fireEvent, render, screen } from '@testing-library/react';
import { TravelStoriesTemplate } from '../TravelStoriesTemplate';

describe('TravelStoriesTemplate', () => {
  it('renders stories with like counts', () => {
    render(<TravelStoriesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Stories' })
    ).toBeInTheDocument();
    expect(screen.getByText('Community adventures.')).toBeInTheDocument();
    expect(screen.getByText('4 stories')).toBeInTheDocument();
    expect(screen.getByText('The Long Way Home')).toBeInTheDocument();
    expect(screen.getByText('Mai Nguyen')).toBeInTheDocument();
    expect(screen.getByText('Hanoi, Vietnam')).toBeInTheDocument();
    expect(screen.getByText('128 likes')).toBeInTheDocument();
    expect(screen.getByText('96 likes')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Like' })).toHaveLength(4);
  });

  it('increments the like count on a story', () => {
    render(<TravelStoriesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Like' })[0]);
    expect(screen.getByText('129 likes')).toBeInTheDocument();
    expect(screen.getByText('96 likes')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Like' })[0]);
    expect(screen.getByText('130 likes')).toBeInTheDocument();
  });
});

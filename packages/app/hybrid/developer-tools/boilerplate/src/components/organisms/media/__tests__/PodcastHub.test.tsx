import { fireEvent, render, screen } from '@testing-library/react';
import { PodcastHub } from '../PodcastHub';

const podcasts = [
  {
    id: 'p1',
    title: 'Analog Waves',
    host: 'Rae Silva',
    episodes: 42,
    category: 'Music',
  },
  {
    id: 'p2',
    title: 'Code & Coffee',
    host: 'Dev Khoury',
    episodes: 120,
    category: 'Tech',
  },
];

describe('PodcastHub', () => {
  it('renders podcast titles, hosts and episode counts', () => {
    render(<PodcastHub podcasts={podcasts} />);
    expect(screen.getByText('Analog Waves')).toBeInTheDocument();
    expect(screen.getByText('Hosted by Rae Silva')).toBeInTheDocument();
    expect(screen.getByText('120 eps')).toBeInTheDocument();
  });

  it('uses the provided title heading', () => {
    render(<PodcastHub podcasts={podcasts} title="Shows" />);
    expect(screen.getByRole('heading', { name: 'Shows' })).toBeInTheDocument();
  });

  it('fires onOpen with the podcast id', () => {
    const onOpen = jest.fn();
    render(<PodcastHub podcasts={podcasts} onOpen={onOpen} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Open podcast' })[0]);
    expect(onOpen).toHaveBeenCalledWith('p1');
  });
});

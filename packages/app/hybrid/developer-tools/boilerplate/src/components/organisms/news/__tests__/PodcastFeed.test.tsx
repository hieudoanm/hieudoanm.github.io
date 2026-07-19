import { render, screen } from '@testing-library/react';
import { PodcastFeed } from '../PodcastFeed';

const podcasts = [
  {
    title: 'The Morning Brief',
    host: 'Alex Reyes',
    duration: '32 min',
    topic: 'News',
  },
  {
    title: 'Deep Dive',
    host: 'Nina Park',
    duration: '48 min',
    topic: 'Analysis',
  },
];

describe('PodcastFeed', () => {
  it('renders podcasts with hosts and durations', () => {
    render(<PodcastFeed podcasts={podcasts} />);
    expect(screen.getByText('The Morning Brief')).toBeInTheDocument();
    expect(screen.getByText('Hosted by Alex Reyes')).toBeInTheDocument();
    expect(screen.getByText('32 min')).toBeInTheDocument();
    expect(screen.getByText('Deep Dive')).toBeInTheDocument();
  });

  it('renders topic badges', () => {
    render(<PodcastFeed podcasts={podcasts} />);
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('Analysis')).toBeInTheDocument();
  });

  it('renders play buttons with accessible labels', () => {
    render(<PodcastFeed podcasts={podcasts} />);
    expect(
      screen.getByRole('button', { name: 'Play The Morning Brief' })
    ).toBeInTheDocument();
  });

  it('handles an empty podcasts list', () => {
    render(<PodcastFeed podcasts={[]} />);
    expect(screen.getByTestId('podcast-feed')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});

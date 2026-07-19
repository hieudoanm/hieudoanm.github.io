import { render, screen } from '@testing-library/react';
import { TopStories } from '../TopStories';

const stories = [
  {
    title: 'Markets rally today',
    category: 'Business',
    imageAlt: 'Trading floor',
  },
  {
    title: 'City council votes',
    category: 'Local',
    imageAlt: 'Council chamber',
  },
  {
    title: 'New tech unveiled',
    category: 'Technology',
    imageAlt: 'Keynote stage',
  },
];

describe('TopStories', () => {
  it('renders the hero story and smaller stories', () => {
    render(<TopStories stories={stories} />);
    expect(screen.getByText('Markets rally today')).toBeInTheDocument();
    expect(screen.getByText('City council votes')).toBeInTheDocument();
    expect(screen.getByText('New tech unveiled')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<TopStories stories={stories} title="Headlines" />);
    expect(screen.getByText('Headlines')).toBeInTheDocument();
  });

  it('marks the first story as the hero card', () => {
    render(<TopStories stories={stories} />);
    expect(screen.getByText('Markets rally today')).toHaveClass('text-2xl');
  });

  it('renders an empty state when no stories are provided', () => {
    render(<TopStories stories={[]} />);
    expect(screen.getByTestId('top-stories')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

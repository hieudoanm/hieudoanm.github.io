import { render, screen } from '@testing-library/react';
import { FeaturedStory } from '../FeaturedStory';

describe('FeaturedStory', () => {
  it('renders title and optional fields', () => {
    render(
      <FeaturedStory
        title="The future of web"
        excerpt="A deep dive."
        author="Jane Doe"
        date="Jan 2026"
        category="Tech"
        readTime="5 min"
      />
    );
    expect(screen.getByText('The future of web')).toBeInTheDocument();
    expect(screen.getByText('A deep dive.')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Jan 2026')).toBeInTheDocument();
    expect(screen.getByText('5 min')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
  });

  it('renders without optional fields', () => {
    render(<FeaturedStory title="Solo" />);
    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(screen.queryByText('Tech')).not.toBeInTheDocument();
  });

  it('renders the story card container', () => {
    render(<FeaturedStory title="Card" />);
    expect(screen.getByTestId('featured-story')).toHaveClass('card');
  });
});

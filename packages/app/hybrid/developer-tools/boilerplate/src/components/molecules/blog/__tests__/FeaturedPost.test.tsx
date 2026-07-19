import { render, screen } from '@testing-library/react';
import { FeaturedPost } from '../FeaturedPost';

describe('FeaturedPost', () => {
  it('renders title, excerpt, author and read time', () => {
    render(
      <FeaturedPost
        title="The Featured Story"
        excerpt="A long excerpt here."
        author="Jane Doe"
        readTime="8 min read"
      />
    );
    expect(screen.getByText('The Featured Story')).toBeInTheDocument();
    expect(screen.getByText('A long excerpt here.')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText(/8 min read/)).toBeInTheDocument();
  });

  it('renders the category badge and read article link', () => {
    render(
      <FeaturedPost
        title="T"
        excerpt="E"
        author="A"
        readTime="R"
        category="News"
        href="/posts/featured"
      />
    );
    expect(screen.getByText('News')).toHaveClass('badge-accent');
    expect(screen.getByRole('link', { name: 'Read article' })).toHaveAttribute(
      'href',
      '/posts/featured'
    );
  });
});

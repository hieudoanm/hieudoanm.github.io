import { render, screen } from '@testing-library/react';
import { PostView } from '../PostView';

const makePost = (slug: string, title: string) => ({
  slug,
  title,
  description: `${title} description`,
  source: `# ${title}\n\n> ${title} blurb\n\nBody paragraph.`,
});

describe('PostView', () => {
  it('renders the header, post content and navigation', () => {
    render(
      <PostView
        post={makePost('northwind', 'Northwind')}
        prev={makePost('sakila', 'Sakila')}
        next={makePost('chinook', 'Chinook')}
      />
    );
    expect(screen.getByText('Schema Library')).toBeInTheDocument();
    expect(screen.getByText('All schemas')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Northwind' })
    ).toBeInTheDocument();
    expect(screen.getByText('Northwind blurb')).toBeInTheDocument();
    expect(screen.getByText('Body paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Sakila')).toBeInTheDocument();
    expect(screen.getByText('Chinook')).toBeInTheDocument();
  });

  it('omits navigation links when prev or next is null', () => {
    render(
      <PostView post={makePost('northwind', 'Northwind')} prev={null} next={null} />
    );
    expect(screen.getByText('Northwind')).toBeInTheDocument();
  });
});

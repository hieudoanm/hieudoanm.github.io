import { render, screen } from '@testing-library/react';
import { PostHeader } from '../PostHeader';

describe('PostHeader', () => {
  it('renders title, author, date and read time', () => {
    render(
      <PostHeader
        title="Why TypeScript Rocks"
        author="Jane Doe"
        date="Aug 1, 2026"
        readTime="5 min read"
      />
    );
    expect(screen.getByText('Why TypeScript Rocks')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Aug 1, 2026')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders the category badge when provided', () => {
    render(
      <PostHeader
        title="T"
        author="A"
        date="D"
        readTime="R"
        category="Engineering"
      />
    );
    expect(screen.getByText('Engineering')).toHaveClass('badge-secondary');
  });
});

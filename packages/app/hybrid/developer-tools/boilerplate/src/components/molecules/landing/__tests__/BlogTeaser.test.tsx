import { render, screen } from '@testing-library/react';
import { BlogTeaser } from '../BlogTeaser';

const post = {
  title: 'Introducing v2',
  excerpt: 'A major rewrite with a new engine.',
  date: 'Aug 1',
  author: 'Jane Doe',
  tags: ['release', 'frontend'],
  readTime: '5 min',
};

describe('BlogTeaser', () => {
  it('renders title, excerpt, and metadata', () => {
    render(<BlogTeaser {...post} />);
    expect(screen.getByText('Introducing v2')).toBeInTheDocument();
    expect(
      screen.getByText('A major rewrite with a new engine.')
    ).toBeInTheDocument();
    expect(screen.getByText('Aug 1')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<BlogTeaser {...post} />);
    expect(screen.getByText('#release')).toBeInTheDocument();
    expect(screen.getByText('#frontend')).toBeInTheDocument();
  });

  it('hides excerpt, tags, and read time when omitted', () => {
    render(
      <BlogTeaser
        {...post}
        excerpt={undefined}
        tags={[]}
        readTime={undefined}
      />
    );
    expect(
      screen.queryByText('A major rewrite with a new engine.')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('#release')).not.toBeInTheDocument();
    expect(screen.queryByText('5 min read')).not.toBeInTheDocument();
  });
});

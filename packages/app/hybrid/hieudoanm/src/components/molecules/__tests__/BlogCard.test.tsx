import { render, screen } from '@testing-library/react';
import { BlogCard } from '../BlogCard';

const mockPost = {
  slug: 'hello-world',
  title: 'Hello World',
  description: 'A test post description.',
  content: 'Full content here.',
  date: '2024-01-15',
  author: 'Jane Doe',
  tags: ['react', 'typescript'],
  readingTime: 5,
};

describe('BlogCard', () => {
  it('to match snapshot', () => {
    const { container } = render(<BlogCard post={mockPost} />);
    expect(container).toMatchSnapshot();
  });

  it('renders post title', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders post description', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('A test post description.')).toBeInTheDocument();
  });

  it('renders reading time', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('links to the post slug', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/blog/hello-world'
    );
  });

  it('renders cover image when provided', () => {
    const postWithImage = { ...mockPost, coverImage: '/cover.jpg' };
    render(<BlogCard post={postWithImage} />);
    expect(screen.getByAltText('Hello World')).toBeInTheDocument();
  });
});

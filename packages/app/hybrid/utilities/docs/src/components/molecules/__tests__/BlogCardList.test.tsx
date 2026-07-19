import { render, screen } from '@testing-library/react';
import { BlogCardList } from '../BlogCardList';

const mockPosts = [
  {
    slug: 'first',
    title: 'First Post',
    description: 'First description.',
    content: 'Content',
    date: '2024-01-01',
    author: 'Author',
    tags: ['react'],
  },
  {
    slug: 'second',
    title: 'Second Post',
    description: 'Second description.',
    content: 'Content',
    date: '2024-02-01',
    author: 'Author',
    tags: ['typescript'],
  },
];

describe('BlogCardList', () => {
  it('to match snapshot', () => {
    const { container } = render(<BlogCardList posts={mockPosts} />);
    expect(container).toMatchSnapshot();
  });

  it('renders all posts', () => {
    render(<BlogCardList posts={mockPosts} />);
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    const { container } = render(<BlogCardList posts={mockPosts} />);
    const links = container.querySelectorAll('a');
    expect(links.length).toBe(2);
  });
});

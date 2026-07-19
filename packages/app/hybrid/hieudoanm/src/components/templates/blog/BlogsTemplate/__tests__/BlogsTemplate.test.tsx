import { fireEvent, render, screen, within } from '@testing-library/react';
import { BlogsTemplate } from '../BlogsTemplate';

const mockPosts = [
  {
    slug: 'post-1',
    title: 'Post One',
    description: 'Description one.',
    content: 'Content',
    date: '2024-01-15',
    author: 'Jane Doe',
    tags: ['react'],
    readingTime: 5,
  },
  {
    slug: 'post-2',
    title: 'Post Two',
    description: 'Description two.',
    content: 'Content',
    date: '2024-02-01',
    author: 'John Smith',
    tags: ['typescript'],
    readingTime: 3,
  },
  {
    slug: 'post-3',
    title: 'Post Three',
    description: 'Description three.',
    content: 'Content',
    date: '2024-03-10',
    author: 'Jane Doe',
    tags: ['react', 'typescript'],
    readingTime: 7,
  },
];

const mockMeta = {
  totalPosts: 3,
  tags: [
    { name: 'react', count: 2 },
    { name: 'typescript', count: 2 },
  ],
  recentPosts: [
    { slug: 'post-3', title: 'Post Three', date: '2024-03-10' },
    { slug: 'post-2', title: 'Post Two', date: '2024-02-01' },
    { slug: 'post-1', title: 'Post One', date: '2024-01-15' },
  ],
};

describe('BlogsTemplate', () => {
  const getMainContent = () => {
    const cardsContainer = document.querySelector('.min-w-0') as HTMLElement;
    return within(cardsContainer);
  };

  const getSidebar = () => screen.getByText('Tags').closest('aside')!;

  it('to match snapshot', () => {
    const { container } = render(
      <BlogsTemplate posts={mockPosts} meta={mockMeta} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders all posts', () => {
    render(<BlogsTemplate posts={mockPosts} meta={mockMeta} />);
    const content = getMainContent();
    expect(content.getByText('Post One')).toBeInTheDocument();
    expect(content.getByText('Post Two')).toBeInTheDocument();
    expect(content.getByText('Post Three')).toBeInTheDocument();
  });

  it('filters posts by tag when tag is clicked', () => {
    render(<BlogsTemplate posts={mockPosts} meta={mockMeta} />);
    const content = getMainContent();
    const sidebar = getSidebar();
    fireEvent.click(within(sidebar).getByText('react'));
    expect(content.getByText('Post One')).toBeInTheDocument();
    expect(content.getByText('Post Three')).toBeInTheDocument();
    expect(content.queryByText('Post Two')).not.toBeInTheDocument();
  });

  it('shows empty state when filter yields no results', () => {
    const emptyMeta = {
      totalPosts: 0,
      tags: [{ name: 'unused', count: 0 }],
      recentPosts: [],
    };
    render(<BlogsTemplate posts={[]} meta={emptyMeta} />);
    expect(screen.getByText('No posts found')).toBeInTheDocument();
  });

  it('clears filter when clear button is clicked', () => {
    render(<BlogsTemplate posts={mockPosts} meta={mockMeta} />);
    const content = getMainContent();
    const sidebar = getSidebar();
    fireEvent.click(within(sidebar).getByText('react'));
    expect(content.queryByText('Post Two')).not.toBeInTheDocument();
    fireEvent.click(content.getByText('Clear'));
    expect(content.getByText('Post Two')).toBeInTheDocument();
  });
});

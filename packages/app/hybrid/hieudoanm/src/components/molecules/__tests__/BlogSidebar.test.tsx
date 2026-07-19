import { fireEvent, render, screen } from '@testing-library/react';
import { BlogSidebar } from '../BlogSidebar';

const mockMeta = {
  totalPosts: 5,
  tags: [
    { name: 'react', count: 3 },
    { name: 'typescript', count: 2 },
  ],
  recentPosts: [
    { slug: 'post-1', title: 'Post One', date: '2024-01-15' },
    { slug: 'post-2', title: 'Post Two', date: '2024-02-01' },
  ],
};

describe('BlogSidebar', () => {
  it('to match snapshot', () => {
    const { container } = render(<BlogSidebar meta={mockMeta} />);
    expect(container).toMatchSnapshot();
  });

  it('renders tags', () => {
    render(<BlogSidebar meta={mockMeta} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('renders recent posts', () => {
    render(<BlogSidebar meta={mockMeta} />);
    expect(screen.getByText('Post One')).toBeInTheDocument();
    expect(screen.getByText('Post Two')).toBeInTheDocument();
  });

  it('calls onTagClick when tag is clicked', () => {
    const onTagClick = jest.fn();
    render(<BlogSidebar meta={mockMeta} onTagClick={onTagClick} />);
    fireEvent.click(screen.getByText('react'));
    expect(onTagClick).toHaveBeenCalledWith('react');
  });

  it('highlights active tag', () => {
    const { container } = render(
      <BlogSidebar meta={mockMeta} activeTag="react" onTagClick={() => {}} />
    );
    const activeBadge = container.querySelector('.badge-primary');
    expect(activeBadge).toBeInTheDocument();
    expect(activeBadge).toHaveTextContent('react');
  });
});

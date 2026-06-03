import { render, screen } from '@solidjs/testing-library';
import { BlogCardList } from '../BlogCardList';
import type { BlogPost } from '../../../data/blog';

vi.mock('@solidjs/router', () => ({
  A: (props: any) => <a href={props.href}>{props.children}</a>,
}));

const posts: BlogPost[] = [
  {
    slug: 'post-1',
    title: 'First Post',
    description: 'First description',
    content: 'Content 1',
    date: '2026-05-15',
    author: 'Author 1',
    tags: ['Solid'],
  },
  {
    slug: 'post-2',
    title: 'Second Post',
    description: 'Second description',
    content: 'Content 2',
    date: '2026-05-10',
    author: 'Author 2',
    tags: ['JS'],
  },
];

describe('BlogCardList', () => {
  it('renders all posts', () => {
    render(() => <BlogCardList posts={posts} />);
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  it('renders empty list when no posts', () => {
    const { container } = render(() => <BlogCardList posts={[]} />);
    expect(container.innerHTML).toContain('grid');
  });
});

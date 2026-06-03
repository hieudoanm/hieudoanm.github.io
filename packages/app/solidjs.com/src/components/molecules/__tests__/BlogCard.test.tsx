import { render, screen } from '@solidjs/testing-library';
import { BlogCard } from '../BlogCard';
import type { BlogPost } from '../../../data/blog';

vi.mock('@solidjs/router', () => ({
  A: (props: any) => <a href={props.href}>{props.children}</a>,
}));

const post: BlogPost = {
  slug: 'test-post',
  title: 'Test Blog Post',
  description: 'A test description for the blog card.',
  content: '# Full content',
  date: '2026-05-15',
  author: 'Test Author',
  tags: ['Solid', 'Testing'],
  readingTime: 5,
};

describe('BlogCard', () => {
  it('renders the post title as a link', () => {
    render(() => <BlogCard post={post} />);
    const link = screen.getByText('Test Blog Post');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/blog/test-post');
  });

  it('renders the post description', () => {
    render(() => <BlogCard post={post} />);
    expect(
      screen.getByText('A test description for the blog card.')
    ).toBeInTheDocument();
  });

  it('renders reading time', () => {
    render(() => <BlogCard post={post} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(() => <BlogCard post={post} />);
    expect(screen.getByText('Solid')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('renders the date via BlogDate', () => {
    render(() => <BlogCard post={post} />);
    expect(screen.getByText('May 15, 2026')).toBeInTheDocument();
  });

  it('renders cover image when provided', () => {
    const postWithImage = { ...post, coverImage: '/cover.jpg' };
    render(() => <BlogCard post={postWithImage} />);
    const img = screen.getByAltText('Test Blog Post');
    expect(img).toHaveAttribute('src', '/cover.jpg');
  });

  it('does not render image container when no coverImage', () => {
    render(() => <BlogCard post={post} />);
    expect(screen.queryByAltText('Test Blog Post')).not.toBeInTheDocument();
  });
});

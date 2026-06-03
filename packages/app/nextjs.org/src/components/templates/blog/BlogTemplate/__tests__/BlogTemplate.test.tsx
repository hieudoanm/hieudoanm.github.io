import { render, screen, within } from '@testing-library/react';
import { BlogTemplate } from '../BlogTemplate';

const mockPost = {
  slug: 'hello-world',
  title: 'Hello World',
  description: 'A test post description.',
  content: 'Full article content goes here.',
  date: '2024-01-15',
  author: 'Jane Doe',
  tags: ['react', 'typescript'],
  readingTime: 5,
  coverImage: '/cover.jpg',
};

const mockMeta = {
  totalPosts: 3,
  tags: [
    { name: 'react', count: 2 },
    { name: 'typescript', count: 2 },
  ],
  recentPosts: [
    { slug: 'hello-world', title: 'Hello World', date: '2024-01-15' },
    { slug: 'post-2', title: 'Post Two', date: '2024-02-01' },
    { slug: 'post-3', title: 'Post Three', date: '2024-03-10' },
  ],
};

describe('BlogTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <BlogTemplate post={mockPost} meta={mockMeta} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders post title', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    expect(
      screen.getByRole('heading', { name: /hello world/i })
    ).toBeInTheDocument();
  });

  it('renders post description', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    expect(screen.getByText('A test post description.')).toBeInTheDocument();
  });

  it('renders post content', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    expect(
      screen.getByText('Full article content goes here.')
    ).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    const allReact = screen.getAllByText('react');
    const allTypescript = screen.getAllByText('typescript');
    expect(allReact.length).toBeGreaterThanOrEqual(1);
    expect(allTypescript.length).toBeGreaterThanOrEqual(1);
  });

  it('renders reading time', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders back link', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    expect(screen.getByText(/back to blog/i)).toBeInTheDocument();
  });

  it('renders cover image when provided', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    expect(screen.getByAltText('Hello World')).toBeInTheDocument();
  });

  it('renders recent posts in continue reading section', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    const continueReading = screen
      .getByText('Continue reading')
      .closest('div')!;
    expect(within(continueReading).getByText('Post Two')).toBeInTheDocument();
    expect(within(continueReading).getByText('Post Three')).toBeInTheDocument();
  });

  it('excludes current post from continue reading', () => {
    render(<BlogTemplate post={mockPost} meta={mockMeta} />);
    const continueReading = screen
      .getByText('Continue reading')
      .closest('div')!;
    const links = within(continueReading).getAllByText(/Post (Two|Three)/);
    expect(links.length).toBe(2);
    expect(
      within(continueReading).queryByText('Hello World')
    ).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import PostPage, {
  generateMetadata,
  generateStaticParams,
} from '@/app/posts/[slug]/page';
import { PostView } from '@/components/templates/PostView';
import { getPostBySlug, posts } from '@/posts';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

describe('PostPage', () => {
  it('generates static params for every post', () => {
    const params = generateStaticParams();
    expect(params).toContainEqual({ slug: 'northwind' });
    expect(params).toHaveLength(10);
  });

  it('generates metadata for a known slug', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'northwind' }),
    });
    expect(meta).toMatchObject({
      title: expect.stringContaining('Schema Library'),
    });
  });

  it('rejects (calls notFound) for an unknown slug', async () => {
    await expect(
      PostPage({ params: Promise.resolve({ slug: 'missing' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });

  it('renders the post body via PostView', () => {
    const post = getPostBySlug('northwind')!;
    const idx = posts.findIndex((p) => p.slug === post.slug);
    render(
      <PostView
        post={post}
        prev={idx > 0 ? posts[idx - 1] : null}
        next={idx < posts.length - 1 ? posts[idx + 1] : null}
      />
    );
    expect(
      screen.getByRole('heading', { level: 1, name: 'Northwind Traders' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The classic Microsoft sample database/)
    ).toBeInTheDocument();
  });

  it('links to adjacent posts', () => {
    const post = getPostBySlug('northwind')!;
    const next = posts.find((p) => p.slug === 'sakila')!;
    render(<PostView post={post} prev={null} next={next} />);
    expect(
      screen.getByRole('link', { name: 'Sakila — DVD Rental Store' })
    ).toHaveAttribute('href', '/posts/sakila');
    expect(screen.getByRole('link', { name: 'All schemas' })).toHaveAttribute(
      'href',
      '/posts'
    );
  });
});

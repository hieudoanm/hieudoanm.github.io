import { render, screen } from '@testing-library/react';
import PostPage, {
  generateMetadata,
  generateStaticParams,
} from '@/app/posts/[slug]/page';
import PostPageView from '@/components/posts/PostPageView';
import { getPost, listPosts } from '@/lib/posts';
import type { Post } from '@/lib/posts';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('@/lib/posts', () => ({
  getPost: jest.fn(),
  listPosts: jest.fn(),
}));

jest.mock('@/components/posts/PostDiagram', () => ({
  __esModule: true,
  default: () => <div>mock-post-diagram</div>,
}));

const mockGetPost = getPost as jest.MockedFunction<typeof getPost>;
const mockListPosts = listPosts as jest.MockedFunction<typeof listPosts>;

const post: Post = {
  slug: 'uber',
  title: 'Uber — Ride Hailing',
  description: 'Ride matching and dispatch.',
  difficulty: 'easy',
  category: 'travel',
  author: 'Hieu Doan',
  tags: ['matching', 'payments'],
  questions: ['Design Uber ride matching'],
  answers: [],
  diagramText: 'title: Uber Ride Hailing',
};

describe('generateStaticParams', () => {
  it('returns a param per post', () => {
    mockListPosts.mockReturnValue([{ ...post }, { ...post, slug: 'amazon' }]);
    expect(generateStaticParams()).toEqual([
      { slug: 'uber' },
      { slug: 'amazon' },
    ]);
  });
});

describe('generateMetadata', () => {
  it('builds metadata for an existing post', async () => {
    mockGetPost.mockReturnValue(post);
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'uber' }),
    });
    expect(metadata.title).toBe('Uber — Ride Hailing — Diagram Examples');
    expect(metadata.description).toBe('Ride matching and dispatch.');
  });

  it('returns empty metadata for a missing post', async () => {
    mockGetPost.mockReturnValue(undefined);
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'nope' }),
    });
    expect(metadata).toEqual({});
  });
});

describe('PostPage', () => {
  it('renders the post view for a known slug', async () => {
    mockGetPost.mockReturnValue(post);
    const element = await PostPage({
      params: Promise.resolve({ slug: 'uber' }),
    });
    render(element as React.ReactElement);
    expect(
      screen.getByRole('heading', { name: 'Uber — Ride Hailing' })
    ).toBeInTheDocument();
    expect(screen.getByText('mock-post-diagram')).toBeInTheDocument();
  });

  it('throws not-found for an unknown slug', async () => {
    mockGetPost.mockReturnValue(undefined);
    await expect(
      PostPage({ params: Promise.resolve({ slug: 'nope' }) })
    ).rejects.toThrow();
  });
});

describe('PostPageView', () => {
  it('links back to the posts index', () => {
    render(<PostPageView post={post} />);
    expect(
      screen.getByRole('link', { name: /All posts/ }).getAttribute('href')
    ).toBe('/posts/');
  });

  it('omits the diagram when the post has no source', () => {
    render(<PostPageView post={{ ...post, diagramText: '' }} />);
    expect(screen.queryByText('mock-post-diagram')).not.toBeInTheDocument();
  });
});

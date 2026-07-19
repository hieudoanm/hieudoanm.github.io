import { render, screen } from '@testing-library/react';
import PostsPage from '@/app/posts/page';
import { listPostSummaries } from '@/lib/posts';

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
  listPostSummaries: jest.fn(),
}));

const mockListPostSummaries = listPostSummaries as jest.MockedFunction<
  typeof listPostSummaries
>;

describe('PostsPage', () => {
  it('renders a count and a link per post', () => {
    mockListPostSummaries.mockReturnValue([
      {
        slug: 'uber',
        title: 'Uber — Ride Hailing',
        description: 'Ride matching and dispatch.',
        difficulty: 'easy',
        category: 'travel',
        tags: ['matching'],
      },
      {
        slug: 'amazon',
        title: 'Amazon — Checkout',
        description: 'Cart, inventory, orders.',
        difficulty: 'medium',
        category: 'ecommerce',
        tags: ['payments'],
      },
    ]);

    render(<PostsPage />);

    expect(screen.getByRole('heading', { name: 'Posts' })).toBeInTheDocument();
    expect(
      screen.getByText(/2 system-design interview examples/)
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Uber — Ride Hailing/ });
    expect(link.getAttribute('href')).toBe('/posts/uber/');
    expect(screen.getByText('Ride matching and dispatch.')).toBeInTheDocument();
    expect(
      screen
        .getByRole('link', { name: /Amazon — Checkout/ })
        .getAttribute('href')
    ).toBe('/posts/amazon/');
  });

  it('renders a link back to the editor', () => {
    mockListPostSummaries.mockReturnValue([]);
    render(<PostsPage />);
    expect(
      screen.getByRole('link', { name: /Open the editor/ }).getAttribute('href')
    ).toBe('/');
  });
});

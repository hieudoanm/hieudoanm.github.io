import { render, screen } from '@testing-library/react';
import PostsPage from '@/app/posts/page';

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

describe('PostsPage', () => {
  it('renders the page header', () => {
    render(<PostsPage />);
    expect(screen.getByText('Schema Library')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders a card link for every post slug', () => {
    render(<PostsPage />);
    const links = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href')?.startsWith('/posts/'));
    expect(links).toHaveLength(10);
    const expected: Record<string, string> = {
      northwind: 'Northwind Traders',
      sakila: 'Sakila — DVD Rental Store',
      classicmodels: 'ClassicModels — B2B Retail Store',
      chinook: 'Chinook — Digital Media Store',
      hr: 'Oracle HR — Human Resources',
      'e-commerce': 'E-Commerce Platform',
      'social-media': 'Social Media Platform',
      'music-streaming': 'Music Streaming Service',
      'blog-cms': 'Blog / CMS Platform',
      'project-management': 'Project Management (Kanban)',
    };
    for (const [slug, title] of Object.entries(expected)) {
      const link = links.find(
        (l) => l.getAttribute('href') === `/posts/${slug}`
      );
      expect(link).toBeDefined();
      expect(link).toHaveTextContent(title);
    }
  });
});

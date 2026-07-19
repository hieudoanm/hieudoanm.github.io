import { render, screen } from '@testing-library/react';

jest.mock('@/lib/hooks', () => ({
  useFavorites: () => ({
    favorites: [],
    toggleFavorite: jest.fn(),
    isFavorite: () => false,
  }),
  useRecentlyViewed: () => ({
    slugs: [],
    addRecent: jest.fn(),
  }),
}));

const mockUseParams = jest.fn();
jest.mock('next/navigation', () => ({
  useParams: () => mockUseParams(),
  usePathname: () => '/',
}));

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});

import { AppPage } from '../AppPage';

describe('AppPage', () => {
  it('renders app detail for valid slug', () => {
    mockUseParams.mockReturnValue({ slug: 'chess' });
    render(<AppPage />);
    expect(screen.getByText('Chess')).toBeTruthy();
  });

  it('renders not found for invalid slug', () => {
    mockUseParams.mockReturnValue({ slug: 'nonexistent-app' });
    render(<AppPage />);
    expect(screen.getByText('App not found')).toBeTruthy();
  });

  it('renders Back to Store link when not found', () => {
    mockUseParams.mockReturnValue({ slug: 'nonexistent-app' });
    render(<AppPage />);
    expect(screen.getByText('Back to Store')).toBeTruthy();
  });
});

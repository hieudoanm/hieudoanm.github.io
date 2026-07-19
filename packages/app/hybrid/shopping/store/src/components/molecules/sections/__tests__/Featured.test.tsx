import { render, screen } from '@testing-library/react';
import { Featured } from '../Featured';
import type { AppData } from '@/lib/downloads';

const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn(() => false);

jest.mock('@/lib/hooks', () => ({
  useFavorites: () => ({
    favorites: [],
    toggleFavorite: mockToggleFavorite,
    isFavorite: mockIsFavorite,
  }),
}));

jest.mock('next/navigation', () => ({
  useParams: () => ({ slug: 'chess' }),
  usePathname: () => '/',
}));

const makeApp = (slug: string): AppData => ({
  slug,
  label: slug === 'chess' ? 'Chess' : 'Clock',
  primaryCategory: 'Games',
  secondaryCategory: 'Board',
  section: 'hybrid',
  icon: 'PiPackage',
  href: `/app/${slug}/`,
  platforms: ['macos'],
  downloads: [
    { platform: 'macos', label: '.dmg', url: 'https://example.com/a.dmg' },
  ],
  version: '1.0.0',
  lastUpdated: '2024-01-01',
  fileSize: '',
  screenshots: [],
});

describe('Featured', () => {
  it('returns nothing for no apps', () => {
    render(<Featured apps={[]} platform="macos" />);
    expect(screen.queryByText('Featured')).toBeNull();
  });

  it('renders the section heading', () => {
    render(<Featured apps={[makeApp('chess')]} platform="macos" />);
    expect(screen.getByText('Featured')).toBeTruthy();
  });

  it('renders a card per app', () => {
    render(
      <Featured apps={[makeApp('chess'), makeApp('clock')]} platform="macos" />
    );
    expect(screen.getByText('Chess')).toBeTruthy();
    expect(screen.getByText('Clock')).toBeTruthy();
  });

  it('renders recommended download buttons', () => {
    render(<Featured apps={[makeApp('chess')]} platform="macos" />);
    expect(screen.getAllByText('.dmg').length).toBeGreaterThan(0);
  });
});

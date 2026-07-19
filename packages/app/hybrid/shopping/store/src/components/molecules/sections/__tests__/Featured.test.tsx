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
    render(
      <Featured
        apps={[]}
        platform="macos"
        viewMode="grid"
        isFavorite={() => false}
      />
    );
    expect(screen.queryByText('Featured')).toBeNull();
  });

  it('renders the section heading', () => {
    render(
      <Featured
        apps={[makeApp('chess')]}
        platform="macos"
        viewMode="grid"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('Featured')).toBeTruthy();
  });

  it('renders a card per app in grid view', () => {
    render(
      <Featured
        apps={[makeApp('chess'), makeApp('clock')]}
        platform="macos"
        viewMode="grid"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('Chess')).toBeTruthy();
    expect(screen.getByText('Clock')).toBeTruthy();
  });

  it('renders recommended download buttons in grid view', () => {
    render(
      <Featured
        apps={[makeApp('chess')]}
        platform="macos"
        viewMode="grid"
        isFavorite={() => false}
      />
    );
    expect(screen.getAllByText('.dmg').length).toBeGreaterThan(0);
  });

  it('renders gallery view with home screenshots', () => {
    render(
      <Featured
        apps={[makeApp('chess')]}
        platform="macos"
        viewMode="gallery"
        isFavorite={() => false}
      />
    );
    const img = screen.getByAltText('Chess home screenshot');
    expect(img).toBeTruthy();
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('/screenshots/chess/home.png')
    );
    expect(screen.getByRole('link', { name: /Chess/ })).toHaveAttribute(
      'href',
      expect.stringContaining('/app/chess')
    );
  });

  it('renders list view', () => {
    render(
      <Featured
        apps={[makeApp('chess')]}
        platform="macos"
        viewMode="list"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('Chess')).toBeTruthy();
    expect(screen.queryByAltText('Chess home screenshot')).toBeNull();
  });

  it('shows filled heart for favorites in list view', () => {
    render(
      <Featured
        apps={[makeApp('chess')]}
        platform="macos"
        viewMode="list"
        isFavorite={() => true}
      />
    );
    expect(screen.getByText('\u2665')).toBeTruthy();
  });
});

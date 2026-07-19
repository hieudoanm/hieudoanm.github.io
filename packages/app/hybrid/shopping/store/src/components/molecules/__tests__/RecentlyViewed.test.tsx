import { render, screen } from '@testing-library/react';
import { RecentlyViewed } from '../RecentlyViewed';
import type { AppData } from '@/lib/downloads';

const makeApp = (slug: string): AppData => ({
  slug,
  label: 'Chess',
  primaryCategory: 'Games',
  secondaryCategory: 'Board',
  section: 'hybrid',
  icon: 'PiPackage',
  href: `/app/${slug}/`,
  platforms: ['macos'],
  downloads: [],
  version: '1.0.0',
  lastUpdated: '2024-01-01',
  fileSize: '',
  screenshots: [],
});

describe('RecentlyViewed', () => {
  it('returns nothing for no apps', () => {
    render(
      <RecentlyViewed apps={[]} viewMode="grid" isFavorite={() => false} />
    );
    expect(screen.queryByText('Recently Viewed')).toBeNull();
  });

  it('renders the heading and app in grid view', () => {
    render(
      <RecentlyViewed
        apps={[makeApp('chess')]}
        viewMode="grid"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('Recently Viewed')).toBeTruthy();
    expect(screen.getByText('Chess')).toBeTruthy();
  });

  it('renders gallery view with home screenshots', () => {
    render(
      <RecentlyViewed
        apps={[makeApp('chess')]}
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
      <RecentlyViewed
        apps={[makeApp('chess')]}
        viewMode="list"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('Chess')).toBeTruthy();
    expect(screen.getByText('Games')).toBeTruthy();
  });

  it('shows filled heart for favorites in list view', () => {
    render(
      <RecentlyViewed
        apps={[makeApp('chess')]}
        viewMode="list"
        isFavorite={() => true}
      />
    );
    expect(screen.getByText('\u2665')).toBeTruthy();
  });
});

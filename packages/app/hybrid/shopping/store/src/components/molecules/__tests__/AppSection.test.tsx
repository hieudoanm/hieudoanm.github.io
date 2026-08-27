import { render, screen, fireEvent } from '@testing-library/react';
import { AppSection } from '../AppSection';
import type { AppData } from '@/lib/downloads';

const mockApps: AppData[] = [
  {
    slug: 'test',
    label: 'Test App',
    primaryCategory: 'Utilities',
    secondaryCategory: 'Tools',
    section: 'hybrid',
    icon: 'PiPackage',
    href: '/app/test/',
    platforms: ['macos'],
    downloads: [],
    version: '1.0.0',
    lastUpdated: '2024-01-01',
    fileSize: '10 MB',
    screenshots: [],
  },
];

describe('AppSection', () => {
  it('renders section label', () => {
    render(
      <AppSection
        sectionKey="hybrid"
        apps={mockApps}
        platform="macos"
        viewMode="grid"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('Hybrid')).toBeTruthy();
  });

  it('renders grid view', () => {
    render(
      <AppSection
        sectionKey="hybrid"
        apps={mockApps}
        platform="macos"
        viewMode="grid"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('Test App')).toBeTruthy();
  });

  it('renders list view', () => {
    render(
      <AppSection
        sectionKey="hybrid"
        apps={mockApps}
        platform="macos"
        viewMode="list"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('Test App')).toBeTruthy();
  });

  it('shows heart for favorites in list view', () => {
    render(
      <AppSection
        sectionKey="hybrid"
        apps={mockApps}
        platform="macos"
        viewMode="list"
        isFavorite={() => true}
      />
    );
    expect(screen.getByText('\u2665')).toBeTruthy();
  });

  it('shows empty heart for non-favorites in list view', () => {
    render(
      <AppSection
        sectionKey="hybrid"
        apps={mockApps}
        platform="macos"
        viewMode="list"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('\u2661')).toBeTruthy();
  });

  it('renders fallback label for unknown section', () => {
    render(
      <AppSection
        sectionKey="unknown-section"
        apps={mockApps}
        platform="macos"
        viewMode="grid"
        isFavorite={() => false}
      />
    );
    expect(screen.getByText('unknown-section')).toBeTruthy();
  });
});

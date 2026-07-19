import { render, screen } from '@testing-library/react';
import { SystemRequirements } from '../SystemRequirements';
import type { AppData } from '@/lib/downloads';

const mockApp: AppData = {
  slug: 'chess',
  label: 'Chess',
  primaryCategory: 'Games',
  secondaryCategory: 'Board',
  section: 'hybrid',
  icon: 'PiPackage',
  href: '/app/chess/',
  platforms: ['macos', 'android'],
  downloads: [],
  version: '1.0.0',
  lastUpdated: '2024-01-01',
  fileSize: '10 MB',
  screenshots: [],
};

describe('SystemRequirements', () => {
  it('renders the heading', () => {
    render(<SystemRequirements app={mockApp} />);
    expect(screen.getByText('System Requirements')).toBeTruthy();
  });

  it('renders a row per platform', () => {
    render(<SystemRequirements app={mockApp} />);
    expect(screen.getByText('macOS')).toBeTruthy();
    expect(screen.getByText('Android')).toBeTruthy();
  });

  it('renders derived requirement values', () => {
    render(<SystemRequirements app={mockApp} />);
    expect(screen.getAllByText('10 MB free').length).toBeGreaterThan(0);
    expect(screen.getByText('macOS 12 or later')).toBeTruthy();
  });
});

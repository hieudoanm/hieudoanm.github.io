import { render, screen } from '@testing-library/react';
import { AppInfo } from '../AppInfo';
import type { AppData } from '@/lib/downloads';

const mockApp: AppData = {
  slug: 'test-app',
  label: 'Test App',
  primaryCategory: 'Developer Tools',
  secondaryCategory: 'Development',
  section: 'hybrid',
  icon: 'PiTerminal',
  href: 'https://github.com/test',
  platforms: ['macos', 'windows', 'linux', 'android', 'ios'],
  downloads: [
    { platform: 'macos', label: '.dmg', url: 'https://example.com/test.dmg' },
    { platform: 'android', label: '.apk', url: 'https://example.com/test.apk' },
    { platform: 'windows', label: '.msi', url: 'https://example.com/test.msi' },
  ],
  version: '1.0.0',
  lastUpdated: '2025-01-01',
  fileSize: '10 MB',
  screenshots: [],
};

jest.mock('next/navigation', () => ({
  useParams: () => ({ slug: 'test-app' }),
  usePathname: () => '/app/test-app/',
}));

describe('AppInfo', () => {
  it('renders app label', () => {
    render(<AppInfo app={mockApp} />);
    expect(screen.getByText('Test App')).toBeTruthy();
  });

  it('renders app description', () => {
    render(<AppInfo app={mockApp} />);
    expect(screen.getByText('Developer Tools')).toBeTruthy();
  });

  it('renders section badge', () => {
    render(<AppInfo app={mockApp} />);
    expect(screen.getByText('hybrid')).toBeTruthy();
  });

  it('renders platform badges', () => {
    render(<AppInfo app={mockApp} />);
    expect(screen.getAllByText('macOS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Windows').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Linux').length).toBeGreaterThan(0);
  });

  it('renders Download Options heading', () => {
    render(<AppInfo app={mockApp} />);
    expect(screen.getByText('Download Options')).toBeTruthy();
  });

  it('renders platform groups', () => {
    render(<AppInfo app={mockApp} />);
    expect(screen.getAllByText('macOS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Android').length).toBeGreaterThan(0);
  });

  it('renders download labels', () => {
    render(<AppInfo app={mockApp} />);
    expect(screen.getByText('.dmg')).toBeTruthy();
    expect(screen.getByText('.apk')).toBeTruthy();
    expect(screen.getByText('.msi')).toBeTruthy();
  });

  it('renders Download buttons', () => {
    render(<AppInfo app={mockApp} />);
    const buttons = screen.getAllByText('Download');
    expect(buttons.length).toBe(3);
  });

  it('renders Back to Store link', () => {
    render(<AppInfo app={mockApp} />);
    const link = screen.getByRole('link', { name: /Back to Store/ });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/');
  });

  it('renders unknown icon fallback', () => {
    const app = { ...mockApp, icon: 'UnknownIcon' };
    render(<AppInfo app={app} />);
    expect(screen.getByText('Test App')).toBeTruthy();
  });

  it('renders version badge', () => {
    render(<AppInfo app={mockApp} />);
    expect(screen.getByText('v1.0.0')).toBeTruthy();
  });

  it('renders file size when provided', () => {
    render(<AppInfo app={mockApp} />);
    expect(screen.getByText('10 MB')).toBeTruthy();
  });
});

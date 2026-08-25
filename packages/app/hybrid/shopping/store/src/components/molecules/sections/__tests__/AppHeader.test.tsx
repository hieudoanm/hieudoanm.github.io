import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppHeader } from '../AppHeader';
import type { AppData } from '@/lib/downloads';

const mockApp: AppData = {
  slug: 'test-app',
  label: 'Test App',
  description: 'Developer Tools',
  category: 'apps-hybrid',
  section: 'hybrid',
  icon: 'PiTerminal',
  href: 'https://github.com/test',
  platforms: ['macos', 'windows', 'linux'],
  downloads: [],
  version: '1.0.0',
  lastUpdated: '2025-01-15',
  fileSize: '10 MB',
  screenshots: [],
};

describe('AppHeader', () => {
  it('renders app label', () => {
    render(<AppHeader app={mockApp} />);
    expect(screen.getByText('Test App')).toBeTruthy();
  });

  it('renders app description', () => {
    render(<AppHeader app={mockApp} />);
    expect(screen.getByText('Developer Tools')).toBeTruthy();
  });

  it('renders section badge', () => {
    render(<AppHeader app={mockApp} />);
    expect(screen.getByText('hybrid')).toBeTruthy();
  });

  it('renders version badge', () => {
    render(<AppHeader app={mockApp} />);
    expect(screen.getByText('v1.0.0')).toBeTruthy();
  });

  it('renders lastUpdated when provided', () => {
    render(<AppHeader app={mockApp} />);
    expect(screen.getByText('2025-01-15')).toBeTruthy();
  });

  it('renders fileSize when provided', () => {
    render(<AppHeader app={mockApp} />);
    expect(screen.getByText('10 MB')).toBeTruthy();
  });

  it('does not render lastUpdated when empty', () => {
    const app = { ...mockApp, lastUpdated: '' };
    render(<AppHeader app={app} />);
    expect(screen.queryByText('2025-01-15')).toBeNull();
  });

  it('does not render fileSize when empty', () => {
    const app = { ...mockApp, fileSize: '' };
    render(<AppHeader app={app} />);
    expect(screen.queryByText('10 MB')).toBeNull();
  });

  it('renders platform badges', () => {
    render(<AppHeader app={mockApp} />);
    expect(screen.getByText('macOS')).toBeTruthy();
    expect(screen.getByText('Windows')).toBeTruthy();
    expect(screen.getByText('Linux')).toBeTruthy();
  });

  it('renders share button', () => {
    render(<AppHeader app={mockApp} />);
    expect(screen.getByTitle('Share')).toBeTruthy();
  });

  it('calls clipboard.writeText when navigator.share is unavailable', async () => {
    const user = userEvent.setup();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<AppHeader app={mockApp} />);
    await user.click(screen.getByTitle('Share'));
    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('/app/test-app/')
    );
  });

  it('calls navigator.share when available', async () => {
    const user = userEvent.setup();
    const share = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', {
      value: share,
      configurable: true,
    });
    render(<AppHeader app={mockApp} />);
    await user.click(screen.getByTitle('Share'));
    expect(share).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Test App' })
    );
  });
});

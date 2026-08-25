import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoreCard } from '../StoreCard';
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

const mockApp: AppData = {
  slug: 'test-app',
  label: 'Test App',
  description: 'Developer Tools',
  category: 'apps-hybrid',
  section: 'hybrid',
  icon: 'PiTerminal',
  href: 'https://github.com/test',
  platforms: ['macos', 'windows', 'linux', 'android', 'ios'],
  downloads: [
    { platform: 'macos', label: '.dmg', url: 'https://example.com/test.dmg' },
    { platform: 'android', label: '.apk', url: 'https://example.com/test.apk' },
  ],
  version: '1.0.0',
  lastUpdated: '2025-01-01',
  fileSize: '',
  screenshots: [],
};

jest.mock('next/navigation', () => ({
  useParams: () => ({ slug: 'test-app' }),
  usePathname: () => '/',
}));

describe('StoreCard', () => {
  beforeEach(() => {
    mockToggleFavorite.mockClear();
    mockIsFavorite.mockReturnValue(false);
  });

  it('renders app label', () => {
    render(<StoreCard app={mockApp} platform="unknown" />);
    expect(screen.getByText('Test App')).toBeTruthy();
  });

  it('renders app description', () => {
    render(<StoreCard app={mockApp} platform="unknown" />);
    expect(screen.getByText('Developer Tools')).toBeTruthy();
  });

  it('renders View Details link', () => {
    render(<StoreCard app={mockApp} platform="unknown" />);
    const link = screen.getByRole('link', { name: 'View Details' });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/app/test-app');
  });

  it('renders recommended download button when provided', () => {
    const recommended = mockApp.downloads[0];
    render(
      <StoreCard app={mockApp} platform="macos" recommended={recommended} />
    );
    expect(screen.getByText('.dmg')).toBeTruthy();
  });

  it('does not render download button when no recommendation', () => {
    render(<StoreCard app={mockApp} platform="unknown" />);
    expect(screen.queryByText('.dmg')).toBeNull();
  });

  it('renders fallback icon for unknown icon name', () => {
    const app = { ...mockApp, icon: 'UnknownIcon' };
    render(<StoreCard app={app} platform="unknown" />);
    expect(screen.getByText('Test App')).toBeTruthy();
  });

  it('shows unfilled heart when not favorited', () => {
    mockIsFavorite.mockReturnValue(false);
    render(<StoreCard app={mockApp} platform="unknown" />);
    expect(screen.getByTestId('favorite-toggle')).toBeTruthy();
  });

  it('shows filled heart when favorited', () => {
    mockIsFavorite.mockReturnValue(true);
    render(<StoreCard app={mockApp} platform="unknown" />);
    expect(screen.getByTestId('favorite-toggle')).toBeTruthy();
  });

  it('calls toggleFavorite on heart click', async () => {
    const user = userEvent.setup();
    render(<StoreCard app={mockApp} platform="unknown" />);
    await user.click(screen.getByTestId('favorite-toggle'));
    expect(mockToggleFavorite).toHaveBeenCalledWith('test-app');
  });

  it('opens download in new tab when recommended button clicked', async () => {
    const user = userEvent.setup();
    const openSpy = jest.spyOn(window, 'open').mockImplementation();
    const recommended = mockApp.downloads[0];
    render(
      <StoreCard app={mockApp} platform="macos" recommended={recommended} />
    );
    await user.click(screen.getByText('.dmg'));
    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com/test.dmg',
      '_blank',
      'noopener,noreferrer'
    );
    openSpy.mockRestore();
  });
});

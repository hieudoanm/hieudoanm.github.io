import type { AppData } from '@/lib/downloads';
import { render, screen } from '@testing-library/react';
import { WebVersion } from '../WebVersion';

const mockApp: AppData = {
  slug: 'test-app',
  label: 'Test App',
  primaryCategory: 'Developer Tools',
  secondaryCategory: 'Development',
  section: 'hybrid',
  icon: 'PiTerminal',
  href: 'https://hieudoanm.github.io/free/test-app',
  platforms: ['macos', 'windows', 'linux', 'android', 'ios'],
  downloads: [],
  version: '1.0.0',
  lastUpdated: '2025-01-15',
  fileSize: '10 MB',
  screenshots: [],
};

describe('WebVersion', () => {
  it('renders Open in Browser link for hybrid apps', () => {
    render(<WebVersion app={mockApp} />);
    const link = screen.getByRole('link', { name: /Open in Browser/ });
    expect(link).toHaveAttribute(
      'href',
      'https://hieudoanm.github.io/free/test-app'
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Web Version heading for hybrid apps', () => {
    render(<WebVersion app={mockApp} />);
    expect(screen.getByText('Web Version')).toBeInTheDocument();
  });

  it.each(['android', 'macos', 'cli', 'extension'] as const)(
    'does not render the web version link for %s apps',
    (section) => {
      render(<WebVersion app={{ ...mockApp, section }} />);
      expect(screen.queryByText('Web Version')).toBeNull();
      expect(
        screen.queryByRole('link', { name: /Open in Browser/ })
      ).toBeNull();
    }
  );
});

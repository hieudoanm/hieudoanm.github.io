import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';

describe('DownloadsTemplate', () => {
  const items = [
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: 'https://example.com/mri.dmg',
    },
  ];

  it('renders download rows with links', () => {
    render(<DownloadsTemplate version="v0.0.1" items={items} />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      'https://example.com/mri.dmg'
    );
  });

  it('renders without items', () => {
    render(<DownloadsTemplate version="v0.0.1" items={[]} />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /Download/ })
    ).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';

describe('DownloadsTemplate', () => {
  it('renders one row per platform with download links', () => {
    render(
      <DownloadsTemplate
        appName="Psychology"
        version="v0.0.1"
        items={[
          {
            platform: 'macOS',
            requirements: 'Apple Silicon · macOS 13.+',
            label: '.dmg',
            href: 'https://example.com/psychology.dmg',
          },
        ]}
      />
    );
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      'https://example.com/psychology.dmg'
    );
  });
});

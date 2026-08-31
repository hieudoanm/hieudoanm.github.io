import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '../DownloadsTemplate';

describe('DownloadsTemplate', () => {
  it('renders installers with download links', () => {
    render(
      <DownloadsTemplate
        version="v1.2.3"
        items={[
          {
            platform: 'macOS',
            requirements: 'Apple Silicon',
            label: '.dmg',
            href: 'https://example.com/app.dmg',
          },
        ]}
      />
    );
    expect(screen.getByRole('heading', { name: 'Installers' })).toBeInTheDocument();
    expect(screen.getByText('v1.2.3')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      'https://example.com/app.dmg'
    );
  });
});

import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '../DownloadsTemplate';

describe('DownloadsTemplate', () => {
  it('lists download links', () => {
    const release =
      'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest';
    render(
      <DownloadsTemplate
        appName="Lingo"
        version="v0.0.1"
        items={[
          {
            platform: 'macOS',
            requirements: 'Apple Silicon · macOS 13.+',
            label: '.dmg',
            href: `${release}/lingo_aarch64.dmg`,
          },
        ]}
      />
    );
    const link = screen.getByRole('link', { name: 'Download .dmg' });
    expect(link).toHaveAttribute('href', `${release}/lingo_aarch64.dmg`);
  });
});

import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '../DownloadsTemplate';

const PROPS = {
  appName: 'History',
  version: 'v0.0.1',
  items: [
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: 'https://example.com/history_aarch64.dmg',
    },
    {
      platform: 'Linux',
      requirements: 'Ubuntu 22.04.+',
      label: '.AppImage',
      href: 'https://example.com/history_amd64.AppImage',
    },
  ],
};

describe('DownloadsTemplate', () => {
  it('renders appName in the header', () => {
    render(<DownloadsTemplate {...PROPS} />);
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('renders platforms with requirements', () => {
    render(<DownloadsTemplate {...PROPS} />);
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('Apple Silicon · macOS 13.+')).toBeInTheDocument();
    expect(screen.getByText('Ubuntu 22.04.+')).toBeInTheDocument();
  });

  it('renders download links with labels', () => {
    render(<DownloadsTemplate {...PROPS} />);
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      PROPS.items[0].href
    );
    expect(
      screen.getByRole('link', { name: 'Download .AppImage' })
    ).toHaveAttribute('href', PROPS.items[1].href);
  });

  it('renders version and stable badge', () => {
    render(<DownloadsTemplate {...PROPS} />);
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});

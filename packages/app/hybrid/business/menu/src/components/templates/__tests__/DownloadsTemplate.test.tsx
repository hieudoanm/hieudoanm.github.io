import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '../DownloadsTemplate';

const PROPS = {
  version: 'v0.0.1',
  items: [
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: 'https://example.com/menu_aarch64.dmg',
    },
    {
      platform: 'Linux',
      requirements: 'Ubuntu 22.04.+',
      label: '.AppImage',
      href: 'https://example.com/menu_amd64.AppImage',
    },
  ],
};

describe('DownloadsTemplate', () => {
  it('renders heading and version', () => {
    render(<DownloadsTemplate {...PROPS} />);
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Latest release')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });

  it('renders platforms with requirements', () => {
    render(<DownloadsTemplate {...PROPS} />);
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('Apple Silicon · macOS 13.+')).toBeInTheDocument();
    expect(screen.getByText('Linux')).toBeInTheDocument();
    expect(screen.getByText('Ubuntu 22.04.+')).toBeInTheDocument();
  });

  it('renders download links with correct hrefs', () => {
    render(<DownloadsTemplate {...PROPS} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', PROPS.items[0].href);
    expect(links[0]).toHaveTextContent('.dmg');
    expect(links[1]).toHaveAttribute('href', PROPS.items[1].href);
    expect(links[1]).toHaveTextContent('.AppImage');
  });

  it('renders table headers', () => {
    render(<DownloadsTemplate {...PROPS} />);
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('Requirements')).toBeInTheDocument();
  });
});

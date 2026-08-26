import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '../DownloadsTemplate';

describe('DownloadsTemplate', () => {
  const items = [
    {
      platform: 'macOS',
      requirements: 'macOS 13+',
      label: 'Download',
      href: 'https://example.com/mac',
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10+',
      label: 'Download',
      href: 'https://example.com/win',
    },
  ];

  it('renders the heading', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('Downloads')).toBeInTheDocument();
  });

  it('renders the version badge', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });

  it('renders all platform names', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
  });

  it('renders requirements text', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('macOS 13+')).toBeInTheDocument();
    expect(screen.getByText('Windows 10+')).toBeInTheDocument();
  });

  it('renders download links', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    const links = screen.getAllByText('Download');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/mac');
    expect(links[1]).toHaveAttribute('href', 'https://example.com/win');
  });

  it('renders with empty items', () => {
    render(<DownloadsTemplate version="0.0.1" items={[]} />);
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});

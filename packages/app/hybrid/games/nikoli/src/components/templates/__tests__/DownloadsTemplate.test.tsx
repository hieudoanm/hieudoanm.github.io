import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '../DownloadsTemplate';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('react-icons/fi', () => ({
  FiDownload: () => <span data-testid="download-icon" />,
  FiArrowLeft: () => <span data-testid="arrow-icon" />,
}));

describe('DownloadsTemplate', () => {
  const defaultProps = {
    version: 'v1.0.0',
    items: [
      {
        platform: 'macOS',
        requirements: 'Apple Silicon · macOS 13.+',
        label: '.dmg',
        href: '/download.dmg',
      },
      {
        platform: 'Linux',
        requirements: 'Ubuntu 22.04.+',
        label: '.AppImage',
        href: '/download.AppImage',
      },
    ],
  };

  it('renders Downloads label', () => {
    render(<DownloadsTemplate {...defaultProps} />);
    expect(screen.getByText('Downloads')).toBeInTheDocument();
  });

  it('renders Installers heading', () => {
    render(<DownloadsTemplate {...defaultProps} />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
  });

  it('renders platform names', () => {
    render(<DownloadsTemplate {...defaultProps} />);
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('Linux')).toBeInTheDocument();
  });

  it('renders requirements', () => {
    render(<DownloadsTemplate {...defaultProps} />);
    expect(screen.getByText('Apple Silicon · macOS 13.+')).toBeInTheDocument();
    expect(screen.getByText('Ubuntu 22.04.+')).toBeInTheDocument();
  });

  it('renders download links', () => {
    render(<DownloadsTemplate {...defaultProps} />);
    const dmgLink = screen.getByText('.dmg').closest('a');
    expect(dmgLink).toHaveAttribute('href', '/download.dmg');
  });

  it('renders version badge', () => {
    render(<DownloadsTemplate {...defaultProps} />);
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });

  it('renders Stable badge', () => {
    render(<DownloadsTemplate {...defaultProps} />);
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});

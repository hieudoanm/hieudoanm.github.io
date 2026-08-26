import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '../DownloadsTemplate';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span>ArrowLeft</span>,
  FiDownload: () => <span>Download</span>,
}));

const items = [
  {
    platform: 'macOS',
    requirements: 'macOS 12+',
    label: 'Download',
    href: '/mac.dmg',
  },
  {
    platform: 'Windows',
    requirements: 'Windows 10+',
    label: 'Download',
    href: '/win.exe',
  },
];

describe('DownloadsTemplate', () => {
  it('renders Downloads heading', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('Downloads')).toBeInTheDocument();
  });

  it('renders Installers heading', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
  });

  it('renders all platform names', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
  });

  it('renders requirements text', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('macOS 12+')).toBeInTheDocument();
    expect(screen.getByText('Windows 10+')).toBeInTheDocument();
  });

  it('renders download links with correct href', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    const links = screen.getAllByRole('link', { name: /Download Download/ });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/mac.dmg');
    expect(links[1]).toHaveAttribute('href', '/win.exe');
  });

  it('renders version badge', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });

  it('renders Stable badge', () => {
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders empty state when no items', () => {
    render(<DownloadsTemplate version="1.0.0" items={[]} />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
  });

  it('has displayName', () => {
    expect(DownloadsTemplate.displayName).toBe('DownloadsTemplate');
  });
});

import { render, screen } from '@testing-library/react';
import DownloadsPage from '../page';

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

describe('DownloadsPage', () => {
  it('renders downloads heading', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
  });

  it('renders platform links', () => {
    render(<DownloadsPage />);
    expect(screen.getAllByText('Android').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Linux (Debian)')).toBeInTheDocument();
    expect(screen.getByText('macOS')).toBeInTheDocument();
  });

  it('renders file types', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('.aab')).toBeInTheDocument();
    expect(screen.getByText('.apk')).toBeInTheDocument();
    expect(screen.getByText('.AppImage')).toBeInTheDocument();
    expect(screen.getByText('.deb')).toBeInTheDocument();
    expect(screen.getByText('.dmg')).toBeInTheDocument();
  });
});

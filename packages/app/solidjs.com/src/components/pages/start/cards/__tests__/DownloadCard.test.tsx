import { render, screen } from '@solidjs/testing-library';
import { DownloadCard } from '../DownloadCard';

describe('DownloadCard', () => {
  const defaultProps = {
    label: 'My App',
    description: 'Download the app',
    emoji: '📥',
    color: '#007aff',
    downloads: [
      { label: 'macOS', url: '/download/macos' },
      { label: 'Windows', url: '/download/windows' },
    ],
  };

  it('renders the label', () => {
    render(() => <DownloadCard {...defaultProps} />);
    expect(screen.getByText('My App')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(() => <DownloadCard {...defaultProps} />);
    expect(screen.getByText('Download the app')).toBeInTheDocument();
  });

  it('renders the emoji', () => {
    render(() => <DownloadCard {...defaultProps} />);
    expect(screen.getByText('📥')).toBeInTheDocument();
  });

  it('renders download links', () => {
    render(() => <DownloadCard {...defaultProps} />);
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
  });

  it('renders download links with correct hrefs', () => {
    render(() => <DownloadCard {...defaultProps} />);
    const macLink = screen.getByText('macOS').closest('a');
    expect(macLink).toHaveAttribute('href', '/download/macos');
    const winLink = screen.getByText('Windows').closest('a');
    expect(winLink).toHaveAttribute('href', '/download/windows');
  });

  it('renders download links with download attribute', () => {
    render(() => <DownloadCard {...defaultProps} />);
    const macLink = screen.getByText('macOS').closest('a');
    expect(macLink).toHaveAttribute('download');
  });

  it('renders correct number of download links', () => {
    render(() => <DownloadCard {...defaultProps} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('renders no download links when downloads is empty', () => {
    render(() => <DownloadCard {...defaultProps} downloads={[]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

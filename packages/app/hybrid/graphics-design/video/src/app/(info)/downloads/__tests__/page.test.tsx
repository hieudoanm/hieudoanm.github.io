import { render, screen } from '@testing-library/react';
import DownloadsPage from '../page';

describe('DownloadsPage', () => {
  it('renders the downloads heading', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
  });

  it('renders platform download links', () => {
    render(<DownloadsPage />);
    expect(screen.getAllByText('Android').length).toBe(1);
    expect(screen.getAllByText('Linux').length).toBe(1);
    expect(screen.getByText('Linux (Debian)')).toBeInTheDocument();
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getAllByText('Windows').length).toBe(1);
  });

  it('renders download links with correct hrefs', () => {
    render(<DownloadsPage />);
    expect(screen.getByRole('link', { name: 'Download .aab' })).toHaveAttribute(
      'href',
      expect.stringContaining('video.aab')
    );
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      expect.stringContaining('video.dmg')
    );
  });
});

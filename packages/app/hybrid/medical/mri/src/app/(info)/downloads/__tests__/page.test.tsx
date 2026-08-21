import { render, screen } from '@testing-library/react';
import DownloadsPage from '../page';

describe('DownloadsPage', () => {
  it('renders the installers heading', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });

  it('lists one download per platform package', () => {
    render(<DownloadsPage />);
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      expect.stringContaining('mri_0.0.1_arm64.dmg')
    );
    expect(
      screen.getByRole('link', { name: 'Download .AppImage' })
    ).toHaveAttribute('href', expect.stringContaining('app-hybrid-mri-latest'));
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('Linux (Debian)')).toBeInTheDocument();
  });

  it('shows platform requirements', () => {
    render(<DownloadsPage />);
    expect(screen.getAllByText('Android 14.+')).toHaveLength(2);
    expect(screen.getByText('macOS 13.+')).toBeInTheDocument();
  });
});

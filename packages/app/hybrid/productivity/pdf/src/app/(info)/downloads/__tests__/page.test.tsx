import { render, screen } from '@testing-library/react';
import DownloadsPage from '../page';

describe('DownloadsPage', () => {
  it('renders platform download links', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getAllByText('Android').length).toBe(2);
    expect(screen.getByText('Linux')).toBeInTheDocument();
    expect(screen.getByText('Linux (Debian)')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .aab' })).toHaveAttribute(
      'href',
      expect.stringContaining('app-universal-release.aab')
    );
    expect(screen.getByRole('link', { name: 'Download .apk' })).toHaveAttribute(
      'href',
      expect.stringContaining('app-universal-release.apk')
    );
    expect(
      screen.getByRole('link', { name: 'Download .AppImage' })
    ).toHaveAttribute('href', expect.stringContaining('app-hybrid-pdf-latest'));
    expect(screen.getByRole('link', { name: 'Download .deb' })).toHaveAttribute(
      'href',
      expect.stringContaining('app-hybrid-pdf-latest')
    );
  });
});

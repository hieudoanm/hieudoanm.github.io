import { render, screen } from '@testing-library/react';
import DownloadsPage from '@/app/(info)/downloads/page';

describe('DownloadsPage', () => {
  it('downloads page lists installers', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      expect.stringContaining('economics_aarch64.dmg')
    );
  });
});

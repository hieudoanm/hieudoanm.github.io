import { render, screen } from '@testing-library/react';
import DownloadsPage from '@/app/(info)/downloads/page';

describe('DownloadsPage', () => {
  it('lists installers', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      expect.stringContaining('lingo_aarch64.dmg')
    );
  });
});

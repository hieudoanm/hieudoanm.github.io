import { render, screen } from '@testing-library/react';
import DownloadsPage from '../page';

describe('DownloadsPage', () => {
  it('lists installers', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      expect.stringContaining('history_aarch64.dmg')
    );
  });
});

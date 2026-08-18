import { render, screen } from '@testing-library/react';
import DownloadsPage from '../page';

describe('DownloadsPage', () => {
  it('renders download heading', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
  });

  it('lists platform installers with links', () => {
    render(<DownloadsPage />);
    const dmg = screen.getByLabelText('Download .dmg');
    expect(dmg).toHaveAttribute(
      'href',
      expect.stringContaining('app-hybrid-games-casino-latest')
    );
    expect(screen.getAllByText('Android').length).toBe(2);
    expect(screen.getByText('macOS')).toBeInTheDocument();
  });

  it('renders version badge', () => {
    render(<DownloadsPage />);
    expect(screen.getAllByText('v0.0.1').length).toBeGreaterThan(0);
  });
});

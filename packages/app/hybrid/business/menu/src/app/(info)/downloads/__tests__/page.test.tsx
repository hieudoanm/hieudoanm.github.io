import { render, screen } from '@testing-library/react';
import DownloadsPage from '../page';

describe('DownloadsPage', () => {
  it('renders the downloads heading', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Installers' })
    ).toBeInTheDocument();
  });

  it('shows all platforms', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Linux')).toBeInTheDocument();
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
    const androidHeaders = screen.getAllByText('Android');
    expect(androidHeaders.length).toBeGreaterThanOrEqual(1);
  });

  it('has download links with menu_ artifact names', () => {
    render(<DownloadsPage />);
    const dmg = screen.getByRole('link', { name: 'Download .dmg' });
    expect(dmg.getAttribute('href')).toContain(
      'app-hybrid-business-menu-latest'
    );
    expect(dmg.getAttribute('href')).toContain('menu_aarch64.dmg');
  });
});

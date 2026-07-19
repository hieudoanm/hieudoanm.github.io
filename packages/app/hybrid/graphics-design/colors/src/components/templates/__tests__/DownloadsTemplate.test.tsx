import { render, screen } from '@testing-library/react';
import { DownloadsTemplate } from '../DownloadsTemplate';

describe('DownloadsTemplate', () => {
  it('renders the heading and version', () => {
    render(<DownloadsTemplate version="1.0.0" items={[]} />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });

  it('renders platform, requirements, and download link for each item', () => {
    const items = [
      {
        platform: 'macOS',
        requirements: 'macOS 12+',
        label: 'Download DMG',
        href: '/downloads/app.dmg',
      },
      {
        platform: 'Windows',
        requirements: 'Windows 10+',
        label: 'Download EXE',
        href: '/downloads/app.exe',
      },
    ];
    render(<DownloadsTemplate version="1.0.0" items={items} />);
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('macOS 12+')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
    expect(screen.getByText('Windows 10+')).toBeInTheDocument();

    const dmgLink = screen.getByText('Download DMG').closest('a');
    expect(dmgLink).toHaveAttribute('href', '/downloads/app.dmg');

    const exeLink = screen.getByText('Download EXE').closest('a');
    expect(exeLink).toHaveAttribute('href', '/downloads/app.exe');
  });

  it('renders the Stable badge', () => {
    render(<DownloadsTemplate version="1.0.0" items={[]} />);
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});

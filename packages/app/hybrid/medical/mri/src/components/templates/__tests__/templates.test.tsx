import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('ErrorTemplate', () => {
  it('renders code, description, and action', () => {
    render(
      <ErrorTemplate
        code="500"
        description="Something went wrong."
        action={<button type="button">Retry</button>}
      />
    );
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders without an action', () => {
    render(<ErrorTemplate code="503" description="Unavailable." />);
    expect(screen.getByText('503')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Retry' })
    ).not.toBeInTheDocument();
  });
});

describe('AboutTemplate', () => {
  const items = [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Desktop', value: 'Tauri 2' },
  ];

  it('renders name, description, and info rows', () => {
    render(
      <AboutTemplate
        name="MRI"
        description="An MRI research workspace"
        version="v0.0.1"
        items={items}
      />
    );
    expect(screen.getByText('MRI')).toBeInTheDocument();
    expect(screen.getByText('An MRI research workspace')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders an empty card without items', () => {
    render(
      <AboutTemplate name="MRI" description="" version="v0.0.1" items={[]} />
    );
    expect(screen.queryByText('Framework')).not.toBeInTheDocument();
  });
});

describe('DownloadsTemplate', () => {
  const items = [
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: 'https://example.com/mri.dmg',
    },
  ];

  it('renders download rows with links', () => {
    render(<DownloadsTemplate version="v0.0.1" items={items} />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      'https://example.com/mri.dmg'
    );
  });

  it('renders without items', () => {
    render(<DownloadsTemplate version="v0.0.1" items={[]} />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /Download/ })
    ).not.toBeInTheDocument();
  });
});

describe('VersionTemplate', () => {
  it('splits a timestamped version into segments', () => {
    render(<VersionTemplate version="2026.08.21.10.30.00" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('falls back to raw text for non-timestamped versions', () => {
    render(<VersionTemplate version="dev" />);
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
    expect(screen.getAllByText('dev').length).toBeGreaterThan(0);
  });

  it('omits trailing segments when absent', () => {
    render(<VersionTemplate version="2026.08.21" />);
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
  });
});

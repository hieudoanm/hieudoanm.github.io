import { render, screen } from '@testing-library/react';
import { PiBrain } from 'react-icons/pi';
import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

describe('HomeTemplate', () => {
  const items = [
    {
      label: 'BDI',
      description: 'Depression severity',
      icon: PiBrain,
      href: '/beck-depression-inventory/',
    },
  ];

  it('renders a card for every scale', () => {
    render(
      <HomeTemplate
        appName="Psychology"
        description="Self-report scales"
        items={items}
      />
    );
    const link = screen.getByTestId('tool-card-beck-depression-inventory');
    expect(link.getAttribute('href')).toContain('/beck-depression-inventory');
    expect(screen.getByText('BDI')).toBeInTheDocument();
    expect(screen.getByText('Depression severity')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Psychology'
    );
  });
});

describe('ToolTemplate', () => {
  it('renders the header title and children', () => {
    render(<ToolTemplate title="BDI">content</ToolTemplate>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    expect(screen.getByText('BDI')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(<ErrorTemplate code="404" description="Missing page" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Missing page')).toBeInTheDocument();
  });
});

describe('AboutTemplate', () => {
  it('renders name, description and items', () => {
    render(
      <AboutTemplate
        appName="Psychology"
        name="Psychology"
        description="Self-report scales"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js' }]}
      />
    );
    expect(screen.getAllByRole('heading', { name: 'Psychology' })).toHaveLength(
      2
    );
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});

describe('DownloadsTemplate', () => {
  it('renders one row per platform with download links', () => {
    render(
      <DownloadsTemplate
        appName="Psychology"
        version="v0.0.1"
        items={[
          {
            platform: 'macOS',
            requirements: 'macOS 13.+',
            label: '.dmg',
            href: 'https://example.com/psychology.dmg',
          },
        ]}
      />
    );
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      'https://example.com/psychology.dmg'
    );
  });
});
describe('VersionTemplate', () => {
  let writeTextSpy: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    if (!('clipboard' in navigator)) {
      Object.defineProperty(navigator, 'clipboard', {
        value: {},
        configurable: true,
      });
    }
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: jest.fn().mockResolvedValue(undefined),
      writable: true,
      configurable: true,
    });
    writeTextSpy = navigator.clipboard.writeText as jest.Mock;
  });

  afterEach(() => {
    jest.useRealTimers();
    writeTextSpy.mockRestore();
  });

  it('renders all six segments for a full version string', async () => {
    const { VersionTemplate } =
      await import('@/components/templates/VersionTemplate');
    render(
      <VersionTemplate appName="Psychology" version="2024.06.15.08.30.45" />
    );
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders only date segments when hh/mm/ss are absent', async () => {
    const { VersionTemplate } =
      await import('@/components/templates/VersionTemplate');
    render(<VersionTemplate appName="Psychology" version="2024.06.15" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders raw version text when segments are absent', async () => {
    const { VersionTemplate } =
      await import('@/components/templates/VersionTemplate');
    render(<VersionTemplate appName="Psychology" version="unknown" />);
    expect(
      screen.getByText('unknown', { selector: '.text-error' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
  });

  it('copies the version to the clipboard and reverts after timeout', async () => {
    const { act, fireEvent, waitFor } = await import('@testing-library/react');
    const { VersionTemplate } =
      await import('@/components/templates/VersionTemplate');
    render(<VersionTemplate appName="Psychology" version="2024.01.01" />);
    fireEvent.click(screen.getByRole('button', { name: /Copy version/i }));
    expect(writeTextSpy).toHaveBeenCalledWith('2024.01.01');
    await waitFor(() => expect(screen.getByText('Copied')).toBeInTheDocument());
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    await waitFor(() =>
      expect(screen.getByText('Copy version')).toBeInTheDocument()
    );
  });
});

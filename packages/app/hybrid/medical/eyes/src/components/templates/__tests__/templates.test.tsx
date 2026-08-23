import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PiEye } from 'react-icons/pi';
import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { HomeTemplate } from '@/components/templates/HomeTemplate';

describe('HomeTemplate', () => {
  const items = [
    {
      label: 'Snellen',
      description: 'Classic letter chart',
      icon: PiEye,
      href: '/snellen/',
    },
  ];

  it('renders a card for every chart', () => {
    render(
      <HomeTemplate
        appName="Eyes"
        description="Visual acuity charts"
        items={items}
      />
    );
    const link = screen.getByTestId('chart-card-snellen');
    expect(link.getAttribute('href')).toContain('/snellen');
    expect(screen.getByText('Snellen')).toBeInTheDocument();
    expect(screen.getByText('Classic letter chart')).toBeInTheDocument();
  });

  it('renders the app heading', () => {
    render(
      <HomeTemplate
        appName="Eyes"
        description="Visual acuity charts"
        items={items}
      />
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Eyes');
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
        appName="Eyes"
        name="Eyes"
        description="Visual acuity charts"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js' }]}
      />
    );
    expect(screen.getAllByRole('heading', { name: 'Eyes' })).toHaveLength(2);
    expect(screen.getByText('Visual acuity charts')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});

describe('DownloadsTemplate', () => {
  it('renders one row per platform with download links', () => {
    render(
      <DownloadsTemplate
        appName="Eyes"
        version="v0.0.1"
        items={[
          {
            platform: 'macOS',
            requirements: 'macOS 13.+',
            label: '.dmg',
            href: 'https://example.com/eyes.dmg',
          },
        ]}
      />
    );
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('macOS 13.+')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      'https://example.com/eyes.dmg'
    );
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
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
    render(<VersionTemplate appName="Eyes" version="2024.06.15.08.30.45" />);
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
    render(<VersionTemplate appName="Eyes" version="2024.06.15" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders raw version text when segments are absent', async () => {
    const { VersionTemplate } =
      await import('@/components/templates/VersionTemplate');
    render(<VersionTemplate appName="Eyes" version="unknown" />);
    expect(
      screen.getByText('unknown', { selector: '.text-error' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
  });

  it('copies the version to the clipboard and reverts after timeout', async () => {
    const { act, fireEvent, waitFor } = await import('@testing-library/react');
    const { VersionTemplate } =
      await import('@/components/templates/VersionTemplate');
    render(<VersionTemplate appName="Eyes" version="2024.01.01" />);
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

import { render, screen } from '@testing-library/react';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

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

  it('renders all six segments for a full version string', () => {
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

  it('renders only date segments when hh/mm/ss are absent', () => {
    render(<VersionTemplate appName="Psychology" version="2024.06.15" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders raw version text when segments are absent', () => {
    render(<VersionTemplate appName="Psychology" version="unknown" />);
    expect(
      screen.getByText('unknown', { selector: '.text-error' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
  });

  it('copies the version to the clipboard and reverts after timeout', async () => {
    const { act, fireEvent, waitFor } = await import('@testing-library/react');
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

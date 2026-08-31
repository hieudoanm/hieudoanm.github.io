import {
  act,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('VersionTemplate', () => {
  let writeTextSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    writeTextSpy = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextSpy },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all six segments for a full version string', () => {
    render(<VersionTemplate version="2024.06.15.08.30.45" />);
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('06')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders only year, month, day segments when hh/mm/ss are absent', () => {
    render(<VersionTemplate version="2024.06.15" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
    expect(screen.queryByText('Min')).not.toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders hour segment when only hh is provided', () => {
    render(<VersionTemplate version="2024.06.15.08" />);
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.queryByText('Min')).not.toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders hour and min segments when ss is absent', () => {
    render(<VersionTemplate version="2024.06.15.08.30" />);
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders raw version text when hasSegments is false', () => {
    render(<VersionTemplate version="unknown" />);
    expect(
      screen.getByText('unknown', {
        selector: '.text-error',
      })
    ).toBeInTheDocument();
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
  });

  it('copies the version to the clipboard and shows copied state', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<VersionTemplate version="2024.01.01" />);
    await user.click(screen.getByRole('button', { name: /Copy version/i }));
    expect(writeTextSpy).toHaveBeenCalledWith('2024.01.01');
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument();
    });
    expect(screen.getByText('Copied').closest('button')).toHaveClass(
      'btn-success'
    );
  });

  it('reverts to copy state after timeout', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<VersionTemplate version="2024.01.01" />);
    await user.click(screen.getByRole('button', { name: /Copy version/i }));
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument();
    });
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    await waitFor(() => {
      expect(screen.getByText('Copy version')).toBeInTheDocument();
    });
  });

  it('applies primary class to the year segment', () => {
    render(<VersionTemplate version="2024.06.15" />);
    const yearEl = screen.getByText('2024');
    expect(yearEl.className).toContain('text-primary');
  });

  it('does not apply primary class to non-year segments', () => {
    render(<VersionTemplate version="2024.06.15" />);
    const monthEl = screen.getByText('06');
    expect(monthEl.className).not.toContain('text-primary');
  });

  it('has a back link to the home page', () => {
    render(<VersionTemplate version="2024.01.01" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});

import { render, screen, fireEvent, act } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

describe('VersionTemplate', () => {
  const writeText = jest.fn();

  beforeEach(() => {
    writeText.mockReset();
    jest.useRealTimers();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('renders the full version as segments', () => {
    render(<VersionTemplate version="2026.01.15.10.30.45" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders a partial version with only year/month/day', () => {
    render(<VersionTemplate version="2026.01.15" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).toBeNull();
  });

  it('renders the raw version when segments are missing', () => {
    render(<VersionTemplate version="v1.2.3-beta" />);
    expect(screen.getByText('v1.2.3-beta')).toBeInTheDocument();
  });

  it('copies the version and shows Copied state', async () => {
    jest.useFakeTimers();
    writeText.mockResolvedValue(undefined);
    render(<VersionTemplate version="2026.01.15" />);
    fireEvent.click(screen.getByText('Copy version'));
    await act(async () => {
      await Promise.resolve();
    });
    expect(writeText).toHaveBeenCalledWith('2026.01.15');
    expect(screen.getByText('Copied')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });

  it('copies the version from the version button', async () => {
    writeText.mockResolvedValue(undefined);
    render(<VersionTemplate version="2026.01.15" />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    await act(async () => {
      await Promise.resolve();
    });
    expect(writeText).toHaveBeenCalledWith('2026.01.15');
  });
});

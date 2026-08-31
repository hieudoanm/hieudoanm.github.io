import { render, screen, fireEvent, act } from '@testing-library/react';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('VersionTemplate', () => {
  it('renders segmented version', () => {
    render(<VersionTemplate version="2026.07.31.12.30.00" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('07')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();
  });

  it('renders plain version when not segmented', () => {
    render(<VersionTemplate version="unknown" />);
    expect(screen.getAllByText('unknown').length).toBeGreaterThan(0);
  });

  it('copies version to clipboard and resets the label', async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });
    render(<VersionTemplate version="2026.07.31" />);
    fireEvent.click(screen.getByText('Copy version'));
    await act(async () => {});
    expect(writeText).toHaveBeenCalledWith('2026.07.31');
    expect(screen.getByText('Copied')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1500));
    expect(screen.getByText('Copy version')).toBeInTheDocument();
    jest.useRealTimers();
  });
});

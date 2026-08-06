import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('VersionTemplate', () => {
  const writeText = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    jest.useFakeTimers();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders segmented version when fully formatted', () => {
    render(<VersionTemplate version="2026.08.05.10.30.45" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText('05')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders partial segments when the time portion is missing', () => {
    render(<VersionTemplate version="2026.08.05" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
  });

  it('falls back to the raw version when not segmented', () => {
    render(<VersionTemplate version="dev" />);
    expect(screen.getAllByText('dev').length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
  });

  it('copies the version and shows a copied state', async () => {
    render(<VersionTemplate version="2026.08.05" />);
    fireEvent.click(screen.getByText('Copy version'));
    await waitFor(() => expect(screen.getByText('Copied')).toBeInTheDocument());
    expect(writeText).toHaveBeenCalledWith('2026.08.05');
    fireEvent.click(screen.getByText('2026.08.05'));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(2));
  });

  it('resets the copied state after 1500ms', async () => {
    render(<VersionTemplate version="2026.08.05" />);
    fireEvent.click(screen.getByText('Copy version'));
    await waitFor(() => expect(screen.getByText('Copied')).toBeInTheDocument());
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, act } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

afterEach(() => {
  jest.useRealTimers();
});

describe('VersionTemplate', () => {
  it('renders full segments when year, month and day are present', () => {
    render(<VersionTemplate version="2026.08.05.12.30.45" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders only partial segments when time parts are missing', () => {
    render(<VersionTemplate version="2026.08.05" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
  });

  it('renders the raw version when segments are incomplete', () => {
    render(<VersionTemplate version="0.1" />);
    expect(screen.getAllByText('0.1')).toHaveLength(2);
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
  });

  it('copies the version and shows Copied state briefly', async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<VersionTemplate version="2026.08.05" />);

    fireEvent.click(screen.getByRole('button', { name: /Copy version/i }));
    await act(async () => {});

    expect(writeText).toHaveBeenCalledWith('2026.08.05');
    expect(screen.getByText('Copied')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(
      screen.getByRole('button', { name: /Copy version/i })
    ).toBeInTheDocument();
  });
});

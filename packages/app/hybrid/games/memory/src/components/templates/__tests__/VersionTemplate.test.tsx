import { act, fireEvent, render, screen } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn().mockResolvedValue(undefined),
    },
  });
});

describe('VersionTemplate', () => {
  it('renders title', () => {
    render(<VersionTemplate version="2025.01.15.10.30.00" />);
    expect(screen.getByText('Memory Version')).toBeInTheDocument();
  });

  it('renders formatted version segments', () => {
    render(<VersionTemplate version="2025.01.15.10.30.00" />);
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('00')).toBeInTheDocument();
  });

  it('renders segment labels', () => {
    render(<VersionTemplate version="2025.01.15.10.30.00" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders raw version when no segments', () => {
    render(<VersionTemplate version="abc" />);
    expect(screen.getAllByText('abc').length).toBeGreaterThanOrEqual(1);
  });

  it('renders Copy version button', () => {
    render(<VersionTemplate version="2025.01.15" />);
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });

  it('copies version to clipboard on click', async () => {
    render(<VersionTemplate version="2025.01.15" />);
    await act(async () => {
      fireEvent.click(screen.getByText('Copy version'));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('2025.01.15');
  });

  it('shows Copied after click', async () => {
    jest.useFakeTimers();
    render(<VersionTemplate version="2025.01.15" />);
    await act(async () => {
      fireEvent.click(screen.getByText('Copy version'));
    });
    expect(screen.getByText('Copied')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(screen.getByText('Copy version')).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('renders version in button', () => {
    render(<VersionTemplate version="2025.01.15" />);
    expect(screen.getByText('2025.01.15')).toBeInTheDocument();
  });

  it('renders format hint', () => {
    render(<VersionTemplate version="2025.01.15" />);
    expect(screen.getByText('Format: YYYY.MM.DD.hh.mm.ss')).toBeInTheDocument();
  });

  it('has displayName', () => {
    expect(VersionTemplate.displayName).toBe('VersionTemplate');
  });
});

import { render, screen, fireEvent, act } from '@testing-library/react';
import VersionPage from '../page';

beforeEach(() => {
  jest.useFakeTimers();
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('VersionPage', () => {
  it('renders the version heading', async () => {
    await act(async () => {
      render(<VersionPage />);
    });
    expect(screen.getByText('Version')).toBeInTheDocument();
  });

  it('sets version segments from the current date', async () => {
    await act(async () => {
      render(<VersionPage />);
    });
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(year)).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Format: YYYY.MM.DD.hh.mm.ss')).toBeInTheDocument();
  });

  it('copies the version to the clipboard', async () => {
    await act(async () => {
      render(<VersionPage />);
    });
    fireEvent.click(screen.getByRole('button', { name: /Copy version/ }));
    await act(async () => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
    expect(screen.getByText('Copied')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

const writeText = jest.fn().mockResolvedValue(undefined);

describe('VersionTemplate', () => {
  beforeEach(() => {
    writeText.mockReset().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('renders a full version with segments', () => {
    render(<VersionTemplate version="2026.08.05.12.30.45" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });

  it('renders a partial version without time segments', () => {
    render(<VersionTemplate version="2026.08.05" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders the raw version when it has no segments', () => {
    render(<VersionTemplate version="dev" />);
    expect(screen.getAllByText('dev')).toHaveLength(2);
  });

  it('copies the version and shows a copied state', async () => {
    jest.useFakeTimers();
    render(<VersionTemplate version="2026.08.05" />);
    fireEvent.click(screen.getByText('Copy version'));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('2026.08.05'));
    await waitFor(() => expect(screen.getByText('Copied')).toBeInTheDocument());
    jest.advanceTimersByTime(1500);
    await waitFor(() =>
      expect(screen.getByText('Copy version')).toBeInTheDocument()
    );
    jest.useRealTimers();
  });
});

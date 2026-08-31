import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('VersionTemplate', () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
  });

  it('renders segmented version parts', () => {
    render(<VersionTemplate version="2026.08.05" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText('05')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });

  it('renders full timestamp segments including time', () => {
    render(<VersionTemplate version="2026.08.05.12.30.45" />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders raw version when it has no segments', () => {
    render(<VersionTemplate version="dev-build" />);
    expect(screen.getAllByText('dev-build').length).toBe(2);
  });

  it('copies the version to clipboard and shows confirmation', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<VersionTemplate version="2026.08.05" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    );
    expect(writeText).toHaveBeenCalledWith('2026.08.05');
  });
});

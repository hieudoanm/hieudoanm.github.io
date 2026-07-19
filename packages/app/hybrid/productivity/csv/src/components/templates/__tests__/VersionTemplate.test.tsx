import { fireEvent, render, screen } from '@testing-library/react';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('VersionTemplate', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders every segment for a full version', () => {
    render(<VersionTemplate version="2024.01.05.10.30.45" />);
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
    expect(screen.getByText('Copy version')).toBeInTheDocument();
    expect(screen.queryByText('Stable')).toBeInTheDocument();
  });

  it('renders a compact version without time segments', () => {
    render(<VersionTemplate version="2024.01.05" />);
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('05')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
    expect(screen.queryByText('Min')).not.toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('falls back to the raw version when segments are missing', () => {
    render(<VersionTemplate version="unreleased" />);
    expect(screen.getAllByText('unreleased')).toHaveLength(2);
    expect(screen.queryByText('Month')).not.toBeInTheDocument();
  });

  it('copies the version to the clipboard', async () => {
    render(<VersionTemplate version="2024.01.05.10.30.45" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    expect(await screen.findByText('Copied')).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '2024.01.05.10.30.45'
    );
  });
});

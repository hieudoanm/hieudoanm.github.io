import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('VersionTemplate', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders segmented version', () => {
    render(<VersionTemplate version="2024.06.15.12.30.45" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders partial version without seconds', () => {
    render(<VersionTemplate version="2024.06.15" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders invalid version in error style', () => {
    render(<VersionTemplate version="dev" />);
    expect(screen.getAllByText('dev')[0]).toHaveClass('text-error');
  });

  it('copies version to clipboard', async () => {
    render(<VersionTemplate version="2024.06.15" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('2024.06.15');
    });
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument();
    });
  });
});

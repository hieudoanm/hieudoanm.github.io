import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

describe('VersionTemplate', () => {
  it('renders segmented version labels for a full version string', () => {
    render(<VersionTemplate version="2024.01.15.10.30.00" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders the version value in each segment', () => {
    render(<VersionTemplate version="2024.01.15.10.30.00" />);
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('shows the version string on the copy button', () => {
    render(<VersionTemplate version="2024.01.15.10.30.00" />);
    expect(
      screen.getByRole('button', { name: '2024.01.15.10.30.00' })
    ).toBeInTheDocument();
  });

  it('copies the version to clipboard and shows Copied', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      get: () => ({ writeText }),
      configurable: true,
    });

    render(<VersionTemplate version="2024.01.15.10.30.00" />);

    fireEvent.click(screen.getByRole('button', { name: /Copy version/i }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith('2024.01.15.10.30.00')
    );
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });

  it('renders raw version in error-styled element for non-segmented version', () => {
    render(<VersionTemplate version="abc" />);
    const matches = screen.getAllByText('abc');
    expect(matches.some((el) => el.tagName === 'P')).toBe(true);
  });
});

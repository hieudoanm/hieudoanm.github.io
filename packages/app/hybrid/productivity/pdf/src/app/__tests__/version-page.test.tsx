import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VersionPage from '@/app/(info)/version/page';

const writeText = jest.fn().mockResolvedValue(undefined);

describe('VersionPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 7, 6, 10, 20, 30));
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the generated build version with segments', async () => {
    render(<VersionPage />);
    expect(await screen.findByText('2026')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText('06')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
  });

  it('copies the version to the clipboard', async () => {
    render(<VersionPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith('2026.08.06.10.20.30')
    );
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });
});

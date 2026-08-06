import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VersionPage from '@/app/version/page';

describe('VersionPage', () => {
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

  it('renders the current deployment version', () => {
    render(<VersionPage />);
    expect(screen.getByText('Database Version')).toBeInTheDocument();
    expect(screen.getByText('Copy version')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Format: YYYY.MM.DD.hh.mm.ss')).toBeInTheDocument();
  });

  it('copies the version to the clipboard', async () => {
    render(<VersionPage />);
    const button = screen.getByText('Copy version');
    fireEvent.click(button);
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}$/)
      )
    );
    await waitFor(() => expect(screen.getByText('Copied')).toBeInTheDocument());
  });
});

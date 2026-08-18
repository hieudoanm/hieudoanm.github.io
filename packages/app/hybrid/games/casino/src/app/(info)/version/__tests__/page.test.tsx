import { fireEvent, render, screen } from '@testing-library/react';
import VersionPage from '../page';

describe('VersionPage', () => {
  it('renders the build version segments', async () => {
    render(<VersionPage />);
    expect(await screen.findByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
  });

  it('copies the version to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    const { rerender } = render(<VersionPage />);
    await screen.findByText('Year');
    fireEvent.click(screen.getByTestId('copy-version'));
    expect(writeText).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}\./));
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });
});

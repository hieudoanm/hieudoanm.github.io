import { fireEvent, render, screen } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

describe('VersionTemplate', () => {
  it('renders date segments for a timestamp version', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    render(<VersionTemplate appName="Lingo" version="2026.08.09.10.20.30" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Copy version/i }));
    await screen.findByText('Copied');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '2026.08.09.10.20.30'
    );
  });

  it('falls back to raw version text for non-timestamp versions', () => {
    render(<VersionTemplate appName="Lingo" version="v0.0.1" />);
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});

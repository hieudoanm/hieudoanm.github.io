import { render, screen, fireEvent } from '@testing-library/react';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('VersionTemplate', () => {
  it('renders segmented version when complete', () => {
    render(<VersionTemplate version="2026.08.06.12.00.00" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('falls back to raw version for short strings', () => {
    render(<VersionTemplate version="dev" />);
    expect(screen.getAllByText('dev').length).toBeGreaterThan(0);
  });

  it('copies the version and shows feedback', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    render(<VersionTemplate version="2026.08.06" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('VersionTemplate', () => {
  it('splits a timestamped version into segments', () => {
    render(<VersionTemplate version="2026.08.21.10.30.00" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('falls back to raw text for non-timestamped versions', () => {
    render(<VersionTemplate version="dev" />);
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
    expect(screen.getAllByText('dev').length).toBeGreaterThan(0);
  });

  it('omits trailing segments when absent', () => {
    render(<VersionTemplate version="2026.08.21" />);
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
  });
});

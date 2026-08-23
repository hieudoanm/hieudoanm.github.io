import { render, screen } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

describe('VersionTemplate', () => {
  it('renders segmented build versions', () => {
    render(<VersionTemplate version="2026.08.22.10.30.00" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });

  it('falls back to raw text for non-segmented versions', () => {
    render(<VersionTemplate version="dev" />);
    expect(screen.getAllByText('dev')).toHaveLength(2);
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
  });
});

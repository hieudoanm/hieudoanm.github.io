import { render, screen } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

describe('VersionTemplate', () => {
  it('renders heading and version', () => {
    render(<VersionTemplate version="v0.0.1" />);
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });

  it('renders a different version string', () => {
    render(<VersionTemplate version="2026.07.31" />);
    expect(screen.getByText('2026.07.31')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

describe('VersionTemplate', () => {
  it('renders the heading', () => {
    render(<VersionTemplate version="1.0.0" />);
    expect(screen.getAllByText('Version').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the version string', () => {
    render(<VersionTemplate version="2.3.4" />);
    expect(screen.getByText('2.3.4')).toBeInTheDocument();
  });

  it('renders the package name', () => {
    render(<VersionTemplate version="1.0.0" />);
    expect(screen.getByText('@hieudoanm.github.io/clock')).toBeInTheDocument();
  });

  it('renders framework info', () => {
    render(<VersionTemplate version="1.0.0" />);
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
  });

  it('renders UI info', () => {
    render(<VersionTemplate version="1.0.0" />);
    expect(screen.getByText('Tailwind CSS 4 + DaisyUI 5')).toBeInTheDocument();
  });
});

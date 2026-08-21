import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders about content', () => {
    render(<AboutPage />);
    expect(screen.getByText('MRI')).toBeInTheDocument();
    expect(
      screen.getByText('An MRI research workspace and orchestration layer')
    ).toBeInTheDocument();
  });

  it('renders tech stack items', () => {
    render(<AboutPage />);
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Imaging engine')).toBeInTheDocument();
    expect(screen.getByText('Rust (DICOM / NIfTI)')).toBeInTheDocument();
  });

  it('renders version', () => {
    render(<AboutPage />);
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });

  it('links back to home', () => {
    render(<AboutPage />);
    expect(screen.getByRole('link', { name: /Home/ })).toHaveAttribute(
      'href',
      '/'
    );
  });
});

import { render, screen } from '@solidjs/testing-library';
import { Footer } from '../Footer';

describe('LandingFooter', () => {
  it('renders brand name', () => {
    render(() => <Footer />);
    expect(screen.getByText('Forma')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(() => <Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('renders built with care text', () => {
    render(() => <Footer />);
    expect(screen.getByText(/Built with care/)).toBeInTheDocument();
  });

  it('renders MIT license text', () => {
    render(() => <Footer />);
    expect(screen.getByText(/MIT License/)).toBeInTheDocument();
  });
});

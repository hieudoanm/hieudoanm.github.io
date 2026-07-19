import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders brand name', () => {
    render(<Footer />);
    expect(screen.getByText('DaisyX')).toBeInTheDocument();
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/2026 DaisyX Design System/)).toBeInTheDocument();
    expect(screen.getByText(/MIT License/)).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});

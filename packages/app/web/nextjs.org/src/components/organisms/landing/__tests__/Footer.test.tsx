import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('to match snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('renders brand name', () => {
    render(<Footer />);
    expect(screen.getByText('Forma')).toBeInTheDocument();
  });

  it('renders copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
    expect(screen.getByText(/MIT License/)).toBeInTheDocument();
  });
});

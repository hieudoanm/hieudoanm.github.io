import { render, screen } from '@testing-library/react';
import { Features } from '../Features';

describe('Features', () => {
  it('to match snapshot', () => {
    const { container } = render(<Features />);
    expect(container).toMatchSnapshot();
  });

  it('renders section heading', () => {
    render(<Features />);
    expect(screen.getByText(/primitives/i)).toBeInTheDocument();
    expect(screen.getByText(/everything you need/i)).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<Features />);
    expect(screen.getByText('Design tokens')).toBeInTheDocument();
    expect(screen.getByText('Composable API')).toBeInTheDocument();
    expect(screen.getByText('Accessible by default')).toBeInTheDocument();
    expect(screen.getByText('Performance first')).toBeInTheDocument();
    expect(screen.getByText('Dark mode native')).toBeInTheDocument();
    expect(screen.getByText('Developer DX')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<Features />);
    expect(
      screen.getByText(/CSS variables and JS constants/)
    ).toBeInTheDocument();
    expect(screen.getByText(/headless-first/)).toBeInTheDocument();
    expect(screen.getByText(/ARIA patterns/)).toBeInTheDocument();
  });
});

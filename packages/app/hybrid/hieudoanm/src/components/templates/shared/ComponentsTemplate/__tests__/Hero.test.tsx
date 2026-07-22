import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders version tagline', () => {
    render(<Hero />);
    expect(screen.getByText(/v2\.4\.0/)).toBeInTheDocument();
    expect(screen.getByText(/47 components/)).toBeInTheDocument();
  });

  it('renders headline', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { name: /build interfaces/i })
    ).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<Hero />);
    expect(screen.getByText(/view demo/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /read the docs/i })
    ).toBeInTheDocument();
  });

  it('renders badges', () => {
    render(<Hero />);
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
    expect(screen.getByText(/Next\.js ready/)).toBeInTheDocument();
    expect(screen.getByText(/WCAG 2\.1 AA/)).toBeInTheDocument();
    expect(screen.getByText(/Stable/)).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<Hero />);
    expect(container).toMatchSnapshot();
  });
});

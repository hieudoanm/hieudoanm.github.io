import { render, screen } from '@testing-library/react';
import { LandingTemplate } from '../LandingTemplate';

describe('LandingTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<LandingTemplate />);
    expect(container).toMatchSnapshot();
  });

  it('renders header with brand name', () => {
    render(<LandingTemplate />);
    const headings = screen.getAllByText('Forma');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders hero section', () => {
    render(<LandingTemplate />);
    expect(
      screen.getByRole('heading', { name: /build interfaces/i })
    ).toBeInTheDocument();
  });

  it('renders features section', () => {
    render(<LandingTemplate />);
    expect(
      screen.getByRole('heading', { name: /everything you need/i })
    ).toBeInTheDocument();
  });

  it('renders pricing section', () => {
    render(<LandingTemplate />);
    expect(
      screen.getByRole('heading', { name: /simple, honest pricing/i })
    ).toBeInTheDocument();
  });

  it('renders testimonials section', () => {
    render(<LandingTemplate />);
    expect(
      screen.getByRole('heading', { name: /loved by teams/i })
    ).toBeInTheDocument();
  });

  it('renders call to action section', () => {
    render(<LandingTemplate />);
    expect(
      screen.getByRole('heading', { name: /ready to build/i })
    ).toBeInTheDocument();
  });

  it('renders frequently asked questions section', () => {
    render(<LandingTemplate />);
    expect(
      screen.getByRole('heading', { name: /frequently asked questions/i })
    ).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<LandingTemplate />);
    expect(screen.getByText(/built with care/i)).toBeInTheDocument();
  });
});

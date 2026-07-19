import { render, screen } from '@testing-library/react';
import { MarketingTemplate } from '../MarketingTemplate';

describe('MarketingTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<MarketingTemplate />);
    expect(container).toMatchSnapshot();
  });

  it('renders header with brand name', () => {
    render(<MarketingTemplate />);
    const headings = screen.getAllByText('DaisyX');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders hero section', () => {
    render(<MarketingTemplate />);
    expect(
      screen.getByRole('heading', { name: /build interfaces/i })
    ).toBeInTheDocument();
  });

  it('renders features section', () => {
    render(<MarketingTemplate />);
    expect(
      screen.getByRole('heading', { name: /everything you need/i })
    ).toBeInTheDocument();
  });

  it('renders pricing section', () => {
    render(<MarketingTemplate />);
    expect(
      screen.getByRole('heading', { name: /simple, honest pricing/i })
    ).toBeInTheDocument();
  });

  it('renders testimonials section', () => {
    render(<MarketingTemplate />);
    expect(
      screen.getByRole('heading', { name: /loved by teams/i })
    ).toBeInTheDocument();
  });

  it('renders call to action section', () => {
    render(<MarketingTemplate />);
    expect(
      screen.getByRole('heading', { name: /ready to build/i })
    ).toBeInTheDocument();
  });

  it('renders frequently asked questions section', () => {
    render(<MarketingTemplate />);
    expect(
      screen.getByRole('heading', { name: /frequently asked questions/i })
    ).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<MarketingTemplate />);
    expect(screen.getByText(/built with care/i)).toBeInTheDocument();
  });
});

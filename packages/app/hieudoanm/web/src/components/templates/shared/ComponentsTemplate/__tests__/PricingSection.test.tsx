import { render, screen } from '@testing-library/react';
import { PricingSection } from '../PricingSection';

describe('PricingSection', () => {
  it('renders section heading', () => {
    render(<PricingSection />);
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Simple, honest pricing')).toBeInTheDocument();
  });

  it('renders all pricing tiers', () => {
    render(<PricingSection />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders prices', () => {
    render(<PricingSection />);
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('renders POPULAR badge on Pro', () => {
    render(<PricingSection />);
    expect(screen.getByText('POPULAR')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<PricingSection />);
    expect(screen.getByText('Get started')).toBeInTheDocument();
    expect(screen.getByText('Start free trial')).toBeInTheDocument();
    expect(screen.getByText('Contact sales')).toBeInTheDocument();
  });

  it('renders feature lists', () => {
    render(<PricingSection />);
    expect(screen.getByText('47 base components')).toBeInTheDocument();
    expect(screen.getByText('Figma kit included')).toBeInTheDocument();
    expect(screen.getByText('White-label rights')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<PricingSection />);
    expect(container).toMatchSnapshot();
  });
});

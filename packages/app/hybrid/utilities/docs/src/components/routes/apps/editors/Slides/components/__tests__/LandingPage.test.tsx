import { render, screen } from '@testing-library/react';
import { LandingPage } from '../LandingPage';

jest.mock('../../utils/formatCurrency', () => ({
  formatCurrency: jest.fn((amount, currency) => `${currency}${amount}`),
}));

const mockData = {
  title: {
    product: 'My Product',
    tagline: 'Best tool ever',
    audience: 'Developers',
  },
  problems: {
    title: 'Problems',
    subtitle: 'Common issues',
    items: [{ emoji: '😢', title: 'Problem 1', description: 'Desc 1' }],
  },
  solutions: {
    title: 'Solutions',
    subtitle: 'How we fix',
    items: [
      { emoji: '✨', step: 1, title: 'Solution 1', description: 'Desc 1' },
    ],
  },
  product: {
    title: 'Product',
    subtitle: 'Features',
    features: [{ emoji: '🚀', title: 'Feature 1', description: 'Desc 1' }],
  },
  pricing: {
    title: 'Pricing',
    subtitle: 'Plans',
    currency: '$',
    plans: [
      { name: 'Free', amount: 0, frequency: 'forever', description: 'Basic' },
    ],
  },
};

describe('LandingPage', () => {
  it('renders product title', () => {
    render(<LandingPage data={mockData} />);
    expect(screen.getAllByText('My Product').length).toBeGreaterThanOrEqual(1);
  });

  it('renders tagline', () => {
    render(<LandingPage data={mockData} />);
    expect(screen.getByText('Best tool ever')).toBeInTheDocument();
  });

  it('renders audience', () => {
    render(<LandingPage data={mockData} />);
    expect(screen.getByText('Built for Developers')).toBeInTheDocument();
  });

  it('renders problems section', () => {
    render(<LandingPage data={mockData} />);
    expect(screen.getByText('Problems')).toBeInTheDocument();
    expect(screen.getByText('Common issues')).toBeInTheDocument();
    expect(screen.getByText('Problem 1')).toBeInTheDocument();
  });

  it('renders solutions section', () => {
    render(<LandingPage data={mockData} />);
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Solution 1')).toBeInTheDocument();
  });

  it('renders product features', () => {
    render(<LandingPage data={mockData} />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
  });

  it('renders pricing section', () => {
    render(<LandingPage data={mockData} />);
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('renders copyright footer', () => {
    render(<LandingPage data={mockData} />);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });
});

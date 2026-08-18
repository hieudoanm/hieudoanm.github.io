import { render, screen } from '@testing-library/react';
import { PricingSection } from '../PricingSection';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('PricingSection', () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/mo',
      features: ['1 project'],
      ctaLabel: 'Get started',
      ctaHref: '/signup',
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/mo',
      description: 'Best for teams',
      features: ['Unlimited projects', 'Support'],
      highlighted: true,
      ctaLabel: 'Upgrade',
      ctaHref: '/app/billing',
    },
  ];

  it('renders plan names, prices, and features', () => {
    render(<PricingSection plans={plans} />);
    expect(screen.getByRole('heading', { name: 'Free' })).toBeInTheDocument();
    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('Unlimited projects')).toBeInTheDocument();
    expect(screen.getByText('Best for teams')).toBeInTheDocument();
  });

  it('renders CTA links', () => {
    render(<PricingSection plans={plans} />);
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute(
      'href',
      '/signup'
    );
    expect(screen.getByRole('link', { name: 'Upgrade' })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveClass(
      'btn-outline'
    );
  });
});

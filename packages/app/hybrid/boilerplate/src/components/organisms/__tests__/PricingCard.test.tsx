import { fireEvent, render, screen } from '@testing-library/react';
import { PricingCard } from '../PricingCard';

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

describe('PricingCard', () => {
  const features = ['Unlimited projects', 'Priority support'];

  it('renders price, period, features, and badge', () => {
    render(
      <PricingCard
        name="Pro"
        price="$12"
        period="/mo"
        features={features}
        ctaLabel="Get started"
        badge="Popular"
        highlighted
      />
    );
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('$12')).toBeInTheDocument();
    expect(screen.getByText('/mo')).toBeInTheDocument();
    expect(screen.getByText('Unlimited projects')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('renders a link CTA when a href is provided', () => {
    render(
      <PricingCard
        name="Pro"
        price="$12"
        features={features}
        ctaLabel="Start"
        ctaHref="/pricing"
      />
    );
    expect(screen.getByRole('link', { name: 'Start' })).toHaveAttribute(
      'href',
      '/pricing'
    );
  });

  it('renders a button CTA that calls onCta', () => {
    const onCta = jest.fn();
    render(
      <PricingCard
        name="Pro"
        price="$12"
        features={features}
        ctaLabel="Start"
        onCta={onCta}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    expect(onCta).toHaveBeenCalledTimes(1);
  });
});

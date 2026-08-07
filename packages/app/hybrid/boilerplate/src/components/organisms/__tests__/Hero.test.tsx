import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

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

describe('Hero', () => {
  it('renders title, tagline, description, and badge', () => {
    render(
      <Hero
        title="Build faster"
        tagline="Productivity"
        description="Ship UI quickly."
        badge="New"
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Build faster' })
    ).toBeInTheDocument();
    expect(screen.getByText('Productivity')).toBeInTheDocument();
    expect(screen.getByText('Ship UI quickly.')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders CTAs as links', () => {
    render(
      <Hero
        title="Build"
        primaryCta={{ label: 'Get started', href: '/signup' }}
        secondaryCta={{ label: 'Learn more', href: '/about' }}
      />
    );
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveClass(
      'btn-outline'
    );
  });

  it('omits optional sections when not provided', () => {
    render(<Hero title="Build" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });
});

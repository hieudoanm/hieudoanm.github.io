import { render, screen } from '@testing-library/react';
import { CTASection } from '../CTASection';

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

describe('CTASection', () => {
  it('renders title, description, and badge', () => {
    render(
      <CTASection title="Ship faster" description="Start today." badge="New" />
    );
    expect(screen.getByText('Ship faster')).toBeInTheDocument();
    expect(screen.getByText('Start today.')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders primary and secondary CTAs as links', () => {
    render(
      <CTASection
        title="Ship faster"
        primaryCta={{ label: 'Get started', href: '/signup' }}
        secondaryCta={{ label: 'Read docs', href: '/docs' }}
      />
    );
    expect(screen.getByText('Get started')).toHaveAttribute('href', '/signup');
    expect(screen.getByText('Read docs')).toHaveAttribute('href', '/docs');
    expect(screen.getByText('Get started')).toHaveClass('btn-primary');
    expect(screen.getByText('Read docs')).toHaveClass('btn-outline');
  });

  it('renders no CTA block when both are missing', () => {
    render(<CTASection title="Ship faster" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

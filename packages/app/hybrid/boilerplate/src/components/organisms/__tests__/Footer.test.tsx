import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

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

describe('Footer', () => {
  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
  ];

  it('renders brand, description, and column links', () => {
    render(<Footer brand="Acme" description="Great app" columns={columns} />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Great app')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute(
      'href',
      '/features'
    );
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute(
      'href',
      '/pricing'
    );
  });

  it('renders copyright when provided', () => {
    render(<Footer brand="Acme" columns={columns} copyright="© 2026" />);
    expect(screen.getByText('© 2026')).toBeInTheDocument();
  });

  it('omits copyright when not provided', () => {
    render(<Footer brand="Acme" columns={columns} />);
    expect(screen.queryByText('© 2026')).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { ProductGrid } from '../ProductGrid';

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

describe('ProductGrid', () => {
  const items = [
    {
      id: '1',
      name: 'Starter',
      price: '$9',
      description: 'Basic',
      badge: 'Popular',
      rating: 4.5,
    },
  ];

  it('renders the title and product details', () => {
    render(<ProductGrid title="Catalog" items={items} />);
    expect(
      screen.getByRole('heading', { name: 'Catalog' })
    ).toBeInTheDocument();
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('★ 4.5')).toBeInTheDocument();
  });
});

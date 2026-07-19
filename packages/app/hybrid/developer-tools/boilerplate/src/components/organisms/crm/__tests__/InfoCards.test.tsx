import { render, screen } from '@testing-library/react';
import { InfoCards } from '../InfoCards';

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

describe('InfoCards', () => {
  const cards = [
    {
      id: 'fast',
      title: 'Fast',
      description: 'Optimised for speed.',
      icon: '⚡',
      accent: 'primary' as const,
    },
    { id: 'secure', title: 'Secure', description: 'Encrypted.' },
  ];

  it('renders the title and cards', () => {
    render(<InfoCards title="Why us" cards={cards} />);
    expect(screen.getByText('Why us')).toBeInTheDocument();
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Optimised for speed.')).toBeInTheDocument();
    expect(screen.getByText('Secure')).toBeInTheDocument();
  });

  it('applies accent classes to icons', () => {
    render(<InfoCards cards={cards} />);
    expect(screen.getByText('⚡')).toHaveClass('text-primary');
  });

  it('applies the requested column count', () => {
    const { container } = render(<InfoCards cards={cards} columns={4} />);
    expect(container.querySelector('.grid')).toHaveClass('lg:grid-cols-4');
  });
});

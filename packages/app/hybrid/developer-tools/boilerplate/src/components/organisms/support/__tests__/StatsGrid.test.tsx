import { render, screen } from '@testing-library/react';
import { StatsGrid } from '../StatsGrid';

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

describe('StatsGrid', () => {
  const stats = [
    { label: 'Users', value: '128', description: 'total' },
    { label: 'Sessions', value: '1,024' },
  ];

  it('renders stats labels and values', () => {
    render(<StatsGrid stats={stats} />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('total')).toBeInTheDocument();
    expect(screen.getByText('1,024')).toBeInTheDocument();
  });

  it('applies column grid class', () => {
    const { container } = render(<StatsGrid stats={stats} columns={2} />);
    expect(container.querySelector('.sm\\:grid-cols-2')).toBeInTheDocument();
  });
});

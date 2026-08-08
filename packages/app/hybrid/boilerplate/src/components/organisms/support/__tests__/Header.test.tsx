import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

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

describe('Header', () => {
  it('renders title and subtitle', () => {
    render(<Header title="Dashboard" subtitle="Overview" />);
    expect(
      screen.getByRole('heading', { name: 'Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders back link when backHref is provided', () => {
    render(<Header title="Dashboard" backHref="/" />);
    expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', '/');
  });

  it('renders badges and action', () => {
    render(
      <Header
        title="Dashboard"
        badges={<span>Beta</span>}
        action={<button>New</button>}
      />
    );
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });
});

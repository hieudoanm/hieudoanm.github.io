import { fireEvent, render, screen } from '@testing-library/react';
import { DashboardHeader } from '../DashboardHeader';

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

describe('DashboardHeader', () => {
  it('renders title and subtitle', () => {
    render(<DashboardHeader title="Overview" subtitle="Welcome back" />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(<DashboardHeader title="Overview" actions={<button>New</button>} />);
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });

  it('renders a search input and forwards changes', () => {
    const onSearchChange = jest.fn();
    render(
      <DashboardHeader
        title="Overview"
        searchValue="needle"
        onSearchChange={onSearchChange}
      />
    );
    const input = screen.getByRole('searchbox', { name: 'Search' });
    expect(input).toHaveValue('needle');
    fireEvent.change(input, { target: { value: 'hay' } });
    expect(onSearchChange).toHaveBeenCalledWith('hay');
  });

  it('hides the search input when no handler is provided', () => {
    render(<DashboardHeader title="Overview" />);
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });
});

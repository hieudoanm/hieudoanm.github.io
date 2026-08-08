import { render, screen } from '@testing-library/react';
import { FiHome } from 'react-icons/fi';
import { Sidebar } from '../Sidebar';

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

describe('Sidebar', () => {
  const items = [
    { label: 'Home', href: '/', icon: <FiHome /> },
    { label: 'Settings', href: '/app/settings', badge: 'New' },
  ];

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/app/settings');
  });

  it('renders title and nav items', () => {
    render(<Sidebar title="Menu" items={items} />);
    expect(screen.getByRole('heading', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Settings/ })).toBeInTheDocument();
  });

  it('marks active item from pathname', () => {
    render(<Sidebar title="Menu" items={items} />);
    expect(screen.getByRole('link', { name: /Settings/ })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: /Home/ })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('marks home active only on root', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Sidebar title="Menu" items={items} />);
    expect(screen.getByRole('link', { name: /Home/ })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('renders badge and footer', () => {
    render(
      <Sidebar
        title="Menu"
        items={items}
        footer={<span>Signed in as Admin</span>}
      />
    );
    expect(screen.getByRole('link', { name: /Settings/ })).toHaveTextContent(
      'New'
    );
    expect(screen.getByText('Signed in as Admin')).toBeInTheDocument();
  });
});

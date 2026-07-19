import { fireEvent, render, screen } from '@testing-library/react';
import { AccountMenu } from '../AccountMenu';

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

describe('AccountMenu', () => {
  const items = [
    { label: 'Profile', onClick: jest.fn() },
    { label: 'Sign out', danger: true },
  ];

  it('renders the account trigger', () => {
    render(<AccountMenu name="Jane" email="jane@example.com" items={items} />);
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('opens the menu and runs the item onClick', () => {
    render(<AccountMenu name="Jane" items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /Jane/ }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Profile' }));
    expect(items[0].onClick).toHaveBeenCalledTimes(1);
  });

  it('marks danger items', () => {
    render(<AccountMenu name="Jane" items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /Jane/ }));
    expect(screen.getByRole('menuitem', { name: 'Sign out' })).toHaveClass(
      'text-error'
    );
  });

  it('renders without email and avatar', () => {
    render(<AccountMenu name="Jane" items={items} />);
    expect(screen.getByRole('button', { name: /Jane/ })).toBeInTheDocument();
  });

  it('closes the menu when clicking outside', () => {
    render(
      <div>
        <AccountMenu name="Jane" items={items} />
        <button type="button">Outside</button>
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: /Jane/ }));
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { FiUser } from 'react-icons/fi';
import { Menu } from '../Menu';

describe('Menu', () => {
  const items = [
    { label: 'Profile', icon: <FiUser />, onClick: jest.fn() },
    { label: 'Settings', active: true },
    { label: 'Log out', danger: true, onClick: jest.fn() },
  ];

  it('renders title and items', () => {
    render(<Menu items={items} title="Account" />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('marks danger items and calls onClick', () => {
    render(<Menu items={items} />);
    const logout = screen.getByRole('button', { name: 'Log out' });
    expect(logout).toHaveClass('text-error');
    fireEvent.click(logout);
    expect(items[2].onClick).toHaveBeenCalledTimes(1);
  });

  it('renders item icons', () => {
    render(<Menu items={items} />);
    expect(
      screen.getByRole('button', { name: 'Profile' }).querySelector('svg')
    ).toBeInTheDocument();
  });
});

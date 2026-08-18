import { render, screen, fireEvent } from '@testing-library/react';
import { User } from '@/types/pos';
import { UserManager } from '../UserManager';

const USERS: User[] = [
  { id: 'u1', name: 'Alice', role: 'admin', pin: '1234', active: true },
  { id: 'u2', name: 'Bob', role: 'cashier', pin: '5678', active: true },
];

const renderComponent = (
  props: Partial<React.ComponentProps<typeof UserManager>> = {}
) => {
  const defaultProps = {
    users: USERS,
    currentUser: USERS[0] as User,
    onAdd: jest.fn(),
    onRemove: jest.fn(),
    onBack: jest.fn(),
    ...props,
  };
  return { ...render(<UserManager {...defaultProps} />), ...defaultProps };
};

describe('UserManager', () => {
  it('renders empty state when no users', () => {
    renderComponent({ users: [], currentUser: null });
    expect(screen.getByText('No users configured')).toBeInTheDocument();
  });

  it('renders user list with roles', () => {
    renderComponent();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('cashier')).toBeInTheDocument();
  });

  it('shows You badge for current user', () => {
    renderComponent();
    expect(screen.getByText('You')).toBeInTheDocument();
  });

  it('shows trash buttons for admin to remove other users', () => {
    renderComponent();
    const trashButtons = screen.getAllByRole('button').filter((b) => {
      const svg = b.querySelector('svg');
      return (
        svg &&
        b.className.includes('btn-ghost') &&
        !b.className.includes('btn-sm')
      );
    });
    expect(trashButtons.length).toBe(1);
  });

  it('does not show trash buttons for non-admin current user', () => {
    renderComponent({ currentUser: USERS[1] as User });
    const trashButtons = screen.getAllByRole('button').filter((b) => {
      const svg = b.querySelector('svg');
      return (
        svg &&
        b.className.includes('btn-ghost') &&
        !b.className.includes('btn-sm')
      );
    });
    expect(trashButtons.length).toBe(0);
  });

  it('adds new user', () => {
    const { onAdd } = renderComponent({ users: [], currentUser: null });
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Charlie' },
    });
    fireEvent.change(screen.getByPlaceholderText('PIN'), {
      target: { value: '9999' },
    });
    fireEvent.click(screen.getByText('Add User'));
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Charlie', role: 'cashier', pin: '9999' })
    );
  });

  it('calls onBack when back button clicked', () => {
    const { onBack } = renderComponent();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});

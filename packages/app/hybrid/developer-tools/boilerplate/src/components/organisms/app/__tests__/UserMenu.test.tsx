import { fireEvent, render, screen } from '@testing-library/react';
import { UserMenu } from '../UserMenu';

describe('UserMenu', () => {
  it('renders username, role, and avatar initials', () => {
    render(
      <UserMenu username="Ada Lovelace" avatarInitials="AL" role="Admin" />
    );
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('opens the dropdown on click', () => {
    render(<UserMenu username="Ada" avatarInitials="AL" />);
    expect(screen.queryByTestId('user-menu')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('user-menu-trigger'));
    expect(screen.getByTestId('user-menu')).toBeInTheDocument();
  });

  it('fires onSignOut when signing out', () => {
    const onSignOut = jest.fn();
    render(
      <UserMenu username="Ada" avatarInitials="AL" onSignOut={onSignOut} />
    );
    fireEvent.click(screen.getByTestId('user-menu-trigger'));
    fireEvent.click(screen.getByTestId('user-menu-signout'));
    expect(onSignOut).toHaveBeenCalled();
  });
});

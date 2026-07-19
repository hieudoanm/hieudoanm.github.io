import { fireEvent, render, screen } from '@testing-library/react';
import { InviteTeam } from '../InviteTeam';

describe('InviteTeam', () => {
  it('renders the default roles', () => {
    render(<InviteTeam onInvite={jest.fn()} />);
    expect(screen.getByText('Member')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Viewer')).toBeInTheDocument();
  });

  it('submits the invite payload', () => {
    const onInvite = jest.fn();
    render(<InviteTeam onInvite={onInvite} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'grace@example.com' },
    });
    fireEvent.change(screen.getByRole('combobox', { name: 'Role' }), {
      target: { value: 'Admin' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send invite' }));
    expect(onInvite).toHaveBeenCalledWith({
      email: 'grace@example.com',
      role: 'Admin',
    });
  });

  it('does not submit an empty email', () => {
    const onInvite = jest.fn();
    render(<InviteTeam onInvite={onInvite} />);
    fireEvent.click(screen.getByRole('button', { name: 'Send invite' }));
    expect(onInvite).not.toHaveBeenCalled();
  });
});

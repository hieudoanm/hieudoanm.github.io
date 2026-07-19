import { fireEvent, render, screen } from '@testing-library/react';
import { MembersTemplate } from '../MembersTemplate';

describe('MembersTemplate', () => {
  it('renders the team member table', () => {
    render(<MembersTemplate />);
    expect(screen.getByText('Team members')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Bob Martinez')).toBeInTheDocument();
    expect(screen.getByText('Carol Smith')).toBeInTheDocument();
    expect(screen.getByText('AC')).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(3);
    expect(screen.getAllByText('Active').length).toBeGreaterThan(0);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('changes a member role', () => {
    render(<MembersTemplate />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: 'Admin' } });
    expect(selects[1]).toHaveValue('Admin');
    expect(selects[0]).toHaveValue('Admin');
  });

  it('removes a member', () => {
    render(<MembersTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.queryByText('Alice Chen')).not.toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
  });

  it('opens the invite modal and sends an invite', () => {
    render(<MembersTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Invite member/ }));
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Dana Lee' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'dana@acme.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send invite' }));
    expect(screen.getByText('Dana Lee')).toBeInTheDocument();
    expect(screen.getByText('dana@acme.com')).toBeInTheDocument();
    expect(screen.getAllByText('Invited')).toHaveLength(1);
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });

  it('closes the invite modal without sending', () => {
    render(<MembersTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Invite member/ }));
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });

  it('sends an invite with default values when fields are empty', () => {
    render(<MembersTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Invite member/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Send invite' }));
    expect(screen.getByText('New Member')).toBeInTheDocument();
    expect(screen.getByText('member@acme.com')).toBeInTheDocument();
    expect(screen.getAllByText('Invited')).toHaveLength(1);
  });
});

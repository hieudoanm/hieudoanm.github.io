import { fireEvent, render, screen } from '@testing-library/react';
import { SecurityOverviewTemplate } from '../SecurityOverviewTemplate';
import SecurityPage from '@/app/(templates)/auth/security/page';

describe('SecurityOverviewTemplate', () => {
  it('renders feature cards with status badges', () => {
    render(<SecurityOverviewTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Security overview' })
    ).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Two-factor authentication')).toBeInTheDocument();
    expect(screen.getByText('Recovery codes')).toBeInTheDocument();
    expect(screen.getByText('Active sessions')).toBeInTheDocument();
    expect(screen.getAllByText('Set')).toHaveLength(2);
    expect(screen.getAllByText('Not set')).toHaveLength(1);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('enables two-factor via the set up button', () => {
    render(<SecurityOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Set up' }));
    expect(screen.getByText('Enabled')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Disable 2FA' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Not set')).not.toBeInTheDocument();
  });

  it('toggles the password status', () => {
    render(<SecurityOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove password' }));
    expect(screen.getAllByText('Not set')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Set password' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Set password' }));
    expect(screen.getAllByText('Set')).toHaveLength(2);
  });

  it('removes the recovery codes', () => {
    render(<SecurityOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove codes' }));
    expect(screen.getAllByText('Not set')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Generate codes' })
    ).toBeInTheDocument();
  });

  it('signs out and back in for sessions', () => {
    render(<SecurityOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders the SecurityPage', () => {
    render(<SecurityPage />);
    expect(
      screen.getByRole('heading', { name: 'Security overview' })
    ).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import LockScreenPage from '@/app/(templates)/auth/lock-screen/page';
import { LockScreenTemplate } from '../LockScreenTemplate';

describe('LockScreenTemplate', () => {
  it('renders the locked screen', () => {
    render(<LockScreenTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Screen locked' })
    ).toBeInTheDocument();
    expect(screen.getByText('DU')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Sign in as a different user' })
    ).toHaveAttribute('href', '/auth/sign-in');
  });

  it('shows an error for an empty password', () => {
    render(<LockScreenTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Unlock' }));
    expect(screen.getByText('Password required')).toBeInTheDocument();
  });

  it('shows an error for an incorrect password', () => {
    render(<LockScreenTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrong' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Unlock' }));
    expect(screen.getByText('Incorrect password')).toBeInTheDocument();
  });

  it('unlocks with the demo password', () => {
    render(<LockScreenTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'demo' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Unlock' }));
    expect(
      screen.getByRole('heading', { name: 'Welcome back, Demo User' })
    ).toBeInTheDocument();
    expect(screen.getByText('Unlock complete')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<LockScreenTemplate />);
    const input = screen.getByPlaceholderText('Enter your password');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input).toHaveAttribute('type', 'text');
    fireEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders the LockScreenPage', () => {
    render(<LockScreenPage />);
    expect(
      screen.getByRole('heading', { name: 'Screen locked' })
    ).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import ChangePasswordPage from '@/app/(templates)/auth/change-password/page';
import { ChangePasswordTemplate } from '../ChangePasswordTemplate';

describe('ChangePasswordTemplate', () => {
  const fillPasswords = (current: string, next: string, confirm: string) => {
    fireEvent.change(
      screen.getByPlaceholderText('Enter your current password'),
      { target: { value: current } }
    );
    fireEvent.change(screen.getByPlaceholderText('Enter a new password'), {
      target: { value: next },
    });
    fireEvent.change(screen.getByPlaceholderText('Re-enter new password'), {
      target: { value: confirm },
    });
  };

  it('renders the password form', () => {
    render(<ChangePasswordTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Update password' })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your current password')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter a new password')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Re-enter new password')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Update password' })
    ).toBeInTheDocument();
  });

  it('shows an error when the current password is empty', () => {
    render(<ChangePasswordTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Update password' }));
    expect(screen.getByText('Enter your current password')).toBeInTheDocument();
  });

  it('shows an error when new and confirm passwords do not match', () => {
    render(<ChangePasswordTemplate />);
    fillPasswords('old-pass', 'new-pass-1', 'new-pass-2');
    fireEvent.click(screen.getByRole('button', { name: 'Update password' }));
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('shows success state and resets the form on continue', () => {
    render(<ChangePasswordTemplate />);
    fillPasswords('old-pass', 'new-pass-1', 'new-pass-1');
    fireEvent.click(screen.getByRole('button', { name: 'Update password' }));
    expect(
      screen.getByRole('heading', { name: 'Password updated successfully' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(
      screen.getByRole('heading', { name: 'Update password' })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your current password')
    ).toHaveValue('');
    expect(screen.getByPlaceholderText('Enter a new password')).toHaveValue('');
    expect(screen.getByPlaceholderText('Re-enter new password')).toHaveValue(
      ''
    );
  });

  it('toggles password visibility for all fields', () => {
    render(<ChangePasswordTemplate />);
    const current = screen.getByPlaceholderText('Enter your current password');
    const next = screen.getByPlaceholderText('Enter a new password');
    const confirm = screen.getByPlaceholderText('Re-enter new password');

    fireEvent.click(
      screen.getByRole('button', { name: 'Show Current password' })
    );
    expect(current).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByRole('button', { name: 'Show New password' }));
    expect(next).toHaveAttribute('type', 'text');
    fireEvent.click(screen.getByRole('button', { name: 'Hide New password' }));
    expect(next).toHaveAttribute('type', 'password');

    fireEvent.click(
      screen.getByRole('button', { name: 'Show Confirm new password' })
    );
    expect(confirm).toHaveAttribute('type', 'text');
    fireEvent.click(
      screen.getByRole('button', { name: 'Hide Confirm new password' })
    );
    expect(confirm).toHaveAttribute('type', 'password');
  });

  it('renders the ChangePasswordPage', () => {
    render(<ChangePasswordPage />);
    expect(
      screen.getByRole('heading', { name: 'Update password' })
    ).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { ChangePasswordTemplate } from '../ChangePasswordTemplate';
import { LockScreenTemplate } from '../LockScreenTemplate';
import { TwoFactorTemplate } from '../TwoFactorTemplate';
import { VerifyEmailTemplate } from '../VerifyEmailTemplate';
import ChangePasswordPage from '@/app/(templates)/auth/change-password/page';
import LockScreenPage from '@/app/(templates)/auth/lock-screen/page';
import TwoFactorPage from '@/app/(templates)/auth/two-factor/page';
import VerifyEmailPage from '@/app/(templates)/auth/verify-email/page';

describe('VerifyEmailTemplate', () => {
  it('renders the verification panel with the current email', () => {
    render(<VerifyEmailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Verify your email' })
    ).toBeInTheDocument();
    expect(screen.getByText('demo@example.com')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Resend email' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('new@example.com')).toBeInTheDocument();
  });

  it('toggles the resent confirmation', () => {
    render(<VerifyEmailTemplate />);
    const resend = screen.getByRole('button', { name: 'Resend email' });
    fireEvent.click(resend);
    expect(
      screen.getByText('Verification email resent to demo@example.com')
    ).toBeInTheDocument();
    fireEvent.click(resend);
    expect(
      screen.queryByText('Verification email resent to demo@example.com')
    ).not.toBeInTheDocument();
  });

  it('shows an error when updating with an empty email', () => {
    render(<VerifyEmailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(screen.getByText('Enter an email address')).toBeInTheDocument();
  });

  it('updates the email address', () => {
    render(<VerifyEmailTemplate />);
    fireEvent.change(screen.getByPlaceholderText('new@example.com'), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.queryByText('demo@example.com')).not.toBeInTheDocument();
  });

  it('renders the VerifyEmailPage', () => {
    render(<VerifyEmailPage />);
    expect(
      screen.getByRole('heading', { name: 'Verify your email' })
    ).toBeInTheDocument();
  });
});

describe('TwoFactorTemplate', () => {
  it('renders the code entry form', () => {
    render(<TwoFactorTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Enter your code' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('123456')).toBeInTheDocument();
    expect(
      screen.getByText('Your code expires in 5 minutes.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Verify' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Resend code' })
    ).toBeInTheDocument();
  });

  it('shows an error for a short code', () => {
    render(<TwoFactorTemplate />);
    fireEvent.change(screen.getByPlaceholderText('123456'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(screen.getByText('Code must be 6 digits')).toBeInTheDocument();
  });

  it('shows an error for a long code', () => {
    render(<TwoFactorTemplate />);
    fireEvent.change(screen.getByPlaceholderText('123456'), {
      target: { value: '1234567' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(screen.getByText('Code must be 6 digits')).toBeInTheDocument();
  });

  it('shows the success state for a valid code', () => {
    render(<TwoFactorTemplate />);
    fireEvent.change(screen.getByPlaceholderText('123456'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(
      screen.getByRole('heading', { name: 'Two-factor authentication enabled' })
    ).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('toggles the resend confirmation', () => {
    render(<TwoFactorTemplate />);
    const resend = screen.getByRole('button', { name: 'Resend code' });
    fireEvent.click(resend);
    expect(
      screen.getByText('A new code was sent to your device')
    ).toBeInTheDocument();
    fireEvent.click(resend);
    expect(
      screen.queryByText('A new code was sent to your device')
    ).not.toBeInTheDocument();
  });

  it('renders the TwoFactorPage', () => {
    render(<TwoFactorPage />);
    expect(
      screen.getByRole('heading', { name: 'Enter your code' })
    ).toBeInTheDocument();
  });
});

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

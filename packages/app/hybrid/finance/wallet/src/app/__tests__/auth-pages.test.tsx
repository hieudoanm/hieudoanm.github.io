jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import LoginPage from '@/app/(auth)/login/page';
import RegisterPage from '@/app/(auth)/register/page';
import ForgotPasswordPage from '@/app/(auth)/(recovery)/forgot-password/page';
import ResetPasswordPage from '@/app/(auth)/(recovery)/reset-password/page';
import { useRouter } from 'next/navigation';

const fill = (label: string, value: string) => {
  fireEvent.change(screen.getByPlaceholderText(label), {
    target: { value },
  });
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('LoginPage', () => {
  it('renders the login form', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  it('does not redirect when email is empty', async () => {
    const { replace } = useRouter();
    renderWithProviders(<LoginPage />);
    fireEvent.submit(document.querySelector('form') as HTMLFormElement);
    await waitFor(() => {
      expect(replace).not.toHaveBeenCalled();
    });
  });

  it('redirects to / on successful login', async () => {
    const { replace } = useRouter();
    renderWithProviders(<LoginPage />);
    fill('Email', 'a@b.com');
    fill('Password', 'pw');
    fireEvent.click(screen.getByText('Sign In'));
    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/');
    });
  });
});

describe('RegisterPage', () => {
  it('renders and disables submit until agreed', () => {
    renderWithProviders(<RegisterPage />);
    expect(
      screen.getByText('Create Account', { selector: 'h2' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Create Account', { selector: 'button' })
    ).toBeDisabled();
  });

  it('submits and redirects', async () => {
    const { replace } = useRouter();
    renderWithProviders(<RegisterPage />);
    fireEvent.click(screen.getByRole('checkbox'));
    fill('Full Name', 'Jane Doe');
    fill('Email', 'jane@b.com');
    fill('Password', 'pw12345');
    fireEvent.click(screen.getByText('Create Account', { selector: 'button' }));
    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/');
    });
  });
});

describe('ForgotPasswordPage', () => {
  it('shows sent confirmation on success', async () => {
    renderWithProviders(<ForgotPasswordPage />);
    fill('Email', 'a@b.com');
    fireEvent.click(screen.getByText('Send Reset Link'));
    await screen.findByText('Check Your Email');
    expect(screen.getByText('a@b.com')).toBeInTheDocument();
  });

  it('shows error toast when email is empty', async () => {
    renderWithProviders(<ForgotPasswordPage />);
    fireEvent.submit(document.querySelector('form') as HTMLFormElement);
    await waitFor(() => {
      expect(screen.getByText('Email not found')).toBeInTheDocument();
    });
  });
});

describe('ResetPasswordPage', () => {
  it('shows error when passwords do not match', async () => {
    renderWithProviders(<ResetPasswordPage />);
    fill('Enter reset token from email', 'tok');
    fill('New password', 'abcdef');
    fill('Confirm new password', 'zzzzzz');
    fireEvent.click(screen.getByText('Reset Password', { selector: 'button' }));
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('shows error when password is too short', async () => {
    renderWithProviders(<ResetPasswordPage />);
    fill('Enter reset token from email', 'tok');
    fill('New password', 'abc');
    fill('Confirm new password', 'abc');
    fireEvent.click(screen.getByText('Reset Password', { selector: 'button' }));
    await waitFor(() => {
      expect(
        screen.getByText('Password must be at least 6 characters')
      ).toBeInTheDocument();
    });
  });

  it('shows success screen on valid reset', async () => {
    renderWithProviders(<ResetPasswordPage />);
    fill('Enter reset token from email', 'tok');
    fill('New password', 'abcdef');
    fill('Confirm new password', 'abcdef');
    fireEvent.click(screen.getByText('Reset Password', { selector: 'button' }));
    await screen.findByText('Password Reset!');
  });

  it('shows error toast when reset token is invalid', async () => {
    renderWithProviders(<ResetPasswordPage />);
    fill('New password', 'abcdef');
    fill('Confirm new password', 'abcdef');
    fireEvent.submit(document.querySelector('form') as HTMLFormElement);
    await waitFor(() => {
      expect(
        screen.getByText('Invalid or expired reset token')
      ).toBeInTheDocument();
    });
  });

  it('toggles password visibility', () => {
    renderWithProviders(<ResetPasswordPage />);
    const passwordInput = screen.getByPlaceholderText('New password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    const toggle = document.querySelector<HTMLButtonElement>(
      'button[type="button"]'
    );
    fireEvent.click(toggle as HTMLButtonElement);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});

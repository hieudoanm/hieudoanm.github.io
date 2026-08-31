jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import ResetPasswordPage from '../page';

const fill = (label: string, value: string) => {
  fireEvent.change(screen.getByPlaceholderText(label), {
    target: { value },
  });
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
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

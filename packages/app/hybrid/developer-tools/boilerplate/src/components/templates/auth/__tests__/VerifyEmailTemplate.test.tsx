import { fireEvent, render, screen } from '@testing-library/react';
import VerifyEmailPage from '@/app/(templates)/auth/verify-email/page';
import { VerifyEmailTemplate } from '../VerifyEmailTemplate';

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

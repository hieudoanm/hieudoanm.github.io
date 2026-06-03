import { render, screen, fireEvent } from '@solidjs/testing-library';
import { PasswordReset } from '../PasswordReset';

describe('PasswordReset', () => {
  it('shows invalid link view when no token', () => {
    render(() => <PasswordReset />);
    expect(screen.getByText('Invalid reset link')).toBeInTheDocument();
  });

  it('calls onBackToSignIn from invalid link view', () => {
    const onBackToSignIn = vi.fn();
    render(() => <PasswordReset onBackToSignIn={onBackToSignIn} />);
    fireEvent.click(screen.getByText('Back to sign in'));
    expect(onBackToSignIn).toHaveBeenCalledOnce();
  });

  it('renders password form when token is provided', () => {
    render(() => <PasswordReset token="valid-token" />);
    expect(screen.getByText('Choose a new password')).toBeInTheDocument();
  });

  it('renders password checklist', () => {
    render(() => <PasswordReset token="valid-token" />);
    expect(screen.getByText(/At least 8 characters/)).toBeInTheDocument();
    expect(screen.getByText(/Passwords match/)).toBeInTheDocument();
  });

  it('shows error when password is too short', () => {
    render(() => <PasswordReset token="valid-token" />);
    fireEvent.click(screen.getByText('Reset password'));
    expect(screen.getByText(/at least 8 characters/)).toBeInTheDocument();
  });

  it('shows loading state on valid form submission', () => {
    render(() => <PasswordReset token="valid-token" />);
    const inputs = document.querySelectorAll('input[type="password"]');
    const passwordInput = inputs[0] as HTMLInputElement;
    passwordInput.value = 'newpassword123';
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    const confirmInput = inputs[1] as HTMLInputElement;
    confirmInput.value = 'newpassword123';
    confirmInput.dispatchEvent(new Event('input', { bubbles: true }));
    fireEvent.click(screen.getByText('Reset password'));
    expect(screen.getByText(/Resetting/)).toBeInTheDocument();
  });

  it('renders back to sign in link in form view', () => {
    render(() => <PasswordReset token="valid-token" />);
    expect(screen.getAllByText(/Back to sign in/).length).toBeGreaterThan(0);
  });
});

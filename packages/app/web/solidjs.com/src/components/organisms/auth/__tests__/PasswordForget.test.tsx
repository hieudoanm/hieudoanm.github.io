import { render, screen, fireEvent } from '@solidjs/testing-library';
import { PasswordForget } from '../PasswordForget';

describe('PasswordForget', () => {
  it('renders forgot password heading', () => {
    render(() => <PasswordForget />);
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(() => <PasswordForget />);
    expect(screen.getByPlaceholderText('jane@forma.io')).toBeInTheDocument();
  });

  it('renders form description', () => {
    render(() => <PasswordForget />);
    expect(screen.getByText(/enter your email/)).toBeInTheDocument();
  });

  it('shows loading state on submit with valid email', () => {
    render(() => <PasswordForget />);
    const emailInput = screen.getByPlaceholderText(
      'jane@forma.io'
    ) as HTMLInputElement;
    emailInput.value = 'test@test.com';
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    fireEvent.click(screen.getByText('Send reset link'));
    expect(screen.getByText(/Sending/)).toBeInTheDocument();
  });

  it('shows error when email is empty on submit', () => {
    render(() => <PasswordForget />);
    fireEvent.submit(screen.getByText('Send reset link').closest('form')!);
    expect(screen.getAllByText(/enter your email/).length).toBeGreaterThan(0);
  });

  it('calls onBackToSignIn', () => {
    const onBackToSignIn = vi.fn();
    render(() => <PasswordForget onBackToSignIn={onBackToSignIn} />);
    fireEvent.click(screen.getByText('Sign in'));
    expect(onBackToSignIn).toHaveBeenCalledOnce();
  });
});

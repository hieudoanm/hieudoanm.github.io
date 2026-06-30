import { render, screen, fireEvent } from '@solidjs/testing-library';
import { SignInForm } from '../SignInForm';

describe('SignInForm', () => {
  it('renders heading', () => {
    render(() => <SignInForm />);
    expect(screen.getByText('Forma')).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(() => <SignInForm />);
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(() => <SignInForm />);
    expect(screen.getByPlaceholderText('jane@forma.io')).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(() => <SignInForm />);
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('shows error when email is empty on submit', () => {
    render(() => <SignInForm />);
    fireEvent.click(screen.getByText('Sign in'));
    expect(screen.getByText(/enter your email/)).toBeInTheDocument();
  });

  it('shows error when password is empty on submit', () => {
    render(() => <SignInForm />);
    const emailInput = screen.getByPlaceholderText('jane@forma.io');
    fireEvent.input(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByText('Sign in'));
    expect(screen.getByText(/enter your password/)).toBeInTheDocument();
  });

  it('renders Google sign in button', () => {
    render(() => <SignInForm />);
    expect(screen.getByText(/Sign in with Google/)).toBeInTheDocument();
  });

  it('renders sign up link', () => {
    render(() => <SignInForm />);
    expect(screen.getByText('Create one free')).toBeInTheDocument();
  });

  it('calls onSignUpClick when sign up link is clicked', () => {
    const onSignUpClick = vi.fn();
    render(() => <SignInForm onSignUpClick={onSignUpClick} />);
    fireEvent.click(screen.getByText('Create one free'));
    expect(onSignUpClick).toHaveBeenCalledOnce();
  });

  it('renders forgot password link', () => {
    render(() => <SignInForm />);
    expect(screen.getByText(/Forgot password/)).toBeInTheDocument();
  });

  it('calls onForgotPasswordClick when forgot password link is clicked', () => {
    const onForgotPasswordClick = vi.fn();
    render(() => <SignInForm onForgotPasswordClick={onForgotPasswordClick} />);
    fireEvent.click(screen.getByText(/Forgot password/));
    expect(onForgotPasswordClick).toHaveBeenCalledOnce();
  });

  it('shows loading state on submit', () => {
    render(() => <SignInForm />);
    const emailInput = screen.getByPlaceholderText('jane@forma.io');
    fireEvent.input(emailInput, { target: { value: 'test@test.com' } });
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.input(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(screen.getByText('Sign in'));
    expect(screen.getByText(/Signing in/)).toBeInTheDocument();
  });

  it('calls onSuccess after sign in completes', async () => {
    const onSuccess = vi.fn();
    render(() => <SignInForm onSuccess={onSuccess} />);
    const emailInput = screen.getByPlaceholderText('jane@forma.io');
    fireEvent.input(emailInput, { target: { value: 'test@test.com' } });
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.input(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(screen.getByText('Sign in'));
    await new Promise((r) => setTimeout(r, 1300));
    expect(onSuccess).toHaveBeenCalledOnce();
  });
});
